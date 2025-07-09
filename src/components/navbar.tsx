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
    <nav className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
      
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative flex items-center justify-between p-6 text-white">
        <Link
          ref={confessLinkRef}
          href="/"
          className="text-3xl font-bold text-white hover:text-pink-200 transition-colors duration-300"
          onMouseEnter={() => handleMouseEnter(confessLinkRef.current)}
          onMouseLeave={() => handleMouseLeave(confessLinkRef.current)}
        >
          Confess 💝
        </Link>

        <Link
          ref={githubButtonRef}
          target={'_blank'}
          href={'https://github.com/AureliusIvan/confess'}
          className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-full px-6 py-3 flex items-center gap-2 text-white font-medium"
          onMouseEnter={() => handleMouseEnter(githubButtonRef.current)}
          onMouseLeave={() => handleMouseLeave(githubButtonRef.current)}
        >
          <span>See on</span>
          <FaGithub className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
}