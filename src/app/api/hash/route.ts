"use server"

import {NextResponse} from 'next/server'
import {hash} from "@/service/hash";
import {encrypt} from "@/service/encrypt";

export async function GET(request: Request) {
  const hashed = await hash('hello');
  // encrypted message
  return NextResponse.json({
    message: 'Hello',
    hashed: hashed
  })
}

// encrypted message
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const hashed_message = await encrypt(data.message);
    return NextResponse.json({
      hashed: hashed_message
    })
  } catch (e: any) {
    return NextResponse.json({error: e.message}, {status: 400})
  }
}