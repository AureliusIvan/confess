import React from "react";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {FaGithub} from "react-icons/fa";


export default function Navbar(): React.JSX.Element {
  return (
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <Link href="/" className="text-2xl font-bold">
          Confess 💝
        </Link>

        <Link
            target={'_blank'}
            href={'https://github.com/AureliusIvan/confess'}
            className={buttonVariants({variant: 'default', className: "flex gap-1"})}>

          <span>
            See on
          </span>
          <FaGithub/>
        </Link>
      </nav>
  );
}