import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";
import Menu from "@/components/ui/menu";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "eldom — portfolio",
  description: "Personal portfolio",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        {children}
        <Menu />
      </body>
    </html>
  );
}
