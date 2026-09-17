import { useEffect, useState } from 'react'
import { projectImages } from '../data/projectImages'
import ImageSlot from './ImageSlot'
import Lightbox from './Lightbox'

export default function ProjectModal({ project, onClose }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    setLightboxIndex(null)
  }, [project])

  useEffect(() => {
    if (!project) return

    const onKey = (e) => e.key === 'Escape' && lightboxIndex === null && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose, lightboxIndex])

  if (!project) return null

  const files = projectImages[project.slug] || []
  const lightboxImages = files.map((file, i) => ({
    path: `/images/projects/${project.slug}/${file}`,
    label: `images/projects/${project.slug}/${file}`,
    alt: `${project.client} photo ${i + 1}`,
  }))

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/70 px-4 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-sm bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink/10 p-6 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-widest2 text-clay">
              {project.year ? `${project.tag} · ${project.year}` : project.tag}
            </p>
            <h3 className="mt-2 font-display text-3xl font-medium text-ink md:text-4xl">{project.client}</h3>
            <p className="mt-1 text-sm text-ink/50">{project.location}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:border-clay hover:text-clay"
          >
            &times;
          </button>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-base leading-relaxed text-ink/70">{project.description}</p>
          {project.highlight && (
            <p className="mt-4 border-l-2 border-clay pl-4 text-sm italic leading-relaxed text-ink/60">
              {project.highlight}
            </p>
          )}

          {project.rooms?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.rooms.map((room) => (
                <span
                  key={room}
                  className="rounded-full bg-sand px-3 py-1 text-xs uppercase tracking-wide text-ink/60"
                >
                  {room}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {files.map((file, i) => (
              <button
                key={file}
                onClick={() => setLightboxIndex(i)}
                className="group overflow-hidden rounded-sm"
                aria-label={`Open photo ${i + 1} full size`}
              >
                <ImageSlot
                  path={`/images/projects/${project.slug}/${file}`}
                  label={`images/projects/${project.slug}/${file}`}
                  alt={`${project.client} photo ${i + 1}`}
                  className="aspect-square w-full transition duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + files.length) % files.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % files.length)}
        />
      )}
    </div>
  )
}
