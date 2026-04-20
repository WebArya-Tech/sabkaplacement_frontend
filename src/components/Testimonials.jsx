import React, { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    id: 1,
    name: "Shreekant Pujari",
    avatar: "S",
    rating: 5,
    time: "1 year ago",
    text: "SabPlacement is best manpower company and they are provide good opportunities for job seekers. Great experience with professional team.",
    color: "from-[#3385AA] to-[#317FA4]"
  },
  {
    id: 2,
    name: "Amreen Sadiq",
    avatar: "A",
    rating: 5,
    time: "1 year ago",
    text: "The requirements were met to a very satisfactory level. Entire Staff is very supportive and helpful. Excellent service from SabPlacement.",
    color: "from-[#3385AA] to-[#317FA4]"
  },
  {
    id: 3,
    name: "Nasreen Shaikh",
    avatar: "N",
    rating: 5,
    time: "1 year ago",
    text: "The SabPlacement offers a clean and intuitive interface, making job search easier. Found my dream job through this amazing platform.",
    color: "from-[#3385AA] to-[#317FA4]"
  },
  {
    id: 4,
    name: "Simran Siddiqui",
    avatar: "S",
    rating: 5,
    time: "1 year ago",
    text: "Excellent Job Search portal! User-friendly interface, quick job matching. SabPlacement helped me find the perfect career opportunity.",
    color: "from-[#3385AA] to-[#317FA4]"
  },
  {
    id: 5,
    name: "Sikandra Pal Jay",
    avatar: "S",
    rating: 5,
    time: "1 year ago",
    text: "SabPlacement helped me in my difficult time. Thanks for my career guidance. Professional team with excellent service and support.",
    color: "from-[#3385AA] to-[#317FA4]"
  }
]

const INTERVAL = 3500

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [sliding, setSliding] = useState(false)
  const [dir, setDir] = useState('next')
  const [paused, setPaused] = useState(false)
  const timeoutRef = useRef(null)

  const goTo = (index, direction = 'next') => {
    if (sliding) return
    setDir(direction)
    setSliding(true)
    setTimeout(() => {
      setCurrent(index)
      setSliding(false)
    }, 420)
  }

  const next = () => goTo((current + 1) % testimonials.length, 'next')
  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length, 'prev')

  useEffect(() => {
    if (paused) return
    timeoutRef.current = setTimeout(next, INTERVAL)
    return () => clearTimeout(timeoutRef.current)
  }, [current, paused])

  // visible 3 cards
  const visible = [0, 1, 2].map(i => testimonials[(current + i) % testimonials.length])

  const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-60px); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .tcard-enter-next { animation: slideInRight 0.42s cubic-bezier(0.4,0,0.2,1) both; }
        .tcard-enter-prev { animation: slideInLeft  0.42s cubic-bezier(0.4,0,0.2,1) both; }
        .tcard-enter-next:nth-child(2) { animation-delay: 0.06s; }
        .tcard-enter-next:nth-child(3) { animation-delay: 0.12s; }
        .tcard-enter-prev:nth-child(2) { animation-delay: 0.06s; }
        .tcard-enter-prev:nth-child(3) { animation-delay: 0.12s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Client <span className="text-gray-900">Testimonials</span>
          </h2>
          <p className="text-base text-gray-500">What our customers say</p>
        </div>

        {/* Cards */}
        <div className="relative">
          <div
            key={current}
            className="flex gap-6"
          >
            {visible.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${current}-${index}`}
                className={`flex-1 min-w-0 ${sliding ? '' : (dir === 'next' ? 'tcard-enter-next' : 'tcard-enter-prev')} ${index === 1 ? 'scale-105 z-10' : 'scale-95 opacity-80'} transition-transform duration-300 hidden md:block`}
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
                  <div className={`bg-gradient-to-r ${testimonial.color} px-6 pt-6 pb-10 relative`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center text-white font-extrabold text-xl shadow-lg flex-shrink-0">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{testimonial.name}</h4>
                        <div className="flex items-center space-x-1 text-xs text-white/75 mt-0.5">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                          <span>{testimonial.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-t-3xl -mt-6 px-6 pt-5 pb-6 relative">
                    <div className="mb-3"><StarRating rating={testimonial.rating} /></div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">"{testimonial.text}"</p>
                    <button className="text-[#3385AA] hover:text-[#2a6d8f] font-medium text-sm transition-colors duration-300">Read more</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile: show only center card */}
            <div
              key={`mobile-${current}`}
              className={`flex-1 md:hidden ${dir === 'next' ? 'tcard-enter-next' : 'tcard-enter-prev'}`}
            >
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${visible[0].color} px-6 pt-6 pb-10`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center text-white font-extrabold text-xl">
                      {visible[0].avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{visible[0].name}</h4>
                      <span className="text-xs text-white/75">{visible[0].time}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-t-3xl -mt-6 px-6 pt-5 pb-6">
                  <div className="mb-3"><StarRating rating={visible[0].rating} /></div>
                  <p className="text-gray-600 text-sm leading-relaxed">"{visible[0].text}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white hover:bg-gray-50 text-gray-600 w-11 h-11 rounded-full shadow-xl border border-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110 z-20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white hover:bg-gray-50 text-gray-600 w-11 h-11 rounded-full shadow-xl border border-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110 z-20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Dots + progress */}
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-3 bg-[#3385AA] shadow' : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials