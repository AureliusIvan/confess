"use client"

import React from "react";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "@/components/ui/use-toast";

export default function Home() {
  /**
   * Declare state variables
   */
  const [hash, setHash] = React.useState<string | null>(null);

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
            className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
        >
          {/*  upload string secret */}
          <div className="flex flex-col items-center justify-center gap-1">
            <label htmlFor="secret" className="text-2xl font-bold">
              Confess your secret 💖
            </label>
            <Textarea
                name="secret"
                id="secret"
                placeholder={"Enter your secret"}
            />
          </div>

          {/*  submit button */}
          <Button
              type="submit"
              className="bg-red-200 text-black p-4 rounded-lg mt-8"
          >
            Generate
          </Button>

          {/*  display hash */}
          {hash && (
              <div className="mt-8 flex flex-col max-w-full">
                <h2 className="text-2xl font-bold">Result</h2>
                <p
                    className={`font-bold text-blue-600 text-wrap break-all`}
                >
                  {process.env.NEXT_PUBLIC_SITE_URL + "/" + hash}
                </p>

                <Link href={`/${hash}`} className={buttonVariants({variant: "default"})}>
                  Preview
                </Link>
              </div>
          )}
        </form>
      </main>
  );
}
