import React, { useState, useEffect, useCallback } from 'react'
import FloatingParticles from './FloatingParticles'

const slides = [
  {
    image: 'https://images.pexels.com/photos/31367509/pexels-photo-31367509.jpeg',
    badge: '🚀 #1 Job Platform in India',
    headline: 'Find Your Dream Job',
    highlight: 'Faster Than Ever',
    sub: 'Connect with 50,000+ top companies hiring right now. Freshers to senior professionals — your next opportunity is just one click away.',
    cta1: { label: 'Explore Jobs', href: '/jobs' },
    cta2: { label: 'Upload Resume', href: '/resume/builder' },
    stat1: { value: '2.5L+', label: 'Active Jobs' },
    stat2: { value: '50K+', label: 'Companies' },
    stat3: { value: '98%', label: 'Placement Rate' },
  },
  {
    image: 'https://images.pexels.com/photos/3182804/pexels-photo-3182804.jpeg',
    badge: '🎯 Career Growth Made Easy',
    headline: 'Build a Resume That',
    highlight: 'Gets You Hired',
    sub: 'Our AI-powered resume builder helps you craft the perfect resume in minutes. Stand out from thousands of applicants effortlessly.',
    cta1: { label: 'Build Resume', href: '/resume/builder' },
    cta2: { label: 'Career Tips', href: '/career-resources' },
    stat1: { value: '10L+', label: 'Resumes Built' },
    stat2: { value: '4.8★', label: 'User Rating' },
    stat3: { value: '3x', label: 'More Callbacks' },
  },
  {
    image: 'https://images.pexels.com/photos/8463169/pexels-photo-8463169.jpeg',
    badge: '💼 Trusted by Top Recruiters',
    headline: 'Top Companies Are',
    highlight: 'Waiting for You',
    sub: 'From MNCs to fast-growing startups — thousands of employers actively search our platform every day to find candidates like you.',
    cta1: { label: 'View Companies', href: '/companies' },
    cta2: { label: 'Register Free', href: '/register' },
    stat1: { value: '500+', label: 'MNC Partners' },
    stat2: { value: '1000+', label: 'Startups' },
    stat3: { value: '24hr', label: 'Avg. Response' },
  },
]

const INTERVAL = 5000

function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('next')

  const goTo = useCallback((index, dir = 'next') => {
    if (animating) return
    setAnimating(true)
    setDirection(dir)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 600)
  }, [animating])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 'next')
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, 'prev')
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, INTERVAL)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', minHeight: 500, overflow: 'hidden', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @keyframes heroSlideInNext {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes heroSlideInPrev {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgePop {
          from { opacity: 0; transform: scale(0.8) translateY(-10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .hero-slide-img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top;
        }
        .hero-slide-img.enter-next { animation: heroSlideInNext 0.65s cubic-bezier(0.4,0,0.2,1) forwards; }
        .hero-slide-img.enter-prev { animation: heroSlideInPrev 0.65s cubic-bezier(0.4,0,0.2,1) forwards; }
        .hero-content-wrap { animation: fadeUp 0.7s ease 0.2s both; }
        .hero-badge { animation: badgePop 0.5s ease 0.15s both; }
        .hero-dot { border: none; cursor: pointer; padding: 0; transition: all 0.35s ease; }
        .hero-dot:hover { opacity: 0.9; }

        /* ── Mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .hero-inner {
            padding: 0 18px !important;
            padding-top: 90px !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }
          .hero-content-wrap { max-width: 100% !important; text-align: left; }
          .hero-badge { font-size: 0.72rem !important; padding: 5px 13px !important; }
          .hero-headline { font-size: clamp(1.2rem, 5.5vw, 1.55rem) !important; margin-bottom: 4px !important; }
          .hero-highlight { font-size: clamp(1.2rem, 5.5vw, 1.55rem) !important; margin-bottom: 14px !important; }
          .hero-sub { font-size: 0.85rem !important; margin-bottom: 0 !important; line-height: 1.6 !important; }
        }

        /* ── Small tablet (481px – 767px) ── */
        @media (min-width: 481px) and (max-width: 767px) {
          .hero-inner { padding: 0 32px !important; padding-top: clamp(90px, 16vh, 130px) !important; align-items: flex-start !important; }
          .hero-content-wrap { max-width: 520px !important; }
          .hero-headline { font-size: clamp(1.4rem, 4vw, 1.9rem) !important; }
          .hero-highlight { font-size: clamp(1.4rem, 4vw, 1.9rem) !important; }
          .hero-sub { font-size: 0.93rem !important; }
        }

        /* ── Tablet (768px – 1023px) ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-inner { padding: 0 48px !important; padding-top: clamp(100px, 18vh, 150px) !important; align-items: flex-start !important; }
          .hero-content-wrap { max-width: 600px !important; }
          .hero-headline { font-size: clamp(1.6rem, 3.2vw, 2.2rem) !important; }
          .hero-highlight { font-size: clamp(1.6rem, 3.2vw, 2.2rem) !important; }
        }

        /* ── Desktop (1024px+) ── */
        @media (min-width: 1024px) {
          .hero-inner { padding: 0 clamp(48px, 7vw, 110px) !important; padding-top: clamp(110px, 20vh, 180px) !important; align-items: flex-start !important; }
          .hero-content-wrap { max-width: 680px !important; }
          .hero-headline { font-size: clamp(1.8rem, 3vw, 2.6rem) !important; }
          .hero-highlight { font-size: clamp(1.8rem, 3vw, 2.6rem) !important; }
        }
      `}</style>

      {/* Background Image */}
      <img
        key={current}
        src={slide.image}
        alt=""
        aria-hidden="true"
        className={`hero-slide-img ${direction === 'next' ? 'enter-next' : 'enter-prev'}`}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(110deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.10) 100%)',
        zIndex: 1,
      }} />

      {/* Floating Particles */}
      <FloatingParticles color="#3385AA" count={18} opacity={0.35} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 130,
        background: 'linear-gradient(to top, rgba(0,0,0,0.40), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Main Content */}
      <div
        className="hero-inner"
        style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', alignItems: 'flex-start',
          padding: '0 clamp(18px, 6vw, 110px)',
          paddingTop: 'clamp(110px, 20vh, 180px)',
          boxSizing: 'border-box',
        }}
      >
        <div
          key={`content-${current}`}
          className="hero-content-wrap"
          style={{ maxWidth: 680, width: '100%' }}
        >
          {/* Badge */}
          <div className="hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(26,75,115,0.38)',
            border: '1px solid rgba(26,75,115,0.75)',
            backdropFilter: 'blur(6px)',
            borderRadius: 30, padding: '6px 16px',
            fontSize: '0.8rem', fontWeight: 700,
            color: '#fff', marginBottom: 18,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {slide.badge}
          </div>

          {/* Headline */}
          <h1 className="hero-headline" style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 900, lineHeight: 1.15,
            color: '#fff', margin: '0 0 4px',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 12px rgba(0,0,0,0.40)',
          }}>
            {slide.headline}
          </h1>
          <h1 className="hero-highlight" style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 900, lineHeight: 1.2,
            margin: '0 0 18px', letterSpacing: '-0.02em',
            color: '#fff',
            textShadow: '0 2px 16px rgba(0,0,0,0.45)',
          }}>
            {slide.highlight}
          </h1>

          {/* Subtitle */}
          <p className="hero-sub" style={{
            fontSize: 'clamp(0.85rem, 1.6vw, 1.08rem)',
            color: 'rgba(255,255,255,0.92)', lineHeight: 1.75,
            margin: '0 0 0', maxWidth: 560, fontWeight: 400,
            textShadow: '0 1px 8px rgba(0,0,0,0.45)',
          }}>
            {slide.sub}
          </p>
        </div>
      </div>

      {/* Slide Indicator Dots */}
      <div style={{
        position: 'absolute', bottom: 20, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 8, zIndex: 10,
        alignItems: 'center',
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            className="hero-dot"
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 8,
              height: 8, borderRadius: 5,
              background: i === current ? '#fff' : 'rgba(255,255,255,0.40)',
              boxShadow: i === current ? '0 0 8px rgba(255,255,255,0.5)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 3, background: 'rgba(255,255,255,0.12)',
        width: '100%', zIndex: 10,
      }}>
        <div
          key={`progress-${current}`}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #317FA4, #2a6fa8)',
            animation: `progressBar ${INTERVAL}ms linear forwards`,
            borderRadius: '0 2px 2px 0',
          }}
        />
      </div>
    </section>
  )
}

export default Hero
