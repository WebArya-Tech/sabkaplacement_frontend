import { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const BRAND = "#328FC4";

const services = [
  {
    icon: "📄",
    title: "Text Resume Writing",
    tag: "Most Popular",
    tagColor: "#e6f4fb",
    tagText: BRAND,
    desc: "ATS-friendly, keyword-optimised resume crafted by expert writers.",
    plans: [
      { label: "Fresher (0–3 yrs)", price: "₹1,999" },
      { label: "Mid-Level (3–8 yrs)", price: "₹4,200" },
      { label: "Senior (8–15 yrs)", price: "₹5,300" },
    ],
    delivery: "8 working days",
    cta: "Buy Now",
  },
  {
    icon: "🎨",
    title: "Visual Resume Writing",
    tag: "Stand Out",
    tagColor: "#fff3e6",
    tagText: "#e07b00",
    desc: "Infographic-style resume with impactful visuals for senior professionals.",
    plans: [
      { label: "Mid-Level (3–8 yrs)", price: "₹5,499" },
      { label: "Senior (8–15 yrs)", price: "₹6,999" },
    ],
    delivery: "8 working days",
    cta: "Buy Now",
  },
  {
    icon: "🏆",
    title: "Executive Resume",
    tag: "Premium",
    tagColor: "#f3efff",
    tagText: "#7c3aed",
    desc: "C-suite & VP-level narrative-driven resumes for leadership roles.",
    plans: [
      { label: "Senior Executive (15+ yrs)", price: "₹8,499" },
      { label: "C-Suite / VP", price: "₹11,999" },
    ],
    delivery: "10 working days",
    cta: "Buy Now",
  },
  {
    icon: "🔗",
    title: "LinkedIn Profile",
    tag: "Add-On",
    tagColor: "#e8f5e9",
    tagText: "#2e7d32",
    desc: "Optimised LinkedIn summary, headline & skills to attract recruiters.",
    plans: [{ label: "All Levels", price: "₹2,500" }],
    delivery: "5 working days",
    cta: "Buy Now",
  },
];

const steps = [
  {
    num: "01",
    title: "Purchase & Get Assigned",
    body: "A dedicated resume writer is assigned and calls you to understand your expectations, career goals, and key achievements.",
  },
  {
    num: "02",
    title: "Share Your Details",
    body: "Send your existing resume, job target, and any relevant visuals. Our writer analyses industry keywords and role requirements.",
  },
  {
    num: "03",
    title: "Receive First Draft",
    body: "Get your professionally written first draft. Review it and share your feedback — unlimited iterations until you're satisfied.",
  },
  {
    num: "04",
    title: "Approve & Activate",
    body: "Approve the final version. Your resume is activated across Sabka Placement and paired with any additional services you've availed.",
  },
];

const stats = [
  { value: "20+", label: "Years of Expertise" },
  { value: "30K+", label: "Resumes Delivered" },
  { value: "8", label: "Modern Templates" },
  { value: "98%", label: "Customer Satisfaction" },
];

const faqs = [
  {
    q: "How long does the resume writing process take?",
    a: "Standard delivery is 8 working days. Express delivery (at additional cost of ₹1,000–₹2,000) is available for faster turnaround.",
  },
  {
    q: "How many revisions / iterations are included?",
    a: "We do not restrict iterations. On average, professionals take 2 iterations to finalise their resume.",
  },
  {
    q: "Will my resume pass ATS screening?",
    a: "Yes. Our writers optimise content with industry-relevant keywords and clean formatting to maximise ATS compatibility.",
  },
  {
    q: "What if I don't have an existing resume?",
    a: "No problem. Our writer will collect all information via a detailed call and questionnaire before drafting from scratch.",
  },
  {
    q: "Is a cover letter included?",
    a: "A free cover letter is included with every resume order as a complimentary add-on.",
  },
];

const tips = [
  {
    emoji: "🎯",
    title: "Tailor for Every Job",
    body: "Customise your resume for each application. Mirror keywords from the job description to pass ATS filters.",
  },
  {
    emoji: "📊",
    title: "Quantify Achievements",
    body: "Replace vague duties with measurable results. \"Increased revenue by 30%\" beats \"Responsible for sales\".",
  },
  {
    emoji: "📐",
    title: "Keep It Concise",
    body: "Aim for 1–2 pages. Recruiters spend an average of 6 seconds on a first scan — make every line count.",
  },
  {
    emoji: "🔑",
    title: "Use the Right Keywords",
    body: "Include 5–8 core skills you genuinely excel at, not 30+ buzzwords. Quality over quantity wins trust.",
  },
  {
    emoji: "🖊️",
    title: "Action Verbs First",
    body: "Start bullet points with strong action verbs: Led, Delivered, Built, Reduced, Launched, Mentored.",
  },
  {
    emoji: "✅",
    title: "Proofread Ruthlessly",
    body: "A single typo can disqualify an otherwise perfect application. Use Grammarly + a human second pair of eyes.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Stat({ value, label }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="text-4xl font-extrabold" style={{ color: BRAND }}>{value}</div>
      <div className="text-gray-500 text-sm mt-1">{label}</div>
    </div>
  );
}

function ServiceCard({ svc, idx }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col transition-all duration-700`}
      style={{
        transitionDelay: `${idx * 80}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {/* header */}
      <div className="p-5 border-b border-gray-100 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{svc.icon}</span>
          <div>
            <h3 className="font-bold text-gray-800 text-lg leading-tight">{svc.title}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{svc.desc}</p>
          </div>
        </div>
        <span
          className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: svc.tagColor, color: svc.tagText }}
        >
          {svc.tag}
        </span>
      </div>

      {/* plans */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        {svc.plans.map((pl) => (
          <div key={pl.label} className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{pl.label}</span>
            <span className="font-bold text-gray-800">{pl.price}</span>
          </div>
        ))}
        <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
          <span>⏱</span> Delivery: <strong className="text-gray-600 ml-1">{svc.delivery}</strong>
        </div>
      </div>

      {/* cta */}
      <div className="p-5 pt-0">
        <button
          className="w-full py-2.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ backgroundColor: BRAND }}
        >
          {svc.cta}
        </button>
      </div>
    </div>
  );
}

function Step({ s, idx }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className="flex gap-4"
      style={{
        transitionDelay: `${idx * 100}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(-20px)",
        transition: "all 0.6s ease",
      }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-white shrink-0 text-sm shadow"
        style={{ backgroundColor: BRAND }}
      >
        {s.num}
      </div>
      <div className="pb-8">
        <h4 className="font-bold text-gray-800 mb-1">{s.title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
      </div>
    </div>
  );
}

function FAQ({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
      style={{ boxShadow: open ? `0 0 0 2px ${BRAND}33` : "" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-4 text-left gap-3"
      >
        <span className="font-semibold text-gray-800 text-sm">{item.q}</span>
        <span
          className="text-xl shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", color: BRAND }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p className="px-5 pb-4 text-gray-500 text-sm leading-relaxed">{item.a}</p>
      </div>
    </div>
  );
}

function TipCard({ t, idx }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 transition-all duration-700 hover:shadow-md hover:-translate-y-1"
      style={{
        transitionDelay: `${idx * 70}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="text-2xl mb-3">{t.emoji}</div>
      <h4 className="font-bold text-gray-800 text-sm mb-1">{t.title}</h4>
      <p className="text-gray-500 text-xs leading-relaxed">{t.body}</p>
    </div>
  );
}

export default function CareerResources() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
  <CopyNavbar />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6"
        style={{ background: `linear-gradient(135deg, #0a2540 0%, #163d60 50%, #1a5580 100%)` }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-10"
          style={{ background: BRAND }}
        />
        <div
          className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full opacity-10"
          style={{ background: BRAND }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: `${BRAND}22`, color: "#7fd0f5", border: `1px solid ${BRAND}44` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              India's #1 Professional Resume Service
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Land Your Dream Job<br />
              <span style={{ color: "#7fd0f5" }}>With a Winning Resume</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              Expert-written, ATS-optimised resumes crafted by seasoned professionals with 20+ years of industry experience. Over 30,000 resumes delivered.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                className="px-6 py-3 rounded-xl text-white font-bold text-sm transition-all hover:brightness-110 active:scale-95 shadow-lg"
                style={{ backgroundColor: BRAND }}
              >
                Explore Services →
              </button>
              <button className="px-6 py-3 rounded-xl text-white font-semibold text-sm border border-white/30 hover:bg-white/10 transition-all">
                View Sample Resumes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: `${BRAND}18`, color: BRAND }}
            >
              Our Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-3">
              Choose the Right Plan for Your Career Stage
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
              Every plan includes a free cover letter, unlimited iterations, and delivery within 8 working days.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => <ServiceCard key={svc.title} svc={svc} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="py-16 px-4 sm:px-6"
        style={{ backgroundColor: `${BRAND}08` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: `${BRAND}18`, color: BRAND }}
            >
              Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-3">
              How It Works
            </h2>
            <p className="text-gray-500 mt-2 text-sm">Simple. Expert-guided. Stress-free.</p>
          </div>

          <div className="relative max-w-lg mx-auto">
            {/* vertical line */}
            <div
              className="absolute left-6 top-6 bottom-0 w-0.5"
              style={{ backgroundColor: `${BRAND}30` }}
            />
            {steps.map((s, i) => <Step key={s.num} s={s} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── CAREER TIPS ── */}
      <section id="tips" className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: `${BRAND}18`, color: BRAND }}
            >
              Career Resources
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-3">
              Resume Writing Tips
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
              Insider advice from our expert writers to make your resume stand out.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tips.map((t, i) => <TipCard key={t.title} t={t} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS BANNER ── */}
      <section
        className="py-12 px-4 sm:px-6"
        style={{ background: `linear-gradient(135deg, ${BRAND}, #1a6fa0)` }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <p className="text-2xl sm:text-3xl font-extrabold mb-3">
            "Got 3 interview calls within a week of uploading my new resume!"
          </p>
          <p className="text-teal-100 text-sm font-medium">— Priya S., Senior Software Engineer, Bangalore</p>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-300 text-lg">★</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: `${BRAND}18`, color: BRAND }}
            >
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-3">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((item) => <FAQ key={item.q} item={item} />)}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-14 px-4 sm:px-6 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Join 30,000+ professionals who landed their dream jobs with Sabka Placement.
          </p>
          <button
            className="px-8 py-3.5 rounded-xl text-white font-bold text-base transition-all hover:brightness-110 active:scale-95 shadow-lg"
            style={{ backgroundColor: BRAND }}
          >
            Get Your Expert Resume →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
