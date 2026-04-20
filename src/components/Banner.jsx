const ACCENT = '#3385AA'
const ACCENT_LIGHT = '#e8f4fb'
const ACCENT_DARK = '#317FA4'

const advantages = [
  {
    title: 'Industry-Grade Content',
    desc: 'Resume content crafted with real job market insights',
    iconBg: '#dbeeff',
    svg: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <path d="M14 34V20l10-8 10 8v14H28v-8h-8v8H14z" fill={ACCENT} opacity=".2" />
        <path d="M14 34V20l10-8 10 8v14H28v-8h-8v8H14z" stroke={ACCENT} strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="21" y="26" width="6" height="8" rx="1" fill={ACCENT} />
        <path d="M10 22l14-11 14 11" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: '100% ATS Optimized',
    desc: 'All templates pass ATS screening — 3x more callbacks guaranteed',
    iconBg: '#d4f7ec',
    svg: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="14" fill="#10b981" opacity=".18" />
        <circle cx="24" cy="24" r="14" stroke="#059669" strokeWidth="2.2" />
        <path d="M17 24l5 5 9-10" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Recognized by Top Companies',
    desc: 'Trusted by recruiters at 500+ companies across India',
    iconBg: '#fff4d6',
    svg: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect x="12" y="20" width="24" height="18" rx="2" fill="#f59e0b" opacity=".2" />
        <rect x="12" y="20" width="24" height="18" rx="2" stroke="#d97706" strokeWidth="2.2" />
        <path d="M20 20v-4a4 4 0 018 0v4" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24" cy="29" r="3" fill="#d97706" />
        <path d="M24 32v4" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Banner() {
  return (
    <section style={{ background: '#f0f7fc', padding: 'clamp(40px,6vw,80px) 0' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(28px,5vw,52px)', padding: '0 16px' }} data-aos="fade-up" data-aos-duration="600">
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)',
          fontWeight: 900,
          color: ACCENT_DARK,
          lineHeight: 1.2,
          marginBottom: 10,
        }}>
          <span style={{
            background: `linear-gradient(90deg,${ACCENT_DARK},${ACCENT})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Sabkaplacement
          </span>{' '}
          Advantage
        </h2>
        <p style={{ fontSize: 'clamp(0.85rem,2vw,1rem)', color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
          Everything you need to land your next role — built in
        </p>
      </div>

      {/* 3-column cards */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(12px,4vw,32px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'clamp(12px,3vw,28px)',
        }}>
          {advantages.map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={i * 110}
              style={{
                background: '#fff',
                border: `2px solid ${ACCENT_LIGHT}`,
                borderRadius: 20,
                padding: 'clamp(22px,4vw,36px) clamp(18px,3vw,28px)',
                textAlign: 'center',
                transition: 'box-shadow 0.28s, transform 0.28s, border-color 0.28s',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = `0 12px 40px rgba(51,133,170,0.18)`
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.borderColor = ACCENT
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(51,133,170,0.07)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = ACCENT_LIGHT
              }}
            >
              {/* Accent top stripe */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 4,
                background: `linear-gradient(90deg,${ACCENT},${ACCENT_DARK})`,
                borderRadius: '18px 18px 0 0',
              }} />

              {/* Icon circle */}
              <div style={{
                width: 64, height: 64,
                borderRadius: '50%',
                background: item.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '14px auto 20px',
                boxShadow: `0 4px 16px rgba(51,133,170,0.12)`,
              }}>
                {item.svg}
              </div>

              <p style={{ fontWeight: 800, fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: ACCENT_DARK, marginBottom: 10, lineHeight: 1.3 }}>
                {item.title}
              </p>
              <p style={{ fontSize: 'clamp(0.78rem,1.6vw,0.88rem)', color: '#64748b', lineHeight: 1.75 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
