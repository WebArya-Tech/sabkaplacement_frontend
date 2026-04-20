import { useState, useRef, useEffect } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

// ─── DATA ────────────────────────────────────────────────────────────────────

const categories = [
  { id: 1, label: "MNCs", count: "2.3K+ Companies" },
  { id: 2, label: "Product", count: "1.3K+ Companies" },
  { id: 3, label: "Banking & Fina...", count: "443 Companies" },
  { id: 4, label: "Hospitality", count: "109 Companies" },
  { id: 5, label: "Fintech", count: "147 Companies" },
  { id: 6, label: "Healthcare", count: "701 Companies" },
  { id: 7, label: "IT Services", count: "2.5K+ Companies" },
  { id: 8, label: "EdTech", count: "189 Companies" },
];

const allCompanies = [
  { id: 1,  name: "Caresoft Global",           rating: 3.4, reviews: "449 reviews",   tags: ["Foreign MNC", "Automobile", "1001-5000 emp."],       logo: "https://logo.clearbit.com/caresoft.com",          initials: "CG", color: "#1a6bb5", bg: "#e8f0fb" },
  { id: 2,  name: "Taylor & Francis",           rating: 3.1, reviews: "32 reviews",    tags: ["Foreign MNC", "Printing & Publishing"],               logo: "https://logo.clearbit.com/taylorandfrancis.com",  initials: "TF", color: "#1a3c6e", bg: "#e8effa" },
  { id: 3,  name: "McCormick India",            rating: 4.3, reviews: "70 reviews",    tags: ["Foreign MNC", "Food Processing"],                     logo: "https://logo.clearbit.com/mccormick.com",         initials: "Mc", color: "#c0392b", bg: "#fdecea" },
  { id: 4,  name: "Ace Micromatic Group",       rating: 4.2, reviews: "337 reviews",   tags: ["Indian MNC", "Industrial Equipment / Machinery"],     logo: "https://logo.clearbit.com/acemicromatic.com",     initials: "AM", color: "#2c7a3c", bg: "#e8f5ee" },
  { id: 5,  name: "Waystone",                   rating: 3.7, reviews: "38 reviews",    tags: ["Foreign MNC", "Financial Services"],                  logo: "https://logo.clearbit.com/waystone.com",          initials: "WS", color: "#27ae60", bg: "#e8f8f0" },
  { id: 6,  name: "Personiv",                   rating: 3.8, reviews: "292 reviews",   tags: ["Foreign MNC", "BPM / BPO", "1001-5000 emp."],         logo: "https://logo.clearbit.com/personiv.com",          initials: "PV", color: "#2980b9", bg: "#e8f2fb" },
  { id: 7,  name: "Veripark",                   rating: 2.9, reviews: "55 reviews",    tags: ["Foreign MNC", "Software Product", "51-200 emp."],     logo: "https://logo.clearbit.com/veripark.com",          initials: "VP", color: "#e74c3c", bg: "#fdecea" },
  { id: 8,  name: "Aceolution India",           rating: 3.0, reviews: "34 reviews",    tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "https://logo.clearbit.com/aceolution.com",        initials: "AI", color: "#2471a3", bg: "#e8f2fb" },
  { id: 9,  name: "Accord Software & Systems",  rating: 3.7, reviews: "104 reviews",   tags: ["Indian MNC", "Software Product"],                     logo: "https://logo.clearbit.com/accordss.com",          initials: "AS", color: "#317FA4", bg: "#e8eefa" },
  { id: 10, name: "Rightpoint",                 rating: 3.9, reviews: "68 reviews",    tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "https://logo.clearbit.com/rightpoint.com",        initials: "RP", color: "#c0392b", bg: "#fdecea" },
  { id: 11, name: "Propel Industries",          rating: 3.6, reviews: "290 reviews",   tags: ["Foreign MNC", "Industrial Equipment / Machinery"],    logo: "https://logo.clearbit.com/propel.com",            initials: "PI", color: "#196f3d", bg: "#e8f8f0" },
  { id: 12, name: "Sophos",                     rating: 3.8, reviews: "243 reviews",   tags: ["Foreign MNC", "Software Product"],                    logo: "https://logo.clearbit.com/sophos.com",            initials: "SO", color: "#0066cc", bg: "#e0f0ff" },
  { id: 13, name: "Sconce Solutions",           rating: 4.0, reviews: "3 reviews",     tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "",                                                initials: "SS", color: "#1c1c1c", bg: "#f0f0f0" },
  { id: 14, name: "Manhattan Associates",       rating: 3.4, reviews: "398 reviews",   tags: ["Indian MNC", "IT Services & Consulting"],             logo: "https://logo.clearbit.com/manh.com",              initials: "MA", color: "#2c3e50", bg: "#eaecee" },
  { id: 15, name: "Butterfly Ayurveda",         rating: 4.1, reviews: "21 reviews",    tags: ["Foreign MNC", "Pharmaceutical & Life Sciences"],      logo: "",                                                initials: "BA", color: "#d4a017", bg: "#fdf6e3" },
  { id: 16, name: "Logicmonitor",               rating: 3.5, reviews: "88 reviews",    tags: ["Foreign MNC", "Software Product", "51-200 emp."],     logo: "https://logo.clearbit.com/logicmonitor.com",      initials: "LM", color: "#f39c12", bg: "#fef9e7" },
  { id: 17, name: "Nagarro",                    rating: 3.9, reviews: "4.7K+ reviews", tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "https://logo.clearbit.com/nagarro.com",           initials: "NG", color: "#16a085", bg: "#e8f8f5" },
  { id: 18, name: "Bristlecone",                rating: 3.6, reviews: "706 reviews",   tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "https://logo.clearbit.com/bristlecone.com",       initials: "BC", color: "#2471a3", bg: "#e8f2fb" },
  { id: 19, name: "Avalara Technologies",       rating: 2.9, reviews: "444 reviews",   tags: ["Foreign MNC", "Software Product"],                    logo: "https://logo.clearbit.com/avalara.com",           initials: "AT", color: "#e74c3c", bg: "#fdecea" },
  { id: 20, name: "Intex Technologies",         rating: 3.7, reviews: "797 reviews",   tags: ["Corporate", "Indian MNC"],                            logo: "https://logo.clearbit.com/intex.in",              initials: "IT", color: "#e74c3c", bg: "#fdecea" },
  { id: 21, name: "ARC Document Solutions",     rating: 2.8, reviews: "185 reviews",   tags: ["Foreign MNC", "Printing & Publishing"],               logo: "",                                                initials: "AR", color: "#555",    bg: "#f5f5f5" },
  { id: 22, name: "SMG",                        rating: 4.2, reviews: "39 reviews",    tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "",                                                initials: "SG", color: "#2874a6", bg: "#eaf2fc" },
  { id: 23, name: "Anantara Solutions",         rating: 4.0, reviews: "18 reviews",    tags: ["Indian MNC", "IT Services & Consulting"],             logo: "",                                                initials: "AN", color: "#e74c3c", bg: "#fdecea" },
  { id: 24, name: "Hi Q",                       rating: 3.9, reviews: "19 reviews",    tags: ["Foreign MNC"],                                         logo: "",                                                initials: "HQ", color: "#1a6bb5", bg: "#e8f0fb" },
  { id: 25, name: "Arisen Technologies",        rating: 4.1, reviews: "27 reviews",    tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "",                                                initials: "AR", color: "#e67e22", bg: "#fef0e6" },
  { id: 26, name: "Excelacom Technologies",     rating: 3.0, reviews: "100 reviews",   tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "",                                                initials: "ET", color: "#2471a3", bg: "#e8f2fb" },
  { id: 27, name: "Bry Air",                    rating: 3.8, reviews: "169 reviews",   tags: ["Foreign MNC", "1001-5000 emp."],                      logo: "",                                                initials: "BA", color: "#c0392b", bg: "#fdecea" },
  { id: 28, name: "Hewlett Packard Enterprise", rating: 4.0, reviews: "4.6K+ reviews", tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "https://logo.clearbit.com/hpe.com",               initials: "HP", color: "#0d5ba3", bg: "#e6f0fb" },
  { id: 29, name: "Tuv",                        rating: 3.7, reviews: "1.1K+ reviews", tags: ["Indian MNC"],                                         logo: "",                                                initials: "TV", color: "#003087", bg: "#e0e8f7" },
  { id: 30, name: "Exotel",                     rating: 3.0, reviews: "162 reviews",   tags: ["Foreign MNC", "Software Product", "Soonicorn"],       logo: "https://logo.clearbit.com/exotel.com",            initials: "EX", color: "#2980b9", bg: "#e8f2fb" },
  { id: 31, name: "Qualys",                     rating: 3.7, reviews: "273 reviews",   tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "https://logo.clearbit.com/qualys.com",            initials: "QU", color: "#e74c3c", bg: "#fdecea" },
  { id: 32, name: "Sopra Steria",               rating: 3.9, reviews: "2.3K+ reviews", tags: ["Foreign MNC", "IT Services & Consulting"],            logo: "https://logo.clearbit.com/soprasteria.com",       initials: "SS", color: "#003087", bg: "#e0e8f7" },
  { id: 33, name: "LTS Com",                    rating: null, reviews: null,            tags: ["Indian MNC", "Engineering & Construction"],           logo: "",                                                initials: "LT", color: "#1a3c6e", bg: "#e8effa" },
  { id: 34, name: "ICE Data Services",          rating: 3.2, reviews: "193 reviews",   tags: ["Foreign MNC", "Financial Services"],                  logo: "",                                                initials: "IC", color: "#00a3cc", bg: "#e0f5fc" },
];

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 48;

const popularByIndustry = [
  "IT Services & Consulting companies in India",
  "Software Product companies in India",
  "Industrial Equipment / Machinery companies in India",
  "Pharmaceutical & Life Sciences companies in India",
  "Engineering & Construction companies in India",
  "Financial Services companies in India",
  "Auto Components companies in India",
  "Analytics / KPO / Research companies in India",
  "Recruitment / Staffing companies in India",
  "BPM / BPO companies in India",
];

const popularByType = [
  "Foreign MNC companies in India",
  "Indian MNC companies in India",
  "Corporate companies in India",
  "Startup companies in India",
  "Government companies in India",
  "Fortune 500 companies in India",
];

const popularByFunc = [
  "Engineering - Software & QA companies in India",
  "Sales & Business Development companies in India",
  "Finance & Accounting companies in India",
  "Customer Success, Service & Operations companies in India",
  "IT & Information Security companies in India",
  "Human Resources companies in India",
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function CompanyLogo({ company }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-md sm:rounded-lg flex-shrink-0 overflow-hidden border border-gray-100 bg-white flex items-center justify-center shadow-sm">
      {company.logo && !imgError ? (
        <img
          src={company.logo}
          alt={company.name}
          className="w-full h-full object-contain p-1"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-bold text-base"
          style={{ backgroundColor: company.bg, color: company.color }}
        >
          {company.initials}
        </div>
      )}
    </div>
  );
}

function StarRating({ rating }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1">
      <span className="text-yellow-400 text-sm leading-none">★</span>
      <span className="text-[13px] font-semibold text-gray-800">{rating}</span>
    </div>
  );
}

function CompanyCard({ company, index }) {
  return (
    <div
      className="bg-white rounded-lg sm:rounded-xl border border-gray-100 p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:border-blue-200 group"
      style={{ animation: `fadeUp 0.35s ease both`, animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <CompanyLogo company={company} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-[14.5px] leading-snug group-hover:text-blue-700 transition-colors truncate">
              {company.name}
            </h3>
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {company.rating && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <StarRating rating={company.rating} />
              <span className="text-gray-300 text-[11px] sm:text-xs">|</span>
              <span className="text-gray-500 text-[11px] sm:text-xs">{company.reviews}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
            {company.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-sm border border-gray-200 bg-gray-50 text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckboxFilter({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group py-0.5">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all duration-150 ${
          checked ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white group-hover:border-blue-400"
        }`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-[13px] text-gray-700 group-hover:text-blue-700 transition-colors">{label}</span>
    </label>
  );
}

function Pagination({ currentPage, onPageChange }) {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex items-center justify-center gap-1 mt-6 mb-2">
      <span className="text-sm text-gray-500 mr-3">Page {currentPage} of {TOTAL_PAGES}</span>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-md border transition-all ${currentPage === 1 ? "text-gray-300 border-gray-200 cursor-not-allowed" : "text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600 cursor-pointer"}`}
      >
        ‹ Previous
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm rounded-full border transition-all font-medium ${
            currentPage === p
              ? "border-gray-800 bg-white text-gray-900 shadow-sm"
              : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === TOTAL_PAGES}
        className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-md border border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600 cursor-pointer transition-all"
      >
        Next ›
      </button>
    </div>
  );
}

function PopularCompanies() {
  const [activeTab, setActiveTab] = useState("industry");
  const tabs = [
    { id: "industry", label: "Company By Industry", data: popularByIndustry },
    { id: "type", label: "Company By Type", data: popularByType },
    { id: "func", label: "Company By Functional Area", data: popularByFunc },
  ];
  const current = tabs.find((t) => t.id === activeTab);
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-5 mt-4 sm:mt-6">
      <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Popular companies in category MNCs</h2>
      <div className="flex gap-3 sm:gap-6 border-b border-gray-200 mb-3 sm:mb-4 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`pb-2 sm:pb-2.5 text-xs sm:text-[13.5px] font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activeTab === t.id ? "border-blue-700 text-blue-700" : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 sm:gap-x-6 gap-y-2">
        {current.data.map((item, i) => (
          <div key={i} className="flex items-start gap-1.5 sm:gap-2">
            <span className="text-gray-400 mt-1 text-xs">•</span>
            <span className="text-xs sm:text-[13px] text-blue-600 hover:underline cursor-pointer">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Mnc() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filters state
  const [companyTypeFilters, setCompanyTypeFilters] = useState({
    "Foreign MNC": true,
    "Indian MNC": true,
    "Corporate": false,
    "Startup": false,
  });
  const [locationFilters, setLocationFilters] = useState({
    "Bengaluru (1136)": false,
    "Delhi / NCR (977)": false,
    "Mumbai (All Areas) (835)": false,
    "Pune (786)": false,
  });
  const [industryFilters, setIndustryFilters] = useState({
    "IT Services & Consulting (674)": false,
    "Software Product (220)": false,
    "Industrial Equipment / Machinery (87)": false,
    "Pharmaceutical & Life Sciences": false,
  });
  const [deptFilters, setDeptFilters] = useState({
    "Engineering - Software & QA (1397)": false,
    "Sales & Business Development (947)": false,
    "Finance & Accounting (854)": false,
  });
  const [expFilters, setExpFilters] = useState({ "Experienced (2214)": false, "Entry Level (661)": false });
  const [bizFilters, setBizFilters] = useState({ "B2B (1796)": false, "B2C (578)": false, "SaaS (137)": false, "PaaS (5)": false, "D2C (5)": false });
  const [jobDateFilters, setJobDateFilters] = useState({ "<7 Days": false, "<15 Days": false });

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 5);
    }
  };
  useEffect(() => { checkScroll(); }, []);
  const scroll = (dir) => { scrollRef.current?.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" }); };

  const pagedCompanies = allCompanies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleFilter = (setter, key) => setter((prev) => ({ ...prev, [key]: !prev[key] }));

  const appliedCount = [
    ...Object.values(companyTypeFilters),
    ...Object.values(locationFilters),
    ...Object.values(industryFilters),
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#f3f5f7] font-sans">
      <CopyNavbar />
      {/* ── Top Section ── */}
      <div className="bg-white border-b border-gray-100 pt-[70px] md:pt-[80px]">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4 lg:px-8 pt-3 sm:pt-5 pb-3">
          <h1 className="text-lg sm:text-xl lg:text-[22px] font-bold text-gray-900 mb-3 sm:mb-4">MNCs actively hiring</h1>

          {/* Category slider */}
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center transition-all ${canScrollLeft ? "opacity-100 cursor-pointer hover:shadow-md" : "opacity-25 cursor-not-allowed"}`}
            >
              <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-2 sm:gap-3 overflow-x-auto px-6 sm:px-9 py-1.5"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                    className={`flex-shrink-0 min-w-[130px] sm:min-w-[145px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border-2 text-left transition-all duration-200 bg-white ${
                      active ? "border-gray-800 shadow-sm" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold text-xs sm:text-[13.5px] ${active ? "text-gray-900" : "text-gray-700"}`}>{cat.label}</span>
                      {active && (
                        <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center ml-1 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <span className="text-[11px] sm:text-[12px] font-medium text-blue-600">{cat.count}</span>
                      <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center transition-all ${canScrollRight ? "opacity-100 cursor-pointer hover:shadow-md" : "opacity-25 cursor-not-allowed"}`}
            >
              <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-5 flex flex-col lg:flex-row gap-3 sm:gap-5 items-start">

        {/* ── Sidebar Filters ── */}
        <aside className="hidden lg:block w-[240px] flex-shrink-0 bg-white rounded-xl border border-gray-200 p-4 sticky top-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-800 text-sm">All Filters</span>
            {appliedCount > 0 && (
              <span className="text-blue-600 text-xs font-semibold cursor-pointer">Applied ({appliedCount})</span>
            )}
          </div>

          {/* Company type */}
          <FilterSection title="Company type">
            {Object.entries(companyTypeFilters).map(([key, val]) => (
              <CheckboxFilter key={key} label={key === "Foreign MNC" ? "Foreign MNC (1624)" : key === "Indian MNC" ? "Indian MNC (640)" : key === "Corporate" ? "Corporate (4832)" : "Startup (799)"} checked={val} onChange={() => toggleFilter(setCompanyTypeFilters, key)} />
            ))}
          </FilterSection>

          {/* Location */}
          <FilterSection title="Location">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-1.5 mb-2 bg-gray-50">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input placeholder="Search Location" className="text-xs bg-transparent outline-none text-gray-600 placeholder-gray-400 w-full" />
            </div>
            {Object.entries(locationFilters).map(([key, val]) => (
              <CheckboxFilter key={key} label={key} checked={val} onChange={() => toggleFilter(setLocationFilters, key)} />
            ))}
            <span className="text-blue-600 text-xs font-medium cursor-pointer hover:underline">+89 more</span>
          </FilterSection>

          {/* Industry */}
          <FilterSection title="Industry">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-1.5 mb-2 bg-gray-50">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input placeholder="Search Industry" className="text-xs bg-transparent outline-none text-gray-600 placeholder-gray-400 w-full" />
            </div>
            {Object.entries(industryFilters).map(([key, val]) => (
              <CheckboxFilter key={key} label={key} checked={val} onChange={() => toggleFilter(setIndustryFilters, key)} />
            ))}
            <span className="text-blue-600 text-xs font-medium cursor-pointer hover:underline">+71 more</span>
          </FilterSection>

          {/* Department */}
          <FilterSection title="Department">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-1.5 mb-2 bg-gray-50">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input placeholder="Search Department" className="text-xs bg-transparent outline-none text-gray-600 placeholder-gray-400 w-full" />
            </div>
            {Object.entries(deptFilters).map(([key, val]) => (
              <CheckboxFilter key={key} label={key} checked={val} onChange={() => toggleFilter(setDeptFilters, key)} />
            ))}
            <span className="text-blue-600 text-xs font-medium cursor-pointer hover:underline">+27 more</span>
          </FilterSection>

          {/* Experience */}
          <FilterSection title="Experience">
            <div className="flex flex-wrap gap-2">
              {Object.entries(expFilters).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => toggleFilter(setExpFilters, key)}
                  className={`px-3 py-1 rounded-full border text-xs font-medium transition-all ${val ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"}`}
                >
                  {key}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Nature of business */}
          <FilterSection title="Nature of business">
            <div className="flex flex-wrap gap-2">
              {Object.entries(bizFilters).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => toggleFilter(setBizFilters, key)}
                  className={`px-3 py-1 rounded-full border text-xs font-medium transition-all ${val ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"}`}
                >
                  {key}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Job posting date */}
          <FilterSection title="Job posting date" last>
            <div className="flex gap-2">
              {Object.entries(jobDateFilters).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => toggleFilter(setJobDateFilters, key)}
                  className={`px-3 py-1 rounded-full border text-xs font-medium transition-all ${val ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"}`}
                >
                  {key}
                </button>
              ))}
            </div>
          </FilterSection>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 w-full">
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
            Showing <span className="font-semibold text-gray-900">2263 companies</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {pagedCompanies.map((company, i) => (
              <CompanyCard key={company.id} company={company} index={i} />
            ))}
          </div>

          <Pagination currentPage={currentPage} onPageChange={(p) => { if (p >= 1 && p <= TOTAL_PAGES) { setCurrentPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); } }} />

          <PopularCompanies />

          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 sm:mt-5 text-xs sm:text-[13px] text-gray-500">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="hover:text-blue-600 cursor-pointer">Companies In India</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-gray-700 font-medium">MNCs Companies In India</span>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <Footer />
    </div>
  );
}

// Helper wrapper for sidebar sections
function FilterSection({ title, children, last = false }) {
  return (
    <div className={`py-3.5 ${last ? "" : "border-b border-gray-100"}`}>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[13px] font-semibold text-gray-800">{title}</span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}
