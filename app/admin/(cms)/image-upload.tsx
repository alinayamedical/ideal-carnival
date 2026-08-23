'use client'

import { useRef, useState } from 'react'
import { Upload, X, Loader2, Link } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  aspect?: 'square' | 'video'
  label?: string
}

export function ImageUpload({ value, onChange, aspect = 'video', label = 'Image' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlDraft, setUrlDraft] = useState('')

  async function handleFile(file: File) {
    setError('')
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const json = await res.json() as { url?: string; error?: string }
      if (!res.ok || !json.url) { setError(json.error ?? 'Upload failed'); return }
      onChange(json.url)
    } catch {
      setError('Upload failed — check your connection')
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function applyUrl() {
    const trimmed = urlDraft.trim()
    if (trimmed) onChange(trimmed)
    setShowUrlInput(false)
    setUrlDraft('')
  }

  const aspectClass = aspect === 'square' ? 'aspect-square' : 'aspect-video'

  return (
    <div className="space-y-2">
      <p className="block text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-gray-200">
          <img
            src={value}
            alt="Preview"
            className={`w-full object-cover ${aspectClass}`}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow hover:bg-gray-50"
            >
              {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow hover:bg-red-50"
            >
              <X className="h-3 w-3" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center hover:border-[#B8995D] hover:bg-[#fdf6ec] transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-[#B8995D]" />
          ) : (
            <Upload className="h-6 w-6 text-gray-400" />
          )}
          <div>
            <p className="text-sm font-medium text-gray-700">{uploading ? 'Uploading…' : 'Click or drag to upload'}</p>
            <p className="text-xs text-gray-400 mt-0.5">JPEG, PNG, WebP, AVIF — max 5 MB</p>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="sr-only"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }}
      />

      {/* Paste URL fallback */}
      {!showUrlInput ? (
        <button
          type="button"
          onClick={() => { setShowUrlInput(true); setUrlDraft(value) }}
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Link className="h-3 w-3" /> Paste URL instead
        </button>
      ) : (
        <div className="flex gap-2">
          <input
            autoFocus
            type="url"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); applyUrl() } if (e.key === 'Escape') { setShowUrlInput(false) } }}
            placeholder="https://…"
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-[#B8995D] focus:outline-none"
          />
          <button type="button" onClick={applyUrl} className="rounded-lg bg-[#B8995D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#a0844f]">Apply</button>
          <button type="button" onClick={() => setShowUrlInput(false)} className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:bg-gray-50">Cancel</button>
        </div>
      )}
    </div>
  )
}
