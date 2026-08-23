import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { makeSessionToken } from '@/app/admin/auth-guard'
import { checkRateLimit } from '@/lib/rate-limit'

const COOKIE = 'ehp-admin'
const MAX_AGE = 60 * 60 * 8

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!await checkRateLimit(`auth:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 })
  }

  const { password } = await req.json()
  const pw = process.env.ADMIN_PASSWORD
  if (!pw || !password || password !== pw) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = makeSessionToken(pw)
  const jar = await cookies()
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
    ...(process.env.NODE_ENV === 'production' && { domain: 'ehpacademy.com' }),
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const jar = await cookies()
  jar.delete(COOKIE)
  return NextResponse.json({ ok: true })
}
