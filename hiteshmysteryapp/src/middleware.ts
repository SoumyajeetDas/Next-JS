import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
export { default } from 'next-auth/middleware';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log('middleware is called', request.nextUrl.pathname);

  // Gets the token from cookies or Authorization header
  const token = await getToken({ req: request });

  console.log('token', token);

  // Finding which url you are on
  const url = request.nextUrl;

  // If token is present this means user is authenticated. So user will be automatically redirected to dashboard
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

// See "Matching Paths" below to learn more
// :path* means any path after dashboard or verify
export const config = {
  matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*', '/verify/:path*'],
};
