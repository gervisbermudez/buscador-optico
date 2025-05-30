import React from "react";
import { GoogleSheetProvider } from "../context/GoogleSheetContext";
import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Buscador Productos Opticos</title>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            <GoogleSheetProvider>{children}</GoogleSheetProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
