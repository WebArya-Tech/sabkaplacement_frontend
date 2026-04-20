import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const initialReviews = [
  {
    id: 1,
    company: "Sabka Placement",
    logo: "SP",
    logoColor: "#3385AA",
    role: "MERN Full Stack Developer",
    rating: 5,
    title: "Great learning environment and supportive team",
    body: "Working here has been an amazing experience. The management is very supportive, the work culture is healthy, and there are plenty of growth opportunities. Highly recommend for developers looking to grow.",
    pros: "Good work culture, learning opportunities, flexible hours",
    cons: "Salary could be better for freshers",
    date: "March 2026",
    helpful: 14,
  },
  {
    id: 2,
    company: "TechNova Labs",
    logo: "TN",
    logoColor: "#7c3aed",
    role: "Frontend Developer Intern",
    rating: 4,
    title: "Solid internship with real project exposure",
    body: "Got to work on actual production features from day one. Mentors were helpful and I learned React and Tailwind CSS deeply. The only downside was the short duration.",
    pros: "Real project exposure, good mentors, modern tech stack",
    cons: "Internship duration was too short",
    date: "December 2022",
    helpful: 8,
  },
];

const initialQuestions = [];
const initialAnswers = [];

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} type="button" onClick={() => onChange && onChange(star)}
        className={`text-2xl transition-colors ${star <= value ? "text-amber-400" : "text-gray-200"} ${onChange ? "hover:text-amber-300 cursor-pointer" : "cursor-default"}`}>
        ?
      </button>
    ))}
  </div>
);

const StaticStars = ({ value }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={`text-base ${star <= value ? "text-amber-400" : "text-gray-200"}`}>?</span>
    ))}
  </div>
);

function EmptyState({ tab }) {
  const config = {
    Reviews: {
      icon: (
        <svg viewBox="0 0 120 100" className="w-28 h-24" fill="none">
          <ellipse cx="60" cy="85" rx="38" ry="12" fill="#f3d0d7" />
          <rect x="30" y="38" width="60" height="50" rx="6" fill="#e8b86d" />
          <rect x="38" y="54" width="14" height="18" rx="2" fill="white" />
          <rect x="53" y="54" width="14" height="18" rx="2" fill="white" />
          <rect x="68" y="54" width="14" height="18" rx="2" fill="white" />
          <path d="M42 61 L45 64 L50 58" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M57 61 L60 64 L65 58" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M72 61 L75 64 L80 58" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M40 38 Q40 18 60 18 Q80 18 80 38" stroke="#3385AA" strokeWidth="7" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      title: "You have no reviews",
      sub: "Share your experience to help others find the right company.",
      cta: "Write a review",
    },
    Questions: {
      icon: (
        <svg viewBox="0 0 120 100" className="w-28 h-24" fill="none">
          <ellipse cx="60" cy="85" rx="38" ry="12" fill="#d0e8f3" />
          <rect x="25" y="28" width="70" height="52" rx="8" fill="#eaf4f8" stroke="#3385AA" strokeWidth="2"/>
          <circle cx="60" cy="50" r="14" fill="#3385AA"/>
          <text x="60" y="55" textAnchor="middle" fontSize="18" fill="white" fontWeight="bold">?</text>
        </svg>
      ),
      title: "You have no questions",
      sub: "Have a question about a company? Ask the community.",
      cta: "Ask a question",
    },
    Answers: {
      icon: (
        <svg viewBox="0 0 120 100" className="w-28 h-24" fill="none">
          <ellipse cx="60" cy="85" rx="38" ry="12" fill="#d5f0e0" />
          <rect x="20" y="22" width="70" height="52" rx="8" fill="#eafaf1" stroke="#22c55e" strokeWidth="2"/>
          <path d="M38 48 L54 64 L82 36" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "You have no answers",
      sub: "Help others by sharing your knowledge about companies.",
      cta: null,
    },
  };
  const c = config[tab];
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-5">{c.icon}</div>
      <p className="text-base font-bold text-gray-800 mb-1">{c.title}</p>
      <p className="text-sm text-gray-500 max-w-xs">{c.sub}</p>
    </div>
  );
}

export default function MyReviews() {
  const [activeTab, setActiveTab] = useState("Reviews");
  const [reviews, setReviews]     = useState(initialReviews);
  const [questions]               = useState(initialQuestions);
  const [answers]                 = useState(initialAnswers);
  const [showForm, setShowForm]   = useState(false);
  const [deleteId, setDeleteId]   = useState(null);
  const [helpful, setHelpful]     = useState({});

  const emptyForm = { company:"", role:"", rating:0, title:"", body:"", pros:"", cons:"" };
  const [form, setForm]         = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const tabs = [
    { label: "Reviews",   count: reviews.length },
    { label: "Questions", count: questions.length },
    { label: "Answers",   count: answers.length },
  ];

  const handleSubmit = () => {
    if (!form.company || !form.role || !form.rating || !form.title || !form.body) {
      setFormError("Please fill all required fields and select a rating.");
      return;
    }
    setReviews([{
      ...form,
      id: Date.now(),
      logo: form.company.slice(0,2).toUpperCase(),
      logoColor: "#3385AA",
      date: new Date().toLocaleDateString("en-IN",{month:"long",year:"numeric"}),
      helpful: 0,
    }, ...reviews]);
    setForm(emptyForm); setFormError(""); setShowForm(false);
  };

  const handleDelete = (id) => { setReviews(reviews.filter(r => r.id !== id)); setDeleteId(null); };

  const toggleHelpful = (id) => {
    setHelpful(prev => ({ ...prev, [id]: !prev[id] }));
    setReviews(reviews.map(r => r.id === id ? { ...r, helpful: r.helpful + (helpful[id] ? -1 : 1) } : r));
  };

  return (
    <div className="min-h-screen bg-white">
      <CopyNavbar />

      {deleteId && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Delete Review?</h3>
            <p className="text-xs text-gray-500 mb-5">This cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="px-5 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-[72px] sm:pt-[80px] pb-16">

        <div className="pt-2 pb-4">
          <div className="relative flex items-center justify-center mb-1">
            <Link to="/user/profile" className="absolute left-0 p-1.5 rounded-lg text-gray-400 hover:text-[#3385AA] hover:bg-[#eaf4f8] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 text-center">My contributions</h1>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-0">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button key={tab.label} onClick={() => setActiveTab(tab.label)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                  activeTab === tab.label
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}>
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {activeTab === "Reviews" && (
          <div>
            {!showForm && (
              <div className="py-4 border-b border-gray-100">
                <button onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#3385AA] border border-[#3385AA] rounded-full hover:bg-[#eaf4f8] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Write a review
                </button>
              </div>
            )}

            {showForm && (
              <div className="py-6 border-b border-gray-100">
                <h2 className="text-base font-bold text-gray-900 mb-4">Write a Review</h2>
                <div className="space-y-4 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Company Name *</label>
                      <input value={form.company} onChange={e => setForm({...form, company:e.target.value})} placeholder="e.g. Google"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Your Role *</label>
                      <input value={form.role} onChange={e => setForm({...form, role:e.target.value})} placeholder="e.g. Software Engineer"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Overall Rating *</label>
                    <StarRating value={form.rating} onChange={v => setForm({...form, rating:v})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Review Title *</label>
                    <input value={form.title} onChange={e => setForm({...form, title:e.target.value})} placeholder="Summarise your experience"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Your Review *</label>
                    <textarea rows={4} value={form.body} onChange={e => setForm({...form, body:e.target.value})} placeholder="Describe your overall experience..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] resize-none transition-all" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Pros</label>
                      <textarea rows={2} value={form.pros} onChange={e => setForm({...form, pros:e.target.value})} placeholder="What did you like?"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] resize-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Cons</label>
                      <textarea rows={2} value={form.cons} onChange={e => setForm({...form, cons:e.target.value})} placeholder="What could be improved?"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] resize-none transition-all" />
                    </div>
                  </div>
                  {formError && <p className="text-xs text-red-500 font-semibold">{formError}</p>}
                  <div className="flex gap-3 pt-1">
                    <button onClick={() => { setShowForm(false); setForm(emptyForm); setFormError(""); }}
                      className="px-5 py-2 text-sm font-semibold text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">Cancel</button>
                    <button onClick={handleSubmit}
                      className="px-5 py-2 text-sm font-semibold text-white bg-[#3385AA] rounded-full hover:bg-[#317FA4] transition-colors">Submit review</button>
                  </div>
                </div>
              </div>
            )}

            {reviews.length === 0 ? (
              <EmptyState tab="Reviews" />
            ) : (
              <div className="divide-y divide-gray-100">
                {reviews.map((review) => (
                  <div key={review.id} className="py-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: review.logoColor }}>
                        {review.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-base font-bold text-gray-900">{review.company}</p>
                            <p className="text-sm text-gray-500">{review.role}</p>
                          </div>
                          <button onClick={() => setDeleteId(review.id)}
                            className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0" title="Delete">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <StaticStars value={review.rating} />
                          <span className="text-xs text-gray-400">{review.date}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">Published</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mt-3">{review.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{review.body}</p>
                        {(review.pros || review.cons) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                            {review.pros && (
                              <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5">
                                <p className="text-[11px] font-bold text-emerald-700 mb-0.5">Pros</p>
                                <p className="text-sm text-emerald-800">{review.pros}</p>
                              </div>
                            )}
                            {review.cons && (
                              <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                                <p className="text-[11px] font-bold text-red-600 mb-0.5">Cons</p>
                                <p className="text-sm text-red-700">{review.cons}</p>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="mt-3">
                          <button onClick={() => toggleHelpful(review.id)}
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                              helpful[review.id]
                                ? "bg-[#eaf4f8] text-[#3385AA] border-[#aad5e6]"
                                : "text-gray-500 border-gray-200 hover:bg-gray-50"
                            }`}>
                            <svg className="w-3.5 h-3.5" fill={helpful[review.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "Questions" && <EmptyState tab="Questions" />}
        {activeTab === "Answers"   && <EmptyState tab="Answers" />}

      </main>

      <Footer />
    </div>
  );
}

