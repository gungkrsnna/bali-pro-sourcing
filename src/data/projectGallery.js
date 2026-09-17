import { projectImages } from './projectImages'

// Explicit image/video order for projects whose source catalogue slides
// interleaved video walkthroughs between photos. Reconstructed from the
// original PPTX slide sequence (slides 4–11 for Le Casamore).
const CUSTOM_ORDER = {
  'le-casamore-corsica': [
    { type: 'image', file: '1.jpeg' },
    { type: 'video', file: '3.mp4' },
    { type: 'image', file: '2.jpeg' },
    { type: 'image', file: '3.jpeg' },
    { type: 'image', file: '4.jpeg' },
    { type: 'image', file: '5.jpeg' },
    { type: 'video', file: '2.mp4' },
    { type: 'image', file: '6.jpeg' },
    { type: 'image', file: '7.jpeg' },
    { type: 'image', file: '8.jpeg' },
    { type: 'video', file: '4.mp4' },
    { type: 'image', file: '9.jpeg' },
    { type: 'image', file: '10.jpeg' },
    { type: 'image', file: '11.jpeg' },
    { type: 'video', file: '1.mp4' },
  ],
}

// Every project's photo-and-video gallery, in display order. Falls back to
// a plain image-only list (matching projectImages) for projects with no
// custom order defined.
export function getGallery(slug) {
  return CUSTOM_ORDER[slug] || (projectImages[slug] || []).map((file) => ({ type: 'image', file }))
}
