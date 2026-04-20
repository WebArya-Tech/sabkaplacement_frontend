import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import JobCard from "../../components/jobs/JobCard";
import Navbar from "../../components/Navbar";
import { getAllJobs } from "../../services/jobsApi";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [applySuccess, setApplySuccess] = useState(false);

  const PER_PAGE = 10;

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoadingJobs(true);
        setJobsError("");
        const apiJobs = await getAllJobs();
        const mapped = (Array.isArray(apiJobs) ? apiJobs : []).map((job) => {
          const companyName = job.companyId?.company?.companyName || job.companyId?.companyName || "Company";
          const initials = companyName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((p) => p[0])
            .join("")
            .toUpperCase() || "CO";
          const salary = job.salaryMin || job.salaryMax
            ? `${job.salaryMin ? `${Number(job.salaryMin).toLocaleString()}` : "0"}-${job.salaryMax ? `${Number(job.salaryMax).toLocaleString()}` : "0"}`
            : "Not disclosed";
          return {
            id: job._id,
            title: job.title || "Untitled Job",
            company: companyName,
            logo: initials,
            rating: null,
            reviews: null,
            experience: job.experienceRequired || "Not specified",
            salary,
            location: job.location || "Not specified",
            description: job.description || "",
            skills: Array.isArray(job.skillsRequired) ? job.skillsRequired : [],
            posted: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recently",
            postedBy: job.companyId?.userId?.name || "",
            jobType: job.jobType || "",
          };
        });
        setJobs(mapped);
        sessionStorage.setItem("publicJobsCache", JSON.stringify(mapped));
        localStorage.setItem("publicJobsCache", JSON.stringify({ timestamp: Date.now(), data: mapped }));
      } catch (error) {
        const cachedSession = sessionStorage.getItem("publicJobsCache");
        const cachedLocalRaw = localStorage.getItem("publicJobsCache");
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

        setJobs(next);
        if ((error.message || "").toLowerCase().includes("too many requests")) {
          setJobsError("Rate limit reached for now. Showing last available jobs data.");
        } else {
          setJobsError(error.message || "Failed to load jobs");
        }
      } finally {
        setLoadingJobs(false);
      }
    };
    loadJobs();
  }, []);

  const toggle = (setter, value) =>
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

  const clearAll = () => {
    setSearchQuery(""); setLocationQuery(""); setSelectedTypes([]); setSelectedExperience([]); setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      if (hiddenJobs.includes(j.id)) return false;
      const q = searchQuery.toLowerCase();
      if (q && !j.title.toLowerCase().includes(q) && !j.company.toLowerCase().includes(q) && !j.skills.some(s => s.toLowerCase().includes(q))) return false;
      const loc = locationQuery.toLowerCase();
      if (loc && !j.location.toLowerCase().includes(loc)) return false;
      if (selectedTypes.length && !selectedTypes.includes(j.jobType)) return false;
      if (selectedExperience.length) {
        const match = selectedExperience.some(exp => {
          if (exp === "Fresher") return j.experience.includes("0") || j.experience.toLowerCase().includes("fresher");
          if (exp === "1-3 years") return j.experience.includes("1") || j.experience.includes("2") || j.experience.includes("3");
          if (exp === "3-5 years") return j.experience.includes("3") || j.experience.includes("4") || j.experience.includes("5");
          if (exp === "5+ years") return parseInt(j.experience) >= 5;
          return false;
        });
        if (!match) return false;
      }
      return true;
    });
  }, [jobs, hiddenJobs, searchQuery, locationQuery, selectedTypes, selectedExperience]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PER_PAGE));
  const pagedJobs = filteredJobs.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const activeFilterCount = selectedTypes.length + selectedExperience.length;

  const toggleJobSelection = (jobId) => {
    setSelectedJobs((prev) => {
      if (prev.includes(jobId)) return prev.filter((id) => id !== jobId);
      if (prev.length >= 5) return prev;
      return [...prev, jobId];
    });
  };

  const hideJob = (jobId) => setHiddenJobs((prev) => [...prev, jobId]);

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApply = () => {
    if (selectedJobs.length === 0) return;
    navigate("/login", { state: { intent: "apply" } });
  };

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

      {/* Sticky Apply Bar */}
      {selectedJobs.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-gray-700">
            <span className="font-semibold text-[#47AEC7]">{selectedJobs.length}</span> job{selectedJobs.length > 1 ? "s" : ""} selected
            {selectedJobs.length < 5 && <span className="text-gray-400 ml-2">(select up to {5 - selectedJobs.length} more)</span>}
          </span>
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedJobs([])} className="text-sm text-gray-500 hover:text-gray-700 underline">Clear</button>
            <button onClick={handleApply} className="px-8 py-2 bg-[#3385AA] text-white rounded-full font-medium hover:bg-[#2a6d8c] transition-all text-sm">
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Apply Success Toast */}
      {applySuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#47AEC7] text-white px-6 py-3 rounded-full shadow-lg font-medium text-sm animate-bounce">
          ✓ Applied successfully!
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-[#f0f6f9] border-b border-[#d6eaf2] py-5 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
            <input type="text" value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search jobs by title, company, or skills..."
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] border border-gray-200 shadow-sm"
            />
          </div>
          <div className="relative sm:w-56">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input type="text" value={locationQuery}
              onChange={e => { setLocationQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Location..."
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] border border-gray-200 shadow-sm"
            />
          </div>
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

              <FilterSection title="Job Type"
                options={["Full-time", "Part-time", "Contract", "Internship"]}
                selected={selectedTypes}
                onToggle={v => { toggle(setSelectedTypes, v); setCurrentPage(1); }} />

              <FilterSection title="Experience"
                options={["Fresher", "1-3 years", "3-5 years", "5+ years"]}
                selected={selectedExperience}
                onToggle={v => { toggle(setSelectedExperience, v); setCurrentPage(1); }} />

              {/* Saved Jobs Link */}
              {savedJobs.length > 0 && (
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <Link to="/jobs/saved" className="flex items-center justify-between text-sm text-orange-600 hover:text-orange-800 font-medium">
                    <span>🔖 Saved Jobs</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs">{savedJobs.length}</span>
                  </Link>
                </div>
              )}
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {loadingJobs && <p className="text-sm text-gray-500 mb-4">Loading jobs...</p>}
            {jobsError && <p className="text-sm text-red-500 mb-4">{jobsError}</p>}

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {[...selectedTypes, ...selectedExperience].map(f => (
                  <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eaf4f8] text-[#317FA4] text-xs font-semibold rounded-full border border-[#d6eaf2]">
                    {f}
                    <button onClick={() => {
                      if (selectedTypes.includes(f)) toggle(setSelectedTypes, f);
                      else toggle(setSelectedExperience, f);
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
                Showing <span className="font-bold text-[#317FA4]">{filteredJobs.length}</span> jobs
              </p>
            </div>

            {pagedJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#d6eaf2] p-16 text-center">
                <p className="text-2xl mb-2">📭</p>
                <p className="text-gray-500 text-sm font-medium">No jobs match your search.</p>
                <button onClick={clearAll} className="mt-3 text-xs text-[#3385AA] hover:underline font-semibold">Clear all filters</button>
              </div>
            ) : (
              <div className="space-y-4">
                {pagedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSelected={selectedJobs.includes(job.id)}
                    onToggleSelect={toggleJobSelection}
                    onHide={hideJob}
                    onSave={toggleSaveJob}
                    isSaved={savedJobs.includes(job.id)}
                    tabContext="applies"
                    matchScore={null}
                  />
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

export default Jobs;
