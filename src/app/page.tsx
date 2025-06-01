"use client"

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { gsap } from "gsap";

export default function Home() {
  /**
   * Declare state variables
   */
  const [hash, setHash] = React.useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const resultContainerRef = useRef<HTMLDivElement>(null);
  const previewLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.from(formRef.current, { opacity: 0, y: 50, duration: 1 });
    }
    if (textareaRef.current) {
      gsap.from(textareaRef.current, { opacity: 0, y: 50, duration: 1, delay: 0.2 });
    }
    if (buttonRef.current) {
      gsap.from(buttonRef.current, { opacity: 0, y: 50, duration: 1, delay: 0.4 });
    }
  }, []);

  useEffect(() => {
    if (hash && resultContainerRef.current) {
      // Initially hide the container to prepare for animation
      gsap.set(resultContainerRef.current, { opacity: 0 });
      gsap.from(resultContainerRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.2, // Add a small delay to ensure elements are mounted
      });
      // Make sure the container itself also fades in
      gsap.to(resultContainerRef.current, { opacity: 1, duration: 0.5 });
    }
  }, [hash]);

  const handleMouseEnter = (target: EventTarget | null) => {
    gsap.to(target, { scale: 1.05, duration: 0.3 });
  };

  const handleMouseLeave = (target: EventTarget | null) => {
    gsap.to(target, { scale: 1, duration: 0.3 });
  };

  /**
   * Handle form submission
   * @param e {React.FormEvent<HTMLFormElement>}
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const secret = formData.get('secret');
    const password = formData.get('password');

    try {
      const response = await fetch('/api/hash', {
        method: 'POST',
        body: JSON.stringify(
            {
              message: secret,
              password: password
            }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      const encoded = encodeURIComponent(data.hashed);
      setHash(encoded);
      form.reset();
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error.message,
      })
    }
  };

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-6">
        <form
            ref={formRef}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
        >
          {/*  upload string secret */}
          <div className="flex flex-col items-center justify-center gap-1">
            <label htmlFor="secret" className="text-2xl font-bold">
              Confess your secret 💖
            </label>
            <Textarea
                ref={textareaRef}
                name="secret"
                id="secret"
                placeholder={"Enter your secret"}
            />
          </div>

          {/*  submit button */}
          <Button
              ref={buttonRef}
              type="submit"
              className="bg-red-200 text-black p-4 rounded-lg mt-8"
              onMouseEnter={() => handleMouseEnter(buttonRef.current)}
              onMouseLeave={() => handleMouseLeave(buttonRef.current)}
          >
            Generate
          </Button>

          {/*  display hash */}
          {hash && (
              <div ref={resultContainerRef} className="result-container mt-8 flex flex-col max-w-full">
                <h2 className="text-2xl font-bold">Result</h2>
                <p
                    className={`font-bold text-blue-600 text-wrap break-all`}
                >
                  {process.env.NEXT_PUBLIC_SITE_URL + "/" + hash}
                </p>

                <Link
                  ref={previewLinkRef}
                  href={`/${hash}`}
                  className={buttonVariants({variant: "default"})}
                  onMouseEnter={() => handleMouseEnter(previewLinkRef.current)}
                  onMouseLeave={() => handleMouseLeave(previewLinkRef.current)}
                >
                  Preview
                </Link>
              </div>
          )}
        </form>
      </main>
  );
}
