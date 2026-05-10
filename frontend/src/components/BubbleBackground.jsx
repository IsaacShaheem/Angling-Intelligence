import { memo } from 'react'

const bubbles = [
  { layer: 'back', left: '8%', size: 12, duration: 38, delay: -20, drift: -14, opacity: 0.2 },
  { layer: 'back', left: '24%', size: 16, duration: 42, delay: -28, drift: -18, opacity: 0.18 },
  { layer: 'back', left: '44%', size: 11, duration: 40, delay: -32, drift: -10, opacity: 0.2 },
  { layer: 'back', left: '68%', size: 18, duration: 45, delay: -41, drift: 22, opacity: 0.18 },
  { layer: 'back', left: '88%', size: 14, duration: 43, delay: -34, drift: -24, opacity: 0.18 },
  { layer: 'mid', left: '6%', size: 30, duration: 26, delay: -2, drift: 26, opacity: 0.32 },
  { layer: 'mid', left: '21%', size: 22, duration: 23, delay: -9, drift: 18, opacity: 0.34 },
  { layer: 'mid', left: '38%', size: 34, duration: 29, delay: -14, drift: 22, opacity: 0.3 },
  { layer: 'mid', left: '63%', size: 29, duration: 25, delay: -3, drift: -30, opacity: 0.34 },
  { layer: 'mid', left: '82%', size: 38, duration: 32, delay: -21, drift: -28, opacity: 0.28 },
  { layer: 'front', left: '7%', size: 82, duration: 34, delay: -18, drift: 62, opacity: 0.24 },
  { layer: 'front', left: '36%', size: 66, duration: 28, delay: -13, drift: -54, opacity: 0.34 },
  { layer: 'front', left: '58%', size: 104, duration: 40, delay: -34, drift: 70, opacity: 0.2 },
  { layer: 'front', left: '79%', size: 78, duration: 33, delay: -20, drift: -64, opacity: 0.28 },
]

const fish = [
  { layer: 'back', top: '18%', size: 62, duration: 44, delay: -16, direction: 'right', opacity: 0.2 },
  { layer: 'mid', top: '32%', size: 94, duration: 31, delay: -9, direction: 'right', opacity: 0.3 },
  { layer: 'mid', top: '54%', size: 78, duration: 29, delay: -22, direction: 'left', opacity: 0.28 },
  { layer: 'front', top: '68%', size: 168, duration: 38, delay: -30, direction: 'right', opacity: 0.26 },
  { layer: 'front', top: '27%', size: 128, duration: 33, delay: -5, direction: 'left', opacity: 0.3 },
]

const schools = [
  { top: '21%', size: 36, count: 5, duration: 32, delay: -8, direction: 'right', opacity: 0.3 },
  { top: '42%', size: 32, count: 6, duration: 29, delay: -18, direction: 'left', opacity: 0.26 },
  { top: '62%', size: 42, count: 5, duration: 35, delay: -25, direction: 'right', opacity: 0.24 },
]

const weeds = [
  { left: '2%', height: 38, width: 22, delay: -3, duration: 9, opacity: 0.34 },
  { left: '13%', height: 52, width: 26, delay: -11, duration: 12, opacity: 0.27 },
  { left: '25%', height: 34, width: 18, delay: -8, duration: 9, opacity: 0.22 },
  { left: '73%', height: 36, width: 20, delay: -7, duration: 9, opacity: 0.3 },
  { left: '86%', height: 56, width: 28, delay: -6, duration: 13, opacity: 0.28 },
  { left: '96%', height: 30, width: 16, delay: -2, duration: 8, opacity: 0.28 },
]

function BubbleBackground() {
  return (
    <div className="bubble-field" aria-hidden="true">
      <span className="underwater-light underwater-light-a" />
      <span className="underwater-light underwater-light-b" />
      <div className="fish-layer">
        {schools.map((school, index) => (
          <span
            className={`fish-school fish-${school.direction}`}
            key={`${school.top}-${school.count}-${index}`}
            style={{
              '--school-top': school.top,
              '--school-size': `${school.size}px`,
              '--school-duration': `${school.duration}s`,
              '--school-delay': `${school.delay}s`,
              '--school-opacity': school.opacity,
            }}
          >
            {Array.from({ length: school.count }).map((_, fishIndex) => (
              <span
                className="school-fish"
                key={fishIndex}
                style={{
                  '--school-x': `${fishIndex * 34}px`,
                  '--school-y': `${(fishIndex % 3) * 12}px`,
                  '--school-scale': 0.78 + (fishIndex % 4) * 0.08,
                }}
              />
            ))}
          </span>
        ))}
        {fish.map((item, index) => (
          <span
            className={`fish-silhouette fish-${item.layer} fish-${item.direction}`}
            key={`${item.top}-${item.size}-${index}`}
            style={{
              '--fish-top': item.top,
              '--fish-size': `${item.size}px`,
              '--fish-duration': `${item.duration}s`,
              '--fish-delay': `${item.delay}s`,
              '--fish-opacity': item.opacity,
            }}
          >
            <span />
          </span>
        ))}
      </div>
      {bubbles.map((bubble, index) => (
        <span
          className={`bubble bubble-${bubble.layer}`}
          key={`${bubble.left}-${bubble.size}-${index}`}
          style={{
            '--bubble-left': bubble.left,
            '--bubble-size': `${bubble.size}px`,
            '--bubble-duration': `${bubble.duration}s`,
            '--bubble-delay': `${bubble.delay}s`,
            '--bubble-drift': `${bubble.drift}px`,
            '--bubble-drift-soft': `${bubble.drift * -0.28}px`,
            '--bubble-drift-end': `${bubble.drift * -0.62}px`,
            '--bubble-opacity': bubble.opacity,
          }}
        />
      ))}
      <div className="weed-bed">
        {weeds.map((weed, index) => (
          <span
            className="underwater-weed"
            key={`${weed.left}-${weed.height}-${index}`}
            style={{
              '--weed-left': weed.left,
              '--weed-height': `${weed.height}vh`,
              '--weed-width': `${weed.width}px`,
              '--weed-duration': `${weed.duration}s`,
              '--weed-delay': `${weed.delay}s`,
              '--weed-opacity': weed.opacity,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(BubbleBackground)
