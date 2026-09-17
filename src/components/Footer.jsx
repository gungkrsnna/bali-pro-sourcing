const WHATSAPP_NUMBERS = [
  { display: '+62 819-1638-0124', href: 'https://wa.me/6281916380124' },
  { display: '0878-6326-0506', href: 'https://wa.me/6287863260506' },
]

// The source catalogue only lists "@latelierabali.com" without a local part —
// update this once the real inbox address is confirmed.
const EMAIL = 'info@latelierabali.com'

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-sand/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-start md:justify-between md:px-10">
        <div>
          <img src="/images/logo.webp" alt="L'Atelier a Bali" className="h-9 w-auto" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
            Jl. Gn. Tangkuban Perahu No. 228, Kerobokan Kelod, Kec. Kuta
            Utara, Kabupaten Badung, Bali 80361
          </p>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-widest2 text-ink/40">Email</p>
            <a href={`mailto:${EMAIL}`} className="mt-1 inline-block text-ink/70 hover:text-clay">
              {EMAIL}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest2 text-ink/40">WhatsApp</p>
            <div className="mt-1 flex flex-col gap-0.5">
              {WHATSAPP_NUMBERS.map((n) => (
                <a key={n.href} href={n.href} target="_blank" rel="noreferrer" className="text-ink/70 hover:text-clay">
                  {n.display}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10 px-6 py-4 text-center text-xs text-ink/40 md:px-10 md:text-left">
        &copy; {new Date().getFullYear()} L&rsquo;Atelier a Bali. All rights reserved.
      </div>
    </footer>
  )
}
