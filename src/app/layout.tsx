import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";

// Load Google Font
const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gladiolenbg`}>
        <header className="header flex-none">
          {/*<div className="container mx-auto text-center">*/}
          {/*    <h1>Gladiolen</h1>*/}
          {/*</div>*/}
        </header>
        <main className="flex-grow flex items-center justify-center">
          {children}
        </main>
        <footer className="footer flex-none w-full text-right pr-2">
          <p>&copy; 2024 GladiolenRegister - Data Dumpsters</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
