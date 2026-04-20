import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import CompanyCard from "../../components/companies/CompanyCard";
import Navbar from "../../components/Navbar";
import { getPublicCompanies } from "../../services/companyApi";

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes]       = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedBusiness, setSelectedBusiness]   = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [companiesError, setCompaniesError] = useState("");

  const PER_PAGE = 6;

  const companyCategories = [
    { label: "Top Companies",  to: "/companies/top",          icon: "🏆", count: "500+",  color: "from-yellow-400 to-orange-400" },
    { label: "MNC",            to: "/companies/mnc",          icon: "🌐", count: "2.3K+", color: "from-blue-400 to-blue-600" },
    { label: "IT Companies",   to: "/companies/it",           icon: "💻", count: "2.5K+", color: "from-[#3385AA] to-[#317FA4]" },
    { label: "Product Based",  to: "/companies/product-based",icon: "📦", count: "1.3K+", color: "from-purple-400 to-purple-600" },
    { label: "Startup",        to: "/companies/startup",      icon: "🚀", count: "812",   color: "from-pink-400 to-rose-500" },
  ];

  const palette = [
    "from-red-400 to-orange-400",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-teal-600",
    "from-indigo-500 to-blue-600",
  ];

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoadingCompanies(true);
        setCompaniesError("");
        const data = await getPublicCompanies(200);
        const mapped = (Array.isArray(data) ? data : []).map((company, idx) => {
          const name = company.name || "Company";
          const logo = name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((p) => p[0])
            .join("")
            .toUpperCase() || "CO";
          return {
            id: company.id || `${name}-${idx}`,
            name,
            logo,
            logoImage: company.logo || "",
            rating: null,
            reviews: null,
            type: company.type || "",
            industry: company.industry || "",
            location: company.city || "",
            business: company.business || "",
            logoColor: palette[idx % palette.length],
          };
        });
        setCompanies(mapped);
        sessionStorage.setItem("publicCompaniesCache", JSON.stringify(mapped));
        localStorage.setItem("publicCompaniesCache", JSON.stringify({ timestamp: Date.now(), data: mapped }));
      } catch (error) {
        const cachedSession = sessionStorage.getItem("publicCompaniesCache");
        const cachedLocalRaw = localStorage.getItem("publicCompaniesCache");
        const cachedLocal = cachedLocalRaw ? (() => { try { return JSON.parse(cachedLocalRaw); } catch { return null; } })() : null;

        let next = [];
        if (cachedSession) {
          try {
            next = JSON.parse(cachedSession);
          } catch {
            next = [];
          }
        } else if (cachedLocal?.data && Array.isArray(cachedLocal.data)) {
          const ageMs = Date.now() - Number(cachedLocal.timestamp || 0);
          next = ageMs < 6 * 60 * 60 * 1000 ? cachedLocal.data : [];
        }

        setCompanies(next);
        if ((error.message || "").toLowerCase().includes("too many requests")) {
          setCompaniesError("Rate limit reached for now. Showing last available companies data.");
        } else {
          setCompaniesError(error.message || "Failed to load companies");
        }
      } finally {
        setLoadingCompanies(false);
      }
    };
    loadCompanies();
  }, []);

  const toggle = (setter, value) =>
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

  const clearAll = () => {
    setSearchQuery(""); setSelectedTypes([]); setSelectedLocations([]);
    setSelectedIndustries([]); setSelectedBusiness([]); setCurrentPage(1);
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(c => {
      const q = searchQuery.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.industry.toLowerCase().includes(q)) return false;
      if (selectedTypes.length      && !selectedTypes.includes(c.type))       return false;
      if (selectedLocations.length  && !selectedLocations.includes(c.location)) return false;
      if (selectedIndustries.length && !selectedIndustries.includes(c.industry)) return false;
      if (selectedBusiness.length   && !selectedBusiness.includes(c.business))  return false;
      return true;
    });
  }, [companies, searchQuery, selectedTypes, selectedLocations, selectedIndustries, selectedBusiness]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / PER_PAGE));
  const pagedCompanies = filteredCompanies.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const activeFilterCount = selectedTypes.length + selectedLocations.length + selectedIndustries.length + selectedBusiness.length;

  const FilterSection = ({ title, options, selected, onToggle }) => (
    <div className="mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{title}</p>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              className="w-4 h-4 rounded accent-[#3385AA] cursor-pointer" />
            <span className={`text-sm transition-colors ${selected.includes(opt) ? 'text-[#3385AA] font-semibold' : 'text-gray-700 group-hover:text-[#3385AA]'}`}>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <Navbar />

      {/* Search Bar */}
      <div className="bg-[#f0f6f9] border-b border-[#d6eaf2] py-5 px-4">
        <div className="max-w-xl mx-auto relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input type="text" value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search companies by name or industry..."
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] border border-gray-200 shadow-sm"
          />
        </div>
      </div>



      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar Filters */}
          <aside className="lg:w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#317FA4]">
                  All Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 text-[10px] bg-[#3385AA] text-white px-1.5 py-0.5 rounded-full font-bold">{activeFilterCount}</span>
                  )}
                </h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearAll} className="text-xs text-red-500 hover:underline font-medium">Clear all</button>
                )}
              </div>

              <FilterSection title="Company Type"
                options={["Corporate","Foreign MNC","Startup","Indian MNC","Recruitment / Staffing"]}
                selected={selectedTypes}
                onToggle={v => { toggle(setSelectedTypes, v); setCurrentPage(1); }} />

              <FilterSection title="Location"
                options={["Bengaluru","Delhi / NCR","Mumbai","Hyderabad","Chennai"]}
                selected={selectedLocations}
                onToggle={v => { toggle(setSelectedLocations, v); setCurrentPage(1); }} />

              <FilterSection title="Industry"
                options={["IT Services & Consulting","Software Product","Recruitment / Staffing"]}
                selected={selectedIndustries}
                onToggle={v => { toggle(setSelectedIndustries, v); setCurrentPage(1); }} />

              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Nature of Business</p>
                <div className="flex flex-wrap gap-2">
                  {["B2B","B2C","SaaS"].map(b => (
                    <button key={b} onClick={() => { toggle(setSelectedBusiness, b); setCurrentPage(1); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                        selectedBusiness.includes(b)
                          ? 'bg-[#3385AA] text-white border-[#3385AA]'
                          : 'border-gray-200 text-gray-600 hover:border-[#3385AA] hover:text-[#3385AA]'
                      }`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {loadingCompanies && <p className="text-sm text-gray-500 mb-4">Loading companies...</p>}
            {companiesError && <p className="text-sm text-red-500 mb-4">{companiesError}</p>}
            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {[...selectedTypes, ...selectedLocations, ...selectedIndustries, ...selectedBusiness].map(f => (
                  <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eaf4f8] text-[#317FA4] text-xs font-semibold rounded-full border border-[#d6eaf2]">
                    {f}
                    <button onClick={() => {
                      if (selectedTypes.includes(f)) toggle(setSelectedTypes, f);
                      else if (selectedLocations.includes(f)) toggle(setSelectedLocations, f);
                      else if (selectedIndustries.includes(f)) toggle(setSelectedIndustries, f);
                      else toggle(setSelectedBusiness, f);
                      setCurrentPage(1);
                    }} className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-red-400 text-white flex items-center justify-center transition-colors">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><path d="M6.4 5l2.8-2.8a1 1 0 00-1.4-1.4L5 3.6 2.2 0.8A1 1 0 00.8 2.2L3.6 5 .8 7.8a1 1 0 001.4 1.4L5 6.4l2.8 2.8a1 1 0 001.4-1.4z"/></svg>
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-bold text-[#317FA4]">{filteredCompanies.length}</span> companies
              </p>
            </div>

            {pagedCompanies.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#d6eaf2] p-16 text-center">
                <p className="text-2xl mb-2">🔍</p>
                <p className="text-gray-500 text-sm font-medium">No companies match your filters.</p>
                <button onClick={clearAll} className="mt-3 text-xs text-[#3385AA] hover:underline font-semibold">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pagedCompanies.map(company => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-1.5">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
                  className="p-2 rounded-xl hover:bg-white text-gray-500 disabled:opacity-30 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors ${currentPage === p ? 'bg-[#3385AA] text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-[#eaf4f8] border border-[#d6eaf2]'}`}>
                    {p}
                  </button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
                  className="p-2 rounded-xl hover:bg-white text-gray-500 disabled:opacity-30 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Companies;

