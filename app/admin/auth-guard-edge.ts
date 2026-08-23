// Edge Runtime compatible — uses Web Crypto API only, no Node.js crypto imports
export async function isAdminRequestEdge(cookieHeader: string | null): Promise<boolean> {
  if (!cookieHeader || !process.env.ADMIN_PASSWORD) return false
  const match = cookieHeader.match(/ehp-admin=([^;]+)/)
  if (!match) return false
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(process.env.ADMIN_PASSWORD),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    )
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode('ehp-admin-session-v1'))
    const expected = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
    const actual = match[1]
    if (actual.length !== expected.length) return false
    let diff = 0
    for (let i = 0; i < actual.length; i++) diff |= actual.charCodeAt(i) ^ expected.charCodeAt(i)
    return diff === 0
  } catch {
    return false
  }
}
