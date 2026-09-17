import { useState } from 'react'
import { projects } from '../data/projects'
import { projectImages } from '../data/projectImages'
import ImageSlot from './ImageSlot'
import ProjectModal from './ProjectModal'

export default function Portfolio() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="py-4">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.slug}
              onClick={() => setSelected(project)}
              className="group text-left"
            >
              <div className="relative overflow-hidden rounded-sm">
                <ImageSlot
                  path={`/images/projects/${project.slug}/${projectImages[project.slug]?.[0] || '1.jpg'}`}
                  label={`images/projects/${project.slug}/1.jpg`}
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
                <span className="shrink-0 text-xs text-ink/40">{project.year}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
