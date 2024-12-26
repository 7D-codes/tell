import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/callback",
  "/auth/error",
];
const AUTH_ROUTES = ["/auth/sign-in", "/auth/sign-up"];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(request.nextUrl.pathname);

  // If the user is signed in and tries to access an auth route (like /sign-in),
  // redirect them to the home page
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is not signed in and tries to access a protected route,
  // redirect them to the sign-in page
  if (!session && !isPublicRoute) {
    const redirectUrl = request.nextUrl.pathname + request.nextUrl.search;
    const newUrl = new URL("/auth/sign-in", request.url);
    newUrl.searchParams.set("redirectUrl", redirectUrl);
    return NextResponse.redirect(newUrl);
  }

  // Update session
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
