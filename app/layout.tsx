import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

import local from "next/font/local";
import utc from "dayjs/plugin/utc";
import timezone from 'dayjs/plugin/timezone'
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Hong_Kong");

const dengxian = local({
  src: [
    {
      path: "../public/fonts/Dengl.otf",
      weight: "500",
    },
  ],
  variable: "--font-dengxian",
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
        <body className={`${dengxian.variable}`}>
          <Toaster />
          <Navbar />
          <main className="bg-slate-100">{children}</main>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
