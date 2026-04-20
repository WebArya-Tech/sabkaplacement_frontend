import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { articles, catColors } from '../data/blogData'

// ── Parse and render markdown-lite body ──────────────────────────────────────
function BodyRenderer({ text }) {
  const lines = text.split('\n')
  const elements = []
  let key = 0
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // blank
    if (line.trim() === '') { i++; continue }

    // ## heading
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-xl md:text-2xl font-extrabold text-gray-900 mt-9 mb-4"
          style={{ borderLeft: '4px solid #3B82F6', paddingLeft: '14px' }}>
          {line.slice(3)}
        </h2>
      )
      i++; continue
    }

    // | table row
    if (line.trim().startsWith('|')) {
      const tableLines = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        if (!lines[i].includes('---')) tableLines.push(lines[i])
        i++
      }
      const rows = tableLines.map(l =>
        l.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim())
      )
      elements.push(
        <div key={key++} className="overflow-x-auto my-6 rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                {rows[0]?.map((cell, ci) => (
                  <th key={ci} className="px-4 py-3 text-left font-bold text-gray-700 border-b border-gray-200">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-gray-600 border-b border-gray-100">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // > blockquote
    if (line.startsWith('>')) {
      const quoteLines = []
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].slice(1).trim())
        i++
      }
      elements.push(
        <blockquote key={key++} className="my-6 p-5 rounded-xl"
          style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)', borderLeft: '4px solid #3B82F6' }}>
          {quoteLines.map((ql, qi) => (
            ql === '' ? <br key={qi} /> : <p key={qi} className="text-gray-700 text-sm leading-relaxed">{inlineFormat(ql)}</p>
          ))}
        </blockquote>
      )
      continue
    }

    // numbered list item: "**N. text**" style or "- text" bullet
    if (/^\*\*\d+\./.test(line)) {
      // bold keyword line followed by explanation
      const boldMatch = line.match(/^\*\*(.+?)\*\*\s*—\s*(.+)/)
      if (boldMatch) {
        elements.push(
          <div key={key++} className="flex gap-3 my-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <p className="text-gray-700 text-[15px] leading-relaxed">
              <strong className="text-gray-900">{boldMatch[1]}</strong> — {inlineFormat(boldMatch[2])}
            </p>
          </div>
        )
        i++; continue
      }
    }

    // "- bullet"
    if (line.startsWith('- ')) {
      const bullets = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        bullets.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={key++} className="my-4 space-y-2">
          {bullets.map((b, bi) => (
            <li key={bi} className="flex items-start gap-2.5 text-gray-700 text-[15px] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              {inlineFormat(b)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // regular paragraph
    elements.push(
      <p key={key++} className="text-gray-700 text-[15px] md:text-base leading-relaxed my-4">
        {inlineFormat(line)}
      </p>
    )
    i++
  }

  return <>{elements}</>
}

// inline: **bold** and `code`
function inlineFormat(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="px-1.5 py-0.5 rounded text-sm font-mono bg-gray-100 text-gray-800">{part.slice(1, -1)}</code>
    return part
  })
}

// ── Related article card ──────────────────────────────────────────────────────
function RelatedCard({ article }) {
  const col = catColors[article.category] || { bg: '#3B82F6', text: '#fff' }
  const [hov, setHov] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      onClick={() => { navigate(`/blog/${article.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{
        border: `1.5px solid ${hov ? '#D1D5DB' : '#E5E7EB'}`,
        boxShadow: hov ? '0 18px 40px -8px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-5px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="relative overflow-hidden" style={{ height: 168 }}>
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover"
          style={{ transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.65s ease' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=340&fit=crop&q=80' }}
        />
        <span className="absolute top-2.5 left-2.5 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: col.bg, color: col.text }}>
          {article.category}
        </span>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-[14px] leading-snug line-clamp-2 text-gray-900 mb-1">{article.title}</h4>
        <p className="text-xs text-gray-400">{article.date}</p>
      </div>
    </div>
  )
}

// ── Main BlogDetail page ──────────────────────────────────────────────────────
export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  const article = articles.find(a => a.id === Number(id))
  const col = article ? (catColors[article.category] || { bg: '#3B82F6', text: '#fff' }) : { bg: '#3B82F6', text: '#fff' }

  // related: same category, excluding current
  const related = article
    ? articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)
    : []

  // reading-progress bar
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
      setShowTop(scrolled > 400)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // scroll to top on article change
  useEffect(() => { window.scrollTo({ top: 0 }) }, [id])

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
          <div className="text-6xl">📄</div>
          <h1 className="text-2xl font-extrabold text-gray-900">Article not found</h1>
          <p className="text-gray-500">This article doesn't exist or may have been removed.</p>
          <Link to="/blog"
            className="px-6 py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: '#3B82F6' }}>
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1"
        style={{ background: '#F3F4F6' }}>
        <div className="h-full transition-all duration-100"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${col.bg}, ${col.bg}cc)` }} />
      </div>

      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(300px, 50vw, 520px)' }}>
        <img
          src={article.img}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop&q=80' }}
        />
        {/* gradient */}
        <div className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.18) 100%)' }} />

        {/* Back button */}
        <button
          onClick={() => navigate('/blog')}
          className="absolute top-6 left-4 md:left-8 z-20 flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-full"
          style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', border: '1.5px solid rgba(255,255,255,0.3)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 max-w-4xl mx-auto px-4 md:px-8 pb-8 md:pb-12">
          {/* Tags row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wide"
              style={{ background: col.bg, color: col.text }}>
              {article.category}
            </span>
            {article.tags?.map(tag => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
            {article.title}
          </h1>

          {/* Author & meta row */}
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              {article.avatar
                ? <img src={article.avatar} alt={article.author}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/40"
                    onError={e => { e.target.style.display = 'none' }} />
                : <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/40"
                    style={{ background: col.bg }}>{article.author[0]}</div>
              }
              <span className="font-semibold text-white">{article.author}</span>
            </div>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime}
            </span>
            {article.views > 0 && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {article.views >= 1000000
                  ? (article.views / 1000000).toFixed(1) + 'M'
                  : article.views >= 1000
                  ? (article.views / 1000).toFixed(0) + 'K'
                  : article.views} views
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Article body ─────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main article */}
          <article className="flex-1 min-w-0">
            {/* Excerpt callout */}
            <div className="mb-8 p-5 rounded-2xl"
              style={{ background: `linear-gradient(135deg, ${col.bg}12 0%, ${col.bg}06 100%)`, border: `1.5px solid ${col.bg}30` }}>
              <p className="text-base md:text-lg font-medium leading-relaxed"
                style={{ color: col.bg }}>
                {article.excerpt}
              </p>
            </div>

            {/* Body content */}
            <div className="prose-container">
              {article.body
                ? <BodyRenderer text={article.body} />
                : <p className="text-gray-600 leading-relaxed">Full article content coming soon.</p>
              }
            </div>

            {/* Tags */}
            {article.tags?.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-medium border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share row */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm font-bold text-gray-500 mb-3">Share this article</p>
              <div className="flex items-center gap-3">
                {[
                  { label: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z', bg: '#0077B5' },
                  { label: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', bg: '#1DA1F2' },
                  { label: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12.001 0C5.373 0 0 5.373 0 12c0 2.127.556 4.115 1.522 5.831L0 24l6.295-1.494A11.954 11.954 0 0012 24c6.628 0 12-5.373 12-12S18.629 0 12 0z', bg: '#25D366' },
                ].map(s => (
                  <button key={s.label}
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full text-white transition-all hover:scale-105 hover:shadow-lg"
                    style={{ background: s.bg }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.icon} />
                    </svg>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            {/* Author card */}
            <div className="rounded-2xl border border-gray-200 p-5 mb-6"
              style={{ background: 'linear-gradient(135deg, #FAFAFA 0%, #F9FAFB 100%)' }}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">About the Author</p>
              <div className="flex items-center gap-3 mb-3">
                {article.avatar
                  ? <img src={article.avatar} alt={article.author}
                      className="w-12 h-12 rounded-full object-cover ring-2"
                      style={{ ringColor: col.bg }}
                      onError={e => { e.target.style.display = 'none' }} />
                  : <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-extrabold flex-shrink-0"
                      style={{ background: col.bg }}>{article.author[0]}</div>
                }
                <div>
                  <p className="font-bold text-gray-900 text-sm">{article.author}</p>
                  <p className="text-xs text-gray-400">Sabplacement Writer</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Expert career guidance contributor at Sabplacement, helping thousands of professionals navigate their career journeys.
              </p>
            </div>

            {/* Article meta */}
            <div className="rounded-2xl border border-gray-200 p-5 mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Article Info</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold text-xs px-2.5 py-1 rounded-full"
                    style={{ background: col.bg + '18', color: col.bg }}>
                    {article.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Published</span>
                  <span className="font-semibold text-gray-800">{article.date}</span>
                </div>
                {article.readTime && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Read time</span>
                    <span className="font-semibold text-gray-800">{article.readTime}</span>
                  </div>
                )}
                {article.views > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Views</span>
                    <span className="font-semibold text-gray-800">
                      {article.views >= 1000000
                        ? (article.views / 1000000).toFixed(1) + 'M'
                        : article.views >= 1000
                        ? (article.views / 1000).toFixed(0) + 'K'
                        : article.views}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Breadcrumb / Category back link */}
            <Link to="/blog"
              className="flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl w-full justify-center transition-all"
              style={{ background: col.bg + '12', color: col.bg, border: `1.5px solid ${col.bg}30` }}
              onMouseEnter={e => { e.currentTarget.style.background = col.bg; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = col.bg + '12'; e.currentTarget.style.color = col.bg }}>
              ← All Articles
            </Link>
          </aside>
        </div>

        {/* ── Related Articles ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-14 pt-10 border-t border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Related Articles</h2>
                <p className="text-sm text-gray-400 mt-1">More from {article.category}</p>
              </div>
              <Link to="/blog"
                className="text-sm font-bold hidden sm:flex items-center gap-1.5 transition-colors hover:underline"
                style={{ color: col.bg }}>
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(a => <RelatedCard key={a.id} article={a} />)}
            </div>
          </section>
        )}

        {/* Mobile back button */}
        <div className="lg:hidden mt-10 flex justify-center">
          <Link to="/blog"
            className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl"
            style={{ background: col.bg, color: '#fff' }}>
            ← Back to All Articles
          </Link>
        </div>
      </div>

      <Footer />

      {/* Scroll-to-top button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
          style={{ background: col.bg, color: '#fff' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}

