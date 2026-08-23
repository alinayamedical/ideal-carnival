import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import { isAdminRequestEdge } from './app/admin/auth-guard-edge'

const intlMiddleware = createMiddleware(routing)

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin')) {
    if (pathname !== '/admin/login' && !await isAdminRequestEdge(req.headers.get('cookie'))) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return NextResponse.next()
  }

  return intlMiddleware(req)
}

export const config = {
  // removed 'admin' from exclusion — admin routes now go through this middleware
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
}
