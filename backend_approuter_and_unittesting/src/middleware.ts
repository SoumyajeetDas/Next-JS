import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware } from './middlewares/api/authMiddleware';
import { logMiddleware } from './middlewares/api/logMiddleware';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/blogs')) {
    const logResult = logMiddleware(request);
    console.log('Logging ::', logResult.response);
  }
  const { isValid } = authMiddleware(request);

  if (!isValid && request.nextUrl.pathname.startsWith('/api/blogs')) {
    return NextResponse.json(
      { message: 'Unauthorized. You need to pass the bearer token' },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/:path*'],
};
