"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { gsap } from "gsap";

export default function Navbar(): React.JSX.Element {
  const confessLinkRef = useRef<HTMLAnchorElement>(null);
  const githubButtonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (target: EventTarget | null) => {
    gsap.to(target, { scale: 1.05, duration: 0.3 });
  };

  const handleMouseLeave = (target: EventTarget | null) => {
    gsap.to(target, { scale: 1, duration: 0.3 });
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link
        ref={confessLinkRef}
        href="/"
        className="text-2xl font-bold"
        onMouseEnter={() => handleMouseEnter(confessLinkRef.current)}
        onMouseLeave={() => handleMouseLeave(confessLinkRef.current)}
      >
        Confess 💝
      </Link>

      <Link
        ref={githubButtonRef}
        target={'_blank'}
        href={'https://github.com/AureliusIvan/confess'}
        className={buttonVariants({ variant: 'default', className: "flex gap-1" })}
        onMouseEnter={() => handleMouseEnter(githubButtonRef.current)}
        onMouseLeave={() => handleMouseLeave(githubButtonRef.current)}
      >
        <span>See on</span>
        <FaGithub />
      </Link>
    </nav>
  );
}