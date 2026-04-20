import React, { useState, useEffect } from 'react'

const Icon = ({ d, size = 56, stroke = '#fff', sw = 1.5 }) => (
  <svg width={size} height={size} fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
)

const courses = [
  {
    title: 'Full Stack Development',
    duration: '6 months',
    level: 'Beginner to Advanced',
    bg: 'linear-gradient(135deg,#317FA4,#3385AA)',
    image: 'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&w=600&h=400&fit=crop',
    icon: [
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      'M10 20v-6h4v6',
    ],
    iconLabel: '</> Full Stack',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    students: '12K+',
    desc: 'Build modern full-stack web apps from scratch to deployment.',
  },
  {
    title: 'Data Science & AI',
    duration: '4 months',
    level: 'Intermediate',
    bg: 'linear-gradient(135deg,#0f766e,#14b8a6)',
    image: 'https://images.pexels.com/photos/16380906/pexels-photo-16380906.jpeg?auto=compress&w=600&h=400&fit=crop',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconLabel: '📊 Data Science',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    students: '8K+',
    desc: 'Master data analytics, ML algorithms, and AI fundamentals.',
  },
  {
    title: 'Digital Marketing',
    duration: '3 months',
    level: 'Beginner',
    bg: 'linear-gradient(135deg,#be185d,#f43f5e)',
    image: 'https://images.pexels.com/photos/8154349/pexels-photo-8154349.jpeg?auto=compress&w=600&h=400&fit=crop',
    icon: [
      'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z',
      'M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
    ],
    iconLabel: '📣Marketing',
    skills: ['SEO', 'Social Media', 'Google Ads', 'Analytics'],
    students: '15K+',
    desc: 'Drive growth with proven digital marketing strategies.',
  },
  {
    title: 'UI/UX Design',
    duration: '5 months',
    level: 'Beginner to Intermediate',
    bg: 'linear-gradient(135deg,#c2410c,#f97316)',
    image: 'https://www.images.cybrosys.com/css/assets/populor/courses-7.jpg',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    iconLabel: '🎨 UI/UX',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    students: '10K+',
    desc: 'Design beautiful interfaces that users love.',
  },
  {
    title: 'Cloud Computing',
    duration: '4 months',
    level: 'Intermediate to Advanced',
    bg: 'linear-gradient(135deg,#4338ca,#6366f1)',
    image: 'https://yastatic.net/naydex/yandex-search/n9dqNO629/9002b5uy/dHKGeZtB0On8DNZEMFbowtm6PDNOS2gdHXtIZueWzTJGNGpqNtTAj8GUoRthaoHkF0D9q6PYJQhpLZ1QHsBPAwFWYx3_heT4eckSRVRSKLJJ-8iCmstsbNhb-RdS5nky4-H6OgUSp-3D0kbdRu3GNqNVuCu2-ZStae1b9u',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    iconLabel: '☁️ Cloud',
    skills: ['AWS', 'Docker', 'Kubernetes', 'DevOps'],
    students: '6K+',
    desc: 'Build and manage scalable cloud infrastructure.',
  },
  {
    title: 'Mobile App Dev',
    duration: '5 months',
    level: 'Beginner to Advanced',
    bg: 'linear-gradient(135deg,#0369a1,#38bdf8)',
    image: 'https://images.pexels.com/photos/18663994/pexels-photo-18663994.jpeg?auto=compress&w=600&h=400&fit=crop',
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    iconLabel: '📱 Mobile Dev',
    skills: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
    students: '9K+',
    desc: 'Create cross-platform mobile apps for iOS and Android.',
  },
  {
    title: 'Cybersecurity',
    duration: '6 months',
    level: 'Intermediate',
    bg: 'linear-gradient(135deg,#374151,#6b7280)',
    image: 'https://img.freepik.com/free-vector/cyber-security-concept_23-2148532223.jpg?auto=compress&w=600&h=400&fit=crop',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    iconLabel: '🔒 Cybersecurity',
    skills: ['Ethical Hacking', 'Network Security', 'Pen Testing'],
    students: '5K+',
    desc: 'Protect systems and networks with advanced security skills.',
  },
  {
    title: 'Blockchain Dev',
    duration: '6 months',
    level: 'Advanced',
    bg: 'linear-gradient(135deg,#b45309,#f59e0b)',
    image: 'https://images.pexels.com/photos/9577254/pexels-photo-9577254.jpeg?auto=compress&w=600&h=400&fit=crop',
    icon: [
      'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
    ],
    iconLabel: '⛓ Blockchain',
    skills: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi'],
    students: '4K+',
    desc: 'Build decentralized apps on blockchain platforms.',
  },
]

function FlipCard({ course }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ width: '100%', height: '100%', perspective: 1000, cursor: 'pointer' }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* FRONT - Full image background */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
        }}>
          <img
            src={course.image}
            alt={course.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
            onError={e => { e.target.style.display = 'none' }}
          />
          {/* Dark gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.20) 55%, rgba(0,0,0,0.05) 100%)' }} />
          {/* Bottom content */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 18px', zIndex: 2 }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: 8, textShadow: '0 2px 8px rgba(0,0,0,0.4)', lineHeight: 1.3 }}>
              {course.title}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', fontWeight: 600, color: '#fff', background: 'rgba(51,133,170,0.85)', padding: '4px 12px', borderRadius: 16, backdropFilter: 'blur(4px)' }}>
              <svg width="13" height="13" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {course.duration}
            </div>
          </div>
        </div>

        {/* BACK - Plain background with content only */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
          background: 'linear-gradient(160deg,#317FA4 0%,#317FA4 100%)',
          display: 'flex', flexDirection: 'column',
          padding: '26px 22px',
        }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 10, lineHeight: 1.35 }}>
            {course.title}
          </div>
          <div style={{ width: 32, height: 3, borderRadius: 3, background: '#3385AA', marginBottom: 14 }} />
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 18, flexGrow: 1 }}>
            {course.desc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
            {course.skills.map(s => (
              <span key={s} style={{ fontSize: '0.67rem', fontWeight: 600, background: 'rgba(255,255,255,0.12)', color: '#e2f0ff', padding: '5px 11px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.2)' }}>{s}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.73rem', color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14 }}>
            <span>⏱ {course.duration}</span>
            <span>👥 {course.students} enrolled</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TrainingInstitute() {
  const [start, setStart] = useState(0)
  const visible = 4

  useEffect(() => {
    const t = setInterval(() => setStart(p => (p + 1) % courses.length), 3500)
    return () => clearInterval(t)
  }, [])

  const prev = () => setStart(p => (p - 1 + courses.length) % courses.length)
  const next = () => setStart(p => (p + 1) % courses.length)

  const displayed = Array.from({ length: visible }, (_, i) => courses[(start + i) % courses.length])

  return (
    <section style={{ background: '#f8fafc', padding: '48px 0 40px' }}>
      <style>{`
        .ti-grid { display: flex; gap: 20px; justify-content: center; overflow: hidden; padding: 12px 4px; flex-wrap: nowrap; }
        .ti-card { flex-shrink: 0; width: 260px; height: 340px; perspective: 1000px; cursor: pointer; }
        @media (max-width: 640px) {
          .ti-grid { flex-wrap: wrap; gap: 16px; }
          .ti-card { width: calc(50% - 8px); height: 280px; }
        }
        @media (max-width: 400px) {
          .ti-card { width: 100%; height: 260px; }
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <div data-aos="fade-up" data-aos-duration="700" style={{ textAlign: 'center', marginBottom: 44 }}>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: '#317FA4', marginBottom: 10 }}>
            Training{' '}
            <span style={{ background: 'linear-gradient(90deg,#317FA4,#3385AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Institute
            </span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
            Master in-demand skills with expert-led courses and land your dream job
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <button onClick={prev} style={{
            position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, background: '#fff', border: 'none', borderRadius: '50%',
            width: 42, height: 42, boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" fill="none" stroke="#317FA4" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="ti-grid">
            {displayed.map((course, i) => (
              <div key={course.title + i} className="ti-card">
                <FlipCard course={course} /></div>
            ))}
          </div>

          <button onClick={next} style={{
            position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, background: '#fff', border: 'none', borderRadius: '50%',
            width: 42, height: 42, boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" fill="none" stroke="#317FA4" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
          {courses.map((_, i) => (
            <button key={i} onClick={() => setStart(i)} style={{
              width: i === start ? 28 : 8, height: 8,
              borderRadius: 4, border: 'none', cursor: 'pointer',
              background: i === start ? '#317FA4' : '#cbd5e1',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>

      </div>
    </section>
  )
}
