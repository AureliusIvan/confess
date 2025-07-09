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
      <div className="flex min-h-full flex-col items-center justify-center p-6 py-12">
        <div className="w-full max-w-2xl">
          <form
              ref={formRef}
              className="form-enhanced rounded-3xl p-8 shadow-2xl transform transition-all duration-300 hover:shadow-3xl"
              onSubmit={handleSubmit}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                Confess your secret 💖
              </h1>
              <p className="text-gray-600 text-lg">
                Share your thoughts privately and securely
              </p>
            </div>

            {/* Form content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="secret" className="block text-sm font-semibold text-gray-700">
                  Your Secret Message
                </label>
                <Textarea
                    ref={textareaRef}
                    name="secret"
                    id="secret"
                    placeholder="Enter your secret message here..."
                    className="min-h-[120px] resize-none border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base"
                    required
                />
              </div>

              {/* Submit button */}
              <button
                  ref={buttonRef}
                  type="submit"
                  className="w-full btn-gradient rounded-xl py-4 px-8 text-lg font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-200 hover:shadow-2xl"
                  onMouseEnter={() => handleMouseEnter(buttonRef.current)}
                  onMouseLeave={() => handleMouseLeave(buttonRef.current)}
              >
                Generate Secret Link ✨
              </button>
            </div>

            {/* Result section */}
            {hash && (
                <div ref={resultContainerRef} className="mt-8 p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl border-2 border-green-200 shadow-lg">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-green-800 text-center">
                      🎉 Success! Your secret link is ready
                    </h2>
                    
                    <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
                      <p className="text-sm text-gray-600 mb-2">Share this link:</p>
                      <p className="font-mono text-blue-600 text-wrap break-all bg-blue-50 p-3 rounded-lg border border-blue-200">
                        {process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/{hash}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        ref={previewLinkRef}
                        href={`/${hash}`}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-3 px-6 font-semibold text-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        onMouseEnter={() => handleMouseEnter(previewLinkRef.current)}
                        onMouseLeave={() => handleMouseLeave(previewLinkRef.current)}
                      >
                        Preview Secret 👁️
                      </Link>
                      
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${hash}`);
                          toast({ title: "Copied!", description: "Link copied to clipboard" });
                        }}
                        className="sm:w-auto w-full bg-white border-2 border-gray-300 text-gray-700 rounded-xl py-3 px-6 font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Copy 📋
                      </button>
                    </div>
                  </div>
                </div>
            )}
          </form>
        </div>
      </div>
  );
}
