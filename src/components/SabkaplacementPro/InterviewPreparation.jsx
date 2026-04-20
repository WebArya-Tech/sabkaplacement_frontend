import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'
import FloatingParticles from '../FloatingParticles'
import AOS from 'aos'
import 'aos/dist/aos.css'

/* ─── SVG ICONS ─────────────────────────────────────────── */
const Icon = ({ d, size = 22, color = 'currentColor', sw = 1.8 }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
)

const icons = {
  brain:    'M9.663 17h4.673M12 3a9 9 0 010 18M12 3C8 3 5 6.5 5 10c0 2 .8 3.8 2 5M12 3c4 0 7 3.5 7 7 0 2-.8 3.8-2 5',
  video:    ['M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z'],
  code:     ['M10 20l4-16M6 9l-3 3 3 3M18 9l3 3-3 3'],
  people:   ['M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'],
  star:     'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  clock:    ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0'],
  check:    'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0',
  chart:    'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  book:     ['M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'],
  mic:      ['M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z', 'M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8'],
  bulb:     ['M9.663 17h4.673M12 3v1M3.05 11H4M20 11h.95M5.636 5.636l.707.707M17.657 5.636l-.707.707M12 6a5 5 0 015 5c0 2.5-1.5 4.5-3.5 5.5V17H10.5v-.5C8.5 15.5 7 13.5 7 11a5 5 0 015-5z'],
  lock:     ['M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'],
  arrow:    'M13 7l5 5m0 0l-5 5m5-5H6',
}

/* ─── DATA ───────────────────────────────────────────────── */
const tracks = [
  {
    id: 1, label: 'Software Engineering',
    color: '#317FA4', bg: 'linear-gradient(135deg,#317FA4,#3385AA)',
    img: '/softwareengineer.png',
    icon: icons.code, questions: 250, topics: 18,
    desc: 'DSA, System Design, Coding rounds for product & service companies.',
    tags: ['Arrays', 'Trees', 'System Design', 'LLD', 'HLD'],
  },
  {
    id: 2, label: 'Behavioral / HR',
    color: '#be185d', bg: 'linear-gradient(135deg,#be185d,#f43f5e)',
    img: '/hr.png',
    icon: icons.people, questions: 120, topics: 10,
    desc: 'STAR method answers, leadership, teamwork, and culture-fit questions.',
    tags: ['STAR Method', 'Leadership', 'Conflict', 'Goals', 'Culture'],
  },
  {
    id: 3, label: 'Data Science & ML',
    color: '#0f766e', bg: 'linear-gradient(135deg,#0f766e,#14b8a6)',
    img: '/ai.png',
    icon: icons.chart, questions: 180, topics: 14,
    desc: 'ML fundamentals, statistics, SQL, Python, model evaluation questions.',
    tags: ['Python', 'ML Algorithms', 'Statistics', 'SQL', 'Deep Learning'],
  },
  {
    id: 4, label: 'Product Management',
    color: '#7c3aed', bg: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    img: '/product1.png',
    icon: icons.bulb, questions: 90, topics: 8,
    desc: 'Product sense, metrics, roadmaps, case studies, prioritisation.',
    tags: ['Product Sense', 'Metrics', 'Roadmap', 'GTM', 'Case Study'],
  },
  {
    id: 5, label: 'UI/UX Design',
    color: '#b45309', bg: 'linear-gradient(135deg,#b45309,#f97316)',
    img: '/ui.png',
    icon: icons.bulb, questions: 80, topics: 7,
    desc: 'Portfolio critique, design process, usability testing, Figma live tasks.',
    tags: ['Design Process', 'Figma', 'Usability', 'Portfolio', 'Critique'],
  },
  {
    id: 6, label: 'Digital Marketing',
    color: '#0369a1', bg: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
    img: '/digital.png',
    icon: icons.chart, questions: 100, topics: 9,
    desc: 'SEO, paid ads, analytics, growth hacking, and campaign strategy.',
    tags: ['SEO', 'Google Ads', 'Analytics', 'Email', 'Growth'],
  },
]

const features = [
  { icon: icons.video,  color: '#317FA4', img: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&w=600&h=360&fit=crop', title: 'Mock Video Interview',   desc: 'Record your answers and get AI feedback on tone, pace, and content.' },
  { icon: icons.brain,  color: '#be185d', img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&w=600&h=360&fit=crop', title: 'AI Answer Coach',        desc: 'Paste your answer — AI scores it and suggests improvements instantly.' },
  { icon: icons.clock,  color: '#0f766e', img: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&w=600&h=360&fit=crop', title: 'Timed Practice Mode',    desc: '60-second timer per question. Build real interview pressure resistance.' },
  { icon: icons.book,   color: '#7c3aed', img: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&w=600&h=360&fit=crop',   title: '1000+ Question Bank',    desc: 'Curated questions across roles, companies, and difficulty levels.' },
  { icon: icons.mic,    color: '#b45309', img: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&w=600&h=360&fit=crop', title: 'Voice & Text Practice',  desc: 'Speak or type your answers — both modes fully supported.' },
  { icon: icons.star,   color: '#0369a1', img: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&w=600&h=360&fit=crop', title: 'Company-wise Sets',      desc: 'Google, Amazon, TCS, Infosys — targeted question sets per company.' },
]

const steps = [
  { n: '01', icon: icons.book,   color: '#317FA4', title: 'Pick Your Track',      desc: 'Choose your role — Software, HR, Data Science, or Product.' },
  { n: '02', icon: icons.brain,  color: '#be185d', title: 'Practice Questions',   desc: 'Work through curated questions at your own pace or in timer mode.' },
  { n: '03', icon: icons.mic,    color: '#0f766e', title: 'Record Mock Interview', desc: 'Record a video answer. AI analyses your delivery & content.' },
  { n: '04', icon: icons.chart,  color: '#7c3aed', title: 'Review & Improve',     desc: 'See your score, mistakes, and AI-suggested model answers.' },
]

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function InterviewPreparation() {
  const [hoveredTrack, setHoveredTrack] = useState(null)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [winW, setWinW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' })
    const handleResize = () => setWinW(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = winW < 640
  const isTablet = winW < 1024

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui,sans-serif' }}>
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{
        background: 'transparent',
        padding: '0', position: 'relative', overflow: 'hidden', minHeight: isMobile ? 'auto' : 520,
        display: 'flex', alignItems: 'center',
      }}>
        {/* decorative circles */}
        <FloatingParticles color="#3385AA" count={20} opacity={0.6} />
        <div style={{ position:'absolute', top:-100, right:-100, width:420, height:420, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />
        <div style={{ position:'absolute', bottom:-120, left:-80, width:480, height:480, borderRadius:'50%', background:'rgba(255,255,255,0.03)' }} />

        <div style={{ maxWidth:1100, margin:'0 auto', padding: isMobile ? '40px 16px' : '72px 24px', display:'flex', alignItems:'center', gap: isMobile ? 28 : 56, flexWrap:'wrap', position:'relative', width:'100%' }}>

          {/* left copy */}
          <div style={{ flex:'1 1 360px' }}>
            <h1 style={{ fontSize:'clamp(1.9rem,4.5vw,3.2rem)', fontWeight:900, color:'#317FA4', lineHeight:1.1, marginBottom:16, letterSpacing:'-0.02em' }}>
              Crack Your Next<br />
              <span style={{ background:'linear-gradient(90deg,#317FA4,#3385AA)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Interview with Confidence
              </span>
            </h1>
            <p style={{ fontSize:'1rem', color:'#64748b', maxWidth:480, lineHeight:1.7, marginBottom:32 }}>
              AI-powered mock interviews, 1000+ real questions, timed practice, and personalised feedback — everything you need to land the offer.
            </p>

          </div>

          {/* right image */}
          <div style={{
            flex:'1 1 280px', maxWidth: isMobile ? '100%' : 460, width: isMobile ? '100%' : undefined,
            borderRadius:24, overflow:'hidden',
            boxShadow:'0 20px 60px rgba(26,75,115,0.18)', border:'1px solid #e2e8f0',
            height: isMobile ? 220 : 360, position:'relative',
            backgroundImage:"url('https://images.pexels.com/photos/7644067/pexels-photo-7644067.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop&h=560')",
            backgroundSize:'cover', backgroundPosition:'center',
          }} />

        </div>
      </section>

      {/* ══ TRACKS ═══════════════════════════════════════════ */}
      <section style={{ background:'#f8fafc', padding: isMobile ? '48px 16px' : '72px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:50 }}>
            <h2 style={{ fontSize:'clamp(1.5rem,2.8vw,2.2rem)', fontWeight:900, color:'#317FA4' }}>What Role Are You Preparing For?</h2>
          </div>

          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(300px,1fr))', gap:24 }}>
            {tracks.map((t, i) => (
              <div
                key={t.id}
                onClick={() => setHoveredTrack(i)}
                onMouseEnter={() => setHoveredTrack(i)}
                onMouseLeave={() => setHoveredTrack(null)}
                style={{
                  height:260, perspective:900, cursor:'pointer',
                  borderRadius:20, boxSizing:'border-box',
                }}
              >
                {/* flipper */}
                <div style={{
                  position:'relative', width:'100%', height:'100%',
                  transformStyle:'preserve-3d',
                  transform: hoveredTrack === i ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition:'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)',
                  borderRadius:18,
                }}>

                  {/* ── FRONT: image ── */}
                  <div style={{
                    position:'absolute', inset:0, borderRadius:18, overflow:'hidden',
                    backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden',
                    boxShadow:'0 3px 14px rgba(0,0,0,0.10)',
                  }}>
                    <img
                      src={t.img} alt={t.label}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                      onError={e => { e.target.style.display='none'; e.target.parentNode.style.background=t.bg }}
                    />
                    <div style={{
                      position:'absolute', bottom:0, left:0, right:0,
                      background:'linear-gradient(to top,rgba(0,0,0,0.82),transparent)',
                      padding:'36px 18px 16px',
                    }}>
                      <div style={{ color:'#fff', fontWeight:800, fontSize:'1rem', letterSpacing:'-0.01em' }}>{t.label}</div>
                    </div>
                  </div>

                  {/* ── BACK: content ── */}
                  <div style={{
                    position:'absolute', inset:0, borderRadius:18, overflow:'hidden',
                    backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden',
                    transform:'rotateY(180deg)',
                    background: t.bg,
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                    padding:'28px 22px', textAlign:'center',
                    boxShadow:'0 8px 32px rgba(0,0,0,0.14)',
                  }}>
                    <div style={{
                      width:54, height:54, borderRadius:16,
                      background:'rgba(255,255,255,0.18)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      marginBottom:16,
                    }}>
                      <Icon d={t.icon} size={26} color="#fff" />
                    </div>
                    <div style={{ color:'#fff', fontWeight:800, fontSize:'1.05rem', marginBottom:12 }}>{t.label}</div>
                    <p style={{ color:'rgba(255,255,255,0.88)', fontSize:'0.83rem', lineHeight:1.7, margin:0 }}>{t.desc}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ═════════════════════════════════════════ */}
      <section style={{ background:'#fff', padding: isMobile ? '48px 16px' : '72px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:50 }}>
            <h2 style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:900, color:'#317FA4', letterSpacing:'-0.02em', margin:0 }}>
              Practice. Improve. <span style={{ background:'linear-gradient(90deg,#be185d,#f43f5e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Get Hired.</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(300px,1fr))', gap: isMobile ? 16 : 24 }}>
            {features.map((f, i) => (
              <div
                key={i}
                data-aos="zoom-in-left"
                data-aos-delay={i * 80}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  background:'#fff', borderRadius:20, overflow:'hidden',
                  boxShadow: hoveredFeature === i ? `0 20px 50px ${f.color}30` : '0 2px 16px rgba(0,0,0,0.07)',
                  transform: hoveredFeature === i ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                  transition: 'all 0.32s cubic-bezier(0.4,0,0.2,1)',
                  cursor: 'pointer',
                }}
              >
                {/* image */}
                <div style={{ position:'relative', height:180, overflow:'hidden' }}>
                  <img
                    src={f.img} alt={f.title}
                    style={{
                      width:'100%', height:'100%', objectFit:'cover', display:'block',
                      transform: hoveredFeature === i ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.45s ease',
                    }}
                    onError={e => { e.target.style.display='none'; e.target.parentNode.style.background=`${f.color}22` }}
                  />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.06),rgba(0,0,0,0.42))' }} />
                  <div style={{
                    position:'absolute', top:14, left:14,
                    width:42, height:42, borderRadius:12,
                    background: f.color,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    boxShadow:`0 4px 14px ${f.color}66`,
                  }}>
                    <Icon d={f.icon} size={20} color="#fff" />
                  </div>
                </div>
                {/* content */}
                <div style={{ padding:'18px 20px 22px' }}>
                  <div style={{ fontWeight:800, color:'#317FA4', marginBottom:7, fontSize:'0.97rem' }}>{f.title}</div>
                  <p style={{ fontSize:'0.8rem', color:'#64748b', lineHeight:1.65, margin:0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══ SHOWCASE IMAGE STRIP ═════════════════════════════ */}
      <section style={{ background:'#fff', padding: isMobile ? '40px 16px' : '64px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)', fontWeight:900, color:'#317FA4' }}>Real Interviews. Real Practice.</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(auto-fit,minmax(260px,1fr))', gap: isMobile ? 16 : 20 }}>
            {[
              { img:'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&w=600&h=400&fit=crop', label:'Group Discussion Prep' },
              { img:'/one.png', 
              label:'One-on-One Mock Interview' },
              { img:'/technical.png', label:'Technical Coding Round' },
              { img:'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&w=600&h=400&fit=crop', label:'HR Round Mastery' },
            ].map((item, i) => (
              <div key={i} style={{ borderRadius:18, overflow:'hidden', position:'relative', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
                <img src={item.img} alt={item.label} style={{ width:'100%', height:200, objectFit:'cover', display:'block' }}
                  onError={e => { e.target.src=''; e.target.parentNode.style.background='#e2e8f0'; e.target.style.display='none' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(to top,rgba(15,45,71,0.9),transparent)', padding:'28px 16px 14px' }}>
                  <div style={{ color:'#fff', fontWeight:700, fontSize:'0.88rem' }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
