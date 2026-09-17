import { useEffect, useRef, useState } from 'react'
import ImageSlot from './ImageSlot'

const WHATSAPP_HREF = 'https://wa.me/6281916380124'

export default function Header() {
  const parallaxRef = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <header>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <img src="/images/logo.webp" alt="L'Atelier a Bali" className="h-9 w-auto md:h-11" />
        <div className="flex items-center gap-5 text-sm">
          <span className="hidden text-ink/50 sm:inline">Interior Design &amp; Furniture Export &middot; Since 2018</span>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-ink/30 px-4 py-1.5 text-xs uppercase tracking-widest2 text-ink transition hover:border-clay hover:text-clay"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="relative mx-6 h-[60vh] min-h-[380px] overflow-hidden rounded-sm md:mx-10 md:h-[70vh]">
        <div ref={parallaxRef} className="absolute -top-[15%] left-0 h-[130%] w-full will-change-transform">
          <ImageSlot
            path="/images/hero-cover.png"
            label="images/hero-cover.png"
            alt="Villa design by L'Atelier a Bali"
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
          <p
            className={`text-sm uppercase tracking-widest2 text-clay transition-all duration-700 ease-out ${
              shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            Portfolio
          </p>
          <h1
            className={`mt-2 max-w-2xl font-display text-4xl font-medium leading-tight text-paper transition-all delay-150 duration-700 ease-out md:text-6xl ${
              shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Interior design &amp; furniture projects, crafted in Bali.
          </h1>
          <p
            className={`mt-4 max-w-xl text-base leading-relaxed text-paper/80 transition-all delay-300 duration-700 ease-out ${
              shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            A collection of villas, residences, hospitality projects and
            furniture pieces designed and produced by L&rsquo;Atelier a Bali
            across Indonesia, France and beyond.
          </p>
        </div>
      </div>
    </header>
  )
}
