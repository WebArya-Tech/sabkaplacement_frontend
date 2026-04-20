import React from 'react'

const row1 = [
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Flutter',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'MongoDB',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Docker',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'MySQL',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
]

const row2 = [
  { name: '.NET',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
  { name: 'Kotlin',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'Laravel',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'PHP',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Dart',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'Tailwind CSS',logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'HTML',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'Bootstrap',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'Vue.js',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Git',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
]

function TechCard({ tech }) {
  return (
    <div style={{
      flexShrink: 0, background: '#fff', borderRadius: 14,
      border: '1.5px solid #e8edf2', display: 'flex',
      flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '18px 20px',
      gap: 10, width: 120, margin: '0 8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    }}>
      <img src={tech.logo} alt={tech.name} width={44} height={44}
        style={{ objectFit: 'contain' }}
        onError={e => { e.target.style.opacity = 0 }} />
      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1e3a5f', textAlign: 'center', whiteSpace: 'nowrap' }}>
        {tech.name}
      </span>
    </div>
  )
}

const TRACK_W = row1.length * 136

export default function TechGridSection() {
  return (
    <section style={{ background: '#f5f7fa', padding: '56px 0 64px', overflow: 'hidden' }}>
      <style>{`
        @keyframes techLeft  { from { transform: translateX(0); } to { transform: translateX(-${TRACK_W}px); } }
        @keyframes techRight { from { transform: translateX(-${TRACK_W}px); } to { transform: translateX(0); } }
        .tech-mask { mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent); }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: 40, padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, color: '#317FA4', marginBottom: 10 }}>Top Technologies</h2>
        <p style={{ fontSize: '0.92rem', color: '#64748b', margin: 0 }}>In-demand skills that leading companies are actively hiring for</p>
      </div>

      <div className="tech-mask" style={{ overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'techLeft 28s linear infinite' }}>
          {[...row1, ...row1].map((t, i) => <TechCard key={i} tech={t} />)}
        </div>
      </div>

      <div className="tech-mask" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'techRight 32s linear infinite' }}>
          {[...row2, ...row2].map((t, i) => <TechCard key={i} tech={t} />)}
        </div>
      </div>
    </section>
  )
}
