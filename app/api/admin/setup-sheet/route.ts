import { NextRequest, NextResponse } from 'next/server'
import { initSheet } from '@/lib/google-sheets'
import { isAdminRequest } from '@/app/admin/auth-guard'

export async function POST(req: NextRequest) {
  if (!await isAdminRequest(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await initSheet()
    return NextResponse.json(result)
  } catch (err) {
    console.error('[setup-sheet]', err)
    return NextResponse.json({ ok: false, message: String(err) }, { status: 500 })
  }
}
