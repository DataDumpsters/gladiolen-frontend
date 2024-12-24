import "./globals.css";
import "./../../public/fonts/gladiolen.css";
import React from "react";
import { AppProvider } from "@/app/providers/context";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`font-gladiolenrandmedium flex flex-col min-h-screen bg-gladiolenbg`}>
        <AppProvider>
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
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
