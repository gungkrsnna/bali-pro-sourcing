export default function VersionToggle({ version, onChange }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 gap-1 rounded-full border border-ink/15 bg-paper/95 p-1 shadow-lg backdrop-blur">
      {[1, 2].map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest2 transition ${
            version === v ? 'bg-ink text-paper' : 'text-ink/60 hover:text-clay'
          }`}
        >
          Version {v}
        </button>
      ))}
    </div>
  )
}
