import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";
import FloatingParticles from "../../components/FloatingParticles";

// Hook: element viewport me aaya ya nahi
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// Counter animation component
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Fade-in wrapper
function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const translate = direction === "up" ? "translateY(40px)" : direction === "left" ? "translateX(-40px)" : "translateX(40px)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0)" : translate,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const BRAND = "#317FA4";
const BRAND_LIGHT = "#e8f0f8";
const BRAND_DARK = "#12345a";

const stats = [
  { value: 70, suffix: "M+", label: "Registered Users" },
  { value: 5, suffix: "L+", label: "Jobs Posted Monthly" },
  { value: 25, suffix: "+", label: "Years of Trust" },
  { value: 10, suffix: "K+", label: "Hiring Companies" },
];

const values = [
  {
    icon: "🎯",
    title: "Mission",
    desc: "Connecting job seekers with the right opportunities across India and beyond — making hiring simpler, smarter, and faster.",
  },
  {
    icon: "👁️",
    title: "Vision",
    desc: "To be India's most trusted career ecosystem where every professional finds their best-fit opportunity.",
  },
  {
    icon: "💡",
    title: "Innovation",
    desc: "Leveraging AI and data science to match candidates with roles that align with their skills, aspirations, and potential.",
  },
  {
    icon: "🤝",
    title: "Trust",
    desc: "25+ years of building relationships between employers and job seekers based on transparency, reliability, and integrity.",
  },
];

const timeline = [
  { year: "1997", event: "Founded in India's Silicon Valley, Bengaluru" },
  { year: "2004", event: "Crossed 1 Million registered job seekers" },
  { year: "2010", event: "Launched mobile app for on-the-go job search" },
  { year: "2016", event: "Introduced AI-powered job recommendations" },
  { year: "2020", event: "Pivoted to remote hiring during the pandemic" },
  { year: "2024", event: "70 Million+ users and counting" },
];

const team = [
  { name: "Hitesh Oberoi", role: "CEO & Managing Director", initials: "HO" },
  { name: "Ambarish Raghuvanshi", role: "CFO", initials: "AR" },
  { name: "Sandhya Sethia", role: "Chief People Officer", initials: "SS" },
  { name: "Pawan Goyal", role: "Chief Product Officer", initials: "PG" },
];

export default function About() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#1a1a1a", background: "#fff" }}>

        <CopyNavbar />
        {/* ── HERO ── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND} 60%, #2a6fa8 100%)`,
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "80px 20px",
        }}
      >
        <FloatingParticles color="#3385AA" count={20} opacity={0.6} />
        {/* Animated background circles */}
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.08)",
              width: `${200 + i * 130}px`,
              height: `${200 + i * 130}px`,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              animation: `pulse ${3 + i * 0.6}s ease-in-out infinite alternate`,
              pointerEvents: "none",
            }}
          />
        ))}

        <style>{`
          @keyframes pulse { from { opacity: 0.3; transform: translate(-50%,-50%) scale(1); } to { opacity: 0.08; transform: translate(-50%,-50%) scale(1.08); } }
          @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
          @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
          @keyframes slideDown { from { opacity:0; transform:translateY(-30px); } to { opacity:1; transform:translateY(0); } }
          @keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
          @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
          @keyframes spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
          .stat-card:hover { transform: translateY(-6px) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.18) !important; }
          .value-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(26,75,115,0.18); border-color: #317FA4 !important; }
          .team-card:hover .team-avatar { transform: scale(1.08); }
          .team-card:hover { box-shadow: 0 10px 30px rgba(26,75,115,0.15); }
        `}</style>

        <div style={{ textAlign: "center", zIndex: 1, maxWidth: 760 }}>
          {/* Logo */}
          <div
            style={{
              animation: heroVisible ? "float 4s ease-in-out infinite" : "none",
              marginBottom: 28,
            }}
          >
            <img
              src="/logo.jpeg"
              alt="Company Logo"
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              style={{
                width: 90, height: 90,
                borderRadius: 20,
                objectFit: "contain",
                background: "#fff",
                padding: 10,
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                display: "block",
                margin: "0 auto",
              }}
            />
            <div style={{
              display: "none", width: 90, height: 90, borderRadius: 20,
              background: "#fff", margin: "0 auto",
              alignItems: "center", justifyContent: "center",
              fontSize: 36, boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}>💼</div>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 18px",
              lineHeight: 1.15,
              animation: heroVisible ? "slideDown 0.8s ease forwards" : "none",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            India's No. 1<br />
            <span style={{
              background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 2.5s linear infinite",
            }}>
              Job Search Platform
            </span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              maxWidth: 560,
              margin: "0 auto 36px",
              lineHeight: 1.7,
              animation: heroVisible ? "slideUp 0.9s 0.3s ease forwards" : "none",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            For over 25 years, we've been bridging the gap between talent and opportunity — empowering millions of professionals to find careers they love.
          </p>

          <div style={{ animation: heroVisible ? "fadeIn 1s 0.6s ease forwards" : "none", opacity: 0, animationFillMode: "forwards" }}>
            <a
              href="/jobs"
              target="_self"
              rel="noreferrer"
              style={{
                display: "inline-block",
                background: "#FFD700",
                color: BRAND_DARK,
                fontWeight: 700,
                fontSize: "1rem",
                padding: "14px 36px",
                borderRadius: 50,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(255,215,0,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 8px 28px rgba(255,215,0,0.55)"; }}
              onMouseOut={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 20px rgba(255,215,0,0.4)"; }}
            >
              Explore Jobs →
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: BRAND_LIGHT, padding: "72px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ textAlign: "center", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: BRAND, marginBottom: 48 }}>
              Our Impact in Numbers
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 24 }}>
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.12}>
                <div
                  className="stat-card"
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "36px 24px",
                    textAlign: "center",
                    boxShadow: "0 4px 20px rgba(26,75,115,0.10)",
                    border: `2px solid ${BRAND_LIGHT}`,
                    transition: "all 0.35s ease",
                    cursor: "default",
                  }}
                >
                  <div style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900, color: BRAND }}>
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{ color: "#555", marginTop: 8, fontWeight: 500 }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section style={{ padding: "80px 20px", maxWidth: 900, margin: "0 auto" }}>
        <FadeIn direction="left">
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 5, height: 48, background: BRAND, borderRadius: 4 }} />
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: BRAND, margin: 0 }}>
              Our Story
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontSize: "1.08rem", lineHeight: 1.85, color: "#444", marginBottom: 18 }}>
            Founded in <strong>1997</strong> in Bengaluru, we started with a simple yet powerful idea — that every professional deserves access to the right career opportunity, regardless of their background or geography.
          </p>
          <p style={{ fontSize: "1.08rem", lineHeight: 1.85, color: "#444", marginBottom: 18 }}>
            Over the past 25+ years, we have grown from a small job board to India's largest career platform, connecting over <strong>70 million job seekers</strong> with thousands of companies across every industry and city.
          </p>
          <p style={{ fontSize: "1.08rem", lineHeight: 1.85, color: "#444" }}>
            Today, powered by cutting-edge AI and data intelligence, we go beyond just job listings — we help professionals understand their market worth, upskill, and navigate their entire career journey.
          </p>
        </FadeIn>
      </section>

      {/* ── VALUES ── */}
      <section style={{ background: BRAND_LIGHT, padding: "80px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ textAlign: "center", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: BRAND, marginBottom: 48 }}>
              What Drives Us
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 24 }}>
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div
                  className="value-card"
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "32px 24px",
                    border: "2px solid #dce8f5",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icon}</div>
                  <h3 style={{ color: BRAND, fontWeight: 700, fontSize: "1.1rem", marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: "#555", lineHeight: 1.7, fontSize: "0.95rem", margin: 0 }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: "80px 20px", maxWidth: 780, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: BRAND, marginBottom: 52 }}>
            Our Journey
          </h2>
        </FadeIn>
        <div style={{ position: "relative" }}>
          {/* vertical line */}
          <div style={{
            position: "absolute", left: 24, top: 0, bottom: 0, width: 3,
            background: `linear-gradient(to bottom, ${BRAND}, #90b8d9)`,
            borderRadius: 4,
          }} />
          {timeline.map((t, i) => (
            <FadeIn key={t.year} delay={i * 0.1} direction="right">
              <div style={{ display: "flex", alignItems: "flex-start", gap: 28, marginBottom: 36, paddingLeft: 8 }}>
                <div style={{
                  minWidth: 42, height: 42, borderRadius: "50%",
                  background: BRAND, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.7rem", flexShrink: 0,
                  boxShadow: `0 0 0 4px ${BRAND_LIGHT}, 0 0 0 6px ${BRAND}33`,
                  zIndex: 1, position: "relative",
                }}>
                  {t.year.slice(2)}
                </div>
                <div style={{
                  background: "#fff", border: "1.5px solid #dce8f5",
                  borderRadius: 12, padding: "16px 20px", flex: 1,
                  boxShadow: "0 2px 12px rgba(26,75,115,0.07)",
                }}>
                  <span style={{ fontWeight: 700, color: BRAND, marginRight: 10 }}>{t.year}</span>
                  <span style={{ color: "#444", fontSize: "0.97rem" }}>{t.event}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ background: BRAND_LIGHT, padding: "80px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ textAlign: "center", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: BRAND, marginBottom: 48 }}>
              Leadership Team
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
            {team.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.1}>
                <div
                  className="team-card"
                  style={{
                    background: "#fff", borderRadius: 16,
                    padding: "32px 20px", textAlign: "center",
                    boxShadow: "0 4px 16px rgba(26,75,115,0.08)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    className="team-avatar"
                    style={{
                      width: 72, height: 72, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${BRAND}, #2a6fa8)`,
                      color: "#fff", fontWeight: 800, fontSize: "1.3rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px",
                      transition: "transform 0.3s ease",
                      boxShadow: "0 4px 16px rgba(26,75,115,0.3)",
                    }}
                  >
                    {m.initials}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: 6 }}>{m.name}</h3>
                  <p style={{ color: BRAND, fontSize: "0.85rem", fontWeight: 500, margin: 0 }}>{m.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`,
        padding: "80px 20px", textAlign: "center",
      }}>
        <FadeIn>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, marginBottom: 16 }}>
            Ready to Find Your Dream Job?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Join 70 million+ professionals who trust us to connect them with the best opportunities in India.
          </p>
          <a
            href="/jobs"
            target="_self"
            rel="noreferrer"
            style={{
              display: "inline-block",
              background: "#FFD700",
              color: BRAND_DARK,
              fontWeight: 800,
              fontSize: "1rem",
              padding: "16px 42px",
              borderRadius: 50,
              textDecoration: "none",
              boxShadow: "0 6px 24px rgba(255,215,0,0.45)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={e => { e.target.style.transform = "scale(1.06)"; }}
            onMouseOut={e => { e.target.style.transform = "scale(1)"; }}
          >
            Search Jobs on Sabkaplacement →
          </a>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
