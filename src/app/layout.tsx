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
        <main className={'relative min-h-screen'}>
          <Navbar/>
          <Image
              className={'absolute z-[-1] object-cover'}
              fetchPriority={'high'}
              priority={true}
              src={'/Flowers-Pattern.avif'}
              alt={'background'}
              fill
          />
          {children}
        </main>
        <Footer/>
        </body>
        </html>
      </>
  );
}
