import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supbase/middleware';
import { createClient } from '@/lib/supbase/server';

export async function middleware(request: NextRequest) {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  console.log('In Middleware', user, request.nextUrl.pathname);
  if (
    !user &&
    request.nextUrl.pathname.startsWith('/dashboard') &&
    !request.nextUrl.pathname.startsWith('/login')
  ) {
    return Response.redirect(new URL('/login', request.url));
  }
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
