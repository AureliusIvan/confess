"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (rootRef.current) {
      // Animate in
      gsap.fromTo(rootRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 }); // Added a slight delay
    }

    // Note: A fade-out animation is more complex with this basic setup.
    // It typically requires more advanced state management or router event handling
    // to delay unmounting the old page until the animation completes.
    // For this task, we are focusing on the fade-in of the new page.

  }, [pathname]); // Re-run animation when pathname changes

  return <div ref={rootRef}>{children}</div>;
}
