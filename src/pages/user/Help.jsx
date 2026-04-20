import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const faqs = [
  {
    category: "Account",
    color: "bg-[#eaf4f8] text-[#3385AA]",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    ),
    items: [
      { q: "How do I update my profile?", a: "Go to your Profile page from the top-right dropdown. Click the Edit (pencil) icon on any section to update your information instantly." },
      { q: "How do I change my password?", a: "Visit Settings → Account section. Enter your current password and set a new one. Click 'Save Changes' to apply." },
      { q: "Can I deactivate my account temporarily?", a: "Yes. Go to Settings → Danger Zone → Deactivate Account. Your profile will be hidden from employers until you reactivate." },
    ],
  },
  {
    category: "Jobs & Applications",
    color: "bg-emerald-50 text-emerald-600",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    items: [
      { q: "How do I apply for a job?", a: "Browse jobs on the Jobs page, click on any listing to view details, then click 'Apply Now'. Fill in your details and submit your application." },
      { q: "How can I track my applications?", a: "Go to your Profile → Applications section or navigate to the Applications page from the menu to see all submitted applications and their current status." },
      { q: "Can I save jobs for later?", a: "Yes! Click the bookmark icon on any job card to save it. Access all saved jobs from the 'Saved Jobs' page in the menu." },
      { q: "How do I withdraw an application?", a: "Go to your Applications page, find the job and click 'Withdraw Application'. Note: this cannot be undone once the employer has reviewed it." },
    ],
  },
  {
    category: "Resume",
    color: "bg-violet-50 text-violet-600",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    items: [
      { q: "How do I upload my resume?", a: "Go to your Profile page and scroll to the Resume section. Click 'Upload Resume' to upload a PDF file (max 5MB)." },
      { q: "Can I build my resume on the platform?", a: "Yes! Use the Resume Builder tool from the menu. It lets you create a professional resume with multiple templates." },
      { q: "How do I improve my resume score?", a: "Visit the Resume Quality page to get AI-powered feedback on your resume and actionable tips to improve your score." },
    ],
  },
  {
    category: "Notifications",
    color: "bg-amber-50 text-amber-600",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    items: [
      { q: "How do I turn off email notifications?", a: "Go to Settings → Notifications. Toggle off the specific notification types you don't want to receive, then click Save Preferences." },
      { q: "Why am I not receiving job alerts?", a: "Make sure Job Alerts are enabled in Settings → Notifications. Also check that your spam/junk folder is not filtering our emails." },
    ],
  },
];

const quickLinks = [
  { label: "My Profile", desc: "View and edit your profile", to: "/user/profile", color: "bg-[#eaf4f8]", textColor: "text-[#3385AA]", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg> },
  { label: "Settings", desc: "Account & privacy settings", to: "/user/settings", color: "bg-violet-50", textColor: "text-violet-600", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96a7.01 7.01 0 00-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 00-.59.22L2.74 8.87a.47.47 0 00.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 00-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z"/></svg> },
  { label: "Browse Jobs", desc: "Find your next opportunity", to: "/jobs", color: "bg-emerald-50", textColor: "text-emerald-600", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
  { label: "Resume Builder", desc: "Create a professional resume", to: "/resume-builder", color: "bg-amber-50", textColor: "text-amber-600", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-3.5 text-left"
      >
        <span className="text-sm font-semibold text-gray-800">{q}</span>
        <svg
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p className="text-sm text-gray-500 leading-relaxed pb-4 pr-8">{a}</p>
      )}
    </div>
  );
}

export default function Help() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [contactForm, setContactForm] = useState({ subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const categories = ["All", ...faqs.map(f => f.category)];

  const filtered = faqs
    .map(section => ({
      ...section,
      items: section.items.filter(
        item =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(section =>
      (activeCategory === "All" || section.category === activeCategory) &&
      section.items.length > 0
    );

  const handleContact = () => {
    if (!contactForm.subject || !contactForm.message) return;
    setSent(true);
    setContactForm({ subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const popularSearches = ["Upload resume", "Change password", "Track application", "Job alerts", "Delete account"];

  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <CopyNavbar />

      <main className="max-w-4xl mx-auto px-3 sm:px-6 pt-[68px] sm:pt-[80px] pb-16">

        {/* Header */}
        <div className="pt-2 sm:pt-3 pb-2">
          <div className="relative flex items-center justify-center mb-1">
            <Link to="/user/profile" className="absolute left-0 p-1.5 rounded-lg text-gray-400 hover:text-[#3385AA] hover:bg-[#eaf4f8] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl sm:text-3xl font-black text-gray-900 text-center">Help Centre</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1 text-center">Find answers, guides and contact support.</p>
        </div>

        {/* Hero search */}
        <div className="mt-5 sm:mt-6 mb-7 sm:mb-8 bg-gradient-to-br from-[#317FA4] to-[#3385AA] rounded-2xl px-4 sm:px-8 py-7 sm:py-10 text-white">
          <div className="max-w-xl mx-auto text-center mb-5">
            <p className="text-xl sm:text-2xl font-black mb-1 tracking-tight">How can we help you?</p>
            <p className="text-sm text-white/65">Search through our help articles and FAQs</p>
          </div>
          <div className="relative max-w-xl mx-auto">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-10 pr-10 py-3 text-sm text-gray-800 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 transition-all placeholder:text-gray-400 shadow-lg"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {/* Popular searches */}
          <div className="max-w-xl mx-auto mt-3 flex flex-wrap justify-center gap-2">
            {popularSearches.map(tag => (
              <button
                key={tag}
                onClick={() => setSearch(tag)}
                className="px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full bg-white/15 hover:bg-white/25 text-white/85 hover:text-white transition-colors border border-white/20"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-7 sm:mb-8">
          <p className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Links</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {quickLinks.map(link => (
              <Link key={link.label} to={link.to}
                className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all group active:scale-95">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${link.color} ${link.textColor} flex items-center justify-center mb-2`}>
                  {link.icon}
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#3385AA] transition-colors leading-tight">{link.label}</p>
                <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5 leading-tight">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-7 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Frequently Asked Questions</p>
          </div>

          {/* Category filter — horizontally scrollable on mobile */}
          <div className="flex gap-2 mb-4 sm:mb-5 overflow-x-auto pb-1 scrollbar-hide -mx-3 sm:mx-0 px-3 sm:px-0">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat
                    ? "bg-[#3385AA] text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#3385AA] hover:text-[#3385AA]"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 sm:p-10 text-center shadow-sm border border-gray-100">
              <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-semibold text-gray-500">No results for &ldquo;{search}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-1">Try different keywords or browse all categories</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-[#3385AA] border border-[#3385AA]/30 rounded-xl hover:bg-[#eaf4f8] transition-colors">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filtered.map(section => (
                <div key={section.category} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 border-b border-gray-100">
                    <div className={`w-7 h-7 rounded-lg ${section.color} flex items-center justify-center flex-shrink-0`}>
                      {section.icon}
                    </div>
                    <p className="text-sm font-bold text-[#317FA4]">{section.category}</p>
                    <span className="ml-auto text-[11px] font-semibold text-gray-400">{section.items.length} article{section.items.length > 1 ? "s" : ""}</span>
                  </div>
                  <div className="px-4 sm:px-5">
                    {section.items.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-start sm:items-center gap-3 px-4 sm:px-5 py-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 flex-shrink-0 mt-0.5 sm:mt-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#317FA4]">Still need help?</p>
              <p className="text-xs text-gray-400 leading-snug">Send us a message and we'll get back to you within 24 hours</p>
            </div>
          </div>
          <div className="px-4 sm:px-5 py-5 space-y-4">
            {sent ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-gray-800">Message Sent!</p>
                <p className="text-xs text-gray-400 mt-1">Our support team will respond within 24 hours.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject</label>
                  <input
                    value={contactForm.subject}
                    onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="What do you need help with?"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe your issue in detail..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] resize-none transition-all"
                  />
                </div>
                <button
                  onClick={handleContact}
                  disabled={!contactForm.subject || !contactForm.message}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#3385AA] rounded-xl hover:bg-[#317FA4] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

