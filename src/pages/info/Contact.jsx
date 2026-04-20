import { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";
import FloatingParticles from "../../components/FloatingParticles";

/* ─────────────────────────────────────────
   Tailwind custom color note:
   Add to tailwind.config.js → extend.colors:
   brand: { DEFAULT:"#19476F", dark:"#112f4e", light:"#e8f2fa" }
   OR use inline style where needed (done below for brand hex)
───────────────────────────────────────── */

const BRAND      = "#19476F";
const BRAND_DARK = "#112f4e";
const BRAND_LIGHT= "#e8f2fa";
const GOLD       = "#f5a623";

/* ── Intersection-observer hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Animated fade-in wrapper ── */
function FadeIn({ children, delay = 0, from = "bottom", className = "" }) {
  const [ref, visible] = useInView();
  const tx =
    from === "left"  ? "-40px,0"  :
    from === "right" ? "40px,0"   :
    from === "top"   ? "0,-40px"  : "0,40px";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity   : visible ? 1 : 0,
        transform : visible ? "translate(0,0)" : `translate(${tx})`,
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Contact info cards ── */
const INFO_CARDS = [
  {
    icon: "📞",
    title: "Job Seekers",
    lines: [
      { label: "Toll Free", value: "1800-102-5557" },
      { label: "Board",     value: "+91-120-4303100" },
      { label: "Intl",      value: "+91-120-4049800" },
      { label: "Hours",     value: "9:30 AM – 7:30 PM IST" },
    ],
  },
  {
    icon: "🏢",
    title: "Employers",
    lines: [
      { label: "Toll Free", value: "1800-102-2558" },
      { label: "Mobile",    value: "+91-9818882211" },
      { label: "Sales",     value: "sales@Sabkaplacement.com" },
      { label: "Support",   value: "support@Sabkaplacement.com" },
    ],
  },
  {
    icon: "🌍",
    title: "International",
    lines: [
      { label: "USA",        value: "+1-866-557-3340" },
      { label: "UK",         value: "+44-808-120-2323" },
      { label: "Middle East",value: "+91-98183-17555" },
      { label: "Email",      value: "usa@Sabkaplacement.com" },
    ],
  },
  {
    icon: "📧",
    title: "Email Support",
    lines: [
      { label: "Resume",     value: "service@Sabkaplacement.com" },
      { label: "Sales",      value: "sales@Sabkaplacement.com" },
      { label: "Support",    value: "support@Sabkaplacement.com" },
      { label: "Europe",     value: "europe@Sabkaplacement.com" },
    ],
  },
];

const OFFICES = [
  { city: "Noida (HQ)", addr: "B-8, Sector-132, Noida - 201301, UP", phone: "+91-120-4303100" },
  { city: "Mumbai",     addr: "A-1, Andheri Industrial Estate, Veera Desai Rd, Mumbai - 400053", phone: "1800-102-2558" },
  { city: "Bengaluru",  addr: "No. 55/1, 2nd Floor, MG Road, Bengaluru - 560001", phone: "1800-102-2558" },
  { city: "Delhi",      addr: "D-56, Okhla Phase-1, New Delhi - 110020", phone: "+91-11-41319999" },
  { city: "Hyderabad",  addr: "8-2-684, Road No. 12, Banjara Hills, Hyderabad - 500034", phone: "1800-102-2558" },
  { city: "Chennai",    addr: "Plot No. 1A, T-Nagar, Chennai - 600017", phone: "1800-102-2558" },
];

const FAQ = [
  { q: "How do I post my resume on Sabkaplacement?",         a: "Register free, go to My Sabkaplacement → Resume, and upload or build your resume directly on the platform." },
  { q: "How do I contact a recruiter?",              a: "Apply to jobs through the platform. Recruiters will contact you via email or phone if your profile matches." },
  { q: "What are the charges for job seekers?",      a: "Basic job search and application is completely free for job seekers. Premium services are optional paid add-ons." },
  { q: "How do I delete my Sabkaplacement account?",         a: "Go to Settings → Account → Delete Account. You can also email support@Sabkaplacement.com for assistance." },
  { q: "How do employers access the resume database?",a: "Employers can subscribe to RMS (Resume Management System) plans. Contact sales@Sabkaplacement.com for pricing." },
];

export default function Contact() {
  const [heroIn, setHeroIn]     = useState(false);
  const [form, setForm]         = useState({ name:"", email:"", phone:"", category:"jobseeker", subject:"", message:"" });
  const [submitted, setSubmitted]= useState(false);
  const [sending, setSending]   = useState(false);
  const [openFaq, setOpenFaq]   = useState(null);
  const [activeTab, setActiveTab]= useState("jobseeker");

  useEffect(() => { setTimeout(() => setHeroIn(true), 80); }, []);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1800);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily:"'Segoe UI',system-ui,sans-serif" }}>

      {/* ─── global keyframes ─── */}
        <CopyNavbar />
      <style>{`
        @keyframes heroSlideDown { from{opacity:0;transform:translateY(-28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroSlideUp   { from{opacity:0;transform:translateY(28px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes heroFadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes float         { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-ring    { 0%{opacity:.35;transform:translate(-50%,-50%) scale(1)} 100%{opacity:.07;transform:translate(-50%,-50%) scale(1.1)} }
        @keyframes shimmer       { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes spin-slow     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes checkPop      { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
        @keyframes dotBounce     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        .info-card:hover  { transform:translateY(-6px); box-shadow:0 20px 40px rgba(25,71,111,.18)!important; }
        .office-card:hover{ transform:translateY(-3px); border-color:#19476F!important; }
        .faq-item:hover .faq-q { color:#19476F!important; }
        .tab-btn          { transition:all .25s ease; }
        .send-btn:hover   { transform:translateY(-2px); box-shadow:0 8px 24px rgba(25,71,111,.4)!important; }
        .social-icon:hover{ transform:scale(1.15) rotate(-5deg); }
      `}</style>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden text-center"
        style={{
          minHeight:"72vh",
          background:`linear-gradient(135deg,${BRAND_DARK} 0%,${BRAND} 60%,#2568a0 100%)`,
          padding:"80px 20px",
        }}
      >
        <FloatingParticles color="#3385AA" count={18} opacity={0.55} />
        {/* pulse rings */}
        {[0,1,2,3,4].map(i=>(
          <span key={i} style={{
            position:"absolute",borderRadius:"50%",
            border:"1.5px solid rgba(255,255,255,.09)",
            width:`${180+i*120}px`,height:`${180+i*120}px`,
            top:"50%",left:"50%",pointerEvents:"none",
            animation:`pulse-ring ${3+i*.5}s ease-in-out infinite alternate`,
          }}/>
        ))}

        {/* floating icon */}
        <div style={{ animation:heroIn?"float 3.8s ease-in-out infinite":"none", marginBottom:22, zIndex:1 }}>
          <div style={{
            width:80,height:80,borderRadius:20,
            background:"rgba(255,255,255,.15)",
            backdropFilter:"blur(8px)",
            border:"1.5px solid rgba(255,255,255,.3)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:36,margin:"0 auto",
            boxShadow:"0 8px 32px rgba(0,0,0,.2)",
          }}>📬</div>
        </div>

        <h1
          className="font-extrabold text-white"
          style={{
            fontSize:"clamp(2rem,5vw,3.2rem)",
            lineHeight:1.15,marginBottom:16,zIndex:1,
            animation:heroIn?"heroSlideDown .8s ease forwards":"none",
            opacity:0,animationFillMode:"forwards",
          }}
        >
          Get in Touch with{" "}
          <span style={{
            background:"linear-gradient(90deg,#FFD700,#FFA500,#FFD700)",
            backgroundSize:"200% auto",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            animation:"shimmer 2.5s linear infinite",
          }}>
            Sabkaplacement
          </span>
        </h1>

        <p
          className="text-white/80 max-w-lg mx-auto"
          style={{
            fontSize:"clamp(.95rem,2vw,1.15rem)",lineHeight:1.75,
            animation:heroIn?"heroSlideUp .9s .25s ease forwards":"none",
            opacity:0,animationFillMode:"forwards",zIndex:1,marginBottom:32,
          }}
        >
          Whether you're a job seeker looking for your dream role or an employer searching for top talent — we're here to help, 24×7.
        </p>

        {/* quick chips */}
        <div
          className="flex flex-wrap gap-3 justify-center"
          style={{
            animation:heroIn?"heroFadeIn 1s .5s ease forwards":"none",
            opacity:0,animationFillMode:"forwards",zIndex:1,
          }}
        >
          {["📞 Call Us","📧 Email Us","🏢 Visit Office","💬 Live Chat"].map(label=>(
            <span key={label} style={{
              background:"rgba(255,255,255,.18)",
              backdropFilter:"blur(6px)",
              border:"1px solid rgba(255,255,255,.3)",
              color:"#fff",padding:"8px 20px",borderRadius:50,
              fontSize:".88rem",fontWeight:600,cursor:"pointer",
              transition:"all .25s ease",
            }}
            onMouseOver={e=>{e.target.style.background="rgba(255,255,255,.32)";}}
            onMouseOut={e=>{e.target.style.background="rgba(255,255,255,.18)";}}
            >{label}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          INFO CARDS
      ══════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background:BRAND_LIGHT }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-center font-extrabold mb-12"
              style={{ fontSize:"clamp(1.5rem,3vw,2rem)", color:BRAND }}>
              How Can We Help You?
            </h2>
          </FadeIn>
          <div className="grid gap-6" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))" }}>
            {INFO_CARDS.map((c,i)=>(
              <FadeIn key={c.title} delay={i*.1}>
                <div className="info-card bg-white rounded-2xl p-7 h-full"
                  style={{
                    boxShadow:"0 4px 20px rgba(25,71,111,.1)",
                    border:"2px solid #dce8f5",
                    transition:"all .3s ease",cursor:"default",
                  }}>
                  <div style={{ fontSize:36, marginBottom:14 }}>{c.icon}</div>
                  <h3 className="font-bold text-lg mb-4" style={{ color:BRAND }}>{c.title}</h3>
                  <ul className="space-y-2">
                    {c.lines.map(l=>(
                      <li key={l.label} className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color:"#888" }}>{l.label}</span>
                        <span className="text-sm font-medium" style={{ color:"#333" }}>{l.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CONTACT FORM  +  MAP SIDE
      ══════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-center font-extrabold mb-12"
              style={{ fontSize:"clamp(1.5rem,3vw,2rem)", color:BRAND }}>
              Send Us a Message
            </h2>
          </FadeIn>

          {/* tab selector */}
          <FadeIn delay={.1}>
            <div className="flex gap-2 justify-center mb-10 flex-wrap">
              {[
                { key:"jobseeker", label:"👤 Job Seeker" },
                { key:"employer",  label:"🏢 Employer"   },
                { key:"other",     label:"💬 Other"      },
              ].map(t=>(
                <button
                  key={t.key}
                  className="tab-btn px-6 py-2 rounded-full font-semibold text-sm border-2"
                  style={{
                    borderColor: activeTab===t.key ? BRAND : "#dce8f5",
                    background : activeTab===t.key ? BRAND : "#fff",
                    color      : activeTab===t.key ? "#fff" : BRAND,
                  }}
                  onClick={()=>{ setActiveTab(t.key); setForm(p=>({...p,category:t.key})); }}
                >{t.label}</button>
              ))}
            </div>
          </FadeIn>

          <div className="grid gap-10 items-start" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))" }}>

            {/* ── FORM ── */}
            <FadeIn from="left">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div style={{
                    width:80,height:80,borderRadius:"50%",
                    background:BRAND,display:"flex",alignItems:"center",
                    justifyContent:"center",fontSize:36,marginBottom:20,
                    animation:"checkPop .5s ease",
                  }}>✅</div>
                  <h3 className="font-extrabold text-2xl mb-3" style={{ color:BRAND }}>Message Sent!</h3>
                  <p className="text-gray-500 mb-6 max-w-xs">Our team will get back to you within 24 hours.</p>
                  <button
                    className="px-8 py-3 rounded-full font-bold text-white"
                    style={{ background:BRAND }}
                    onClick={()=>{ setSubmitted(false); setForm({ name:"",email:"",phone:"",category:activeTab,subject:"",message:"" }); }}
                  >Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-8 space-y-5"
                  style={{ boxShadow:"0 8px 36px rgba(25,71,111,.12)", border:"1.5px solid #dce8f5" }}
                >
                  {/* Name + Email */}
                  <div className="grid gap-4" style={{ gridTemplateColumns:"1fr 1fr" }}>
                    <div>
                      <label className="block text-sm font-semibold mb-1" style={{ color:BRAND }}>Full Name *</label>
                      <input
                        name="name" required value={form.name} onChange={handleChange}
                        placeholder="Rahul Sharma"
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        style={{ border:`1.5px solid #dce8f5`, background:"#f9fbfd" }}
                        onFocus={e=>{e.target.style.borderColor=BRAND; e.target.style.boxShadow=`0 0 0 3px ${BRAND}22`;}}
                        onBlur={e=>{e.target.style.borderColor="#dce8f5"; e.target.style.boxShadow="none";}}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1" style={{ color:BRAND }}>Email *</label>
                      <input
                        name="email" type="email" required value={form.email} onChange={handleChange}
                        placeholder="rahul@email.com"
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        style={{ border:"1.5px solid #dce8f5", background:"#f9fbfd" }}
                        onFocus={e=>{e.target.style.borderColor=BRAND; e.target.style.boxShadow=`0 0 0 3px ${BRAND}22`;}}
                        onBlur={e=>{e.target.style.borderColor="#dce8f5"; e.target.style.boxShadow="none";}}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color:BRAND }}>Phone Number</label>
                    <input
                      name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                      style={{ border:"1.5px solid #dce8f5", background:"#f9fbfd" }}
                      onFocus={e=>{e.target.style.borderColor=BRAND; e.target.style.boxShadow=`0 0 0 3px ${BRAND}22`;}}
                      onBlur={e=>{e.target.style.borderColor="#dce8f5"; e.target.style.boxShadow="none";}}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color:BRAND }}>Subject *</label>
                    <select
                      name="subject" required value={form.subject} onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none cursor-pointer"
                      style={{ border:"1.5px solid #dce8f5", background:"#f9fbfd", color: form.subject?"#333":"#999" }}
                      onFocus={e=>{e.target.style.borderColor=BRAND;}}
                      onBlur={e=>{e.target.style.borderColor="#dce8f5";}}
                    >
                      <option value="" disabled>Select a topic…</option>
                      <option>Account & Login Issues</option>
                      <option>Resume / Profile Help</option>
                      <option>Job Application Query</option>
                      <option>Employer / Recruiter Support</option>
                      <option>Billing & Payments</option>
                      <option>Technical Issue</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color:BRAND }}>Message *</label>
                    <textarea
                      name="message" required rows={4} value={form.message} onChange={handleChange}
                      placeholder="Describe your issue or question in detail…"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                      style={{ border:"1.5px solid #dce8f5", background:"#f9fbfd" }}
                      onFocus={e=>{e.target.style.borderColor=BRAND; e.target.style.boxShadow=`0 0 0 3px ${BRAND}22`;}}
                      onBlur={e=>{e.target.style.borderColor="#dce8f5"; e.target.style.boxShadow="none";}}
                    />
                    <p className="text-right text-xs mt-1" style={{ color:"#aaa" }}>{form.message.length}/500</p>
                  </div>

                  <button
                    type="submit"
                    className="send-btn w-full py-4 rounded-xl font-bold text-white text-base"
                    style={{
                      background:`linear-gradient(135deg,${BRAND_DARK},${BRAND})`,
                      boxShadow:`0 4px 16px ${BRAND}55`,
                      transition:"all .3s ease",
                    }}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        {[0,1,2].map(i=>(
                          <span key={i} style={{
                            width:7,height:7,borderRadius:"50%",background:"#fff",display:"inline-block",
                            animation:`dotBounce .7s ${i*.15}s infinite`,
                          }}/>
                        ))}
                      </span>
                    ) : "Send Message →"}
                  </button>

                  <p className="text-center text-xs" style={{ color:"#aaa" }}>
                    We typically reply within <strong>24 hours</strong> on working days.
                  </p>
                </form>
              )}
            </FadeIn>

            {/* ── RIGHT: quick contact + social ── */}
            <FadeIn from="right" delay={.15}>
              <div className="space-y-6">

                {/* Helpline box */}
                <div className="rounded-2xl p-7 text-white"
                  style={{ background:`linear-gradient(135deg,${BRAND_DARK},${BRAND})`, boxShadow:`0 8px 32px ${BRAND}44` }}>
                  <h3 className="font-bold text-xl mb-5">📞 Quick Helplines</h3>
                  {[
                    { label:"Job Seekers (Toll Free)", val:"1800-102-5557" },
                    { label:"Employers (Toll Free)",   val:"1800-102-2558" },
                    { label:"FastForward",             val:"1800-102-5557" },
                    { label:"Intl. Clients",           val:"+91-120-4049800" },
                  ].map(r=>(
                    <div key={r.label} className="flex justify-between items-center py-3 border-b border-white/20 last:border-0">
                      <span className="text-sm text-white/70">{r.label}</span>
                      <a href={`tel:${r.val.replace(/[^+\d]/g,"")}`}
                        className="font-bold text-sm"
                        style={{ color:GOLD }}>{r.val}</a>
                    </div>
                  ))}
                  <p className="mt-4 text-xs text-white/60">Available Mon–Sat, 9:30 AM to 7:30 PM IST</p>
                </div>

                {/* Email box */}
                <div className="rounded-2xl p-7 bg-white"
                  style={{ boxShadow:"0 4px 20px rgba(25,71,111,.1)", border:"1.5px solid #dce8f5" }}>
                  <h3 className="font-bold text-lg mb-4" style={{ color:BRAND }}>📧 Email Directly</h3>
                  {[
                    { label:"General Support", email:"support@Sabkaplacement.com" },
                    { label:"Resume Services", email:"service@Sabkaplacement.com" },
                    { label:"Sales Enquiry",   email:"sales@Sabkaplacement.com"   },
                    { label:"USA Clients",     email:"usa@Sabkaplacement.com"     },
                  ].map(r=>(
                    <div key={r.label} className="flex justify-between items-center py-2 border-b last:border-0" style={{ borderColor:"#f0f4f8" }}>
                      <span className="text-sm text-gray-500">{r.label}</span>
                      <a href={`mailto:${r.email}`} className="text-sm font-semibold hover:underline" style={{ color:BRAND }}>{r.email}</a>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="rounded-2xl p-6 bg-white"
                  style={{ boxShadow:"0 4px 20px rgba(25,71,111,.1)", border:"1.5px solid #dce8f5" }}>
                  <h3 className="font-bold text-lg mb-4" style={{ color:BRAND }}>🔗 Connect With Us</h3>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { name:"LinkedIn",  icon:"in", color:"#0A66C2", url:"https://linkedin.com/company/Sabkaplacement" },
                      { name:"Twitter/X", icon:"𝕏",  color:"#000",    url:"https://twitter.com/Sabkaplacement" },
                      { name:"Facebook",  icon:"f",  color:"#1877F2", url:"https://facebook.com/Sabkaplacement" },
                      { name:"YouTube",   icon:"▶",  color:"#FF0000", url:"https://youtube.com/Sabkaplacement" },
                    ].map(s=>(
                      <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
                        className="social-icon flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
                        style={{ background:s.color, transition:"all .25s ease" }}
                      >
                        <span style={{ fontSize:13 }}>{s.icon}</span> {s.name}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          OFFICE LOCATIONS
      ══════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background:BRAND_LIGHT }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 justify-center mb-12">
              <div style={{ width:4,height:44,background:BRAND,borderRadius:4 }}/>
              <h2 className="font-extrabold" style={{ fontSize:"clamp(1.5rem,3vw,2rem)", color:BRAND }}>
                Our Office Locations
              </h2>
            </div>
          </FadeIn>
          <div className="grid gap-5" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))" }}>
            {OFFICES.map((o,i)=>(
              <FadeIn key={o.city} delay={i*.08}>
                <div className="office-card bg-white rounded-2xl p-6 h-full"
                  style={{
                    border:"1.5px solid #dce8f5",
                    boxShadow:"0 2px 12px rgba(25,71,111,.07)",
                    transition:"all .3s ease",cursor:"default",
                  }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                      style={{ background:BRAND }}>
                      {o.city[0]}
                    </div>
                    <h4 className="font-bold" style={{ color:BRAND }}>{o.city}</h4>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">{o.addr}</p>
                  <a href={`tel:${o.phone.replace(/[^+\d]/g,"")}`}
                    className="text-sm font-semibold"
                    style={{ color:GOLD }}>📞 {o.phone}</a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FAQ
      ══════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-center font-extrabold mb-12"
              style={{ fontSize:"clamp(1.5rem,3vw,2rem)", color:BRAND }}>
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <div className="space-y-3">
            {FAQ.map((f,i)=>(
              <FadeIn key={i} delay={i*.07}>
                <div className="faq-item bg-white rounded-xl overflow-hidden"
                  style={{ border:"1.5px solid #dce8f5", boxShadow:"0 2px 10px rgba(25,71,111,.06)" }}>
                  <button
                    className="faq-q w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-sm"
                    style={{ color: openFaq===i ? BRAND : "#333", background:"none", border:"none", cursor:"pointer" }}
                    onClick={()=>setOpenFaq(openFaq===i ? null : i)}
                  >
                    {f.q}
                    <span style={{
                      fontSize:18,color:BRAND,transition:"transform .3s ease",
                      transform: openFaq===i ? "rotate(45deg)" : "rotate(0)",
                      flexShrink:0,marginLeft:12,
                    }}>+</span>
                  </button>
                  <div style={{
                    maxHeight: openFaq===i ? "200px" : "0",
                    overflow:"hidden",
                    transition:"max-height .4s ease",
                  }}>
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA BANNER
      ══════════════════════════════════ */}
      <section className="py-20 px-4 text-center"
        style={{ background:`linear-gradient(135deg,${BRAND_DARK},${BRAND})` }}>
        <FadeIn>
          <h2 className="font-extrabold text-white mb-4"
            style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)" }}>
            Still Have Questions?
          </h2>
          <p className="text-white/75 mb-8 max-w-md mx-auto text-base">
            Our support team is just a call away. We're available Mon–Sat, 9:30 AM to 7:30 PM IST.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="tel:18001025557"
              className="font-bold px-8 py-4 rounded-full text-base"
              style={{
                background:GOLD, color:BRAND_DARK,
                boxShadow:"0 6px 24px rgba(245,166,35,.4)",
                textDecoration:"none",transition:"all .3s ease",
              }}
              onMouseOver={e=>{e.target.style.transform="scale(1.05)";}}
              onMouseOut={e=>{e.target.style.transform="scale(1)";}}
            >📞 Call 1800-102-5557</a>
            <a href="mailto:support@Sabkaplacement.com"
              className="font-bold px-8 py-4 rounded-full text-base border-2 border-white/50 text-white"
              style={{ textDecoration:"none",transition:"all .3s ease",background:"rgba(255,255,255,.1)" }}
              onMouseOver={e=>{e.target.style.background="rgba(255,255,255,.25)";}}
              onMouseOut={e=>{e.target.style.background="rgba(255,255,255,.1)";}}
            >📧 Email Support</a>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
