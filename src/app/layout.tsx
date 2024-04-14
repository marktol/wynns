import type { Metadata } from "next";
import { PageWrapper } from "@/widgets/page-wrapper/PageWrapper";
import { Comfortaa } from "next/font/google";

const font = Comfortaa({ subsets: ["cyrillic"] });

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
      <body className={font.className}>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
