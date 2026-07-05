import { cookies } from 'next/headers';

const COOKIE_NAME = 'wayfind_admin';

export function isAdmin(): boolean {
  return cookies().get(COOKIE_NAME)?.value === '1';
}

export function setAdminCookie() {
  cookies().set(COOKIE_NAME, '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearAdminCookie() {
  cookies().delete(COOKIE_NAME);
}

export function checkToken(token: string): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  if (token.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return mismatch === 0;
}
