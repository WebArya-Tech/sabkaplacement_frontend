import React from 'react'
import { getPublicCompanies } from '../services/companyApi'

const palette = ['#4285F4', '#00A4EF', '#FF9900', '#0055A5', '#007CC3', '#341C72', '#A100FF', '#1261A5']

function CompanyCard({ name, logo, color }) {
  const [imgError, setImgError] = React.useState(false)
  return (
    <div style={{
      flexShrink: 0,
      width: 160,
      height: 80,
      background: '#fff',
      borderRadius: 14,
      border: `1.5px solid ${color}33`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 10px',
      padding: '10px 16px',
      boxShadow: `0 2px 12px ${color}18`,
    }}>
      {logo && !imgError ? (
        <img
          src={logo}
          alt={name}
          style={{ maxWidth: 100, maxHeight: 36, objectFit: 'contain' }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span style={{ fontWeight: 800, fontSize: 13, color: color, textAlign: 'center' }}>
          {name}
        </span>
      )}
    </div>
  )
}

function ScrollRow({ items, direction, speed }) {
  const doubled = items.length > 1 ? [...items, ...items] : items
  const totalWidth = items.length * 180
  const animName = direction === 'left' ? 'compScrollLeft' : 'compScrollRight'
  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative', padding: '8px 0' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, height: '100%', width: 80,
        background: 'linear-gradient(to right, #f8fafc, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, height: '100%', width: 80,
        background: 'linear-gradient(to left, #f8fafc, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: items.length > 1 ? `${animName} ${speed}s linear infinite` : 'none',
      }}>
        {doubled.map((c, i) => (
          <CompanyCard key={i} name={c.name} logo={c.logo} color={c.color} />
        ))}
      </div>
      <style>{`
        @keyframes compScrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
        @keyframes compScrollRight {
          0%   { transform: translateX(-${totalWidth}px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

export default function TopCompaniesScroll() {
  const [companies, setCompanies] = React.useState([])

  React.useEffect(() => {
    getPublicCompanies(40)
      .then((data) => {
        const normalized = (Array.isArray(data) ? data : []).map((c, idx) => ({
          name: c.name,
          logo: c.logo || '',
          color: palette[idx % palette.length],
        }))
        setCompanies(normalized)
      })
      .catch(() => {
        setCompanies([])
      })
  }, [])

  const source = companies
  const half = Math.ceil(source.length / 2)
  const row1 = source.slice(0, half)
  const row2 = source.slice(half)
  const finalRow2 = row2.length ? row2 : source

  return (
    <section style={{ background: '#f8fafc', padding: '56px 0 48px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36, padding: '0 24px' }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
          fontWeight: 800,
          color: '#317FA4',
          marginBottom: 8,
        }}>
          Top Companies
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
          Join thousands of professionals at India's leading companies
        </p>
      </div>
      {source.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b', margin: 0 }}>No registered companies yet.</p>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <ScrollRow items={row1} direction="left" speed={35} />
          </div>
          <ScrollRow items={finalRow2} direction="right" speed={38} />
        </>
      )}
    </section>
  )
}
