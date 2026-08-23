import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

export async function checkRateLimit(key: string, max: number, windowMs: number): Promise<boolean> {
  const now = Date.now()
  const result = await db.execute(sql`
    INSERT INTO rate_limits (key, count, reset_at)
    VALUES (${key}, 1, ${now + windowMs})
    ON CONFLICT (key) DO UPDATE SET
      count = CASE
        WHEN rate_limits.reset_at <= ${now} THEN 1
        ELSE rate_limits.count + 1
      END,
      reset_at = CASE
        WHEN rate_limits.reset_at <= ${now} THEN ${now + windowMs}
        ELSE rate_limits.reset_at
      END
    RETURNING count
  `)
  const count = (result.rows[0] as { count: number }).count
  return count <= max
}
