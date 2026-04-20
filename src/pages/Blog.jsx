import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { articles, catColors } from '../data/blogData'

const TABS = [
  'Interview Questions',
  'Resume',
  'Job Application',
  'Career Guidance',
  'Salary',
  'Career Tips',
]

// Featured article (first article shown in hero carousel)
const featuredArticles = [articles[13], articles[0]]  // Resume Summary & Interview Qs

// ── Animated card component ───────────────────────────────────────────────────
function BlogCard({ article, delay = 0 }) {
  const navigate = useNavigate()
  const col = catColors[article.category] || { bg: '#3385AA', text: '#fff' }
  const cardRef = useRef(null)
  const [hov, setHov] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ x: 50, y: 50, op: 0 })

  // 3-D magnetic tilt on mouse move
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -6, y: dx * 6 })
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    setShine({ x: px, y: py, op: 0.18 })
  }

  const handleMouseEnter = () => setHov(true)
  const handleMouseLeave = () => {
    setHov(false)
    setTilt({ x: 0, y: 0 })
    setShine(s => ({ ...s, op: 0 }))
  }

  const hoverTrans = 'transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease, border-color 0.25s ease'

  return (
    <div
      ref={cardRef}
      data-aos="flip-left"
      data-aos-delay={delay}
      data-aos-duration="800"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 900 }}
    >
      <div
        onClick={() => navigate(`/blog/${article.id}`)}
        className="bg-white rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          border: `1.5px solid ${hov ? '#c8dce8' : '#E5E7EB'}`,
          boxShadow: hov
            ? '0 24px 56px -8px rgba(51,133,170,0.18), 0 8px 20px rgba(0,0,0,0.07)'
            : '0 2px 12px rgba(0,0,0,0.07)',
          transform: hov
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.02)`
            : 'rotateX(0) rotateY(0) translateY(0) scale(1)',
          transition: hoverTrans,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* ── Shine sweep ── */}
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.op}) 0%, transparent 65%)`,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* ── Image ── */}
        <div className="relative overflow-hidden h-44 sm:h-52 md:h-56">
          <img
            src={article.img}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{
              transform: hov ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=340&fit=crop&q=80' }}
          />

          {/* gradient overlay always visible at bottom for badge legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.32) 100%)',
              opacity: hov ? 1 : 0.6,
              transition: 'opacity 0.45s ease',
            }}
          />

          {/* Category badge */}
          <span
            className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full z-10"
            style={{
              background: col.bg,
              color: col.text,
              boxShadow: `0 2px 10px ${col.bg}55`,
              letterSpacing: '0.02em',
              transform: hov ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {article.category}
          </span>
        </div>

        {/* ── Body ── */}
        <div className="p-4 sm:p-5 flex flex-col" style={{ minHeight: 180 }}>
          {/* Title */}
          <h3
            className="font-bold text-[15.5px] leading-snug mb-2.5 line-clamp-2"
            style={{ color: hov ? '#317FA4' : '#1F2937', transition: 'color 0.25s ease' }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{article.excerpt}</p>

          {/* Divider */}
          <div style={{ height: 1, background: '#F3F4F6', marginBottom: 14 }} />

          {/* Author + meta row */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3.5">
            {/* person icon */}
            <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: col.bg }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-semibold text-gray-700 truncate max-w-[120px]">{article.author}</span>
            <span className="text-gray-300 mx-0.5">·</span>
            <span className="whitespace-nowrap">{article.date}</span>
            {article.readTime && (
              <>
                <span className="text-gray-300 mx-0.5">·</span>
                <span className="whitespace-nowrap">{article.readTime}</span>
              </>
            )}
          </div>

          {/* Read More link */}
          <div
            className="flex items-center gap-1 text-sm font-bold"
            style={{
              color: col.bg,
              transform: hov ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            Read More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              style={{ transform: hov ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.25s ease' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Featured / Hero card ──────────────────────────────────────────────────────
function FeaturedCard({ article }) {
  const navigate = useNavigate()
  const col = catColors[article.category] || { bg: '#3385AA', text: '#fff' }
  const cardRef = useRef(null)
  const [hov, setHov] = useState(false)
  const [shine, setShine] = useState({ x: 50, y: 50, op: 0 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    setShine({ x: px, y: py, op: 0.12 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setShine(s => ({ ...s, op: 0 })) }}
      onClick={() => navigate(`/blog/${article.id}`)}
      className="flex flex-col md:flex-row rounded-2xl overflow-hidden cursor-pointer bg-white relative"
      style={{
        border: `1.5px solid ${hov ? '#D1D5DB' : '#E5E7EB'}`,
        boxShadow: hov ? '0 30px 70px -15px rgba(0,0,0,0.14), 0 10px 24px rgba(0,0,0,0.08)' : '0 4px 18px rgba(0,0,0,0.07)',
        transform: hov ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Shine */}
      <div className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
        style={{ background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.op}) 0%, transparent 70%)` }} />

      {/* Image */}
      <div className="relative overflow-hidden w-full md:w-1/2" style={{ minHeight: 200 }}>
        <span className="absolute top-3 left-3 z-10 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: '#FBBF24', color: '#1F2937', boxShadow: '0 2px 8px rgba(251,191,36,0.4)' }}>
          ⭐ Featured
        </span>
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover"
          style={{ minHeight: 200, transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.75s ease' }}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=340&fit=crop&q=80' }}
        />
        {/* dark overlay on hover */}
        <div className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.22)', opacity: hov ? 1 : 0, transition: 'opacity 0.5s ease' }} />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: col.bg + '18', color: col.bg, border: `1px solid ${col.bg}33` }}>
              {article.category}
            </span>
            <span className="text-xs text-gray-400">{article.date}</span>
          </div>
          <h2
            className="text-lg sm:text-xl md:text-2xl font-extrabold leading-tight mb-3"
            style={{ color: '#111827', transition: 'color 0.3s ease' }}
          >
            {article.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            {article.excerpt}{' '}
            <span className="font-semibold" style={{ color: col.bg }}>Read more</span>
          </p>
        </div>

        {/* Author */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-4" style={{ borderTop: '1px solid #F3F4F6' }}>
          <div className="flex items-center gap-2">
            {article.avatar
              ? <img src={article.avatar} alt={article.author} className="w-9 h-9 rounded-full object-cover"
                  style={{ outline: hov ? '2px solid #9CA3AF' : '2px solid transparent', transition: 'outline 0.3s ease' }} />
              : <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: '#6B7280' }}>{article.author[0]}</div>
            }
            <span className="text-sm text-gray-700 font-semibold">{article.author}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            {article.views > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {article.views.toLocaleString()}
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {article.shares}
            </span>
          </div>
        </div>

        {/* animated read more button */}
        <div className="mt-5">
          <button
            onClick={e => { e.stopPropagation(); navigate(`/blog/${article.id}`) }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl"
            style={{
              background: hov ? '#111827' : '#F3F4F6',
              color: hov ? '#fff' : '#374151',
              border: '1.5px solid #E5E7EB',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              transform: hov ? 'scale(1.04)' : 'scale(1)',
            }}
          >
            Read Full Article
            <svg className="w-4 h-4" style={{ transform: hov ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Category Section ──────────────────────────────────────────────────────────
function CategorySection({ category }) {
  const col = catColors[category] || { bg: '#3385AA', text: '#fff' }
  const items = articles.filter(a => a.category === category).slice(0, 3)
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <h2 data-aos="fade-down" data-aos-duration="700" className="text-xl md:text-2xl font-extrabold" style={{ color: '#3385AA' }}>{category}</h2>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {items.map((a, i) => <BlogCard key={a.id} article={a} delay={i * 100} />)}
      </div>
      <div className="text-center mt-6">
        <button
          className="text-sm font-bold transition-all duration-300 hover:underline"
          style={{ color: col.bg }}
        >
          View All
        </button>
      </div>
    </section>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeTab, setActiveTab] = useState(null)   // null = show all sections
  const [featIdx, setFeatIdx] = useState(0)
  const [tabsSticky, setTabsSticky] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const tabsRef = useRef(null)
  const tabScrollRef = useRef(null)

  // init AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic', offset: 60 })
  }, [])

  // sticky tabs on scroll
  useEffect(() => {
    const onScroll = () => {
      if (tabsRef.current) setTabsSticky(tabsRef.current.getBoundingClientRect().top <= 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // featured carousel auto-advance
  useEffect(() => {
    const t = setInterval(() => setFeatIdx(i => (i + 1) % featuredArticles.length), 5000)
    return () => clearInterval(t)
  }, [])

  const filtered = activeTab ? articles.filter(a => a.category === activeTab) : null

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <div className="w-full" style={{ lineHeight: 0 }}>
        <img
          src="/herob.png"
          alt="Blog illustration"
          className="w-full block object-cover object-top h-36 sm:h-52 md:h-72 lg:h-[420px] xl:h-[480px]"
        />
      </div>

      {/* ── Latest Articles + Category Tabs ─────────────────────────────────── */}
      <div
        ref={tabsRef}
        className="bg-white z-40"
        style={{
          position: 'sticky',
          top: 0,
          boxShadow: tabsSticky ? '0 2px 12px rgba(0,0,0,0.07)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* "Latest Articles" heading — hidden when sticky (compact mode) */}
        <div
          className="text-center pt-8 pb-2 transition-all duration-300 overflow-hidden"
          style={{ maxHeight: tabsSticky ? 0 : 96, opacity: tabsSticky ? 0 : 1, paddingTop: tabsSticky ? 0 : undefined, paddingBottom: tabsSticky ? 0 : undefined }}
        >
              <h2 data-aos="fade-down" data-aos-duration="700" className="text-xl sm:text-2xl md:text-3xl font-extrabold" style={{ color: '#3385AA' }}>Latest Articles</h2>
          <div style={{ width: 52, height: 3, background: '#3385AA', borderRadius: 2, margin: '8px auto 0' }} />
        </div>

        {/* Tabs row */}
        <div className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-8">
          <div
            ref={tabScrollRef}
            className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-3 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* All button */}
            {(() => {
              const isAll = !activeTab
              return (
                <button
                  key="all"
                  onClick={() => { setActiveTab(null); setShowAll(true) }}
                  className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0"
                  style={{
                    background: isAll ? '#3385AA' : '#F3F4F6',
                    color: isAll ? '#ffffff' : '#374151',
                    border: `1.5px solid ${isAll ? '#3385AA' : 'transparent'}`,
                    boxShadow: isAll ? '0 4px 14px rgba(51,133,170,0.35)' : 'none',
                    transition: 'background 0.22s ease, color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease',
                    transform: isAll ? 'scale(1.06)' : 'scale(1)',
                  }}
                  onMouseEnter={e => { if (!isAll) e.currentTarget.style.background = '#E5E7EB' }}
                  onMouseLeave={e => { if (!isAll) e.currentTarget.style.background = '#F3F4F6' }}
                >
                  All
                </button>
              )
            })()}

            {TABS.map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(isActive ? null : tab); setShowAll(false) }}
                  className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0"
                  style={{
                    background: isActive ? '#3385AA' : '#F3F4F6',
                    color: isActive ? '#ffffff' : '#374151',
                    border: `1.5px solid ${isActive ? '#3385AA' : 'transparent'}`,
                    boxShadow: isActive ? '0 4px 14px rgba(51,133,170,0.35)' : 'none',
                    transition: 'background 0.22s ease, color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease',
                    transform: isActive ? 'scale(1.06)' : 'scale(1)',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#E5E7EB' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = '#F3F4F6' }}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-10">

        {/* Single category filtered view */}
        {activeTab && filtered && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setActiveTab(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <h2 className="text-2xl font-extrabold" style={{ color: '#3385AA' }}>{activeTab}</h2>
              <span className="text-sm text-gray-400 font-medium">{filtered.length} articles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filtered.map((a, i) => <BlogCard key={a.id} article={a} delay={i * 80} />)}
            </div>
          </section>
        )}

        {/* All-category view */}
        {!activeTab && (
          <>
            {/* Featured Article */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 data-aos="fade-down" data-aos-duration="700" className="text-lg sm:text-xl md:text-2xl font-extrabold" style={{ color: '#3385AA' }}>
                  Sabplacement Blog <span className="hidden sm:inline text-gray-400 font-normal italic text-sm sm:text-base">- Great career starts here!</span>
                </h2>
              </div>
              <FeaturedCard article={featuredArticles[featIdx]} />
              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {featuredArticles.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeatIdx(i)}
                    className="rounded-full transition-all duration-300"
                    style={{ width: i === featIdx ? 22 : 10, height: 10, background: i === featIdx ? '#3385AA' : '#D1D5DB' }}
                  />
                ))}
              </div>
            </section>

            {/* Per-category sections */}
            {TABS.map(tab => <CategorySection key={tab} category={tab} />)}

            {/* Recently Published / All Articles */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 data-aos="fade-down" data-aos-duration="700" className="text-xl md:text-2xl font-extrabold" style={{ color: '#3385AA' }}>
                  {showAll ? 'All Articles' : 'Recently Published Articles'}
                  {showAll && <span className="ml-2 text-sm text-gray-400 font-normal">({articles.length})</span>}
                </h2>
                {showAll && (
                  <button
                    onClick={() => setShowAll(false)}
                    className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                    Show Less
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {(showAll
                  ? articles
                  : [...articles].sort((a, b) => b.id - a.id).slice(0, 3)
                ).map((a, i) => <BlogCard key={a.id} article={a} delay={i * 80} />)}
              </div>
            </section>

            {/* View All button */}
            {!showAll && (
              <div className="flex justify-center mb-12">
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                  style={{ background: 'linear-gradient(135deg,#3385AA,#2a6d8f)', boxShadow: '0 4px 18px rgba(51,133,170,0.35)' }}
                >
                  View All Articles
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

