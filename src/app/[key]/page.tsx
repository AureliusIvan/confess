"use server"

import React from "react";
import {decrypt} from "@/service/encrypt";

async function decryptMessage(key: string) {
  try {
    // parse params and convert %20 to space etc
    return await decrypt(decodeURIComponent(key));
  } catch (e: any) {
    return e.message;
  }
}

async function KeyPage({params}: { params: { key: string } }) {
  const decrypted = await decryptMessage(params.key);
  return (
      <section
          className={'bg-white m-5 p-6 text-center'}
      >
        <h1
            className={'text-bold'}
        >
          Someone want to confess to you about... 💖
        </h1>
        <p>
          &quot;{decrypted}&quot;
        </p>
      </section>
  )
}

export default KeyPage;