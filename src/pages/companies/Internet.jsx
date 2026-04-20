import { useState, useRef } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const categories = [
  { id: 1, label: "MNCs", count: "2.3K+ Companies" },
  { id: 2, label: "Internet", count: "246 Companies", active: true },
  { id: 3, label: "Manufacturing", count: "1.1K+ Companies" },
  { id: 4, label: "Fortune 500", count: "157 Companies" },
  { id: 5, label: "Product", count: "1.3K+ Companies" },
];

const allCompanies = [
  { id: 1, name: "Surveymonkey", rating: 5, reviews: "2 reviews", tags: ["Foreign MNC", "Internet", "1001-5000 emp."], logo: "🐵", color: "#00BF6F" },
  { id: 2, name: "Cuelinks", rating: 4, reviews: "2 reviews", tags: ["Internet", "Founded: 2012", "2-10 emp."], logo: "CL", color: "#2563EB" },
  { id: 3, name: "BRND.ME", rating: 3.7, reviews: "199 reviews", tags: ["Startup", "Internet", "Unicorn", "Founded: 2021"], logo: "B", color: "#FF6B35" },
  { id: 4, name: "Practo", rating: 3, reviews: "550 reviews", tags: ["Corporate", "Internet", "Soonicorn"], logo: "p", color: "#7B2FBE" },
  { id: 5, name: "Justdial", rating: 3.5, reviews: "5.1K+ reviews", tags: ["Indian MNC", "Internet", "Founded: 1996"], logo: "JD", color: "#FF6600" },
  { id: 6, name: "Glance", rating: 3.3, reviews: "117 reviews", tags: ["Startup", "Internet", "Unicorn", "Founded: 2017"], logo: "G", color: "#E91E8C" },
  { id: 7, name: "Moglix", rating: 3.3, reviews: "686 reviews", tags: ["Startup", "Internet", "Unicorn", "Founded: 2015"], logo: "M", color: "#E74C3C" },
  { id: 8, name: "Unique Enterprises", rating: 3.5, reviews: "104 reviews", tags: ["Internet", "Founded: 1998", "11-50 emp."], logo: "U", color: "#8B4513" },
  { id: 9, name: "Pristyn Care", rating: 3.2, reviews: "989 reviews", tags: ["Startup", "Internet", "Unicorn", "Founded: 2018"], logo: "🏥", color: "#00BFA5" },
  { id: 10, name: "Yahoo", rating: 4.4, reviews: "135 reviews", tags: ["Foreign MNC", "Internet", "5001-10000 emp."], logo: "Y!", color: "#6001D2" },
  { id: 11, name: "Tradologie.Com", rating: 2.6, reviews: "133 reviews", tags: ["Startup", "Internet", "Founded: 2016", "B2B"], logo: "T", color: "#27AE60" },
  { id: 12, name: "Releasemyad", rating: 3, reviews: "24 reviews", tags: ["Corporate", "Internet", "Founded: 2009"], logo: "R", color: "#E74C3C" },
  { id: 13, name: "Hi Tech Biosciences", rating: 2.6, reviews: "56 reviews", tags: ["Internet", "Founded: 2007", "51-200 emp."], logo: "HT", color: "#1ABC9C" },
  { id: 14, name: "Olx", rating: 3.7, reviews: "737 reviews", tags: ["Corporate", "Internet", "E-commerce"], logo: "OLX", color: "#3DB94A" },
  { id: 15, name: "Homeshop18", rating: 4, reviews: "152 reviews", tags: ["Corporate", "Internet", "E-commerce"], logo: "H18", color: "#E74C3C" },
  { id: 16, name: "Healthifyme", rating: 2.7, reviews: "491 reviews", tags: ["Corporate", "Internet", "Soonicorn"], logo: "H", color: "#00C853" },
  { id: 17, name: "Inshorts", rating: 3.5, reviews: "158 reviews", tags: ["Startup", "Internet", "Soonicorn"], logo: "📰", color: "#E53935" },
  { id: 18, name: "Ninjacart", rating: 3.8, reviews: "2K+ reviews", tags: ["Startup", "Internet", "Soonicorn"], logo: "N", color: "#00AA44" },
  { id: 19, name: "Retailez", rating: 3.1, reviews: "47 reviews", tags: ["Internet"], logo: "R", color: "#7B2FBE" },
  { id: 20, name: "Vutto", rating: 3.5, reviews: "2 reviews", tags: ["Internet"], logo: "V", color: "#E74C3C" },
  { id: 21, name: "Tatvic Analytics", rating: 2.5, reviews: "75 reviews", tags: ["Internet", "Founded: 2009", "201-500 emp."], logo: "T", color: "#F39C12" },
  { id: 22, name: "Housing.Com", rating: 3.6, reviews: "663 reviews", tags: ["Corporate", "Internet", "Founded: 2012"], logo: "🏠", color: "#E74C3C" },
  { id: 23, name: "Dolcera", rating: 2.9, reviews: "29 reviews", tags: ["Foreign MNC", "Internet", "51-200 emp."], logo: "D", color: "#C0392B" },
  { id: 24, name: "Molbio Diagnostics", rating: 3.9, reviews: "140 reviews", tags: ["Startup", "Internet", "Minicorn", "Unicorn"], logo: "M", color: "#8E44AD" },
  { id: 25, name: "Yougotagift", rating: 4.5, reviews: "12 reviews", tags: ["Corporate", "Internet"], logo: "Y", color: "#9B59B6" },
  { id: 26, name: "Rizzle", rating: 2.9, reviews: "46 reviews", tags: ["Startup", "Corporate", "Internet"], logo: "R", color: "#FF4757" },
  { id: 27, name: "Ricago", rating: 4.4, reviews: "81 reviews", tags: ["Startup", "Internet", "Founded: 2014"], logo: "ri", color: "#27AE60" },
  { id: 28, name: "Adamsbridge Services", rating: 3.5, reviews: "150 reviews", tags: ["Internet", "Founded: 2019", "501-1000 emp."], logo: "A", color: "#95A5A6" },
  { id: 29, name: "Meta Platforms", rating: 4.2, reviews: "73 reviews", tags: ["Foreign MNC", "Internet", "50001-100000 emp."], logo: "f", color: "#1877F2" },
  { id: 30, name: "Netflix", rating: 3.8, reviews: "43 reviews", tags: ["Foreign MNC", "Internet", "10,001+ emp."], logo: "N", color: "#E50914" },
  { id: 31, name: "Lenskart", rating: 3.3, reviews: "4.3K+ reviews", tags: ["Corporate", "Internet", "Unicorn"], logo: "👓", color: "#1A237E" },
  { id: 32, name: "Coupondunia", rating: 4.7, reviews: "9 reviews", tags: ["Internet", "Founded: 2010", "11-50 emp.", "B2C"], logo: "C", color: "#E74C3C" },
  { id: 33, name: "Matrimony Com", rating: 3.9, reviews: "1.6K+ reviews", tags: ["Corporate", "Internet", "Founded: 1997"], logo: "M", color: "#C0392B" },
  { id: 34, name: "Naaptol", rating: 3.3, reviews: "281 reviews", tags: ["Corporate", "Internet", "E-commerce"], logo: "N", color: "#F39C12" },
  { id: 35, name: "CarTrade", rating: 3.8, reviews: "124 reviews", tags: ["Corporate", "Internet", "E-commerce"], logo: "C", color: "#E74C3C" },
  { id: 36, name: "Snapdeal", rating: 3.8, reviews: "670 reviews", tags: ["Corporate", "Internet", "Former Unicorn"], logo: "S", color: "#E74C3C" },
  { id: 37, name: "Ofb Tech", rating: 3, reviews: "588 reviews", tags: ["Startup", "Internet", "Unicorn", "Founded: 2015"], logo: "O", color: "#2C3E50" },
  { id: 38, name: "Wordplay Content", rating: 2, reviews: "3 reviews", tags: ["Internet", "Founded: 2010", "11-50 emp.", "B2C"], logo: "W", color: "#16A085" },
  { id: 39, name: "Anchanto Services", rating: 3.2, reviews: "89 reviews", tags: ["Internet", "Minicorn", "Founded: 2011"], logo: "A", color: "#1A1A2E" },
  { id: 40, name: "Healthkart", rating: 3.8, reviews: "408 reviews", tags: ["Corporate", "Internet", "E-commerce"], logo: "H", color: "#E74C3C" },
  { id: 41, name: "Airspan Networks", rating: 3.2, reviews: "77 reviews", tags: ["Internet", "Founded: 1992", "501-1000 emp."], logo: "A", color: "#95A5A6" },
  { id: 42, name: "Applyboard", rating: 2.5, reviews: "142 reviews", tags: ["Internet", "Founded: 2015", "501-1000 emp."], logo: "A", color: "#3498DB" },
  { id: 43, name: "BookEventz", rating: 2.4, reviews: "38 reviews", tags: ["Startup", "Internet", "Founded: 2012"], logo: "B", color: "#E74C3C" },
  { id: 44, name: "Pidge", rating: 4, reviews: "52 reviews", tags: ["Internet", "Founded: 2019"], logo: "P", color: "#7B2FBE" },
  { id: 45, name: "Exclusivelane", rating: 4.4, reviews: "16 reviews", tags: ["Startup", "Internet", "E-commerce"], logo: "E", color: "#27AE60" },
  { id: 46, name: "Asianet", rating: 4.4, reviews: "177 reviews", tags: ["Corporate", "Internet", "Founded: 1993"], logo: "A", color: "#E74C3C" },
  { id: 47, name: "Oppdoor", rating: 5, reviews: "1 review", tags: ["Startup", "Internet"], logo: "🔶", color: "#FF6B00" },
];

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 6;

const companyTypes = [
  { label: "Startup", count: 95 },
  { label: "Corporate", count: 77 },
  { label: "Foreign MNC", count: 18 },
  { label: "Indian MNC", count: 9 },
];

const locations = [
  { label: "Delhi / NCR", count: 126 },
  { label: "Bengaluru", count: 123 },
  { label: "Mumbai (All Areas)", count: 115 },
  { label: "Mumbai", count: 102 },
];

const industries = [
  { label: "Internet", count: 246, checked: true },
  { label: "IT Services & Consulting", count: 2503 },
  { label: "Software Product", count: 570 },
  { label: "Recruitment / Staffing", count: 327 },
];

const departments = [
  { label: "Sales & Business Development", count: 145 },
  { label: "Engineering - Software & QA", count: 125 },
  { label: "Customer Success, Service & Operations", count: 106 },
];

const popularLinks = [
  "Internet companies in India",
  "IT Services & Consulting companies in India",
  "Software Product companies in India",
  "Recruitment / Staffing companies in India",
  "Industrial Equipment / Machinery companies in India",
  "Education / Training companies in India",
  "Medical Services / Hospital companies in India",
  "Engineering & Construction companies in India",
  "Pharmaceutical & Life Sciences companies in India",
  "Real Estate companies in India",
];

function StarRating({ rating }) {
  if (!rating) return <span className="text-gray-400 text-xs">No rating</span>;
  return (
    <span className="flex items-center gap-1">
      <svg className="w-3.5 h-3.5 text-yellow-400 fill-current flex-shrink-0" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-sm font-semibold text-gray-800">{rating}</span>
    </span>
  );
}

function CompanyCard({ company }) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 flex items-start gap-2 sm:gap-3 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md sm:rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: company.color }}
      >
        {company.logo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-sm truncate group-hover:text-[#47AEC7] transition-colors">
            {company.name}
          </h3>
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
          <StarRating rating={company.rating} />
          <span className="text-[11px] sm:text-xs text-gray-500">| {company.reviews}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1.5 sm:mt-2">
          {company.tags.map((tag, i) => (
            <span key={i} className="text-[10px] sm:text-xs bg-gray-100 text-gray-500 px-1.5 sm:px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterCheckbox({ label, count, checked, onChange }) {
  return (
    <label className="flex items-start gap-2 cursor-pointer py-1 group">
      <div
        className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          checked ? "bg-blue-600 border-[#47AEC7]" : "border-gray-300 group-hover:border-gray-400"
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700 leading-tight">
        {label} <span className="text-gray-400">({count})</span>
      </span>
    </label>
  );
}

export default function Internet() {
  const [activeCat, setActiveCat] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedTypes, setCheckedTypes] = useState({});
  const [checkedLocations, setCheckedLocations] = useState({});
  const [checkedIndustries, setCheckedIndustries] = useState({ Internet: true });
  const [checkedDepts, setCheckedDepts] = useState({});
  const [activeTab, setActiveTab] = useState("Company By Industry");
  const [locationSearch, setLocationSearch] = useState("");
  const [industrySearch, setIndustrySearch] = useState("");
  const [deptSearch, setDeptSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [nature, setNature] = useState([]);
  const [jobDate, setJobDate] = useState("");

  const sliderRef = useRef(null);

  const scroll = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }
  };

  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCompanies = allCompanies.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  const toggleNature = (val) =>
    setNature((prev) => (prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]));

  const appliedCount = Object.values(checkedTypes).filter(Boolean).length +
    Object.values(checkedLocations).filter(Boolean).length +
    Object.values(checkedIndustries).filter(Boolean).length +
    Object.values(checkedDepts).filter(Boolean).length +
    (experience ? 1 : 0) + nature.length + (jobDate ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <CopyNavbar />
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-8 py-3 sm:py-5 pt-[70px] md:pt-[80px]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Internet companies actively hiring</h1>

          {/* Category Slider with arrows */}
          <div className="relative flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md flex-shrink-0 transition-shadow"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={sliderRef}
              className="flex gap-2 sm:gap-3 overflow-x-auto flex-1 pb-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`flex-shrink-0 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 text-left transition-all duration-200 min-w-[130px] sm:min-w-[148px] ${
                    activeCat === cat.id
                      ? "border-gray-900 bg-white shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">{cat.label}</span>
                    {activeCat === cat.id && (
                      <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-[#47AEC7] font-medium">{cat.count}</span>
                    <svg className="w-3 h-3 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => scroll(1)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md flex-shrink-0 transition-shadow"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-60 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4 max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-900 text-sm">All Filters</span>
                <span className="text-[#47AEC7] text-xs font-medium bg-[#e6f7fa] px-2 py-0.5 rounded-full">
                  Applied ({appliedCount || 1})
                </span>
              </div>

              {/* Company Type */}
              <SideSection title="Company type">
                {companyTypes.map((t) => (
                  <FilterCheckbox key={t.label} label={t.label} count={t.count}
                    checked={!!checkedTypes[t.label]}
                    onChange={() => setCheckedTypes((p) => ({ ...p, [t.label]: !p[t.label] }))}
                  />
                ))}
              </SideSection>

              {/* Location */}
              <SideSection title="Location">
                <SearchBox value={locationSearch} onChange={setLocationSearch} placeholder="Search Location" />
                {locations.map((l) => (
                  <FilterCheckbox key={l.label} label={l.label} count={l.count}
                    checked={!!checkedLocations[l.label]}
                    onChange={() => setCheckedLocations((p) => ({ ...p, [l.label]: !p[l.label] }))}
                  />
                ))}
                <MoreBtn label="+90 more" />
              </SideSection>

              {/* Industry */}
              <SideSection title="Industry">
                <SearchBox value={industrySearch} onChange={setIndustrySearch} placeholder="Search Industry" />
                {industries.map((ind) => (
                  <FilterCheckbox key={ind.label} label={ind.label} count={ind.count}
                    checked={!!checkedIndustries[ind.label]}
                    onChange={() => setCheckedIndustries((p) => ({ ...p, [ind.label]: !p[ind.label] }))}
                  />
                ))}
                <MoreBtn label="+73 more" />
              </SideSection>

              {/* Department */}
              <SideSection title="Department">
                <SearchBox value={deptSearch} onChange={setDeptSearch} placeholder="Search Department" />
                {departments.map((d) => (
                  <FilterCheckbox key={d.label} label={d.label} count={d.count}
                    checked={!!checkedDepts[d.label]}
                    onChange={() => setCheckedDepts((p) => ({ ...p, [d.label]: !p[d.label] }))}
                  />
                ))}
                <MoreBtn label="+26 more" />
              </SideSection>

              {/* Experience */}
              <SideSection title="Experience" noDivider>
                <div className="flex flex-wrap gap-2">
                  {[{ label: "Experienced", count: 243 }, { label: "Entry Level", count: 96 }].map((e) => (
                    <button key={e.label} onClick={() => setExperience(experience === e.label ? "" : e.label)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        experience === e.label ? "border-[#47AEC7] text-[#47AEC7] bg-[#e6f7fa]" : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {e.label} ({e.count})
                    </button>
                  ))}
                </div>
              </SideSection>

              {/* Nature of Business */}
              <SideSection title="Nature of business">
                <div className="flex flex-wrap gap-2">
                  {[{ v: "B2C", c: 117 }, { v: "B2B", c: 97 }, { v: "SaaS", c: 18 }, { v: "D2C", c: 4 }].map((n) => (
                    <button key={n.v} onClick={() => toggleNature(n.v)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        nature.includes(n.v) ? "border-[#47AEC7] text-[#47AEC7] bg-[#e6f7fa]" : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {n.v} ({n.c})
                    </button>
                  ))}
                </div>
              </SideSection>

              {/* Job Posting Date */}
              <SideSection title="Job posting date" noDivider>
                <div className="flex gap-2">
                  {["<7 Days", "<15 Days"].map((d) => (
                    <button key={d} onClick={() => setJobDate(jobDate === d ? "" : d)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        jobDate === d ? "border-[#47AEC7] text-[#47AEC7] bg-[#e6f7fa]" : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </SideSection>
            </div>
          </div>

          {/* Company Grid */}
          <div className="flex-1 min-w-0 w-full">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              Showing <span className="font-semibold text-gray-900">246</span> companies
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {pageCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1 mb-6 sm:mb-8 flex-wrap">
              <span className="text-xs sm:text-sm text-gray-500 mr-1 sm:mr-2">Page {currentPage} of {TOTAL_PAGES}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40 transition-opacity"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    currentPage === p ? "border-2 border-gray-900 text-gray-900" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                disabled={currentPage === TOTAL_PAGES}
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 disabled:opacity-40 transition-opacity"
              >
                Next
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Popular Companies */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-6 mb-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                Popular companies in category <span className="text-[#47AEC7]">Internet</span>
              </h2>
              <div className="flex gap-0 border-b border-gray-200 mb-4">
                {["Company By Industry", "Company By Type", "Company By Functional Area"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 mr-6 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === tab ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {popularLinks.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#47AEC7] hover:underline cursor-pointer">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
              <span className="hover:text-[#47AEC7] cursor-pointer">Home</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="hover:text-[#47AEC7] cursor-pointer">Companies In India</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-700">Internet Companies In India</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function SideSection({ title, children, noDivider }) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="mb-4">
        <button className="flex items-center justify-between w-full mb-3" onClick={() => setOpen(!open)}>
          <span className="font-semibold text-sm text-gray-900">{title}</span>
          <svg className={`w-4 h-4 text-gray-500 transition-transform ${open ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {open && <div>{children}</div>}
      </div>
      {!noDivider && <hr className="border-gray-100 mb-4" />}
    </>
  );
}

function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="relative mb-2">
      <svg className="w-4 h-4 text-gray-400 absolute left-2 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        className="w-full pl-7 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function MoreBtn({ label }) {
  return (
    <button className="text-[#47AEC7] text-sm font-medium mt-1 hover:underline">{label}</button>
  );
}

