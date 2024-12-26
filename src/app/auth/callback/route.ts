import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { syncSupabaseUser } from "~/lib/auth-utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  try {
    const code = requestUrl.searchParams.get("code");
    const error = requestUrl.searchParams.get("error");
    const error_description = requestUrl.searchParams.get("error_description");

    // Handle OAuth error
    if (error || error_description) {
      console.error("OAuth error:", error, error_description);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/error?error=${encodeURIComponent(
          error_description ?? error ?? "Unknown error",
        )}`,
      );
    }

    // Handle missing code
    if (!code) {
      console.error("No code in callback");
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/error?error=${encodeURIComponent(
          "No code provided in callback",
        )}`,
      );
    }

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error("Session error:", sessionError);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/error?error=${encodeURIComponent(
          sessionError.message,
        )}`,
      );
    }

    if (!session?.user) {
      console.error("No user in session");
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/error?error=${encodeURIComponent(
          "No user found in session",
        )}`,
      );
    }

    // Sync user data with our database
    try {
      await syncSupabaseUser(session.user);
    } catch (syncError) {
      console.error("User sync error:", syncError);
      // Continue with redirect even if sync fails - we can retry sync later
    }

    return NextResponse.redirect(requestUrl.origin);
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(
      `${requestUrl.origin}/auth/error?error=${encodeURIComponent(
        "An unexpected error occurred",
      )}`,
    );
  }
}
