import { NextResponse, type NextRequest } from 'next/server';

const COOKIE_NAME = 'wayfind_admin';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname === '/admin/login') return NextResponse.next();
  const authed = req.cookies.get(COOKIE_NAME)?.value === '1';
  if (authed) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = '/admin/login';
  url.search = '';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};
