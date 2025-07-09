import "./globals.css";

import React from "react";
import {Inter} from "next/font/google";
import {Toaster} from "@/components/ui/toaster";

import type {Metadata} from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import {paradose, poppins} from "@/app/fonts";


export const metadata: Metadata = {
  title: "Confess",
  description: "Say something privately",
};

export default function RootLayout(
    {
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>
) {
  return (
      <>
        <html lang="en">
        <body className={poppins.className}>
        <Toaster/>
        <div className="flex flex-col min-h-screen">
          <Navbar/>
          <main className="flex-1 relative">
            <Image
                className="absolute inset-0 z-[-1] object-cover"
                fetchPriority="high"
                priority={true}
                src="/Flowers-Pattern.avif"
                alt="background"
                fill
            />
            <div className="relative z-10">
              {children}
            </div>
          </main>
          <Footer/>
        </div>
        </body>
        </html>
      </>
  );
}
