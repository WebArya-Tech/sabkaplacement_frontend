import React, { useEffect } from 'react'
import CopyNavbar from '../../components copy/Navbar'
import Footer from '../../components/Footer'
import AOS from 'aos'
import 'aos/dist/aos.css'

const techs = [
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: '.NET',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
  { name: 'Kotlin',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'Laravel',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'Cloud',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Node.js',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'React',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'PHP',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Dart',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'Tailwind CSS',logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Java',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Python',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Flutter',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'HTML',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'Bootstrap',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'TypeScript',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Vue.js',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'MongoDB',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Docker',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'CSS',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Swift',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'Redux',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  { name: 'PostgreSQL',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
]

export default function TopTechnologies() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' })
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <CopyNavbar />

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #317FA4 0%, #317FA4 50%, #3385AA 100%)',
        padding: '72px 24px 56px',
        textAlign: 'center',
      }}>
        <p
          data-aos="fade-down"
          data-aos-duration="600"
          style={{
            fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#93c5fd', marginBottom: 12,
          }}
        >
          Skills &amp; Expertise
        </p>
        <h1
          data-aos="fade-up"
          data-aos-duration="700"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          Top Technologies
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="700"
          style={{
            fontSize: '1rem',
            color: '#bfdbfe',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          In-demand skills and technologies that leading companies are actively hiring for
        </p>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 72px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 20,
        }}>
          {techs.map((tech, i) => (
            <div
              key={i}
              data-aos="zoom-in"
              data-aos-delay={Math.floor(i / 5) * 80 + (i % 5) * 40}
              data-aos-duration="500"
              style={{
                background: '#fff',
                borderRadius: 16,
                border: '1.5px solid #e8edf2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '28px 16px 20px',
                gap: 14,
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                cursor: 'default',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(26,75,115,0.14)'
                e.currentTarget.style.borderColor = '#3385AA'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
                e.currentTarget.style.borderColor = '#e8edf2'
              }}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                width={64}
                height={64}
                style={{ objectFit: 'contain' }}
                onError={e => { e.target.style.opacity = 0 }}
              />
              <span style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#1e3a5f',
                textAlign: 'center',
                lineHeight: 1.3,
              }}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}


