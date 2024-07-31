import {Poppins, Inter} from 'next/font/google'
import localFont from "next/font/local";

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ["400", "500", "600", "700"],
})

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export const paradose = localFont({
  src: './font/Ws-Paradose.ttf',
  display: 'swap',
})