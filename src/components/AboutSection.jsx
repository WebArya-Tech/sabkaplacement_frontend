import React from 'react'
import { Link } from 'react-router-dom'

const stats = [
  { value: '20K+',  label: 'Job Openings Daily' },
  { value: '50K+',  label: 'Companies Registered' },
  { value: '2.5L+', label: 'Active Job Seekers' },
  { value: '98%',   label: 'Placement Rate' },
]

const highlights = [
  { icon: '🎯', text: 'AI-powered job matching tailored to your skills' },
  { icon: '🏢', text: 'Top MNCs, startups & product companies hiring daily' },
  { icon: '📄', text: 'Resume builder with expert tips & ATS optimization' },
  { icon: '🚀', text: 'Early applicant alerts so you never miss a role' },
  { icon: '🤝', text: 'Dedicated placement support from our team' },
]

export default function AboutSection() {
  return (
    <section style={{ background: '#fff', padding: '64px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 56,
          alignItems: 'center',
        }}>

          {/* Left — Image */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="ease-out-back"
            style={{ position: 'relative' }}
          >
            {/* Floating accent dot top-right */}
            <div style={{
              position: 'absolute', top: -14, right: -14,
              width: 52, height: 52,
              background: 'linear-gradient(135deg, #3385AA, #317FA4)',
              borderRadius: '50%',
              opacity: 0.18,
              zIndex: 0,
            }} />
            {/* Floating accent dot bottom-left */}
            <div style={{
              position: 'absolute', bottom: -18, left: -18,
              width: 80, height: 80,
              background: 'linear-gradient(135deg, #3385AA, #317FA4)',
              borderRadius: '50%',
              opacity: 0.12,
              zIndex: 0,
            }} />
            <img
              src="/companies1.png"
              alt="About Sabka Placement"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="800"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                borderRadius: 24,
                boxShadow: '0 20px 60px rgba(26,75,115,0.18)',
                objectFit: 'cover',
                transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.45s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.04) rotate(-1deg)'
                e.currentTarget.style.boxShadow = '0 32px 80px rgba(26,75,115,0.32)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(26,75,115,0.18)'
              }}
            />
          </div>

          {/* Right — Content */}
          <div>

            <h2 style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
              fontWeight: 900,
              color: '#317FA4',
              lineHeight: 1.25,
              marginBottom: 16,
            }}>
              Welcome to
              <br />
              <span style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900,
                background: 'linear-gradient(90deg, #317FA4, #3385AA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}>Sabka Placement</span>
            </h2>

            <p style={{
              fontSize: '0.97rem',
              color: '#475569',
              lineHeight: 1.8,
              marginBottom: 24,
              maxWidth: 480,
            }}>
              We connect talented individuals with the right career opportunities
              by bridging the gap between skilled candidates and top companies.
              Our platform simplifies hiring for employers and helps job seekers
              find meaningful careers that match their skills and goals. Our mission
              is to empower talent and build a future where the right opportunity
              meets the right person.
            </p>


          </div>

        </div>
      </div>
    </section>
  )
}
