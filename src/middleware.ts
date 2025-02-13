import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/lib/i18n/routing';
import { auth } from '@/lib/auth';
import { getToken } from '@auth/core/jwt';
import { logout } from '@/actions/auth';

const withIntl = createMiddleware(routing);
const withAuth = auth((request) => withIntl(request));

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const baseUrl = request.nextUrl.origin;

  // Logout if refresh token is expired
  if (token && Date.now() >= token.data.validity.refreshUntil * 1000) {
    const response = NextResponse.redirect(`${baseUrl}/login`);
    await logout();
    return response;
  }

  return withAuth(request, {});
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
