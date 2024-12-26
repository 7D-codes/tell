import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "~/components/providers";
import { Toaster } from "~/components/ui/toaster";
import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tell - Anonymous Messaging",
  description: "Share your thoughts anonymously with the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
