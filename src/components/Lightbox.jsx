import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import ImageSlot from './ImageSlot'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const atStart = index === 0
  const atEnd = index === images.length - 1

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && !atStart) onPrev()
      if (e.key === 'ArrowRight' && !atEnd) onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext, atStart, atEnd])

  const current = images[index]
  if (!current) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 text-xl text-paper transition hover:border-clay hover:text-clay"
      >
        &times;
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (!atStart) onPrev()
            }}
            disabled={atStart}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 text-2xl text-paper transition hover:border-clay hover:text-clay disabled:opacity-30 disabled:hover:border-paper/30 disabled:hover:text-paper sm:left-6"
          >
            &#8249;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (!atEnd) onNext()
            }}
            disabled={atEnd}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 text-2xl text-paper transition hover:border-clay hover:text-clay disabled:opacity-30 disabled:hover:border-paper/30 disabled:hover:text-paper sm:right-6"
          >
            &#8250;
          </button>
        </>
      )}

      <div className="max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
        {current.type === 'video' ? (
          <video
            key={current.path}
            src={current.path}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] max-w-[90vw]"
          />
        ) : (
          <ImageSlot
            path={current.path}
            label={current.label}
            alt={current.alt}
            className="max-h-[85vh] max-w-[90vw]"
            imgClassName="!h-auto !w-auto !max-h-[85vh] !max-w-[90vw] !object-contain"
          />
        )}
      </div>

      {images.length > 1 && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest2 text-paper/60">
          {index + 1} / {images.length}
        </p>
      )}
    </div>,
    document.body,
  )
}
