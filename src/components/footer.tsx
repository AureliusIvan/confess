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
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1>
        <a
          ref={privacyLinkRef}
          href="/privacy-policy"
          className="text-2xl font-bold"
          onMouseEnter={() => handleMouseEnter(privacyLinkRef.current)}
          onMouseLeave={() => handleMouseLeave(privacyLinkRef.current)}
        >
          privacy policy
        </a>
      </h1>
    </nav>
  );
}