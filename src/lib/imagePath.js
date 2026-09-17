// Product entries live in /public/images/products/, every other project lives
// in its own /public/images/projects/<slug>/ folder.
export function imageDir(project) {
  return project.category === 'Products' ? 'products' : `projects/${project.slug}`
}
