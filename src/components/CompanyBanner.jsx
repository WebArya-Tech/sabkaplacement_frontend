import React from 'react'
import { getPublicCompanies, getPublicCompanySummary } from '../services/companyApi'

const palette = ['#4285F4', '#00A4EF', '#FF9900', '#0055A5', '#007CC3', '#341C72', '#A100FF', '#1261A5']

const initialsFromName = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'Co'

export default function CompanyBanner() {
  const [companies, setCompanies] = React.useState([])
  const [jobsListed, setJobsListed] = React.useState(0)

  React.useEffect(() => {
    getPublicCompanies(25)
      .then((data) => {
        const list = Array.isArray(data) ? data : []
        setCompanies(list)
      })
      .catch(() => setCompanies([]))

    getPublicCompanySummary()
      .then((data) => setJobsListed(Number(data?.jobsListed) || 0))
      .catch(() => setJobsListed(0))
  }, [])

  const track = companies.length > 1 ? [...companies, ...companies] : companies

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #317FA4 0%, #317FA4 60%, #317FA4 100%)',
        padding: '0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          minHeight: 72,
        }}
      >
        {/* Left stat block */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 28px 14px 24px',
            borderRight: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.04)',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
              {jobsListed.toLocaleString()}+
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.60)', fontWeight: 500, marginTop: 3, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Openings daily
            </div>
          </div>
          <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.15)' }} />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.50)', fontWeight: 500, marginBottom: 3, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Trusted by
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>
              Top Companies
            </div>
          </div>
        </div>

        {/* Scrolling logos */}
        <div className="relative flex-1 overflow-hidden" style={{ display: 'flex', alignItems: 'center' }}>
          {/* Left fade */}
          <div
            style={{
              position: 'absolute', left: 0, top: 0, height: '100%', width: 48,
              background: 'linear-gradient(to right, #317FA4, transparent)',
              zIndex: 10, pointerEvents: 'none',
            }}
          />
          {/* Right fade */}
          <div
            style={{
              position: 'absolute', right: 0, top: 0, height: '100%', width: 48,
              background: 'linear-gradient(to left, #317FA4, transparent)',
              zIndex: 10, pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              animation: companies.length > 1 ? 'banner-marquee 40s linear infinite' : 'none',
              width: 'max-content',
            }}
          >
            {track.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '0 24px',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'default',
                  userSelect: 'none',
                }}
              >
                {/* Logo badge */}
                {c.logo ? (
                  <img
                    src={c.logo}
                    alt={c.name}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      objectFit: 'cover',
                      background: '#fff',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: palette[i % palette.length],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: initialsFromName(c.name).length > 2 ? '0.65rem' : '0.8rem',
                      fontWeight: 900,
                      color: '#fff',
                      flexShrink: 0,
                      letterSpacing: '-0.02em',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    }}
                  >
                    {initialsFromName(c.name)}
                  </div>
                )}
                {/* Company name */}
                <span
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.88)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.01em',
                  }}
                >
                  {c.name}
                </span>
              </div>
            ))}
          </div>
          {companies.length === 0 && (
            <div style={{ padding: '0 16px', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 600 }}>
              No registered companies yet
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes banner-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

