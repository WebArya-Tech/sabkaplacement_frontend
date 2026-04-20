import { useState } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

// -- Icons (inline SVG components) ------------------------------------------
const HighlightIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#FFF3E0"/>
    <rect x="10" y="14" width="28" height="4" rx="2" fill="#FF6B35"/>
    <rect x="10" y="22" width="20" height="3" rx="1.5" fill="#FFB085"/>
    <rect x="10" y="29" width="24" height="3" rx="1.5" fill="#FFB085"/>
    <circle cx="38" cy="14" r="6" fill="#FF6B35"/>
    <path d="M35 14l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EarlyIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#E8F5E9"/>
    <circle cx="24" cy="24" r="13" stroke="#2E7D32" strokeWidth="2.5"/>
    <path d="M24 16v8l5 3" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 10l3 3M35 10l-3 3" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SmsIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#E3F2FD"/>
    <rect x="9" y="13" width="22" height="16" rx="3" fill="#1565C0"/>
    <path d="M13 21h14M13 25h10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="27" y="22" width="12" height="16" rx="3" fill="#42A5F5"/>
    <path d="M30 28h6M30 32h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#F3E5F5"/>
    <circle cx="24" cy="19" r="7" fill="#7B1FA2"/>
    <path d="M10 38c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#AB47BC" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const ResumeIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#FFF8E1"/>
    <rect x="12" y="8" width="24" height="32" rx="3" fill="#F9A825"/>
    <rect x="16" y="15" width="16" height="2.5" rx="1.25" fill="#fff"/>
    <rect x="16" y="21" width="12" height="2" rx="1" fill="#fff" opacity=".8"/>
    <rect x="16" y="26" width="14" height="2" rx="1" fill="#fff" opacity=".8"/>
    <rect x="16" y="31" width="10" height="2" rx="1" fill="#fff" opacity=".8"/>
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 20 20" fill={filled ? "#FF6B35" : "#e5e7eb"} className="w-4 h-4 inline">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="#FF6B35"/>
    <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#FF6B35" stroke="#FF6B35" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.1a16 16 0 006 6l.46-.46a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" fill="#fff"/>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// -- Data -------------------------------------------------------------------
const PLANS = [
  { id: "1m", label: "1 Month", price: "?346", original: "?432", perDay: "?11.5/day", discount: "20% Off", best: false },
  { id: "3m", label: "3 Month", price: "?777", original: "?971", perDay: "?8.6/day", discount: "20% Off", best: false },
  { id: "6m", label: "6 Month", price: "?1,114", original: "?1,392", perDay: "?6.2/day", discount: "20% Off", best: true },
];

const KEY_FEATURES = [
  { icon: <HighlightIcon />, title: "Highlight your Application", desc: "Your job application gets highlighted to recruiters when you apply to jobs on Sabkaplacement" },
  { icon: <EarlyIcon />, title: "Become an Early Applicant", desc: "Early applicants are 4 times more likely to get shortlisted" },
  { icon: <SmsIcon />, title: "Get job recommendations via SMS & Email", desc: "Receive alerts of jobs within 24 hours of them getting posted on Sabkaplacement through daily SMS and Email" },
  { icon: <ProfileIcon />, title: "Boost Your Profile Visibility", desc: "Appear higher in recruiter searches so your profile gets seen by the right people at the right time" },
  { icon: <ResumeIcon />, title: "Instant Resume Access", desc: "Recruiters can instantly view your resume the moment they search relevant skills in your industry" },
];

const RESUME_STEPS = [
  { step: "01", title: "Register & Complete Profile", desc: "Fill in your professional summary, career objective, skills, experience, and more to create a strong base." },
  { step: "02", title: "Select a Template", desc: "Pick your favourite template from our diverse collection of ATS-friendly designs." },
  { step: "03", title: "Apply with Confidence", desc: "Download your polished resume as a PDF and start applying to your dream jobs instantly." },
];

const TESTIMONIALS = [
  { name: "Aman Kr. Kushwaha", role: "Banking", stars: 5, text: "I'm 100% satisfied with the tool and would highly recommend it to anyone searching for jobs." },
  { name: "Ravi S.", role: "Marketing Professional", stars: 5, text: "I've tried many tools before but none felt this easy. My resume looks so professional now!" },
  { name: "Priya M.", role: "Software Developer", stars: 4, text: "Got step-by-step help and made it so easy to customise. A good resume builder." },
  { name: "Ankit K.", role: "Data Analyst", stars: 4, text: "AI suggestions were 100% on point, helped me highlight my profile in the best way. Love this tool!" },
  { name: "Nisha Sharma", role: "Marketing", stars: 5, text: "This tool is a total lifesaver. The templates look great and the process is also quick." },
  { name: "Tushar Mutharia", role: "BPO / Call Centre", stars: 5, text: "Awesome interface with AI intelligence. Providing such a feature without membership is really great." },
];

const FAQS = [
  { q: "What is Priority Applicant?", a: "Priority Applicant is a service that highlights your job application to recruiters when you apply to jobs on Sabkaplacement, making you stand out from other candidates." },
  { q: "How does Early Applicant benefit me?", a: "Early applicants are 4x more likely to get shortlisted. Our service ensures your application reaches the recruiter within the first few hours of a job posting." },
  { q: "Is there a refund policy?", a: "Yes, we offer a 7-day refund policy if you're not satisfied with the service. Contact support@sabkaplacement.com for assistance." },
  { q: "Can I cancel my subscription?", a: "Yes, you can cancel anytime from your account settings. Your benefits will continue until the end of the billing period." },
  { q: "Will I get SMS alerts for all jobs?", a: "You'll receive daily SMS and email alerts for jobs matching your profile within 24 hours of posting." },
];

// -- Main Component ---------------------------------------------------------
export default function PriorityApplicant() {
  const [selectedPlan, setSelectedPlan] = useState("6m");
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("features");

  const selected = PLANS.find((p) => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <CopyNavbar />

      {/* -- TOP ANNOUNCEMENT BAR -- */}
      <div className="bg-amber-400 text-center py-2.5 px-4">
        <p className="text-sm font-semibold text-gray-900 tracking-wide">
          ? 1.88L Users got new jobs using this service*
        </p>
      </div>

        {/* -- HERO BANNER -- */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#6bc7dd] rounded-full opacity-20 pointer-events-none"/>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#1f6170] rounded-full opacity-20 pointer-events-none"/>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-[#a8dde8] text-sm font-medium mb-2 tracking-wide uppercase">Not getting calls from Recruiters?</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Be a <span className="text-amber-400">Priority Applicant</span> and Increase Your Chances of Getting a Call
            </h1>
            <p className="text-[#EAF4F8] text-base sm:text-lg mb-8 max-w-xl">
              Stand out from thousands of applicants. Get highlighted to recruiters the moment you apply.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a href="#pricing" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105">
                <BoltIcon /> Get Started Now
              </a>
              <a href="#features" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/30 transition-all">
                See Features <ArrowIcon />
              </a>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="flex-shrink-0 flex items-end justify-center gap-4 relative">
            {/* Silhouette group */}
            <div className="flex items-end gap-1">
              {[60, 75, 90, 70, 55].map((h, i) => (
                <div
                  key={i}
                  className={`rounded-t-full ${i === 2 ? "bg-gray-800" : "bg-[#7ed3e5] opacity-50"}`}
                  style={{ width: i === 2 ? 56 : 40, height: h }}
                />
              ))}
            </div>
            {/* Star badge */}
            <div className="absolute -top-4 right-0 bg-amber-400 text-gray-900 text-xs font-black px-3 py-1.5 rounded-full shadow-md rotate-6">
              ? Priority
            </div>
          </div>
        </div>
      </section>

      {/* -- STATS STRIP -- */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "1.88L+", label: "Users Got Jobs" },
            { val: "4x", label: "Shortlist Chances" },
            { val: "24 hrs", label: "Job Alerts" },
            { val: "10L+", label: "Active Recruiters" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#317FA4]">{s.val}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -- TABS -- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex gap-2 border-b overflow-x-auto pb-0">
          {[
            { id: "features", label: "Key Features" },
            { id: "how", label: "How It Works" },
            { id: "pricing", label: "Pricing" },
            { id: "reviews", label: "Reviews" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`whitespace-nowrap px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
                activeTab === t.id
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* -- KEY FEATURES + PRICING -- */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Features list */}
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">Key Features</h2>
            <div className="space-y-6">
              {KEY_FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-5 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-shadow">
                  <div className="shrink-0">{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing card */}
          <div id="pricing" className="lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-20">
              <h3 className="text-center text-gray-700 font-semibold text-base mb-5">Choose Subscription</h3>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      selectedPlan === plan.id
                        ? "border-[#317FA4] bg-[#EAF4F8]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {plan.best && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        BEST VALUE
                      </span>
                    )}
                    <span className="text-xs font-semibold text-gray-600 mt-1">{plan.label}</span>
                    <span className="text-lg font-extrabold text-gray-900 mt-1">{plan.price}</span>
                    <span className="text-[10px] text-gray-400 line-through">{plan.original}</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full mt-1">{plan.discount}</span>
                    <span className="text-[10px] text-gray-400 mt-1">{plan.perDay}</span>
                    <div className={`w-4 h-4 rounded-full border-2 mt-2 flex items-center justify-center ${selectedPlan === plan.id ? "border-[#317FA4]" : "border-gray-300"}`}>
                      {selectedPlan === plan.id && <div className="w-2 h-2 rounded-full bg-[#317FA4]"/>}
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-xs text-center text-gray-400 mb-4">*Applicable taxes may apply.</p>

              {/* What's included */}
              <ul className="space-y-2 mb-5">
                {["Application highlighted to recruiters", "Early applicant status on all jobs", "Daily SMS & Email job alerts", "Profile visibility boost", "Instant resume access for recruiters"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-sm tracking-wide transition-all hover:scale-[1.02] shadow-md">
                BUY NOW � {selected?.price}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">Secure payment � Cancel anytime</p>

              {/* Call CTA */}
              <div className="mt-5 pt-4 border-t flex flex-col sm:flex-row gap-3">
                <a href="tel:18001025557" className="flex-1 flex items-center justify-center gap-2 bg-[#EAF4F8] border border-[#D6EAF2] text-[#317FA4] text-sm font-semibold py-2.5 rounded-lg hover:bg-[#D6EAF2] transition-colors">
                  <span className="text-base">??</span> 1800-102-5557
                </a>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                  ?? Call Me Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- HOW IT WORKS -- */}
      <section id="how" className="bg-gradient-to-b from-blue-50 to-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">How to Use Resume Maker?</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">Follow these simple steps and fast-track your job search today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-orange-200"/>
            {RESUME_STEPS.map((s) => (
              <div key={s.step} className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg mb-5 z-10">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">You can also get additional resume templates and improve content easily with AI by signing up for <strong>Sabkaplacement Pro</strong></p>
            <button className="inline-flex items-center gap-2 bg-[#2d8a9f] hover:bg-[#1f6170] text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105 shadow-md">
              Try for Free <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      {/* -- RESUME TEMPLATES PREVIEW -- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Explore Impactful Resume Templates</h2>
          <p className="text-gray-500 text-sm sm:text-base">Win over recruiters by choosing one of our well-designed templates</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { color: "from-blue-100 to-blue-200", label: "Free", pro: false },
            { color: "from-green-100 to-green-200", label: "Free", pro: false },
            { color: "from-purple-100 to-purple-200", label: "Free", pro: false },
            { color: "from-orange-100 to-orange-200", label: "Pro", pro: true },
            { color: "from-red-100 to-red-200", label: "Pro", pro: true },
            { color: "from-indigo-100 to-indigo-200", label: "Pro", pro: true },
          ].map((t, i) => (
            <div key={i} className={`relative rounded-xl bg-gradient-to-br ${t.color} h-40 sm:h-48 flex flex-col justify-between p-3 border border-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group`}>
              {/* Mini resume lines */}
              <div className="space-y-1.5 mt-2">
                <div className="h-2 bg-white/60 rounded-full w-3/4"/>
                <div className="h-1.5 bg-white/40 rounded-full w-1/2"/>
                <div className="h-1 bg-white/30 rounded-full w-2/3 mt-1"/>
                <div className="h-1 bg-white/30 rounded-full w-1/2"/>
                <div className="h-1 bg-white/30 rounded-full w-3/5"/>
              </div>
              <span className={`self-start text-xs font-bold px-2 py-0.5 rounded-full ${t.pro ? "bg-amber-400 text-gray-900" : "bg-white text-gray-600"}`}>
                {t.pro ? "?? Pro" : t.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">3 free templates � 9 premium Pro templates</p>
      </section>

      {/* -- TESTIMONIALS -- */}
      <section id="reviews" className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">What Jobseekers Are Saying</h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => <StarIcon key={i} filled />)}
              <span className="text-sm text-gray-500 ml-2">4.8 / 5 based on 10,000+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-4">
                <div className="text-3xl text-orange-300 font-serif leading-none">"</div>
                <p className="text-sm text-gray-700 leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < t.stars} />)}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t">
                  <div className="w-9 h-9 rounded-full bg-[#D6EAF2] flex items-center justify-center text-[#317FA4] font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- WHY USE RESUME MAKER -- */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Why Use Our Resume Maker?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "??", title: "Save Time & Effort", desc: "Our easy-to-use interface saves you valuable time. Don't worry about layout & formatting anymore � just add your information and our tool handles the rest." },
              { icon: "??", title: "Keep Info Organized", desc: "Effortlessly organize your education, work experience, and achievements to impress recruiters and land your dream job." },
              { icon: "??", title: "More Applications, Less Time", desc: "Create professional resumes faster with our AI tool and apply to multiple job openings with ease." },
            ].map((b) => (
              <div key={b.title} className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#EAF4F8] border border-[#D6EAF2] hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{b.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section id="faq" className="bg-gray-50 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <span>{f.q}</span>
                  <span className={`text-orange-500 text-lg transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- BOTTOM CTA BANNER -- */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Ready to Get More Recruiter Calls?</h2>
          <p className="text-[#a8dde8] text-base mb-8 max-w-xl mx-auto">Join 1.88 lakh+ users who fast-tracked their job search with Sabkaplacement Priority Applicant.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105">
              <BoltIcon /> Become Priority Applicant
            </a>
            <a href="tel:18001025557" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/30 transition-all">
              <PhoneIcon /> Call Toll Free
            </a>
          </div>
        </div>
      </section>

      {/* -- FOOTER -- */}
      <Footer />
    </div>
  );
}

