"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";

export default function Footer(): React.JSX.Element {
  const privacyLinkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (target: EventTarget | null) => {
    gsap.to(target, { color: "#FFC0CB", duration: 0.3 }); // Pink color for hover
  };

  const handleMouseLeave = (target: EventTarget | null) => {
    gsap.to(target, { color: "#FFFFFF", duration: 0.3 }); // White color (original)
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
      
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative flex items-center justify-center p-6 text-white">
        <a
          ref={privacyLinkRef}
          href="/privacy-policy"
          className="text-lg font-medium text-white hover:text-pink-200 transition-colors duration-300"
          onMouseEnter={() => handleMouseEnter(privacyLinkRef.current)}
          onMouseLeave={() => handleMouseLeave(privacyLinkRef.current)}
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}