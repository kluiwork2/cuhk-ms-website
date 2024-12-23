import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

import local from "next/font/local";

const notasanstc = local({
  src: [
    {
      path: "../public/fonts/NotoSansTC-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-notasanstc",
});

export const metadata: Metadata = {
  title: "代謝症候群",
  description: "代謝症候群",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${notasanstc.variable}`}>
          <Toaster />
          <Navbar />
          <main className="bg-slate-100">{children}</main>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
