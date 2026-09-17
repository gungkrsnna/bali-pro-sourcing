import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { projects } from '../data/projects'

const TRANSITION_MS = 220

// Jump-to-project index, available on every screen size. Collapsed by
// default so it never crowds the page — a small floating trigger that
// opens a bottom sheet (a floating corner card on larger screens).
export default function ProjectNav() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const raf = requestAnimationFrame(() => setEntered(true))
      return () => cancelAnimationFrame(raf)
    }

    setEntered(false)
    const timeout = setTimeout(() => setMounted(false), TRANSITION_MS)
    return () => clearTimeout(timeout)
  }, [open])

  const goTo = (slug) => {
    setOpen(false)
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close project list' : 'Jump to a project'}
        className="fixed bottom-6 right-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-paper/95 text-ink shadow-lg backdrop-blur transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <span
          className={`text-lg leading-none transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}
        >
          &#8801;
        </span>
      </button>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[80] flex items-end justify-center transition-colors duration-200 md:items-end md:justify-end md:bg-transparent md:p-6 ${
              entered ? 'bg-ink/50' : 'bg-ink/0'
            }`}
            onClick={() => setOpen(false)}
          >
            <div
              className={`max-h-[70vh] w-full overflow-y-auto rounded-t-2xl bg-paper pb-8 pt-4 shadow-2xl transition-all duration-200 ease-out [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mb-20 md:w-80 md:rounded-2xl ${
                entered
                  ? 'translate-y-0 opacity-100 md:scale-100'
                  : 'translate-y-6 opacity-0 md:translate-y-3 md:scale-95'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 pb-3">
                <p className="text-xs uppercase tracking-widest2 text-ink/40">Jump to project</p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink"
                >
                  &times;
                </button>
              </div>
              <ul className="divide-y divide-ink/10 border-t border-ink/10">
                {projects.map((project, i) => (
                  <li key={project.slug}>
                    <button
                      onClick={() => goTo(project.slug)}
                      className="flex w-full items-baseline gap-4 px-6 py-3 text-left"
                    >
                      <span className="font-mono text-xs text-ink/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-body text-base font-medium uppercase tracking-tight text-ink">
                        {project.client}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
