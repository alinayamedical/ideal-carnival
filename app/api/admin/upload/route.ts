import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isAdminRequest } from '@/app/admin/auth-guard'

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'])

export async function POST(req: NextRequest) {
  if (!await isAdminRequest(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: 'File must be an image (JPEG, PNG, WebP, AVIF, GIF)' }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: 'File too large — maximum 5 MB' }, { status: 400 })

  const ext = file.name.split('.').pop() ?? 'jpg'
  const filename = `ehp/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const blob = await put(filename, file, { access: 'public' })
  return NextResponse.json({ url: blob.url })
}
