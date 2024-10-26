import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { withAuth } from 'next-auth/middleware';

// const { auth: authorize } = NextAuth(authConfig as NextAuthConfig);

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   console.log('Token:', token);

//   const url = request.nextUrl;

//   if (!token) {
//     if (
//       url.pathname.startsWith('/register') ||
//       url.pathname.startsWith('/') ||
//       url.pathname.startsWith('/api')
//     ) {
//       // No need to do any processing go ahead
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   } else {
//     if (url.pathname.startsWith('/register')) {
//       return NextResponse.redirect(new URL('/home', request.url));
//     }
//   }
// }

// The above middleware part can be written in this way as well
export default withAuth(
  async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const token = await getToken({ req });
    if (url.pathname.startsWith('/register') && token) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const url = req.nextUrl;

        // console.log('Token:', token);
        // console.log('URL:', url.pathname);

        if (url.pathname.startsWith('/register') && !token) {
          return !token;
        } else {
          return !!token;
        }
      },
    },
  },
);

// When you don't give any matcher middleware will run for all request
export const config = {
  matcher: ['/register'],
};
