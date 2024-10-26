import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// const { auth: authorize } = NextAuth(authConfig as NextAuthConfig);

// Remember Middleware only needs the session in the authconfig to work.
// Reference : https://www.youtube.com/watch?v=jHrjnZM26i4&list=PLIJrr73KDmRwz_7QUvQ9Az82aDM9I8L_8&index=18&t=1569s

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log('Token:', token);

  const url = request.nextUrl;

  if (!token) {
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
