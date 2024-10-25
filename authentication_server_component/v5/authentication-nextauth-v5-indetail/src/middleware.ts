import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

// Add optional Middleware to keep the session alive, this will update the session expiry every time its called.
// Currently middleware.ts is buggy with next-auth beta v5 and Prima Edge runtime
// export { auth as middleware } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    // Whatever you give in callback that is where it gets redirected after logging in.
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${request.nextUrl}`, request.url),
    );

    // Adding callback is not necessary when using custom signIn Page. Because callback concept does not works with custom solution
    // return NextResponse.redirect(new URL(`/signin`, request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/user/:path*'],
};
