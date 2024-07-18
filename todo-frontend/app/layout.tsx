import type { Metadata } from "next";
import "./globals.css";
import { poppins } from '@/ui/fonts';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "Todo App",
  description: "A Todo list web-app using Next.js and FastAPI with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className={`${poppins.className} antialiased relative overflow-hidden`}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}