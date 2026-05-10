import { Waves } from 'lucide-react'
import { memo } from 'react'

function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3 text-mist">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/10 shadow-sm backdrop-blur-sm">
            <Waves className="h-5 w-5 text-cyan-200" />
          </span>
          <span className="text-sm font-semibold tracking-[0.22em] text-white/80">ANGLING AI</span>
        </a>
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-white/70 shadow-sm backdrop-blur-sm sm:flex">
          Ontario waters
        </div>
      </nav>
    </header>
  )
}

export default memo(Navbar)
