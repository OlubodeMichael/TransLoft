import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/dashboard', '/shipments', '/admin'];
const publicRoutes = ['/login', '/signup'];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Use correct cookie name
  const token = req.cookies.get('jwt')?.value;

  // Redirect logged-in users away from login/signup
  if (publicRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // Only enforce auth on protected routes
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Optional: restrict admin routes
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();

  } catch (err) {
    console.error('Auth error:', err.message);
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('jwt'); // ✅ delete correct cookie
    return response;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/shipments/:path*',
    '/admin/:path*',
    '/login',
    '/signup'
  ]
};
