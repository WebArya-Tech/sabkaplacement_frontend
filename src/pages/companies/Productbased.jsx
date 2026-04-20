import { useState } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const categories = [
  { id: 1, label: "Manufacturing", count: "1.1K+ Companies" },
  { id: 2, label: "Fortune 500", count: "157 Companies" },
  { id: 3, label: "Product", count: "1.3K+ Companies", active: true },
  { id: 4, label: "Banking & Fina...", count: "443 Companies" },
  { id: 5, label: "Hospitality", count: "109 Companies" },
];

const companies = [
  { id: 1, name: "Toast", rating: 4.1, reviews: "97 reviews", tags: ["Foreign MNC", "Software Product"], logo: "🍞", color: "#FF6B35" },
  { id: 2, name: "Ola", rating: 3.3, reviews: "2.1K+ reviews", tags: ["Corporate", "Internet", "Unicorn"], logo: "🚗", color: "#000" },
  { id: 3, name: "BRND.ME", rating: 3.7, reviews: "199 reviews", tags: ["Startup", "Internet", "Unicorn", "Founded: 2021"], logo: "B", color: "#FF6B35", founded: true },
  { id: 4, name: "Medvarsity", rating: 3.1, reviews: "164 reviews", tags: ["Corporate", "e-Learning / EdTech"], logo: "M", color: "#E74C3C" },
  { id: 5, name: "Farehawker", rating: 3.5, reviews: "6 reviews", tags: ["Startup", "Internet", "E-commerce"], logo: "F", color: "#27AE60" },
  { id: 6, name: "CACTUS Communications", rating: 3.4, reviews: "317 reviews", tags: ["Indian MNC", "Software Product"], logo: "C", color: "#8B4513" },
  { id: 7, name: "Pace Automation", rating: 3.8, reviews: "15 reviews", tags: ["Corporate", "Hardware & Networking"], logo: "P", color: "#E74C3C" },
  { id: 8, name: "Totality Corp", rating: 4.4, reviews: "32 reviews", tags: ["Startup", "Gaming", "Founded: 2017", "B2C"], logo: "T", color: "#1A1A2E" },
  { id: 9, name: "Taashee Linux", rating: 4.2, reviews: "55 reviews", tags: ["Corporate", "Software Product", "Founded: 2007"], logo: "T", color: "#2ECC71" },
  { id: 10, name: "3Di Systems", rating: 3.4, reviews: "61 reviews", tags: ["Corporate", "Software Product", "Founded: 1995"], logo: "3D", color: "#E74C3C" },
  { id: 11, name: "Skillmine Technology", rating: 3.9, reviews: "415 reviews", tags: ["Indian MNC", "Software Product"], logo: "S", color: "#FF6B35" },
  { id: 12, name: "Keyloop India", rating: 3.9, reviews: "57 reviews", tags: ["Foreign MNC", "Software Product"], logo: "K", color: "#1ABC9C" },
  { id: 13, name: "Enterprisedb Software", rating: 3.8, reviews: "26 reviews", tags: ["Software Product", "Founded: 2004"], logo: "E", color: "#FF6B35" },
  { id: 14, name: "Cleareye Ai", rating: 3.0, reviews: "24 reviews", tags: ["Emerging Technologies"], logo: "C", color: "#3498DB" },
  { id: 15, name: "Commure", rating: 2.8, reviews: "50 reviews", tags: ["Startup", "Software Product"], logo: "●", color: "#1A1A1A" },
  { id: 16, name: "Hike Education", rating: 4.2, reviews: "376 reviews", tags: ["Startup", "e-Learning / EdTech", "Founded: 2014"], logo: "H", color: "#FF6B35" },
  { id: 17, name: "Ahaguru Educational Technol...", rating: 3.9, reviews: "29 reviews", tags: ["e-Learning / EdTech", "Founded: 2012"], logo: "A", color: "#3498DB" },
  { id: 18, name: "Palo Alto Networks", rating: 0, reviews: "0", tags: ["Corporate", "Software Product", "Founded: 2015"], logo: "P", color: "#E74C3C" },
  { id: 19, name: "Evolent Health", rating: 3.9, reviews: "362 reviews", tags: ["Corporate", "Software Product", "Founded: 2011"], logo: "E", color: "#27AE60" },
  { id: 20, name: "Ceptes Software", rating: 4.3, reviews: "73 reviews", tags: ["Indian MNC", "Software Product"], logo: "C", color: "#1ABC9C" },
  { id: 21, name: "Sigma World", rating: 1.0, reviews: "2 reviews", tags: ["Corporate", "Software Product"], logo: "S", color: "#E74C3C" },
  { id: 22, name: "Tatvic Analytics", rating: 2.5, reviews: "75 reviews", tags: ["Internet", "Founded: 2009", "201-500 emp."], logo: "T", color: "#F39C12" },
  { id: 23, name: "Dolcera", rating: 2.9, reviews: "29 reviews", tags: ["Foreign MNC", "Internet", "51-200 emp."], logo: "D", color: "#E74C3C" },
  { id: 24, name: "RS Software", rating: 3.4, reviews: "153 reviews", tags: ["Corporate", "FinTech / Payments"], logo: "R", color: "#3498DB" },
  { id: 25, name: "Jar App", rating: 4.4, reviews: "169 reviews", tags: ["Corporate", "FinTech / Payments", "Minicorn"], logo: "J", color: "#6C5CE7" },
  { id: 26, name: "Uncia", rating: 2.9, reviews: "35 reviews", tags: ["Startup", "Software Product", "Founded: 2016"], logo: "U", color: "#2C3E50" },
  { id: 27, name: "CommerceIQ", rating: 2.8, reviews: "103 reviews", tags: ["Foreign MNC", "Software Product", "India"], logo: "C", color: "#3498DB" },
  { id: 28, name: "Ricago", rating: 4.4, reviews: "81 reviews", tags: ["Startup", "Internet", "Founded: 2014"], logo: "R", color: "#27AE60" },
  { id: 29, name: "Bazaarvoice", rating: 3.0, reviews: "18 reviews", tags: ["Foreign MNC", "Software Product"], logo: "B", color: "#0066CC" },
  { id: 30, name: "SequoiaAT", rating: 4.6, reviews: "28 reviews", tags: ["Startup", "Software Product", "Founded: 2016"], logo: "S", color: "#27AE60" },
  { id: 31, name: "Etraveli", rating: 2.8, reviews: "145 reviews", tags: ["Internet"], logo: "E", color: "#1ABC9C" },
  { id: 32, name: "Algoleap Technologies", rating: 4.3, reviews: "127 reviews", tags: ["Startup", "Emerging Technologies"], logo: "A", color: "#6C5CE7" },
  { id: 33, name: "Nitor", rating: 4.0, reviews: "318 reviews", tags: ["Corporate", "Software Product", "Founded: 2006"], logo: "N", color: "#1A1A2E" },
  { id: 34, name: "Globus Infocom", rating: 4.3, reviews: "252 reviews", tags: ["Corporate", "e-Learning / EdTech"], logo: "G", color: "#E74C3C" },
  { id: 35, name: "Khan Academy", rating: 4.5, reviews: "7 reviews", tags: ["Corporate", "e-Learning / EdTech"], logo: "K", color: "#14BF96" },
  { id: 36, name: "Ketto", rating: 4.3, reviews: "285 reviews", tags: ["Startup", "Internet", "Minicorn", "Founded: 2012"], logo: "K", color: "#F39C12" },
  { id: 37, name: "Enrich Money", rating: 3.7, reviews: "32 reviews", tags: ["Startup", "FinTech / Payments"], logo: "E", color: "#27AE60" },
  { id: 38, name: "KrazyBee", rating: 3.5, reviews: "685 reviews", tags: ["Startup", "Internet", "Soonicorn"], logo: "K", color: "#6C5CE7" },
  { id: 39, name: "Transperfect", rating: 3.0, reviews: "199 reviews", tags: ["Foreign MNC", "Hardware & Networking"], logo: "T", color: "#1A1A2E" },
  { id: 40, name: "Perforce", rating: 4.1, reviews: "27 reviews", tags: ["Foreign MNC", "Software Product"], logo: "P", color: "#3498DB" },
  { id: 41, name: "Wealthy", rating: 3.0, reviews: "48 reviews", tags: ["Startup", "FinTech / Payments", "Founded: 2015"], logo: "W", color: "#7B2FBE" },
];

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 27;

const companyTypes = [
  { label: "Corporate", count: 433 },
  { label: "Foreign MNC", count: 278 },
  { label: "Startup", count: 275 },
  { label: "Indian MNC", count: 55 },
];

const locations = [
  { label: "Bengaluru", count: 576 },
  { label: "Delhi / NCR", count: 463 },
  { label: "Mumbai (All Areas)", count: 404 },
  { label: "Mumbai", count: 353 },
];

const industries = [
  { label: "Hardware & Networking", count: 49, checked: true },
  { label: "Internet", count: 246, checked: true },
  { label: "Software Product", count: 570, checked: true },
  { label: "FinTech / Payments", count: 147, checked: true },
];

const departments = [
  { label: "Engineering - Software & QA", count: 837 },
  { label: "Sales & Business Development", count: 582 },
  { label: "Customer Success, Service & Operations", count: 432 },
];

const popularIndustries = [
  "Hardware & Networking companies in India",
  "Internet companies in India",
  "Software Product companies in India",
  "FinTech / Payments companies in India",
  "E-Learning / EdTech companies in India",
  "Gaming companies in India",
  "Emerging Technologies companies in India",
  "IT Services & Consulting companies in India",
  "Recruitment / Staffing companies in India",
  "Industrial Equipment / Machinery companies in India",
];

function StarRating({ rating }) {
  if (!rating) return <span className="text-gray-400 text-sm">No rating</span>;
  return (
    <span className="flex items-center gap-1">
      <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
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
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md sm:rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0"
        style={{ backgroundColor: company.color }}
      >
        {company.logo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-sm truncate group-hover:text-blue-600 transition-colors">
            {company.name}
          </h3>
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
          <StarRating rating={company.rating} />
          <span className="text-[11px] sm:text-xs text-gray-500">| {company.reviews}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1.5 sm:mt-2">
          {company.tags.map((tag, i) => (
            <span key={i} className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-full">
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
    <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors py-1">
      <div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          checked ? "bg-blue-600 border-blue-600" : "border-gray-300"
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700">
        {label} <span className="text-gray-400">({count})</span>
      </span>
    </label>
  );
}

export default function ProductBased() {
  const [activeCat, setActiveCat] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedTypes, setCheckedTypes] = useState({});
  const [checkedLocations, setCheckedLocations] = useState({});
  const [checkedIndustries, setCheckedIndustries] = useState({
    "Hardware & Networking": true,
    "Internet": true,
    "Software Product": true,
    "FinTech / Payments": true,
  });
  const [checkedDepts, setCheckedDepts] = useState({});
  const [activeTab, setActiveTab] = useState("Company By Industry");
  const [locationSearch, setLocationSearch] = useState("");
  const [industrySearch, setIndustrySearch] = useState("");
  const [deptSearch, setDeptSearch] = useState("");
  const [experience, setExperience] = useState("Experienced");
  const [nature, setNature] = useState([]);
  const [jobDate, setJobDate] = useState("");

  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCompanies = companies.slice(pageStart, pageStart + ITEMS_PER_PAGE);
  const visiblePages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const toggleNature = (val) => {
    setNature((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <CopyNavbar />
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-8 py-3 sm:py-4 pt-[70px] md:pt-[80px]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Product companies actively hiring</h1>

          {/* Category Slider */}
          <div className="relative">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`flex-shrink-0 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 text-left transition-all duration-200 min-w-[130px] sm:min-w-[150px] ${
                    activeCat === cat.id
                      ? "border-gray-900 bg-white shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-semibold text-gray-900 text-xs sm:text-sm">{cat.label}</span>
                    {activeCat === cat.id && (
                      <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-blue-600 font-medium">{cat.count}</span>
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-6">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-900">All Filters</span>
                <span className="text-blue-600 text-sm font-medium bg-blue-50 px-2 py-0.5 rounded-full">Applied (7)</span>
              </div>

              {/* Company Type */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm text-gray-900">Company type</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
                {companyTypes.map((t) => (
                  <FilterCheckbox
                    key={t.label}
                    label={t.label}
                    count={t.count}
                    checked={!!checkedTypes[t.label]}
                    onChange={() => setCheckedTypes((p) => ({ ...p, [t.label]: !p[t.label] }))}
                  />
                ))}
              </div>

              <hr className="border-gray-100 mb-5" />

              {/* Location */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm text-gray-900">Location</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
                <div className="relative mb-2">
                  <svg className="w-4 h-4 text-gray-400 absolute left-2 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    className="w-full pl-7 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                    placeholder="Search Location"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                  />
                </div>
                {locations.map((l) => (
                  <FilterCheckbox
                    key={l.label}
                    label={l.label}
                    count={l.count}
                    checked={!!checkedLocations[l.label]}
                    onChange={() => setCheckedLocations((p) => ({ ...p, [l.label]: !p[l.label] }))}
                  />
                ))}
              </div>

              <hr className="border-gray-100 mb-5" />

              {/* Industry */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm text-gray-900">Industry</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
                <div className="relative mb-2">
                  <svg className="w-4 h-4 text-gray-400 absolute left-2 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    className="w-full pl-7 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                    placeholder="Search Industry"
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                  />
                </div>
                {industries.map((ind) => (
                  <FilterCheckbox
                    key={ind.label}
                    label={ind.label}
                    count={ind.count}
                    checked={!!checkedIndustries[ind.label]}
                    onChange={() => setCheckedIndustries((p) => ({ ...p, [ind.label]: !p[ind.label] }))}
                  />
                ))}
                <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">+73 more</button>
              </div>

              <hr className="border-gray-100 mb-5" />

              {/* Department */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm text-gray-900">Department</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
                <div className="relative mb-2">
                  <svg className="w-4 h-4 text-gray-400 absolute left-2 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    className="w-full pl-7 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                    placeholder="Search Department"
                    value={deptSearch}
                    onChange={(e) => setDeptSearch(e.target.value)}
                  />
                </div>
                {departments.map((d) => (
                  <FilterCheckbox
                    key={d.label}
                    label={d.label}
                    count={d.count}
                    checked={!!checkedDepts[d.label]}
                    onChange={() => setCheckedDepts((p) => ({ ...p, [d.label]: !p[d.label] }))}
                  />
                ))}
                <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">+26 more</button>
              </div>

              <hr className="border-gray-100 mb-5" />

              {/* Experience */}
              <div className="mb-5">
                <span className="font-semibold text-sm text-gray-900 block mb-3">Experience</span>
                <div className="flex flex-wrap gap-2">
                  {[{ label: "Experienced", count: 1237 }, { label: "Entry Level", count: 380 }].map((e) => (
                    <button
                      key={e.label}
                      onClick={() => setExperience(e.label)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        experience === e.label
                          ? "border-blue-600 text-blue-600 bg-blue-50"
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {e.label} ({e.count})
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 mb-5" />

              {/* Nature of Business */}
              <div className="mb-5">
                <span className="font-semibold text-sm text-gray-900 block mb-3">Nature of business</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: "B2B", c: 722 }, { v: "B2C", c: 347 },
                    { v: "SaaS", c: 162 }, { v: "D2C", c: 6 }, { v: "PaaS", c: 4 }
                  ].map((n) => (
                    <button
                      key={n.v}
                      onClick={() => toggleNature(n.v)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        nature.includes(n.v)
                          ? "border-blue-600 text-blue-600 bg-blue-50"
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {n.v} ({n.c})
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 mb-5" />

              {/* Job Posting Date */}
              <div className="mb-2">
                <span className="font-semibold text-sm text-gray-900 block mb-3">Job posting date</span>
                <div className="flex gap-2">
                  {["<7 Days", "<15 Days"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setJobDate(jobDate === d ? "" : d)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        jobDate === d
                          ? "border-blue-600 text-blue-600 bg-blue-50"
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Company List */}
          <div className="flex-1 min-w-0 w-full">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium">
              Showing <span className="text-gray-900 font-semibold">1261</span> companies
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {pageCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1 mb-6 sm:mb-8 flex-wrap">
              <button
                className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                ‹ Previous
              </button>
              {visiblePages.map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    currentPage === p
                      ? "border-2 border-gray-900 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800"
                onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              >
                Next ›
              </button>
            </div>

            {/* Popular Companies Section */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-6">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                Popular companies in category <span className="text-blue-600">Product</span>
              </h2>

              {/* Tabs */}
              <div className="flex gap-6 border-b border-gray-200 mb-4">
                {["Company By Industry", "Company By Type", "Company By Functional Area"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === tab
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {popularIndustries.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer">
                    <span className="text-gray-400">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
              <span className="hover:text-blue-600 cursor-pointer">Home</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="hover:text-blue-600 cursor-pointer">Companies In India</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-700">Product Companies In India</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
