import "./globals.css";

import React from "react";
import {Inter} from "next/font/google";
import {Toaster} from "@/components/ui/toaster";

import type {Metadata} from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Head from "next/head";

const inter = Inter({subsets: ["latin"]});

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
        <body className={inter.className}>
        <Toaster/>
        <main className={'relative min-h-screen'}>
          <Navbar/>
          <Image
              fetchPriority={'high'}
              priority={true}
              className={'absolute z-[-1]'}
              src={'/Flowers-Pattern.avif'}
              alt={'background'}
              fill
              objectFit={'cover'}
          />
          {children}
        </main>
        <Footer/>
        </body>
        </html>
      </>
  );
}
