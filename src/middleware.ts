import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url))
  // decrypt message from params
  // if (request.method === 'GET') {
  //   const { nextUrl: { search } } = request;
  //   const urlSearchParams = new URLSearchParams(search);
  //   const message = urlSearchParams.get('message');
  //   // redirect to [key]
  //   return
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}