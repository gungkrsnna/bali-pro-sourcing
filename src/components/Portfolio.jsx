import { useState } from 'react'
import { projects } from '../data/projects'
import { getGallery } from '../data/projectGallery'
import ImageSlot from './ImageSlot'
import Lightbox from './Lightbox'
import ProjectNav from './ProjectNav'

function mediaPath(slug, item) {
  return item.type === 'video' ? `/videos/${slug}/${item.file}` : `/images/projects/${slug}/${item.file}`
}

export default function Portfolio() {
  const [lightbox, setLightbox] = useState(null) // { slug, index } | null

  const lightboxGallery = lightbox ? getGallery(lightbox.slug) : []
  const lightboxItems = lightboxGallery.map((item, i) => ({
    type: item.type,
    path: mediaPath(lightbox?.slug, item),
    label: mediaPath(lightbox?.slug, item),
    alt: `${item.type} ${i + 1}`,
  }))

  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between border-b border-ink/10 px-6 py-6 md:px-10">
        <img src="/images/logo.webp" alt="L'Atelier a Bali" className="h-8 w-auto" />
        <p className="text-xs uppercase tracking-widest2 text-ink/40">
          PT. Bali Pro Sourcing Import Export
        </p>
      </header>

      <div className="border-b border-ink/10 px-6 py-14 md:px-10 md:py-20">
        <h1 className="max-w-4xl font-body text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
          Interior design &amp; furniture, crafted in Bali.
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-ink/50 md:max-w-md">
          A collection of villas, residences, hospitality projects and
          furniture pieces designed and produced by L&rsquo;Atelier a Bali
          across Indonesia, France and beyond.
        </p>
      </div>

      <main>
        {projects.map((project, i) => {
          const gallery = getGallery(project.slug)
          const [hero, ...galleryRest] = gallery
          const flipped = i % 2 === 1

          return (
            <section
              key={project.slug}
              id={project.slug}
              className="relative overflow-hidden border-b border-ink/10 px-6 py-16 md:px-10 md:py-24"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 select-none font-body text-[7rem] font-bold leading-none text-ink/[0.04] md:-top-10 md:text-[13rem]"
                style={flipped ? { right: '1rem' } : { left: '1rem' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative">
                <div
                  className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
                    flipped ? 'md:flex-row-reverse md:text-right' : ''
                  }`}
                >
                  <div>
                    <p className="text-xs uppercase tracking-widest2 text-clay">
                      {project.tag}
                    </p>
                    <h2 className="mt-3 font-body text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink md:text-5xl">
                      {project.client}
                    </h2>
                    <p className="mt-3 text-xs uppercase tracking-widest2 text-ink/40">
                      {project.location}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-ink/60 md:max-w-sm">
                    {project.description}
                  </p>
                </div>

                {hero && (
                  <button
                    onClick={() => setLightbox({ slug: project.slug, index: 0 })}
                    className="group mt-10 block w-full overflow-hidden md:mt-14"
                    aria-label={`Open ${project.client} photo 1 full size`}
                  >
                    <ImageSlot
                      path={mediaPath(project.slug, hero)}
                      label={mediaPath(project.slug, hero)}
                      alt={project.client}
                      className="aspect-[16/9] w-full transition duration-500 group-hover:scale-[1.02]"
                    />
                  </button>
                )}

                {galleryRest.length > 0 && (
                  <div className="mt-3 columns-2 gap-3 md:columns-3 lg:columns-4">
                    {galleryRest.map((item, idx) => {
                      const galleryIndex = idx + 1 // the hero already used index 0
                      if (item.type === 'video') {
                        return (
                          <button
                            key={item.file}
                            onClick={() => setLightbox({ slug: project.slug, index: galleryIndex })}
                            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden"
                            aria-label={`Play ${project.client} video`}
                          >
                            <video
                              src={mediaPath(project.slug, item)}
                              muted
                              preload="metadata"
                              className="aspect-video w-full object-cover"
                            />
                            <span className="absolute inset-0 flex items-center justify-center bg-ink/10 transition group-hover:bg-ink/25">
                              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/90 shadow-md transition group-hover:scale-105">
                                <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-ink" />
                              </span>
                            </span>
                          </button>
                        )
                      }
                      return (
                        <button
                          key={item.file}
                          onClick={() => setLightbox({ slug: project.slug, index: galleryIndex })}
                          className="group mb-3 block w-full overflow-hidden break-inside-avoid"
                          aria-label={`Open ${project.client} photo ${galleryIndex + 1} full size`}
                        >
                          <ImageSlot
                            path={mediaPath(project.slug, item)}
                            label={mediaPath(project.slug, item)}
                            alt={project.client}
                            className="w-full transition duration-500 group-hover:scale-105"
                          />
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </main>

      <footer className="bg-ink px-6 py-14 text-paper md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-widest2 text-clay">Contact Info</p>

          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            <div className="flex gap-3">
              <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-clay">
                <path
                  d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p className="text-sm leading-relaxed text-paper/80">
                Jl. Gn. Tangkuban Perahu No. 228, Kerobokan Kelod, Kec. Kuta
                Utara, Kabupaten Badung, Bali 80361
              </p>
            </div>

            <a
              href="mailto:contact@latelierabali.com"
              className="flex h-fit items-center gap-3 text-sm text-paper/80 transition hover:text-clay"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-clay">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              contact@latelierabali.com
            </a>

            <a
              href="https://wa.me/6287863260506"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 text-sm text-paper/80 transition hover:text-clay"
            >
              <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-clay">
                <path
                  d="M6.5 4h1.6c.4 0 .8.3.9.7l1 3a1 1 0 0 1-.3 1L8 10.3a10 10 0 0 0 5.7 5.7l1.6-1.7a1 1 0 0 1 1-.3l3 1c.4.1.7.5.7.9v1.6c0 1-.9 1.8-1.9 1.6C11.6 18.4 5.6 12.4 4.9 5.9 4.7 4.9 5.5 4 6.5 4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              +62 878-6326-0506
            </a>
          </div>

          <p className="mt-12 text-xs uppercase tracking-widest2 text-paper/30">
            &copy; {new Date().getFullYear()} L&rsquo;Atelier a Bali
          </p>
        </div>
      </footer>

      {lightbox && (
        <Lightbox
          images={lightboxItems}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onPrev={() =>
            setLightbox((lb) => ({ ...lb, index: Math.max(0, lb.index - 1) }))
          }
          onNext={() =>
            setLightbox((lb) => ({
              ...lb,
              index: Math.min(lightboxItems.length - 1, lb.index + 1),
            }))
          }
        />
      )}

      <ProjectNav />
    </div>
  )
}
