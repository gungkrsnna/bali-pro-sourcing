import { useState } from 'react'
import { projects } from '../data/projects'
import { getGallery } from '../data/projectGallery'
import ImageSlot from './ImageSlot'
import Lightbox from './Lightbox'
import ProjectNav from './ProjectNav'

function mediaPath(slug, item) {
  return item.type === 'video' ? `/videos/${slug}/${item.file}` : `/images/projects/${slug}/${item.file}`
}

export default function PortfolioV2() {
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

      <footer className="px-6 py-10 text-xs uppercase tracking-widest2 text-ink/40 md:px-10">
        &copy; {new Date().getFullYear()} L&rsquo;Atelier a Bali
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
