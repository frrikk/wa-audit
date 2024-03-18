import type { Metadata } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const grotesk = Schibsted_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
