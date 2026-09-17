import { useMemo, useState } from 'react'
import { CATEGORIES, projects } from '../data/projects'
import { projectImages } from '../data/projectImages'
import { imageDir } from '../lib/imagePath'
import ImageSlot from './ImageSlot'
import ProjectModal from './ProjectModal'

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory],
  )

  return (
    <section className="py-4">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest2 transition ${
                activeCategory === cat
                  ? 'border-ink bg-ink text-paper'
                  : 'border-ink/20 text-ink/60 hover:border-clay hover:text-clay'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const dir = imageDir(project)
            return (
              <button
                key={project.slug}
                onClick={() => setSelected(project)}
                className="group text-left"
              >
                <div className="relative overflow-hidden rounded-sm">
                  <ImageSlot
                    path={`/images/${dir}/${projectImages[project.slug]?.[0] || '1.jpg'}`}
                    label={`images/${dir}/1.jpg`}
                    alt={project.client}
                    className="aspect-[4/3] w-full transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-[10px] uppercase tracking-widest2 text-ink">
                    {project.tag}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink transition group-hover:text-clay">
                      {project.client}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-ink/50">{project.location}</p>
                  </div>
                  {project.year && <span className="shrink-0 text-xs text-ink/40">{project.year}</span>}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
