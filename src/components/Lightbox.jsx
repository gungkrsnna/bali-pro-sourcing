import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ImageSlot from './ImageSlot'

const ZOOM_SCALE = 2.2
const DRAG_THRESHOLD = 6

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const atStart = index === 0
  const atEnd = index === images.length - 1
  const [zoomed, setZoomed] = useState(false)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)

  const current = images[index]
  const isImage = current?.type !== 'video'

  useEffect(() => {
    setZoomed(false)
    setPan({ x: 0, y: 0 })
  }, [index])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (zoomed) setZoomed(false)
        else onClose()
      }
      if (e.key === 'ArrowLeft' && !atStart) onPrev()
      if (e.key === 'ArrowRight' && !atEnd) onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext, atStart, atEnd, zoomed])

  if (!current) return null

  function toggleZoom() {
    if (zoomed) {
      setZoomed(false)
      setPan({ x: 0, y: 0 })
    } else {
      setZoomed(true)
    }
  }

  function handlePointerDown(e) {
    if (!zoomed) return
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
      moved: false,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e) {
    const drag = dragRef.current
    if (!drag) return
    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) drag.moved = true
    setPan({ x: drag.startPanX + dx, y: drag.startPanY + dy })
  }

  function handlePointerUp(e) {
    dragRef.current = null
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  function handleImageClick(e) {
    e.stopPropagation()
    if (dragRef.current?.moved) return
    toggleZoom()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-ink/95 p-4 sm:p-10"
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
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 text-xl text-paper transition hover:border-clay hover:text-clay"
      >
        &times;
      </button>

      {isImage && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleZoom()
          }}
          aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
          className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 text-paper transition hover:border-clay hover:text-clay"
        >
          {zoomed ? (
            <span className="text-base leading-none">&minus;</span>
          ) : (
            <span className="text-base leading-none">+</span>
          )}
        </button>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (!atStart) onPrev()
            }}
            disabled={atStart}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 text-2xl text-paper transition hover:border-clay hover:text-clay disabled:opacity-30 disabled:hover:border-paper/30 disabled:hover:text-paper sm:left-6"
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
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 text-2xl text-paper transition hover:border-clay hover:text-clay disabled:opacity-30 disabled:hover:border-paper/30 disabled:hover:text-paper sm:right-6"
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
          <div
            onClick={handleImageClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              transform: zoomed ? `scale(${ZOOM_SCALE}) translate(${pan.x / ZOOM_SCALE}px, ${pan.y / ZOOM_SCALE}px)` : 'none',
              transition: dragRef.current ? 'none' : 'transform 200ms ease-out',
            }}
            className={zoomed ? 'cursor-grab touch-none active:cursor-grabbing' : 'cursor-zoom-in'}
          >
            <ImageSlot
              path={current.path}
              label={current.label}
              alt={current.alt}
              className="max-h-[85vh] max-w-[90vw]"
              imgClassName="!h-auto !w-auto !max-h-[85vh] !max-w-[90vw] !object-contain select-none"
            />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-widest2 text-paper/60">
          {index + 1} / {images.length}
        </p>
      )}
    </div>,
    document.body,
  )
}
