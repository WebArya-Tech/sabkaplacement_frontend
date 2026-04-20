import { useState, useRef } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const categories = [
  { id: 1, label: "MNCs", count: "2.3K+ Companies" },
  { id: 2, label: "Fintech", count: "147 Companies" },
  { id: 3, label: "FMCG & Retail", count: "173 Companies" },
  { id: 4, label: "Startups", count: "799 Companies" },
  { id: 5, label: "Edtech", count: "172 Companies" },
  { id: 6, label: "Healthcare", count: "312 Companies" },
  { id: 7, label: "Banking", count: "95 Companies" },
];

const allCompanies = [
  { id: 1, name: "Gaea Technologies", rating: 4.4, reviews: "6 reviews", tags: ["Foreign MNC", "IT Services & Consulting"], logo: "G", color: "#00BFA5" },
  { id: 2, name: "Methodex", rating: 3.7, reviews: "375 reviews", tags: ["Corporate", "Law Enforcement / Security Services"], logo: "M", color: "#2C3E50" },
  { id: 3, name: "University Of Cambridge", rating: 4.9, reviews: "6 reviews", tags: ["Education / Training"], logo: "🎓", color: "#8B0000" },
  { id: 4, name: "Housing Development & Infras...", rating: 4.1, reviews: "39 reviews", tags: ["Corporate", "Real Estate", "Founded: 1996"], logo: "H", color: "#1565C0" },
  { id: 5, name: "Aryan Pumps & Enviro Solutions", rating: 3.4, reviews: "98 reviews", tags: ["Corporate"], logo: "A", color: "#E74C3C" },
  { id: 6, name: "Saab Engineering", rating: 4.3, reviews: "116 reviews", tags: ["Auto Components", "Founded: 1986"], logo: "S", color: "#1A237E" },
  { id: 7, name: "Bull Machines", rating: 3.8, reviews: "230 reviews", tags: ["Corporate", "Engineering & Construction"], logo: "B", color: "#E74C3C" },
  { id: 8, name: "Forsys", rating: 3.1, reviews: "101 reviews", tags: ["Foreign MNC", "Software Product"], logo: "F", color: "#27AE60" },
  { id: 9, name: "Jade Global", rating: 3.4, reviews: "373 reviews", tags: ["Foreign MNC", "IT Services & Consulting"], logo: "J", color: "#1ABC9C" },
  { id: 10, name: "Kirloskar Pneumatic", rating: 4, reviews: "551 reviews", tags: ["Corporate", "Industrial Equipment / Machinery"], logo: "K", color: "#E74C3C" },
  { id: 11, name: "TRUQUANTUM IT PRIVATE LI...", rating: 3.5, reviews: "38 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "T", color: "#3498DB" },
  { id: 12, name: "Safran Data Systems", rating: 3.4, reviews: "12 reviews", tags: ["Defence & Aerospace", "11-50 emp."], logo: "S", color: "#2C3E50" },
  { id: 13, name: "Shivaji College", rating: 3.9, reviews: "6 reviews", tags: ["Education / Training", "Founded: 1961"], logo: "SC", color: "#8B0000" },
  { id: 14, name: "Vegayan", rating: 4.3, reviews: "6 reviews", tags: ["Corporate", "Hardware & Networking"], logo: "V", color: "#27AE60" },
  { id: 15, name: "Messung", rating: 3.6, reviews: "24 reviews", tags: ["Corporate", "Industrial Automation"], logo: "M", color: "#E74C3C" },
  { id: 16, name: "IndiaFirst Life", rating: 3.8, reviews: "1.5K+ reviews", tags: ["Corporate", "Insurance", "Founded: 2009"], logo: "IF", color: "#E74C3C" },
  { id: 17, name: "Mastek", rating: 3.6, reviews: "987 reviews", tags: ["Indian MNC", "IT Services & Consulting"], logo: "M", color: "#C0392B" },
  { id: 18, name: "Suretek Infosoft", rating: 4.5, reviews: "34 reviews", tags: ["Indian MNC", "IT Services & Consulting"], logo: "S", color: "#E74C3C" },
  { id: 19, name: "Ticket Design", rating: 5, reviews: "1 review", tags: ["Corporate", "Design", "Founded: 2007"], logo: "T", color: "#E74C3C" },
  { id: 20, name: "Lotte India Corporation", rating: 4, reviews: "413 reviews", tags: ["Corporate", "FMCG", "Founded: 2004"], logo: "L", color: "#E74C3C" },
  { id: 21, name: "Jagsonpal Pharmaceuticals", rating: 3.6, reviews: "219 reviews", tags: ["Indian MNC", "Pharmaceutical & Life Sciences"], logo: "JP", color: "#C0392B" },
  { id: 22, name: "Lemosys Infotech", rating: 3, reviews: "13 reviews", tags: ["Corporate", "IT Services & Consulting"], logo: "L", color: "#2C3E50" },
  { id: 23, name: "Meesho", rating: 3.7, reviews: "2.2K+ reviews", tags: ["Startup", "Internet", "Unicorn", "Founded: 2015"], logo: "M", color: "#9B59B6" },
  { id: 24, name: "ON Semiconductor", rating: 3.3, reviews: "38 reviews", tags: ["Electronic Components / Semiconductors"], logo: "ON", color: "#1A237E" },
  { id: 25, name: "Seaspan", rating: 3.5, reviews: "25 reviews", tags: ["Ports & Shipping", "Founded: 2000"], logo: "S", color: "#3498DB" },
  { id: 26, name: "Diagnal Technologies", rating: 4.9, reviews: "17 reviews", tags: ["Startup", "Internet", "Founded: 2015"], logo: "D", color: "#F1C40F" },
  { id: 27, name: "Evertz Microsystems", rating: 3.7, reviews: "49 reviews", tags: ["Corporate", "Electronics Manufacturing"], logo: "E", color: "#2C3E50" },
  { id: 28, name: "Sagacious IP", rating: 3.2, reviews: "33 reviews", tags: ["Corporate", "Legal", "Founded: 2008"], logo: "S", color: "#95A5A6" },
  { id: 29, name: "Visolve", rating: 4.6, reviews: "2 reviews", tags: ["Foreign MNC", "IT Services & Consulting"], logo: "V", color: "#FF6B00" },
  { id: 30, name: "Initiative", rating: 3.1, reviews: "12 reviews", tags: ["Foreign MNC", "Advertising & Marketing"], logo: "I", color: "#16A085" },
  { id: 31, name: "Palnar Transmedia", rating: 2.9, reviews: "24 reviews", tags: ["Indian MNC", "IT Services & Consulting"], logo: "P", color: "#7F8C8D" },
  { id: 32, name: "VDartDigital", rating: 3.2, reviews: "22 reviews", tags: ["Corporate", "Foreign MNC"], logo: "VD", color: "#2C3E50" },
  { id: 33, name: "VIP", rating: 3.7, reviews: "966 reviews", tags: ["Indian MNC", "Retail", "Soonicorn"], logo: "VIP", color: "#E74C3C" },
  { id: 34, name: "Graphic Era", rating: 3.6, reviews: "163 reviews", tags: ["Corporate", "Education / Training"], logo: "GE", color: "#8E44AD" },
  { id: 35, name: "Cameo Corporate Services", rating: 3.3, reviews: "305 reviews", tags: ["Corporate", "BPM / BPO", "Founded: 1985"], logo: "C", color: "#3498DB" },
  { id: 36, name: "Dr Agarwals Eye Hospital", rating: 3.8, reviews: "513 reviews", tags: ["Corporate", "Medical Services / Hospital"], logo: "DrA", color: "#E74C3C" },
  { id: 37, name: "Ltimindtree", rating: 3.6, reviews: "26.1K+ reviews", tags: ["Indian MNC", "IT Services & Consulting"], logo: "LT", color: "#00796B" },
  { id: 38, name: "Srs Business Solutions India", rating: 4, reviews: "44 reviews", tags: ["Corporate", "Management Consulting"], logo: "SB", color: "#FF6B00" },
  { id: 39, name: "Visesh Infotechnics", rating: 0, reviews: "", tags: ["Corporate", "Software Product", "Founded: 1989"], logo: "V", color: "#C0392B" },
  { id: 40, name: "Les Transformations Learning", rating: 1.2, reviews: "3 reviews", tags: ["e-Learning / EdTech", "Founded: 2010"], logo: "L", color: "#95A5A6" },
];

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 200;

const companyTypes = [
  { label: "Corporate", count: 4832 },
  { label: "Foreign MNC", count: 1624 },
  { label: "Startup", count: 799 },
  { label: "Indian MNC", count: 640 },
];

const locations = [
  { label: "Bengaluru", count: 3663 },
  { label: "Delhi / NCR", count: 3519 },
  { label: "Mumbai (All Areas)", count: 3079 },
  { label: "Hyderabad", count: 2546 },
];

const industries = [
  { label: "IT Services & Consulting", count: 2503 },
  { label: "Software Product", count: 570 },
  { label: "Recruitment / Staffing", count: 327 },
  { label: "Industrial Equipment / Machinery", count: 318 },
];

const departments = [
  { label: "Engineering - Software & QA", count: 4375 },
  { label: "Sales & Business Development", count: 4238 },
  { label: "Finance & Accounting", count: 2756 },
];

const popularByType = [
  "Corporate companies in India",
  "Foreign MNC companies in India",
  "Startup companies in India",
  "Indian MNC companies in India",
  "Others companies in India",
  "Govt/PSU companies in India",
  "MNC companies in India",
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
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
        style={{ backgroundColor: company.color }}
      >
        {company.logo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
            {company.name}
          </h3>
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <StarRating rating={company.rating} />
          {company.reviews && <span className="text-xs text-gray-500">| {company.reviews}</span>}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {company.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
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
          checked ? "bg-blue-600 border-blue-600" : "border-gray-300 group-hover:border-gray-400"
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

export default function Topcompanies() {
  const [activeCat, setActiveCat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedTypes, setCheckedTypes] = useState({});
  const [checkedLocations, setCheckedLocations] = useState({});
  const [checkedIndustries, setCheckedIndustries] = useState({});
  const [checkedDepts, setCheckedDepts] = useState({});
  const [activeTab, setActiveTab] = useState("Company by type");
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

  const visiblePages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const popularLinks = {
    "Company by type": popularByType,
    "Company by industry": [
      "IT Services & Consulting companies in India",
      "Software Product companies in India",
      "BFSI companies in India",
      "Healthcare companies in India",
      "Manufacturing companies in India",
      "E-commerce companies in India",
      "Education companies in India",
    ],
    "Company by location": [
      "Companies in Bengaluru",
      "Companies in Delhi / NCR",
      "Companies in Mumbai",
      "Companies in Hyderabad",
      "Companies in Pune",
      "Companies in Chennai",
      "Companies in Kolkata",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-[70px] md:pt-[80px]">
      <CopyNavbar />
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-4 sm:py-5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Top companies hiring now</h1>

          {/* Category Slider */}
          <div className="relative flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => scroll(-1)}
              className="hidden sm:flex w-8 h-8 rounded-full border border-gray-200 bg-white items-center justify-center shadow-sm hover:shadow-md flex-shrink-0 transition-shadow"
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
                  className={`flex-shrink-0 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border-2 text-left transition-all duration-200 min-w-[120px] sm:min-w-[145px] ${
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
                    <span className="text-xs text-blue-600 font-medium">{cat.count}</span>
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => scroll(1)}
              className="hidden sm:flex w-8 h-8 rounded-full border border-gray-200 bg-white items-center justify-center shadow-sm hover:shadow-md flex-shrink-0 transition-shadow"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-full lg:w-60 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-900 text-sm">All Filters</span>
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
                <button className="text-blue-600 text-sm font-medium mt-1 hover:underline">+89 more</button>
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
                <button className="text-blue-600 text-sm font-medium mt-1 hover:underline">+73 more</button>
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
                <button className="text-blue-600 text-sm font-medium mt-1 hover:underline">+27 more</button>
              </SideSection>

              {/* Experience */}
              <SideSection title="Experience">
                <div className="flex flex-wrap gap-2">
                  {[{ label: "Experienced", count: 9370 }, { label: "Entry Level", count: 2665 }].map((e) => (
                    <button key={e.label} onClick={() => setExperience(experience === e.label ? "" : e.label)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        experience === e.label ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {e.label} ({e.count.toLocaleString()})
                    </button>
                  ))}
                </div>
              </SideSection>

              {/* Nature of Business */}
              <SideSection title="Nature of business">
                <div className="flex flex-wrap gap-2">
                  {[{ v: "B2B", c: 5557 }, { v: "B2C", c: 2452 }, { v: "SaaS", c: 295 }, { v: "D2C", c: 41 }, { v: "PaaS", c: 18 }].map((n) => (
                    <button key={n.v} onClick={() => toggleNature(n.v)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        nature.includes(n.v) ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {n.v} ({n.c.toLocaleString()})
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
                        jobDate === d ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-600 hover:border-gray-400"
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
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              Showing <span className="font-semibold text-gray-900">9571</span> companies
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
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
              {visiblePages.map((p) => (
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
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-opacity"
              >
                Next
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Popular Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Top companies hiring in India</h2>
              <div className="flex gap-0 overflow-x-auto border-b border-gray-200 mb-3 sm:mb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {["Company by type", "Company by industry", "Company by location"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`pb-2 sm:pb-3 px-1 mr-4 sm:mr-6 text-xs sm:text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
                      activeTab === tab ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {(popularLinks[activeTab] || []).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-blue-600 hover:underline cursor-pointer">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 flex-wrap">
              <span className="hover:text-blue-600 cursor-pointer">Home</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-700">Companies In India</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
