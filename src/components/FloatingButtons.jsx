import { useState, useEffect } from 'react'

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const ArrowUpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const PulseRing = ({ color }) => (
  <span
    className="pointer-events-none absolute inset-0 rounded-full animate-ping opacity-40"
    style={{ background: color }}
  />
)

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── LEFT: Call button ── */}
      <a
        href="tel:+919876543210"
        aria-label="Call us"
        className="group fixed bottom-24 left-5 z-[100] flex items-center gap-0 overflow-hidden rounded-full shadow-2xl transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg,#3385AA,#2a6d8f)',
          boxShadow: '0 6px 20px #3385AA66',
          height: '52px',
          paddingLeft: '14px',
          paddingRight: '14px',
          maxWidth: '52px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.maxWidth = '160px'
          e.currentTarget.style.paddingRight = '18px'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.maxWidth = '52px'
          e.currentTarget.style.paddingRight = '14px'
        }}
      >
        <span className="relative flex shrink-0 items-center justify-center">
          <PulseRing color="#3385AA" />
          <PhoneIcon />
        </span>
        <span className="ml-2 whitespace-nowrap text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Call Us
        </span>
      </a>

      {/* ── RIGHT: WhatsApp button ── */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-24 right-5 z-[100] flex items-center gap-0 overflow-hidden rounded-full shadow-2xl transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg,#25D366,#1da857)',
          boxShadow: '0 6px 20px #25D36666',
          height: '52px',
          paddingLeft: '14px',
          paddingRight: '14px',
          maxWidth: '52px',
          flexDirection: 'row-reverse',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.maxWidth = '180px'
          e.currentTarget.style.paddingLeft = '18px'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.maxWidth = '52px'
          e.currentTarget.style.paddingLeft = '14px'
        }}
      >
        <span className="relative flex shrink-0 items-center justify-center">
          <PulseRing color="#25D366" />
          <WhatsAppIcon />
        </span>
        <span className="mr-2 whitespace-nowrap text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          WhatsApp
        </span>
      </a>

      {/* ── Scroll to top ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="fixed z-[100] flex h-11 w-11 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          bottom: '152px',
          right: '20px',
          background: 'linear-gradient(135deg,#317FA4,#1e293b)',
          boxShadow: '0 4px 16px #317FA466',
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
          pointerEvents: showTop ? 'auto' : 'none',
          transition: 'opacity 0.3s, transform 0.3s',
        }}
      >
        <ArrowUpIcon />
      </button>
    </>
  )
}
