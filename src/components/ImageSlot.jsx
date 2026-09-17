import { useState } from 'react'

// Renders an <img> from /public, falling back to a labeled placeholder when the
// file hasn't been dropped in yet. `path` is the public path, e.g. "/images/hero.jpg".
export default function ImageSlot({ path, alt = '', label, className = '', imgClassName = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 border border-dashed border-stone/40 bg-sand/60 text-center ${className}`}
      >
        <span className="text-[10px] uppercase tracking-widest2 text-stone">Image placeholder</span>
        <span className="px-3 font-mono text-[11px] text-stone/80 break-all">{label || path}</span>
      </div>
    )
  }

  return (
    <img
      src={path}
      alt={alt}
      draggable={false}
      onError={() => setFailed(true)}
      className={`${className} ${imgClassName} object-cover`}
      loading="lazy"
    />
  )
}
