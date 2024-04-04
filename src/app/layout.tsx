import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageWrapper } from "@/widgets/page-wrapper/PageWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WYNNS UA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
