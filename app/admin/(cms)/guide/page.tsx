import { requireAdmin } from '@/app/admin/auth-guard'
import { GuideContent } from './guide-content'

export default async function GuidePage() {
  await requireAdmin()
  return <GuideContent />
}
