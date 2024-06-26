import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Environmental Awareness and Practices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  <body className={inter.className} style={{ backgroundColor: '#81AE9D', color: '#333' }}>
    {children}
  </body>
</html>

  );
}
