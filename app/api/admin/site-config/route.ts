import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/app/admin/auth-guard'
import { db } from '@/lib/db'
import { siteConfig } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

async function auth(req: NextRequest) {
  if (!await isAdminRequest(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function GET(req: NextRequest) {
  const guard = await auth(req); if (guard) return guard
  const locale = req.nextUrl.searchParams.get('locale') ?? 'en'
  const rows = await db.select().from(siteConfig).where(eq(siteConfig.locale, locale))
  return NextResponse.json(rows)
}

export async function PUT(req: NextRequest) {
  const guard = await auth(req); if (guard) return guard
  const { key, locale, value } = await req.json() as { key: string; locale: string; value: string }
  if (!key || !locale) return NextResponse.json({ error: 'missing key/locale' }, { status: 400 })
  await db.execute(sql`
    INSERT INTO site_config (key, locale, value, label, section)
    VALUES (${key}, ${locale}, ${value}, '', '')
    ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value
  `)
  return NextResponse.json({ ok: true })
}
