import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'
import FloatingParticles from '../FloatingParticles'
import AOS from 'aos'
import 'aos/dist/aos.css'

/* --- ICON HELPER ------------------------------------------- */
const Icon = ({ d, size = 22, color = 'currentColor', sw = 1.8 }) => (
  <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
)

/* --- DATA ------------------------------------------------- */
const trendingRoles = [
  { role: 'Full Stack Developer',  salary: '₹8-22 LPA',  growth: '+34%', demand: 'Very High', color: '#317FA4',  img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600&h=360&fit=crop' },
  { role: 'Data Scientist',        salary: '₹10-28 LPA', growth: '+41%', demand: 'Very High', color: '#0f766e',  img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&w=600&h=360&fit=crop' },
  { role: 'Product Manager',       salary: '₹14-35 LPA', growth: '+28%', demand: 'High',      color: '#7c3aed',  img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&w=600&h=360&fit=crop' },
  { role: 'DevOps Engineer',       salary: '₹9-24 LPA',  growth: '+38%', demand: 'Very High', color: '#b45309',  img: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&w=600&h=360&fit=crop' },
  { role: 'UI/UX Designer',        salary: '₹6-18 LPA',  growth: '+25%', demand: 'High',      color: '#be185d',  img: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&w=600&h=360&fit=crop' },
  { role: 'Cloud Architect',       salary: '₹16-40 LPA', growth: '+52%', demand: 'Critical',  color: '#0369a1',  img: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&w=600&h=360&fit=crop' },
]

const salaryGuide = [
  { level: 'Fresher (0-1 yr)',     range: '₹3-6 LPA',   tip: 'Focus on building a strong portfolio and certifications.' },
  { level: 'Junior (1-3 yrs)',     range: '₹5-10 LPA',  tip: 'Aim for a 25-30% hike when switching. Negotiate with data.' },
  { level: 'Mid-Level (3-6 yrs)', range: '₹9-18 LPA',  tip: 'Specialise in a skill — it can double your market value.' },
  { level: 'Senior (6-10 yrs)',   range: '₹16-28 LPA', tip: 'Leadership roles open faster when you mentor others.' },
  { level: 'Lead / Architect',    range: '₹24-45 LPA', tip: 'System design and team management are worth extra ₹5-8 LPA.' },
  { level: 'Director / VP',       range: '₹40-80 LPA', tip: 'Network actively. Most senior roles are filled via referrals.' },
]

const topSkills = [
  { skill: 'Generative AI & LLMs',  badge: '🔥 Hottest', color: '#be185d' },
  { skill: 'Cloud (AWS / Azure)',    badge: '📈 Growing', color: '#0369a1' },
  { skill: 'React / Next.js',        badge: '💡 In Demand', color: '#317FA4' },
  { skill: 'Data Engineering',       badge: '📈 Growing', color: '#0f766e' },
  { skill: 'Kubernetes & Docker',    badge: '⚙️ DevOps',  color: '#b45309' },
  { skill: 'Product Analytics',      badge: '📊 Rising',  color: '#7c3aed' },
  { skill: 'Cybersecurity',          badge: '🔒 Critical', color: '#dc2626' },
  { skill: 'TypeScript',             badge: '✅ Standard', color: '#317FA4' },
]

const careerTips = [
  {
    icon: ['M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'],
    color: '#317FA4', title: 'Build a T-Shaped Skill Set',
    desc: 'Be deep in one skill (the vertical) and broad in several others (the horizontal). It makes you both specialist and versatile.',
    tag: 'Career Strategy',
  },
  {
    icon: ['M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'],
    color: '#0f766e', title: 'Networking Beats Job Boards',
    desc: '70% of jobs are never posted. Build your LinkedIn, attend meetups, reach out to engineers at your target companies directly.',
    tag: 'Job Search',
  },
  {
    icon: ['M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'],
    color: '#7c3aed', title: 'Negotiate Every Offer',
    desc: 'Only 37% of candidates negotiate. Those who do earn ₹1-3 LPA more on average. Always counter-offer — the worst they say is no.',
    tag: 'Salary',
  },
  {
    icon: ['M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'],
    color: '#be185d', title: 'Certifications = Fast Hike',
    desc: 'AWS, GCP, PMP, or CFA certifications can add ₹2-6 LPA to your package. Online certifications from Coursera/Google are recruiter-verified.',
    tag: 'Upskilling',
  },
  {
    icon: ['M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
    color: '#b45309', title: 'Switch Strategically',
    desc: 'The ideal switch window is 18-24 months. Too early looks unstable. Too late means you left money on the table.',
    tag: 'Job Change',
  },
  {
    icon: ['M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064'],
    color: '#0369a1', title: 'Personal Branding on LinkedIn',
    desc: 'Recruiters search LinkedIn 200M+ times a day. Optimise your headline, add a strong About section, and post once a week.',
    tag: 'Visibility',
  },
]

const industryOutlook = [
  { industry: 'IT & Software',       outlook: 'Booming',  color: '#317FA4', pct: 92, icon: '💻' },
  { industry: 'FinTech',             outlook: 'Strong',   color: '#0f766e', pct: 84, icon: '💻' },
  { industry: 'E-Commerce',          outlook: 'Stable',   color: '#7c3aed', pct: 76, icon: '💻' },
  { industry: 'EdTech',              outlook: 'Recovering',color: '#b45309', pct: 58, icon: '💻' },
  { industry: 'HealthTech',          outlook: 'Growing',  color: '#0369a1', pct: 78, icon: '💻' },
  { industry: 'Manufacturing / Auto',outlook: 'Stable',   color: '#be185d', pct: 65, icon: '💻' },
]

const stats = [
  { n: '2.5M+', l: 'Open Tech Jobs (India 2026)' },
  { n: '34%',   l: 'YoY Growth in AI Roles' },
  { n: '₹14L',  l: 'Avg Senior Dev Salary' },
  { n: '6.2x',  l: 'Return on Upskilling' },
]

/* --- COMPONENT ------------------------------------------- */
export default function CareerInsights() {
  const [openTip, setOpenTip] = useState(null)

  useEffect(() => { AOS.init({ duration: 600, once: true }) }, [])

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui,sans-serif', overflowX: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          .ci-hero-inner { flex-direction: column !important; gap: 20px !important; padding: 24px 16px 32px !important; }
          .ci-hero-right { max-width: 100% !important; width: 100% !important; }
          .ci-hero-right img { max-height: 220px !important; }
          .ci-tabs-wrap { padding: 16px 12px !important; }
          .ci-tab-inner { flex-wrap: wrap !important; justify-content: center !important; gap: 6px !important; padding: 5px !important; }
          .ci-tab-btn { padding: 8px 16px !important; font-size: 0.82rem !important; }
          .ci-section { padding: 36px 14px !important; }
          .ci-tips-section { padding: 40px 14px !important; }
          .ci-grid-roles, .ci-grid-tips { grid-template-columns: 1fr !important; gap: 16px !important; }
          .ci-grid-skills { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .ci-learning-paths { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ci-grid-skills { grid-template-columns: 1fr !important; }
          .ci-learning-paths { grid-template-columns: 1fr !important; }
          .ci-hero-inner { padding: 20px 12px 28px !important; }
        }
        @media (min-width: 769px) and (max-width: 1100px) {
          .ci-grid-roles, .ci-grid-tips { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
      <Navbar />

      {/* -- HERO --------------------------------------------- */}
      <section style={{
        background: '#fff',
        padding: '0', position: 'relative', overflow: 'hidden', minHeight: 460,
        display: 'flex', alignItems: 'flex-start',
        borderBottom: '1px solid #f1f5f9',
      }}>
        <FloatingParticles color="#317FA4" count={18} opacity={0.18} />

        <div className="ci-hero-inner" style={{ maxWidth:1100, margin:'0 auto', padding:'28px 24px 48px', display:'flex', alignItems:'center', gap:52, flexWrap:'wrap', position:'relative', width:'100%' }}>

          {/* left */}
          <div className="ci-hero-left" style={{ flex:'1 1 360px' }}>
            <h1 style={{ fontSize:'clamp(2.2rem,4.5vw,3.6rem)', fontWeight:900, color:'#317FA4', lineHeight:1.15, marginBottom:14, letterSpacing:'-0.02em' }}>
              Career Insights &<br />
              <span style={{ background:'linear-gradient(90deg,#317FA4,#3385AA)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Market Intelligence
              </span>
            </h1>
            <p style={{ fontSize:'1.1rem', color:'#64748b', maxWidth:480, lineHeight:1.8, marginBottom:0 }}>
              Real salary data, trending roles, in-demand skills, and expert career strategies — everything you need to make smarter career moves in 2026.
            </p>
          </div>

          {/* right image */}
          <div className="ci-hero-right" style={{ flex:'1 1 400px', maxWidth:560, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img
              src="/career1.png"
              alt="Career Growth"
              style={{ width:'100%', maxHeight:480, objectFit:'contain', display:'block' }}
            />
          </div>
        </div>
      </section>

      {/* -- TAB: TRENDING ROLES ------------------------------ */}
      <section className="ci-section" style={{ padding:'64px 24px' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <div style={{ display:'inline-block', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.14em', color:'#317FA4', textTransform:'uppercase', background:'#e8f2fb', borderRadius:20, padding:'5px 16px', marginBottom:12 }}>2026 Trends</div>
              <h2 style={{ fontSize:'clamp(1.5rem,2.8vw,2.2rem)', fontWeight:900, color:'#317FA4' }}>Highest Demand Roles in 2026</h2>

            </div>
            <div className="ci-grid-roles" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:28 }}>
              {trendingRoles.map((r,i) => (
                <div key={i} data-aos="zoom-out-up" data-aos-delay={i*80} style={{
                  borderRadius:24, overflow:'hidden', background:'#fff',
                  boxShadow:'0 8px 32px rgba(0,0,0,0.10)', border:`1.5px solid ${r.color}22`,
                  transition:'transform 0.22s,box-shadow 0.22s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow=`0 16px 40px ${r.color}33` }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.10)' }}
                >
                  {/* image - full, no crop */}
                  <div style={{ background:'#3385AA', padding:'16px 16px 0', display:'flex', justifyContent:'center', alignItems:'center', minHeight:180 }}>
                    <img src={r.img} alt={r.role}
                      style={{ width:'100%', maxHeight:180, objectFit:'contain', display:'block', borderRadius:12 }}
                      onError={e => { e.target.style.display='none' }} />
                  </div>
                  {/* content */}
                  <div style={{ padding:'18px 20px 20px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                      <div style={{ fontWeight:800, color:'#317FA4', fontSize:'1.05rem' }}>{r.role}</div>
                    </div>
                    <div style={{ display:'flex', gap:10 }}>
                      <div style={{ background:`${r.color}10`, borderRadius:12, padding:'10px 14px', flex:1, textAlign:'center', border:`1px solid ${r.color}25` }}>
                        <div style={{ fontSize:'0.62rem', color:'#94a3b8', fontWeight:700, letterSpacing:'0.08em', marginBottom:4 }}>SALARY RANGE</div>
                        <div style={{ fontSize:'0.92rem', fontWeight:800, color:r.color }}>{r.salary}</div>
                      </div>
                      <div style={{ background:`${r.color}10`, borderRadius:12, padding:'10px 14px', flex:1, textAlign:'center', border:`1px solid ${r.color}25` }}>
                        <div style={{ fontSize:'0.62rem', color:'#94a3b8', fontWeight:700, letterSpacing:'0.08em', marginBottom:4 }}>DEMAND</div>
                        <div style={{ fontSize:'0.92rem', fontWeight:800, color: r.demand==='Critical' ? '#dc2626' : r.demand==='Very High' ? '#317FA4' : '#0f766e' }}>{r.demand}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      {/* -- CAREER TIPS SECTION ------------------------------ */}
      <section className="ci-tips-section" style={{ background: '#f8fafc', padding:'72px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            
            <h2 style={{ fontSize:'clamp(1.5rem,2.8vw,2.2rem)', fontWeight:900, color:'#317FA4' }}>Career Strategy Tips</h2>
          </div>
          <div className="ci-grid-tips" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:24 }}>
            {careerTips.map((t,i) => (
              <div key={i} data-aos="zoom-out-up" data-aos-delay={i*80} style={{
                background: openTip===i ? '#fff' : '#f1f5f9', borderRadius:20, padding:'32px 24px 28px',
                border:`1.5px solid ${openTip===i ? t.color : '#e2e8f0'}`,
                boxShadow: openTip===i ? '0 12px 36px rgba(0,0,0,0.22)' : '0 4px 18px rgba(0,0,0,0.10)',
                cursor:'pointer', transition:'all 0.25s',
                display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
              }}
                onClick={() => setOpenTip(openTip===i ? null : i)}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.22)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=openTip===i?'0 12px 36px rgba(0,0,0,0.22)':'0 4px 18px rgba(0,0,0,0.10)' }}
              >
                {/* icon circle */}
                <div style={{ width:60, height:60, borderRadius:'50%', background:t.color, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, boxShadow:`0 4px 18px ${t.color}88` }}>
                  <Icon d={t.icon} size={26} color='#fff' sw={2} />
                </div>
                {/* tag */}
                <div style={{ fontSize:'0.62rem', fontWeight:700, color:t.color, background:`${t.color}18`, borderRadius:20, padding:'3px 12px', display:'inline-block', marginBottom:10, letterSpacing:'0.06em' }}>{t.tag}</div>
                {/* title */}
                <div style={{ fontWeight:800, color:'#317FA4', fontSize:'1.05rem', lineHeight:1.3, marginBottom:12 }}>{t.title}</div>
                {/* description */}
                {openTip===i ? (
                  <p style={{ fontSize:'0.84rem', color:'#475569', lineHeight:1.75, margin:0, paddingTop:12, borderTop:`1px solid ${t.color}22`, width:'100%', textAlign:'left' }}>
                    {t.desc}
                  </p>
                ) : (
                  <p style={{ fontSize:'0.82rem', color:'#64748b', margin:0, lineHeight:1.6 }}>
                    {t.desc.slice(0,65)} <span style={{ color:t.color, fontWeight:700 }}>Read more</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


