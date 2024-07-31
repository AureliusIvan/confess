import React from "react";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function Navbar(): React.JSX.Element {
  return (
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <Link href="/" className="text-2xl font-bold">
          Confess 💝
        </Link>

        <Link
            target={'_blank'}
            href={'https://github.com/AureliusIvan/confess'}
            className={buttonVariants({variant: 'default'})}>
          see on github
        </Link>
      </nav>
  );
}