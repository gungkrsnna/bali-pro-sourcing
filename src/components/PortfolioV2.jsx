import { useState } from 'react'
import { projects } from '../data/projects'
import { projectImages } from '../data/projectImages'
import ImageSlot from './ImageSlot'
import Lightbox from './Lightbox'
import ProjectNav from './ProjectNav'

// Repeating column-span / aspect-ratio rhythm for the mosaic grid below each
// hero image, so the grid never falls into a flat, uniform pattern.
// The grid is 2 columns on mobile and 6 columns from `md` up, so every span
// pair below is mobile-span first, desktop-span second — never spans more
// columns than the mobile grid actually has (that mismatch was rendering
// tiny, squashed images on small screens).
const MOSAIC_PATTERN = [
  { span: 'col-span-2 md:col-span-4', aspect: 'aspect-[4/3]' },
  { span: 'col-span-1 md:col-span-2', aspect: 'aspect-[3/4]' },
  { span: 'col-span-1 md:col-span-2', aspect: 'aspect-[3/4]' },
  { span: 'col-span-1 md:col-span-2', aspect: 'aspect-square' },
  { span: 'col-span-1 md:col-span-2', aspect: 'aspect-square' },
  { span: 'col-span-1 md:col-span-3', aspect: 'aspect-[4/3]' },
  { span: 'col-span-1 md:col-span-3', aspect: 'aspect-[4/3]' },
  { span: 'col-span-2 md:col-span-6', aspect: 'aspect-[21/9]' },
]

export default function PortfolioV2() {
  const [lightbox, setLightbox] = useState(null) // { slug, index } | null

  const lightboxFiles = lightbox ? projectImages[lightbox.slug] || [] : []
  const lightboxImages = lightboxFiles.map((file, i) => ({
    path: `/images/projects/${lightbox?.slug}/${file}`,
    label: `images/projects/${lightbox?.slug}/${file}`,
    alt: `photo ${i + 1}`,
  }))

  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between border-b border-ink/10 px-6 py-6 md:px-10">
        <img src="/images/logo.webp" alt="L'Atelier a Bali" className="h-8 w-auto" />
        <p className="text-xs uppercase tracking-widest2 text-ink/40">
          {projects.length} Projects
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
          const files = projectImages[project.slug] || []
          const [hero, ...rest] = files
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
                      {project.year ? ` · ${project.year}` : ''}
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
                      path={`/images/projects/${project.slug}/${hero}`}
                      label={`images/projects/${project.slug}/${hero}`}
                      alt={project.client}
                      className="aspect-[16/9] w-full transition duration-500 group-hover:scale-[1.02]"
                    />
                  </button>
                )}

                {rest.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-6">
                    {rest.map((file, idx) => {
                      const pattern = MOSAIC_PATTERN[idx % MOSAIC_PATTERN.length]
                      return (
                        <button
                          key={file}
                          onClick={() => setLightbox({ slug: project.slug, index: idx + 1 })}
                          className={`${pattern.span} group block overflow-hidden`}
                          aria-label={`Open ${project.client} photo ${idx + 2} full size`}
                        >
                          <ImageSlot
                            path={`/images/projects/${project.slug}/${file}`}
                            label={`images/projects/${project.slug}/${file}`}
                            alt={project.client}
                            className={`${pattern.aspect} w-full transition duration-500 group-hover:scale-105`}
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

      <footer className="px-6 py-10 text-xs uppercase tracking-widest2 text-ink/40 md:px-10">
        &copy; {new Date().getFullYear()} L&rsquo;Atelier a Bali
      </footer>

      {lightbox && (
        <Lightbox
          images={lightboxImages}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onPrev={() =>
            setLightbox((lb) => ({
              ...lb,
              index: (lb.index - 1 + lightboxFiles.length) % lightboxFiles.length,
            }))
          }
          onNext={() =>
            setLightbox((lb) => ({ ...lb, index: (lb.index + 1) % lightboxFiles.length }))
          }
        />
      )}

      <ProjectNav />
    </div>
  )
}
