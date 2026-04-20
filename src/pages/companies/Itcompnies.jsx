import { useState, useRef } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const categories = [
  { id: 1, label: "MNCs", count: "2.3K+ Companies" },
  { id: 2, label: "Edtech", count: "172 Companies" },
  { id: 3, label: "Healthcare", count: "701 Companies" },
  { id: 4, label: "Unicorns", count: "94 Companies" },
  { id: 5, label: "Internet", count: "246 Companies" },
  { id: 6, label: "Fintech", count: "147 Companies" },
  { id: 7, label: "Product", count: "1.3K+ Companies" },
];

const allCompanies = [
  { id: 1, name: "Vlink", rating: 3.6, reviews: "139 reviews", tags: ["Foreign MNC", "IT Services & Consulting"], logo: "VL", color: "#3B5BDB" },
  { id: 2, name: "Vistex Asia Pacific", rating: 3.7, reviews: "104 reviews", tags: ["Foreign MNC", "IT Services & Consulting"], logo: "VI", color: "#F59E0B" },
  { id: 3, name: "Unity Technologies", rating: 3.7, reviews: "14 reviews", tags: ["Foreign MNC", "Software Product"], logo: "U", color: "#1A1A1A" },
  { id: 4, name: "Heady Technologies Consulta...", rating: 3.1, reviews: "6 reviews", tags: ["Startup", "Software Product", "Founded: 2015"], logo: "H", color: "#7B2FBE" },
  { id: 5, name: "Xoriant", rating: 4.1, reviews: "2.3K+ reviews", tags: ["Foreign MNC", "IT Services & Consulting"], logo: "X", color: "#16A34A" },
  { id: 6, name: "NTT DATA, Inc.", rating: 3.9, reviews: "3.5K+ reviews", tags: ["Foreign MNC", "IT Services & Consulting"], logo: "NT", color: "#2563EB" },
  { id: 7, name: "Techmojo Solutions", rating: 4, reviews: "182 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "TM", color: "#0EA5E9" },
  { id: 8, name: "Fortunesoft It Innovations", rating: 3.4, reviews: "30 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "FS", color: "#1D4ED8" },
  { id: 9, name: "Qliktech", rating: 3.5, reviews: "19 reviews", tags: ["Foreign MNC", "Software Product"], logo: "Q", color: "#22C55E" },
  { id: 10, name: "Zeomega Infotech", rating: 3.6, reviews: "119 reviews", tags: ["IT Services & Consulting", "Founded: 2001"], logo: "Z", color: "#3B82F6" },
  { id: 11, name: "EBC Technologies", rating: 2.5, reviews: "16 reviews", tags: ["Corporate", "Software Product", "Founded: 1986"], logo: "E", color: "#64748B" },
  { id: 12, name: "ServiceNow", rating: 3.9, reviews: "501 reviews", tags: ["Foreign MNC", "Software Product"], logo: "SN", color: "#00C7B1" },
  { id: 13, name: "Webskitters", rating: 3.8, reviews: "511 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "W", color: "#1A1A1A" },
  { id: 14, name: "Next Creation Software", rating: 0, reviews: "", tags: ["IT Services & Consulting", "Founded: 2011"], logo: "NC", color: "#0EA5E9" },
  { id: 15, name: "Intangles Lab", rating: 3.9, reviews: "66 reviews", tags: ["Startup", "Emerging Technologies", "Minicorn"], logo: "IL", color: "#334155" },
  { id: 16, name: "Equinix", rating: 3.1, reviews: "127 reviews", tags: ["Foreign MNC", "IT Services & Consulting"], logo: "EQ", color: "#E74C3C" },
  { id: 17, name: "Cube84", rating: 4.3, reviews: "44 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "C", color: "#2C3E50" },
  { id: 18, name: "W3Softech", rating: 4.1, reviews: "145 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "W3", color: "#1D4ED8" },
  { id: 19, name: "Aequor Technologies", rating: 3.2, reviews: "67 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "AQ", color: "#0F766E" },
  { id: 20, name: "Redisolve Software", rating: 2.7, reviews: "142 reviews", tags: ["Software Product", "Founded: 1980"], logo: "R", color: "#DC2626" },
  { id: 21, name: "Matrimony Com", rating: 3.9, reviews: "1.6K+ reviews", tags: ["Corporate", "Internet", "Founded: 1997"], logo: "M", color: "#C0392B" },
  { id: 22, name: "Castaliaz Technologies", rating: 3.8, reviews: "50 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "CT", color: "#7C3AED" },
  { id: 23, name: "Svarn Infratel", rating: 3.5, reviews: "134 reviews", tags: ["Indian MNC", "Hardware & Networking"], logo: "SI", color: "#16A34A" },
  { id: 24, name: "Vidushi Infotech", rating: 2.8, reviews: "45 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "VI", color: "#F59E0B" },
  { id: 25, name: "Onsitego", rating: 3.5, reviews: "89 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "OG", color: "#10B981" },
  { id: 26, name: "Chai Point", rating: 4.2, reviews: "205 reviews", tags: ["Startup", "Internet"], logo: "☕", color: "#92400E" },
  { id: 27, name: "Eccentric Engine", rating: 1.9, reviews: "21 reviews", tags: ["Corporate", "Emerging Technologies"], logo: "NE", color: "#1A1A1A" },
  { id: 28, name: "White Rivers Media", rating: 3.1, reviews: "27 reviews", tags: ["Startup", "Internet", "Founded: 2012"], logo: "WR", color: "#1A1A1A" },
  { id: 29, name: "Rite Software Solutions And S...", rating: 3.1, reviews: "70 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "RS", color: "#2563EB" },
  { id: 30, name: "Vinsys Information", rating: 0, reviews: "", tags: ["IT Services & Consulting"], logo: "VS", color: "#E74C3C" },
  { id: 31, name: "WeblinkIndia", rating: 3.9, reviews: "273 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "WI", color: "#1D4ED8" },
  { id: 32, name: "Zensar", rating: 3.7, reviews: "3K+ reviews", tags: ["Foreign MNC", "IT Services & Consulting", "India"], logo: "ZS", color: "#7B2FBE" },
  { id: 33, name: "Solution Analysts", rating: 4.3, reviews: "41 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "SA", color: "#0EA5E9" },
  { id: 34, name: "Namecheap", rating: 3.7, reviews: "35 reviews", tags: ["Foreign MNC", "IT Services & Consulting"], logo: "N", color: "#FF6B00" },
  { id: 35, name: "ValGenesis", rating: 3.1, reviews: "151 reviews", tags: ["Foreign MNC", "Software Product"], logo: "V", color: "#1D4ED8" },
  { id: 36, name: "Agiliztech Software Services", rating: 4.3, reviews: "15 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "AG", color: "#16A34A" },
];

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 72;

const companyTypes = [
  { label: "Corporate", count: 1550 },
  { label: "Foreign MNC", count: 723 },
  { label: "Startup", count: 361 },
  { label: "Indian MNC", count: 231 },
];

const locations = [
  { label: "Bengaluru", count: 1435 },
  { label: "Delhi / NCR", count: 1115 },
  { label: "Hyderabad", count: 989 },
  { label: "Pune", count: 979 },
];

const industries = [
  { label: "Emerging Technologies", count: 55, checked: true },
  { label: "Hardware & Networking", count: 49, checked: true },
  { label: "Internet", count: 246, checked: true },
  { label: "IT Services & Consulting", count: 2503, checked: true },
];

const departments = [
  { label: "Engineering - Software & QA", count: 2512 },
  { label: "Sales & Business Development", count: 1346 },
  { label: "Data Science & Analytics", count: 952 },
];

const popularByIndustry = [
  "Emerging Technologies companies in India",
  "Hardware & Networking companies in India",
  "Internet companies in India",
  "IT Services & Consulting companies in India",
  "Software Product companies in India",
  "Education / Training companies in India",
  "Industrial Equipment / Machinery companies in India",
  "Recruitment / Staffing companies in India",
  "Engineering & Construction companies in India",
  "Medical Services / Hospital companies in India",
];

const popularByType = [
  "Corporate IT companies in India",
  "Foreign MNC IT companies in India",
  "Startup IT companies in India",
  "Indian MNC IT companies in India",
  "Others IT companies in India",
];

const popularByArea = [
  "IT companies hiring for Engineering",
  "IT companies hiring for Sales",
  "IT companies hiring for Data Science",
  "IT companies hiring for Design",
  "IT companies hiring for HR",
];

function StarRating({ rating }) {
  if (!rating) return null;
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
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 flex items-start gap-2 sm:gap-3 hover:shadow-md hover:border-[#7ed3e5] transition-all duration-200 cursor-pointer group">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md sm:rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 select-none"
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
          {company.reviews && <span className="text-[11px] sm:text-xs text-gray-500">| {company.reviews}</span>}
          {!company.rating && <span className="text-[11px] sm:text-xs text-gray-400">0</span>}
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-1 mt-1.5 sm:mt-2">
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
    <label className="flex items-start gap-2 cursor-pointer py-0.5 group">
      <div
        onClick={onChange}
        className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
          checked ? "bg-[#47AEC7] border-[#47AEC7]" : "border-gray-300 group-hover:border-gray-400"
        }`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700 leading-tight">
        {label} <span className="text-gray-400">({count.toLocaleString()})</span>
      </span>
    </label>
  );
}

function SideSection({ title, children, noDivider }) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full mb-3"
          onClick={() => setOpen(!open)}
        >
          <span className="font-semibold text-sm text-gray-900">{title}</span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {open && <div className="space-y-0.5">{children}</div>}
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
        className="w-full pl-7 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-colors"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function ITcompanies() {
  const [activeCat, setActiveCat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedTypes, setCheckedTypes] = useState({});
  const [checkedLocations, setCheckedLocations] = useState({});
  const [checkedIndustries, setCheckedIndustries] = useState({
    "Emerging Technologies": true,
    "Hardware & Networking": true,
    "Internet": true,
    "IT Services & Consulting": true,
  });
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

  const toggleNature = (val) =>
    setNature((prev) => (prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]));

  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCompanies = allCompanies.slice(pageStart, Math.min(pageStart + ITEMS_PER_PAGE, allCompanies.length));
  const visiblePages = Array.from({ length: Math.min(10, TOTAL_PAGES) }, (_, i) => i + 1);

  const appliedCount = Object.values(checkedTypes).filter(Boolean).length
    + Object.values(checkedLocations).filter(Boolean).length
    + Object.values(checkedIndustries).filter(Boolean).length
    + Object.values(checkedDepts).filter(Boolean).length
    + (experience ? 1 : 0) + nature.length + (jobDate ? 1 : 0);

  const tabLinks = {
    "Company By Industry": popularByIndustry,
    "Company By Type": popularByType,
    "Company By Functional Area": popularByArea,
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <CopyNavbar />
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-8 py-3 sm:py-5 pt-[70px] md:pt-[80px]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">IT Companies Hiring</h1>

          {/* Slider */}
          <div className="relative flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md flex-shrink-0 transition-all"
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
                  onClick={() => setActiveCat(activeCat === cat.id ? null : cat.id)}
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
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md flex-shrink-0 transition-all"
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
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-900 text-sm">All Filters</span>
                {appliedCount > 0 && (
                  <span className="text-[#47AEC7] text-xs font-medium bg-[#e6f7fa] px-2 py-0.5 rounded-full">
                    Applied ({appliedCount + 4})
                  </span>
                )}
                {appliedCount === 0 && (
                  <span className="text-[#47AEC7] text-xs font-medium bg-[#e6f7fa] px-2 py-0.5 rounded-full">
                    Applied (5)
                  </span>
                )}
              </div>

              <SideSection title="Company type">
                {companyTypes.map((t) => (
                  <FilterCheckbox key={t.label} label={t.label} count={t.count}
                    checked={!!checkedTypes[t.label]}
                    onChange={() => setCheckedTypes((p) => ({ ...p, [t.label]: !p[t.label] }))}
                  />
                ))}
              </SideSection>

              <SideSection title="Location">
                <SearchBox value={locationSearch} onChange={setLocationSearch} placeholder="Search Location" />
                {locations.map((l) => (
                  <FilterCheckbox key={l.label} label={l.label} count={l.count}
                    checked={!!checkedLocations[l.label]}
                    onChange={() => setCheckedLocations((p) => ({ ...p, [l.label]: !p[l.label] }))}
                  />
                ))}
                <button className="text-[#47AEC7] text-sm font-medium mt-1 hover:underline">+87 more</button>
              </SideSection>

              <SideSection title="Industry">
                <SearchBox value={industrySearch} onChange={setIndustrySearch} placeholder="Search Industry" />
                {industries.map((ind) => (
                  <FilterCheckbox key={ind.label} label={ind.label} count={ind.count}
                    checked={!!checkedIndustries[ind.label]}
                    onChange={() => setCheckedIndustries((p) => ({ ...p, [ind.label]: !p[ind.label] }))}
                  />
                ))}
                <button className="text-[#47AEC7] text-sm font-medium mt-1 hover:underline">+73 more</button>
              </SideSection>

              <SideSection title="Department">
                <SearchBox value={deptSearch} onChange={setDeptSearch} placeholder="Search Department" />
                {departments.map((d) => (
                  <FilterCheckbox key={d.label} label={d.label} count={d.count}
                    checked={!!checkedDepts[d.label]}
                    onChange={() => setCheckedDepts((p) => ({ ...p, [d.label]: !p[d.label] }))}
                  />
                ))}
                <button className="text-[#47AEC7] text-sm font-medium mt-1 hover:underline">+27 more</button>
              </SideSection>

              <SideSection title="Experience">
                <div className="flex flex-wrap gap-2">
                  {[{ label: "Experienced", count: 3357 }, { label: "Entry Level", count: 917 }].map((e) => (
                    <button key={e.label}
                      onClick={() => setExperience(experience === e.label ? "" : e.label)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        experience === e.label
                          ? "border-[#47AEC7] text-[#47AEC7] bg-[#e6f7fa]"
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {e.label} ({e.count.toLocaleString()})
                    </button>
                  ))}
                </div>
              </SideSection>

              <SideSection title="Nature of business">
                <div className="flex flex-wrap gap-2">
                  {[{ v: "B2B", c: 2412 }, { v: "B2C", c: 348 }, { v: "SaaS", c: 223 }, { v: "PaaS", c: 13 }, { v: "D2C", c: 6 }].map((n) => (
                    <button key={n.v} onClick={() => toggleNature(n.v)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        nature.includes(n.v)
                          ? "border-[#47AEC7] text-[#47AEC7] bg-[#e6f7fa]"
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {n.v} ({n.c.toLocaleString()})
                    </button>
                  ))}
                </div>
              </SideSection>

              <SideSection title="Job posting date" noDivider>
                <div className="flex gap-2 flex-wrap">
                  {["<7 Days", "<15 Days"].map((d) => (
                    <button key={d} onClick={() => setJobDate(jobDate === d ? "" : d)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        jobDate === d
                          ? "border-[#47AEC7] text-[#47AEC7] bg-[#e6f7fa]"
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </SideSection>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 w-full">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              Showing <span className="font-semibold text-gray-900">3423</span> companies
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {pageCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1 mb-6 sm:mb-8 flex-wrap">
              <span className="text-xs sm:text-sm text-gray-500 mr-1">Page {currentPage} of {TOTAL_PAGES}</span>
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
              {visiblePages.map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    currentPage === p
                      ? "border-2 border-gray-900 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
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

            {/* Popular Section */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-6 mb-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                Popular companies in category <span className="text-[#47AEC7]">IT Companies</span>
              </h2>
              <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
                {["Company By Industry", "Company By Type", "Company By Functional Area"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 mr-5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px flex-shrink-0 ${
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
                {(tabLinks[activeTab] || []).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#47AEC7] hover:underline cursor-pointer">
                    <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
              <span className="hover:text-[#47AEC7] cursor-pointer">Home</span>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="hover:text-[#47AEC7] cursor-pointer">Companies In India</span>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-700">IT Companies Companies In India</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

