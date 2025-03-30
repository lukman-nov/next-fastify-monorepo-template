import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { AUTH_COOKIE } from '@zx/auth/config';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const auth = cookieStore.get(`${AUTH_COOKIE.PREFIX}.session_token`);

  if (!auth && !pathname.includes('auth')) {
    const newUrl = new URL(`/auth/sign-in`, request.nextUrl.origin);
    return NextResponse.redirect(new URL(newUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|static|assets|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
