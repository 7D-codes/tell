import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Providers } from "~/components/providers";
import { Toaster } from "~/components/ui/toaster";
import "~/styles/globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tell - Anonymous Messaging",
  description: "Share your thoughts anonymously with the world.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${ibmPlexSansArabic.variable} font-sans antialiased`}>
        <Providers>
          <main className="relative min-h-screen">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
