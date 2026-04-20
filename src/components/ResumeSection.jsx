import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResumeSection() {
  const navigate = useNavigate()
  return (
    <section style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fb 100%)', padding: '40px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 60,
          alignItems: 'center',
        }}>

          {/* Left — Content */}
          <div data-aos="fade-right" data-aos-duration="900">

            <h2 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
              fontWeight: 900,
              color: '#317FA4',
              lineHeight: 1.25,
              marginBottom: 12,
            }}>
              Build a Resume That
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #317FA4, #3385AA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Gets You Hired
              </span>
            </h2>

            <p style={{
              fontSize: '0.96rem',
              color: '#475569',
              lineHeight: 1.8,
              marginBottom: 28,
              maxWidth: 460,
            }}>
              Your resume is more than just a document—it's your first impression.
              A well-crafted resume can open doors to new opportunities and set you
              apart from the competition.
              <br /><br />
              We help you create a powerful, professional resume that highlights
              your skills, experience, and achievements in the best possible way.
              Our approach ensures your resume is clear, impactful, and tailored
              to match industry standards and employer expectations.
            </p>

          </div>

          {/* Right — Mobile Image */}
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-easing="ease-out-back"
            style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            {/* Glow ring */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%', height: '80%',
              background: 'radial-gradient(circle, rgba(51,133,170,0.22) 0%, transparent 70%)',
              borderRadius: '50%',
              zIndex: 0,
            }} />

            {/* Floating ring decoration */}
            <div style={{
              position: 'absolute', top: 0, right: 20,
              width: 56, height: 56,
              border: '3px solid rgba(51,133,170,0.25)',
              borderRadius: '50%',
              zIndex: 0,
              animation: 'floatRing 3s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute', bottom: 10, left: 10,
              width: 36, height: 36,
              border: '2.5px solid rgba(26,75,115,0.18)',
              borderRadius: '50%',
              zIndex: 0,
              animation: 'floatRing 4s ease-in-out infinite reverse',
            }} />

            <img
              src="/mobile2.png"
              alt="Resume Builder"
              onClick={() => navigate('/resume/builder')}
              style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: 320,
                width: '100%',
                filter: 'drop-shadow(0 24px 52px rgba(26,75,115,0.25))',
                cursor: 'pointer',
                animation: 'floatImage 3.5s ease-in-out infinite',
                transition: 'filter 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.filter = 'drop-shadow(0 32px 64px rgba(26,75,115,0.4))'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = 'drop-shadow(0 24px 52px rgba(26,75,115,0.25))'
              }}
            />

            <style>{`
              @keyframes floatImage {
                0%, 100% { transform: translateY(0px); }
                50%       { transform: translateY(-14px); }
              }
              @keyframes floatRing {
                0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
                50%       { transform: translateY(-10px) scale(1.08); opacity: 1; }
              }
            `}</style>
          </div>

        </div>
      </div>
    </section>
  )
}
