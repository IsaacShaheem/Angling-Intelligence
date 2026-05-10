import { memo, useState } from 'react'
import { fallbackFishImage } from '../data/fishImages'

function FishCard({ name, image }) {
  const [imageSrc, setImageSrc] = useState(image || fallbackFishImage)

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-2 text-center shadow-sm shadow-black/10 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-cyan-100/25 hover:bg-white/[0.085]">
      <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#0b1c28]">
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={() => {
            if (imageSrc !== fallbackFishImage) {
              setImageSrc(fallbackFishImage)
            }
          }}
        />
      </div>
      <h5 className="px-3 py-4 text-base font-black text-white">{name}</h5>
    </article>
  )
}

export default memo(FishCard)
