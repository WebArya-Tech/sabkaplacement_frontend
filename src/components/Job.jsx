import React, { useState, useEffect } from 'react'

const prepCards = [
  {
    role: 'Senior Software Developer',
    company: 'Google',
    tag: 'Technical Interview',
    time: '5 min AI Interview',
    cta: 'Practice Now',
    image: '/girl.png',
    accent: '#3385AA',
    badge: 'Top Pick',
  },
  {
    role: 'Product Manager',
    company: 'Microsoft',
    tag: 'Case Study',
    time: '8 min AI Session',
    cta: 'Practice Now',
    image: '/girl1.png',
    accent: '#7C3AED',
    badge: 'Popular',
  },
  {
    role: 'Full Stack Engineer',
    company: 'Meta',
    tag: 'Coding Round',
    time: '6 min AI Interview',
    cta: 'Practice Now',
    image: '/boy.png',
    accent: '#10B981',
    badge: 'Trending',
  },
  {
    role: 'Data Scientist',
    company: 'Amazon',
    tag: 'Analytics Round',
    time: '7 min AI Session',
    cta: 'Practice Now',
    image: '/girl.png',
    accent: '#F59E0B',
    badge: 'In Demand',
  },
]

const stats = [
  { value: '50,000+', label: 'Mock Interviews Done' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '200+', label: 'Company Patterns' },
  { value: '92%', label: 'Success Rate' },
]

export default function Job() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [dir, setDir] = useState('right')

  useEffect(() => {
    const t = setInterval(() => slide('right'), 3000)
    return () => clearInterval(t)
  }, [current])

  const slide = (d) => {
    if (animating) return
    setDir(d)
    setAnimating(true)
    setTimeout(() => {
      setCurrent((p) =>
        d === 'right' ? (p + 1) % prepCards.length : (p - 1 + prepCards.length) % prepCards.length
      )
      setAnimating(false)
    }, 350)
  }

  return (
    <section className="w-full bg-white py-16 px-4" style={{ borderBottom: '1px solid #F3F4F6' }}>
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: '#EBF5FB', color: '#3385AA' }}
          >
            AI-Powered Coaching
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Ace your{' '}
            <span style={{ color: '#3385AA' }}>Job Interview</span>
          </h2>
          <div className="mt-3 mx-auto" style={{ width: 56, height: 3, borderRadius: 2, background: 'linear-gradient(90deg,#3385AA,#2a6d8f)' }} />
          <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto">
            Practice real interview questions from top companies with our free AI interview coach
          </p>
        </div>

        {/* Carousel + nav */}
        <div className="flex items-center justify-center gap-4">

          <button
            onClick={() => slide('left')}
            className="z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
            style={{ background: '#3385AA', color: '#fff', border: '2px solid #2a6d8f' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Track */}
          <div className="relative w-full max-w-5xl overflow-hidden">
            <div
              className="flex gap-5 transition-all duration-400 ease-in-out"
              style={{
                transform: animating
                  ? `translateX(${dir === 'right' ? '-60px' : '60px'})`
                  : 'translateX(0)',
                opacity: animating ? 0.4 : 1,
                transition: 'transform 0.35s ease, opacity 0.35s ease',
              }}
            >
              {[0, 1, 2].map((offset) => {
                const idx = (current + offset) % prepCards.length
                const c = prepCards[idx]
                const isMain = offset === 0

                return (
                  <div
                    key={`${idx}-${offset}`}
                    className="group flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border bg-white"
                    style={{
                      width: isMain ? '360px' : '260px',
                      transform: isMain ? 'scale(1) translateY(0)' : 'scale(0.93) translateY(10px)',
                      opacity: isMain ? 1 : 0.65,
                      boxShadow: isMain
                        ? `0 20px 50px -8px ${c.accent}28, 0 8px 20px rgba(0,0,0,0.08)`
                        : '0 4px 16px rgba(0,0,0,0.06)',
                      border: `1.5px solid ${isMain ? c.accent + '40' : '#F3F4F6'}`,
                    }}
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden"
                      style={{ height: isMain ? '280px' : '200px' }}
                    >
                      <img
                        src={c.image}
                        alt={c.role}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                        style={{ transition: 'transform 0.7s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                      />
                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
                      />
                      {/* Badge top-left */}
                      <div
                        className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ background: c.accent }}
                      >
                        {c.badge}
                      </div>
                      {/* Tag top-right */}
                      <div className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-gray-700 shadow-sm">
                        {c.tag}
                      </div>
                      {/* Company name on image bottom */}
                      {isMain && (
                        <div className="absolute bottom-3 left-4">
                          <p className="text-white text-xs font-semibold opacity-80">{c.role}</p>
                          <p className="text-white text-xl font-extrabold">{c.company}</p>
                        </div>
                      )}
                    </div>

                    {/* Card info */}
                    <div className="p-4 space-y-3">
                      {!isMain && (
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{c.role}</p>
                          <p className="text-base font-extrabold text-gray-800">{c.company}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" />
                          </svg>
                          {c.time}
                        </span>
                        {isMain && (
                          <span className="text-xs font-semibold" style={{ color: c.accent }}>Free</span>
                        )}
                      </div>

                      {isMain && (
                        <button
                          type="button"
                          className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
                          style={{
                            background: `linear-gradient(90deg, ${c.accent}, ${c.accent}cc)`,
                            boxShadow: `0 4px 16px ${c.accent}44`,
                          }}
                        >
                          {c.cta} →
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            onClick={() => slide('right')}
            className="z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
            style={{ background: '#3385AA', color: '#fff', border: '2px solid #2a6d8f' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {prepCards.map((c, i) => (
            <button
              key={i}
              onClick={() => { setDir('right'); setCurrent(i) }}
              className="rounded-full transition-all duration-300"
              style={{
                height: '8px',
                width: current === i ? '28px' : '8px',
                background: current === i ? '#3385AA' : '#D1D5DB',
              }}
            />
          ))}
        </div>

        {/* Stats bar */}
        <div
          className="mt-12 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{ background: 'linear-gradient(135deg,#EBF5FB 0%,#f0f7fb 100%)', border: '1px solid #d0e8f5' }}
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-extrabold" style={{ color: '#3385AA' }}>{s.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button
            type="button"
            className="h-11 rounded-xl px-10 text-sm font-bold text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: 'linear-gradient(90deg,#3385AA,#2a6d8f)', boxShadow: '0 4px 20px rgba(51,133,170,0.4)' }}
          >
            View All Interview Preps →
          </button>
        </div>

      </div>
    </section>
  )
}
