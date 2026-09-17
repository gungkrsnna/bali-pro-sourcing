import { useState } from 'react'
import { createPortal } from 'react-dom'
import { projects } from '../data/projects'

// Mobile-only jump-to-project index. Collapsed by default so it never
// crowds the page — a small floating trigger that opens a bottom sheet.
export default function ProjectNav() {
  const [open, setOpen] = useState(false)

  const goTo = (slug) => {
    setOpen(false)
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Jump to a project"
        className="fixed bottom-6 right-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-paper/95 text-ink shadow-lg backdrop-blur md:hidden"
      >
        <span className="text-lg leading-none">&#8801;</span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-end bg-ink/50 md:hidden"
            onClick={() => setOpen(false)}
          >
            <div
              className="max-h-[70vh] w-full overflow-y-auto rounded-t-2xl bg-paper pb-8 pt-4 shadow-2xl"
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
