"use client"

import "./globals.css";
import AuthProvider from "@/context/AuthProvider"
/*
export const metadata = {
  title: "Transloft - Modern Logistics Solutions",
  description: "Revolutionizing freight and cargo management with smart solutions",
};
*/
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className='bg-white min-h-screen'>
        {children}
      </body>
      </AuthProvider>
    </html>
  );
}
