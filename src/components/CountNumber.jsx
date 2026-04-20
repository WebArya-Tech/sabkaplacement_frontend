import React, { useEffect, useRef, useState } from 'react'
import { getPublicCompanySummary } from '../services/companyApi'

const fallbackStats = [
  { end: 50000, suffix: '+', label: 'Jobs Listed' },
  { end: 10000, suffix: '+', label: 'Companies' },
  { end: 95, suffix: '%', label: 'Placement Rate' },
  { end: 500, suffix: '+', label: 'Recruiters' },
  { end: 200, suffix: '+', label: 'Cities' },
]

function useCountUp(end, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, end, duration])
  return count
}

function StatItem({ stat, started, index }) {
  const count = useCountUp(stat.end, 1800 + index * 100, started)
  return (
    <div style={{
      flex: '1 1 140px',
      textAlign: 'center',
      padding: '0 24px',
      borderRight: index < 4 ? '1px solid #e2e8f0' : 'none',
    }}>
      <div style={{
        fontSize: 'clamp(1.3rem,2.8vw,2rem)',
        fontWeight: 900,
        color: '#317FA4',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div style={{
        marginTop: 8,
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#64748b',
        letterSpacing: '0.03em',
      }}>
        {stat.label}
      </div>
    </div>
  )
}

export default function CountNumber() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const [stats, setStats] = useState(fallbackStats)

  useEffect(() => {
    getPublicCompanySummary()
      .then((s) => {
        setStats([
          { end: Number(s.jobsListed) || 0, suffix: '+', label: 'Jobs Listed' },
          { end: Number(s.companies) || 0, suffix: '+', label: 'Companies' },
          { end: Number(s.placementRate) || 95, suffix: '%', label: 'Placement Rate' },
          { end: Number(s.recruiters) || 0, suffix: '+', label: 'Recruiters' },
          { end: Number(s.cities) || 0, suffix: '+', label: 'Cities' },
        ])
      })
      .catch(() => {
        setStats(fallbackStats)
      })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        padding: '32px 24px',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
      }}>
        {stats.map((stat, i) => (
          <StatItem key={i} stat={stat} started={started} index={i} />
        ))}
      </div>
    </section>
  )
}
