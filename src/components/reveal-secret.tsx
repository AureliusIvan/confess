"use client"

import {useState} from "react";
import {Button} from "@/components/ui/button";

function RevealSecret({secret}: Readonly<{ secret: string }>) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  }
  return (
      <section>
        {
          revealed ? (
              <div
                  className={'bg-gray-100 p-4 rounded-lg'}
              >
                <p
                >
                  &quot;
                  {secret}
                  &quot;
                </p>
              </div>
          ) : (
              <div>
                <Button
                    className={'bg-purple-600 font-bold text-white'}
                    onClick={handleReveal}>
                  Reveal Secret ✨
                </Button>
              </div>
          )
        }
      </section>
  )
}

export {RevealSecret};