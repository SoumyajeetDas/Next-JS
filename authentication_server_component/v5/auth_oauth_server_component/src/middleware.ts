import NextAuth, { NextAuthConfig } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig as NextAuthConfig);

export async function middleware(request: NextRequest) {
  const session = await auth();

  const url = request.nextUrl;

  if (!session?.user) {
    if (
      url.pathname.startsWith('/register') ||
      url.pathname.startsWith('/') ||
      url.pathname.startsWith('/api')
    ) {
      // No need to do any processing go ahead
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (url.pathname.startsWith('/register')) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }
}

// When you don't give any matcher middleware will run for all request
// export const config = {
//   matcher: ['/register'],
// };
