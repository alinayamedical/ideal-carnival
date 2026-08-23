'use client'

import { useState, useMemo } from 'react'
import { BookOpen, FileText, GraduationCap, Users, Briefcase, BarChart2, CheckCircle, AlertCircle, Info, FileEdit, FilePlus, Search, X } from 'lucide-react'
import { SetupSheetButton } from './setup-sheet-button'

type SectionDef = { id: string; title: string; element: React.ReactNode }

export function GuideContent() {
  const [query, setQuery] = useState('')

  const sections: SectionDef[] = useMemo(() => [
    {
      id: 'insights',
      title: 'Publishing an Insight Article',
      element: (
        <Section icon={FileText} title="Publishing an Insight Article">
          <Note type="info">Insights appear on the <strong>/insights</strong> page. They are thought-leadership articles on protocol, etiquette, and hospitality topics. Aim for 400–1200 words per article.</Note>
          <Steps steps={[
            { n: 1, title: 'Go to Insights → New Article', body: 'Click the gold "New Article" button in the top-right corner of the Insights list.' },
            { n: 2, title: 'Fill in the Title', body: 'Write the full article title. The URL slug is auto-generated — you can edit it in the Slug field. Slugs must be lowercase, hyphen-separated, no spaces (e.g. protocol-soft-power).' },
            { n: 3, title: 'Choose a Category', body: 'Select the most relevant category:\n• Diplomatic Protocol\n• Government Excellence\n• Executive Presence\n• Military Protocol\n• Hospitality Excellence\n• VIP Relations' },
            { n: 4, title: 'Write the Excerpt', body: 'The excerpt is the short preview shown on the insights listing page. Write 1–3 compelling sentences (50–120 words). This also serves as the SEO description.' },
            { n: 5, title: 'Write the Full Article', body: 'Paste or type the full article content. Plain paragraphs work best. The article appears on its own page when a reader clicks through.' },
            { n: 6, title: 'Set Read Time and Date', body: 'Enter the estimated read time (e.g. "6 min read") and the publication date.' },
            { n: 7, title: 'Featured toggle', body: 'Only one article should be Featured at a time. It appears prominently at the top of the Insights page. Unfeature the current one before featuring a new one.' },
            { n: 8, title: 'Publish', body: 'Toggle "Published" ON. Save Changes. The article appears on the website immediately.' },
          ]} />
          <Note type="warning">If Published is OFF the article is saved as a Draft and is invisible to website visitors. Use this to prepare articles in advance.</Note>
        </Section>
      ),
    },
    {
      id: 'programs',
      title: 'Adding a Training Programme',
      element: (
        <Section icon={GraduationCap} title="Adding a Training Programme">
          <Note type="info">Programmes appear on the <strong>/programs</strong> page. Each programme has a full detail page with outcomes, modules, and target audience.</Note>
          <Steps steps={[
            { n: 1, title: 'Go to Programmes → New Programme', body: 'Click the gold "New Programme" button.' },
            { n: 2, title: 'Fill in Title and Slug', body: 'Title is the full programme name (e.g. "Executive Dining & Table Protocol"). The slug auto-generates — verify it is clean and descriptive.' },
            { n: 3, title: 'Category, Industry, Level, Duration, Format', body: 'Category: thematic group (e.g. Protocol, Hospitality).\nIndustry: target sector (e.g. Government, Military).\nLevel: Foundation / Professional / Advanced / Executive.\nDuration: e.g. "2 days", "4 hours".\nFormat: In-Person / Hybrid / Residential.' },
            { n: 4, title: 'Summary', body: 'One paragraph (50–100 words) describing what the programme covers and who it is for.' },
            { n: 5, title: 'Outcomes', body: 'List learning outcomes, one per line. These appear as bullet points on the programme page.' },
            { n: 6, title: 'Modules', body: 'List the programme modules, one per line. These show the curriculum structure.' },
            { n: 7, title: 'Audience, Certification, Impact', body: 'Audience: who the programme is designed for.\nCertification: the credential awarded on completion.\nImpact: one sentence on the business/professional outcome.' },
            { n: 8, title: 'Publish', body: 'Toggle Published ON and Save.' },
          ]} />
        </Section>
      ),
    },
    {
      id: 'faculty',
      title: 'Managing Faculty Profiles',
      element: (
        <Section icon={Users} title="Managing Faculty Profiles">
          <Note type="info">Faculty profiles appear on the <strong>/faculty</strong> page. Only add confirmed faculty members — do not add placeholder or prospective staff.</Note>
          <Steps steps={[
            { n: 1, title: 'Go to Faculty → New Faculty Member', body: 'Click the gold button to create a new profile.' },
            { n: 2, title: 'Name and Title', body: 'Full name (e.g. "Dr. Saud bin Suleiman") and professional title (e.g. "Founder & Chairman").' },
            { n: 3, title: 'Bio', body: 'Write a professional biography (100–250 words). Focus on relevant expertise, career history, and contributions to the field.' },
            { n: 4, title: 'Specialisations', body: 'Enter areas of expertise, one per line. These appear as tags on the profile card.\nExample:\n• Diplomatic Protocol\n• State Ceremony\n• VIP Guest Management' },
            { n: 5, title: 'Credentials', body: 'List academic or professional credentials, one per line.\nExample:\n• PhD, University of Paris\n• Certified Protocol Professional (CPP)' },
            { n: 6, title: 'Photo', body: 'Paste the URL of a professional headshot. Upload the image to Cloudinary (cloudinary.com) and paste the public URL. Minimum 400×400px, square or portrait format.' },
            { n: 7, title: 'Sort Order', body: 'Lower numbers appear first. Use 1 for the most senior faculty member, 2 for the next, and so on.' },
            { n: 8, title: 'Save', body: 'Click Save. Faculty profiles have no draft mode — they are visible immediately after saving.' },
          ]} />
        </Section>
      ),
    },
    {
      id: 'case-studies',
      title: 'Publishing a Case Study',
      element: (
        <Section icon={Briefcase} title="Publishing a Case Study">
          <Note type="info">Case Studies appear on the <strong>/case-studies</strong> page. Only publish with explicit client permission.</Note>
          <Steps steps={[
            { n: 1, title: 'Go to Case Studies → New Case Study', body: 'Click the gold "New Case Study" button.' },
            { n: 2, title: 'Sector and Institution', body: 'Sector: client industry (e.g. "Government", "Luxury Hospitality").\nInstitution: client organisation name — only include if client has given permission. Otherwise use a generic descriptor (e.g. "GCC Government Ministry").' },
            { n: 3, title: 'Headline', body: 'A single compelling sentence that describes the engagement outcome.' },
            { n: 4, title: 'Challenge, Assessment, Strategy, Implementation, Transformation', body: 'Each field is a narrative section. Write 1–3 paragraphs per section. Tell the story from problem to result.' },
            { n: 5, title: 'Results', body: 'List measurable outcomes, one per line. Use specific numbers where possible.' },
            { n: 6, title: 'Impact', body: 'One paragraph summarising the broader significance of the engagement.' },
            { n: 7, title: 'Publish', body: 'Toggle Published ON. The case study appears on the website immediately.' },
          ]} />
        </Section>
      ),
    },
    {
      id: 'site-content',
      title: 'Editing Site Content (Page Text)',
      element: (
        <Section icon={FileEdit} title="Editing Site Content (Page Text)">
          <Note type="info">The <strong>Site Content</strong> editor lets you update static text across the entire website — hero headings, introductions, section copy, and more — without touching any code.</Note>
          <Steps steps={[
            { n: 1, title: 'Go to Site Content', body: 'Click "Site Content" in the left sidebar. The editor opens on a page selector.' },
            { n: 2, title: 'Select a page', body: 'Click a page tile (Home, About, Solutions, etc.) to open its editable fields.' },
            { n: 3, title: 'Edit a field', body: 'Click any field to start typing. Changes are saved field by field — click the tick (✓) or press Enter to save. The button turns green when saved.' },
            { n: 4, title: 'Switch to Arabic', body: 'Use the EN / AR toggle at the top to switch to Arabic editing. Fields with no Arabic content yet show a "→ AR" auto-translate button.' },
            { n: 5, title: 'Auto-translate', body: 'Click "→ AR" next to any English field to auto-translate it to Arabic. Review and adjust the translation before saving — auto-translation is a starting point, not final copy.' },
            { n: 6, title: 'Changes are live immediately', body: 'Saved changes appear on the website within a few seconds. You do not need to republish or redeploy.' },
          ]} />
          <Note type="warning">The Site Content editor updates copy only — layout, structure, colours, and navigation links still require the developer.</Note>
        </Section>
      ),
    },
    {
      id: 'custom-pages',
      title: 'Creating Custom Pages',
      element: (
        <Section icon={FilePlus} title="Creating Custom Pages">
          <Note type="info">The <strong>Pages</strong> section lets you create new standalone pages (e.g. a terms & conditions page, a special event page) that appear at <strong>/p/your-slug</strong>. You can optionally add them to the site navigation.</Note>
          <Steps steps={[
            { n: 1, title: 'Go to Pages → New Page', body: 'Click the gold "New Page" button.' },
            { n: 2, title: 'Set the Slug', body: 'The slug becomes the URL path. Use lowercase, hyphens only (e.g. "terms-and-conditions" → /p/terms-and-conditions). The slug cannot be changed after creation.' },
            { n: 3, title: 'Eyebrow and Title', body: 'Eyebrow: a short label above the title (optional, e.g. "Legal").\nTitle: the main page heading.' },
            { n: 4, title: 'Content', body: 'Write the page body text. Separate paragraphs with a blank line. Plain text only — no formatting or HTML.' },
            { n: 5, title: 'Arabic version', body: 'Fill in the Arabic fields (Title AR, Content AR). Use the "→ AR" auto-translate buttons as a starting point, then review.' },
            { n: 6, title: 'Show in Navigation (optional)', body: 'Tick "Show in Nav" if you want the page to appear in the website navigation. Fill in the Nav Label (EN and AR) — this is the text shown in the menu.' },
            { n: 7, title: 'Publish', body: 'Tick "Published" and click Create Page. The page is live immediately at /en/p/your-slug and /ar/p/your-slug.' },
          ]} />
          <Note type="warning">Unpublished pages are not accessible to visitors. Use this to draft pages before they are ready.</Note>
        </Section>
      ),
    },
    {
      id: 'dashboard',
      title: 'Viewing Enquiry Leads',
      element: (
        <Section icon={BarChart2} title="Viewing Enquiry Leads">
          <Steps steps={[
            { n: 1, title: 'Go to Dashboard', body: 'The Dashboard is the first page after login. It shows all enquiries submitted through the website contact form.' },
            { n: 2, title: 'Read the lead details', body: 'Each row shows: name, organisation, email, phone, enquiry type, country, and message. Click any row to expand the full message.' },
            { n: 3, title: 'Follow up', body: 'Reply to leads directly by emailing the enquirer. All leads are also automatically saved to the EHP Academy Google Sheet.' },
          ]} />
          <Note type="info">Leads are stored in the database and Google Sheet simultaneously. Share the Sheet with team members who need access.</Note>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-900 mb-1">Google Sheet Setup</p>
            <p className="text-xs text-gray-500 mb-4">Run this once to create the header row and apply EHP styling. Safe to re-run — it only reformats, never deletes data.</p>
            <SetupSheetButton />
          </div>
        </Section>
      ),
    },
  ], [])

  const q = query.toLowerCase().trim()
  const filtered = q ? sections.filter((s) => s.title.toLowerCase().includes(q)) : sections

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Management Guide</h1>
        <p className="mt-2 text-sm text-gray-500">Step-by-step instructions for the EHP Academy team. Keep this page bookmarked.</p>
      </div>

      {/* Quick nav cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {[
          { icon: BarChart2, label: 'Dashboard', desc: 'View enquiry leads', href: '/admin' },
          { icon: FileEdit, label: 'Site Content', desc: 'Edit page text', href: '/admin/content' },
          { icon: FilePlus, label: 'Pages', desc: 'Create standalone pages', href: '/admin/pages' },
          { icon: FileText, label: 'Insights', desc: 'Publish articles', href: '/admin/insights' },
          { icon: GraduationCap, label: 'Programmes', desc: 'Training programmes', href: '/admin/programs' },
          { icon: Users, label: 'Faculty', desc: 'Team profiles', href: '/admin/faculty' },
          { icon: Briefcase, label: 'Case Studies', desc: 'Success stories', href: '/admin/case-studies' },
        ].map(({ icon: Icon, label, desc, href }) => (
          <a key={href} href={href} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-[#B8995D] transition-colors">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fdf6ec]">
              <Icon className="h-4 w-4 text-[#B8995D]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </a>
        ))}
      </div>

      <hr className="border-gray-200" />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search guide sections…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 py-3 text-sm focus:border-[#B8995D] focus:ring-2 focus:ring-[#B8995D]/20 focus:outline-none shadow-sm"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Sections */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No sections match &ldquo;{query}&rdquo;</p>
      ) : (
        filtered.map((s, i) => (
          <div key={s.id}>
            {s.element}
            {i < filtered.length - 1 && <hr className="border-gray-200 mt-10" />}
          </div>
        ))
      )}

      <hr className="border-gray-200" />

      {/* What requires developer */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-bold text-amber-900">Changes that require the developer</h2>
            <p className="mt-1 text-xs text-amber-700 mb-3">The following changes cannot be made through this admin panel and require a code update:</p>
            <ul className="space-y-1 text-xs text-amber-800">
              {[
                'Navigation menu structure (adding or removing core nav items)',
                'Logo or brand colours',
                'Domain or email provider settings',
                'New section types or page layouts',
                'Third-party integrations (payment, booking, etc.)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-amber-700">Contact the development team at <strong>connect@revzion.in</strong> for any of the above.</p>
          </div>
        </div>
      </div>

      {/* Image guidelines */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-[#B8995D]" />
          Image Guidelines
        </h2>
        <ul className="space-y-2 text-xs text-gray-600">
          {[
            'Insights cover images: 16:9 ratio, minimum 1200×675px. Use high-quality professional photography.',
            'Faculty headshots: square or portrait, minimum 400×400px. Professional attire, neutral background preferred.',
            'Use Cloudinary (cloudinary.com) to get a public URL — free tier is sufficient.',
            'Avoid images with visible branding, watermarks, or identifiable clients without consent.',
            'All images must be licensed for commercial use or owned by EHP Academy.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-[#B8995D] shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fdf6ec] shrink-0">
          <Icon className="h-5 w-5 text-[#B8995D]" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Steps({ steps }: { steps: { n: number; title: string; body: string }[] }) {
  return (
    <ol className="space-y-4">
      {steps.map(({ n, title, body }) => (
        <li key={n} className="flex gap-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B8995D] text-xs font-bold text-white mt-0.5">{n}</div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500 whitespace-pre-line">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function Note({ type, children }: { type: 'info' | 'warning'; children: React.ReactNode }) {
  const styles = { info: 'bg-blue-50 border-blue-200 text-blue-800', warning: 'bg-amber-50 border-amber-200 text-amber-800' }
  return <div className={`rounded-lg border px-4 py-3 text-xs leading-relaxed ${styles[type]}`}>{children}</div>
}
