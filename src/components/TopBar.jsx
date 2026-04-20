import { useState } from 'react'

const PhoneIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const WhatsAppIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const EmailIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const FacebookIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={color}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const InstagramIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)

const TwitterIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.849L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const YouTubeIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={color}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const MessageIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const socialItems = [
  { name: 'facebook',  href: 'https://facebook.com',           color: '#1877F2', Icon: FacebookIcon  },
  { name: 'instagram', href: 'https://instagram.com',          color: '#E1306C', Icon: InstagramIcon },
  { name: 'twitter',   href: 'https://twitter.com',            color: '#1DA1F2', Icon: TwitterIcon   },
  { name: 'linkedin',  href: 'https://linkedin.com',           color: '#0A66C2', Icon: LinkedInIcon  },
  { name: 'youtube',   href: 'https://youtube.com',            color: '#FF0000', Icon: YouTubeIcon   },
  { name: 'message',   href: 'mailto:info@sabkaplacement.com', color: '#a855f7', Icon: MessageIcon   },
]

function TopBar() {
  const [hovered, setHovered] = useState('')

  return (
    <div className="w-full border-b border-[#2a6d8f] bg-[#3385AA]">

      {/* ── Mobile (< md): icon-only row, centred ── */}
      <div className="flex md:hidden items-center justify-between px-3 py-1.5 text-xs">

        {/* contact icons only */}
        <div className="flex items-center gap-2">
          <a href="tel:+919876543210" aria-label="Call us"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/20 text-white/90 hover:bg-white/30 transition-colors">
            <PhoneIcon color="#fff" />
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#25D366] hover:opacity-90 transition-opacity">
            <WhatsAppIcon color="#fff" />
          </a>
          <a href="mailto:info@sabkaplacement.com" aria-label="Email us"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/20 text-white/90 hover:bg-white/30 transition-colors">
            <EmailIcon color="#fff" />
          </a>
        </div>

        {/* social icons only */}
        <div className="flex items-center gap-1">
          {socialItems.map((item) => {
            const SocialIcon = item.Icon
            const active = hovered === item.name
            return (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={item.name}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered('')}
                className="flex h-6 w-6 items-center justify-center rounded transition-all duration-200"
                style={{
                  background: active ? item.color : 'rgba(255,255,255,0.18)',
                  transform: active ? 'scale(1.18)' : 'scale(1)',
                }}
              >
                <SocialIcon color="#e2e8f0" />
              </a>
            )
          })}
        </div>
      </div>

      {/* ── Tablet (md) & Desktop (lg+): full row ── */}
      <div className="hidden md:flex mx-auto max-w-7xl items-center justify-between px-4 lg:px-6 py-1.5 text-xs">

        {/* LEFT — contact links */}
        <div className="flex items-center gap-2 lg:gap-3">

          <a href="tel:+919876543210"
            className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-white">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/20">
              <PhoneIcon color="#fff" />
            </span>
            <span className="font-medium hidden lg:inline">+91 98765 43210</span>
          </a>

          <span className="h-4 w-px bg-white/30" />

          <a href="mailto:info@sabkaplacement.com"
            className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-white">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/20">
              <EmailIcon color="#fff" />
            </span>
            <span className="font-medium hidden lg:inline">info@sabkaplacement.com</span>
          </a>

          <span className="h-4 w-px bg-white/30" />

          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-white">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#25D366]">
              <WhatsAppIcon color="#fff" />
            </span>
            <span className="font-medium hidden lg:inline">+91 98765 43210</span>
          </a>

        </div>

        {/* RIGHT — social icon boxes */}
        <div className="flex items-center gap-1.5">
          {socialItems.map((item) => {
            const SocialIcon = item.Icon
            const active = hovered === item.name
            return (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                aria-label={item.name}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered('')}
                className="flex h-7 w-7 items-center justify-center rounded transition-all duration-200"
                style={{
                  background: active ? item.color : 'rgba(255,255,255,0.18)',
                  transform: active ? 'scale(1.2)' : 'scale(1)',
                  boxShadow: active ? `0 0 8px ${item.color}88` : 'none',
                }}
              >
                <SocialIcon color={active ? '#fff' : '#e2e8f0'} />
              </a>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default TopBar
