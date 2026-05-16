import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect sensitive API routes (POST, PUT, DELETE)
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/login')) {
    const method = request.method;
    const isPublicGet = method === 'GET';

    if (!isPublicGet) {
      const token = request.cookies.get('token')?.value;
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
