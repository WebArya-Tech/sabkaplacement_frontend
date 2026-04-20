import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getCandidateApplications } from "../../services/jobsApi";

const applications = [
  {
    id: 1,
    title: "1-2 Year Python Full Stack (Python + ReactJS)",
    company: "Blaash Gaming Solutions",
    status: "contact_viewed",
    statusLabel: "Contact viewed",
    statusTime: "5 weeks ago",
    appliedOn: "Portal",
    applicationSent: "19 Feb '26",
    applicationViewed: "19 Feb '26",
    contactViewed: "19 Feb '26",
    totalApplications: 1743,
    viewedByRecruiter: 1449,
    matchCriteria: {
      earlyApplicant: false,
      keyskills: false,
      location: true,
      workExperience: true,
      industry: false,
      department: false,
    },
    recruiterName: "HR Recruiter",
    recruiterRole: "HR at Blaash Gaming Solutions",
    recruiterActive: "1d ago",
  },
  {
    id: 2,
    title: "Associate Software Engineer",
    company: "Ibrowsejobs Technologies",
    status: "resume_viewed",
    statusLabel: "Resume viewed",
    statusTime: "4 days ago",
    appliedOn: "Portal",
    applicationSent: "10 Mar '26",
    applicationViewed: "10 Mar '26",
    contactViewed: null,
    totalApplications: 892,
    viewedByRecruiter: 750,
    matchCriteria: {
      earlyApplicant: true,
      keyskills: true,
      location: true,
      workExperience: true,
      industry: false,
      department: false,
    },
    recruiterName: "HR Recruiter",
    recruiterRole: "HR at Ibrowsejobs Technologies",
    recruiterActive: "today",
  },
  {
    id: 3,
    title: "React Js Developer (Fresher)",
    company: "TechSolutions India",
    status: "resume_viewed",
    statusLabel: "Resume viewed",
    statusTime: "3 weeks ago",
    appliedOn: "Portal",
    applicationSent: "01 Mar '26",
    applicationViewed: "02 Mar '26",
    contactViewed: null,
    totalApplications: 1200,
    viewedByRecruiter: 980,
    matchCriteria: {
      earlyApplicant: false,
      keyskills: true,
      location: true,
      workExperience: true,
      industry: true,
      department: false,
    },
    recruiterName: "Tech HR",
    recruiterRole: "HR at TechSolutions India",
    recruiterActive: "1d ago",
  },
  {
    id: 4,
    title: "Software Developer (Open Source/Angular)",
    company: "Paramarsh Informatics",
    rating: 2.8,
    reviews: 14,
    status: "not_shortlisted",
    statusLabel: "Not shortlisted",
    statusTime: "4 weeks ago",
    appliedOn: "Portal",
    applicationSent: "10 Feb '26",
    applicationViewed: "12 Feb '26",
    contactViewed: null,
    totalApplications: 450,
    viewedByRecruiter: 300,
    matchCriteria: {
      earlyApplicant: false,
      keyskills: false,
      location: true,
      workExperience: false,
      industry: false,
      department: false,
    },
    recruiterName: "HR Manager",
    recruiterRole: "HR at Paramarsh Informatics",
    recruiterActive: "1d ago",
  },
  {
    id: 5,
    title: "Full Stack Trainer - IT Institute",
    company: "Red & White Education",
    rating: 4.3,
    reviews: 78,
    status: "not_shortlisted",
    statusLabel: "Not shortlisted",
    statusTime: "7 days ago",
    appliedOn: "Portal",
    applicationSent: "19 Mar '26",
    applicationViewed: "20 Mar '26",
    contactViewed: null,
    totalApplications: 340,
    viewedByRecruiter: 280,
    matchCriteria: {
      earlyApplicant: true,
      keyskills: false,
      location: true,
      workExperience: true,
      industry: false,
      department: false,
    },
    recruiterName: "HR Coordinator",
    recruiterRole: "HR at Red & White Education",
    recruiterActive: "today",
  },
  {
    id: 6,
    title: "Software Development Freshers",
    company: "Businesslabs Internet",
    status: "contacted_email",
    statusLabel: "Contacted by email",
    statusTime: "2 weeks ago",
    appliedOn: "Portal",
    applicationSent: "12 Mar '26",
    applicationViewed: "14 Mar '26",
    contactViewed: "15 Mar '26",
    totalApplications: 670,
    viewedByRecruiter: 500,
    matchCriteria: {
      earlyApplicant: true,
      keyskills: true,
      location: true,
      workExperience: true,
      industry: true,
      department: false,
    },
    recruiterName: "Hiring Manager",
    recruiterRole: "HR at Businesslabs Internet",
    recruiterActive: "today",
  },
  {
    id: 7,
    title: "Front End Developer",
    company: "WebCraft Solutions",
    status: "application_sent",
    statusLabel: "Application sent",
    statusTime: "1 week ago",
    appliedOn: "Company Site",
    applicationSent: "20 Mar '26",
    applicationViewed: null,
    contactViewed: null,
    totalApplications: 520,
    viewedByRecruiter: 380,
    matchCriteria: {
      earlyApplicant: true,
      keyskills: true,
      location: true,
      workExperience: false,
      industry: false,
      department: false,
    },
    recruiterName: "Tech Recruiter",
    recruiterRole: "HR at WebCraft Solutions",
    recruiterActive: "2d ago",
  },
];

const statusConfig = {
  contact_viewed: { color: "text-[#2a9ab8]", bg: "bg-[#e8f7fb]", dot: "bg-[#42AFCA]" },
  resume_viewed: { color: "text-[#2a9ab8]", bg: "bg-[#e8f7fb]", dot: "bg-[#42AFCA]" },
  not_shortlisted: { color: "text-red-600", bg: "bg-red-50", dot: "bg-red-400" },
  contacted_email: { color: "text-violet-600", bg: "bg-violet-50", dot: "bg-violet-500" },
  application_sent: { color: "text-gray-600", bg: "bg-gray-100", dot: "bg-gray-400" },
};

function StatusBadge({ status, label, time }) {
  const cfg = statusConfig[status] || statusConfig.application_sent;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}>
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`}></span>
      {label} {time}
    </span>
  );
}

function ProgressStep({ label, date, done, active }) {
  return (
    <div className="flex flex-col items-center flex-1">
      <div className={`w-4 h-4 rounded-full border-2 z-10 ${done ? "bg-[#42AFCA] border-[#42AFCA]" : active ? "bg-white border-[#42AFCA]" : "bg-white border-gray-300"} flex items-center justify-center`}>
        {done && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
            <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <p className={`mt-2 text-xs font-semibold ${done || active ? "text-gray-800" : "text-gray-400"}`}>{label}</p>
      {date && <p className="text-xs text-gray-400 mt-0.5">{date}</p>}
    </div>
  );
}

function MatchItem({ label, matched }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 py-0.5 sm:py-1">
      {matched ? (
        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      ) : (
        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500" fill="none" viewBox="0 0 12 12">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      )}
      <span className="text-[10px] sm:text-xs text-gray-700 leading-tight">{label}</span>
    </div>
  );
}

export default function Application() {
  const [allApplications, setAllApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [mobileView, setMobileView] = useState("list");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const apiApps = await getCandidateApplications();
        if (!apiApps?.length) {
          setAllApplications([]);
          setLoading(false);
          return;
        }
        const mapped = apiApps.map((a) => {
          const statusMap = {
            Applied: { status: "application_sent", statusLabel: "Application sent" },
            Reviewed: { status: "resume_viewed", statusLabel: "Resume viewed" },
            Shortlisted: { status: "contact_viewed", statusLabel: "Contact viewed" },
            Rejected: { status: "not_shortlisted", statusLabel: "Not shortlisted" },
          };
          const st = statusMap[a.status] || statusMap.Applied;
          return {
            id: a._id,
            title: a.jobId?.title || "Job",
            company: a.jobId?.companyId?.companyName || "Company",
            ...st,
            statusTime: new Date(a.appliedDate || a.createdAt).toLocaleDateString(),
            appliedOn: "Portal",
            applicationSent: new Date(a.appliedDate || a.createdAt).toLocaleDateString(),
            applicationViewed: a.status !== "Applied" ? new Date(a.updatedAt || a.createdAt).toLocaleDateString() : null,
            contactViewed: a.status === "Shortlisted" ? new Date(a.updatedAt || a.createdAt).toLocaleDateString() : null,
            totalApplications: 0,
            viewedByRecruiter: 0,
            matchCriteria: { earlyApplicant: false, keyskills: true, location: true, workExperience: true, industry: false, department: false },
            recruiterName: "Recruiter",
            recruiterRole: `HR at ${a.jobId?.companyId?.companyName || "Company"}`,
            recruiterActive: "recently",
          };
        });
        setAllApplications(mapped);
        setSelectedApp(mapped[0]);
      } catch (err) {
        setError(err.message || "Could not fetch applications");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filter applications based on selected filter
  const filteredApplications = allApplications.filter((app) => {
    if (selectedFilter === "all") {
      return true;
    } else if (selectedFilter === "portal") {
      return app.appliedOn === "Portal";
    } else if (selectedFilter === "company") {
      return app.appliedOn === "Company Site";
    }
    return true;
  });

  // Update selected app when filter changes if current app is not in filtered list
  const handleFilterChange = (filterKey) => {
    setSelectedFilter(filterKey);
    setMobileView("list");

    const newFilteredApps = allApplications.filter((app) => {
      if (filterKey === "all") return true;
      if (filterKey === "portal") return app.appliedOn === "Portal";
      if (filterKey === "company") return app.appliedOn === "Company Site";
      return true;
    });

    if (!newFilteredApps.find(app => app.id === selectedApp.id) && newFilteredApps.length > 0) {
      setSelectedApp(newFilteredApps[0]);
    }
  };

  // Dynamic filters with counts
  const filters = [
    {
      key: "all",
      label: "All Applications",
      count: allApplications.length,
    },
    {
      key: "portal",
      label: "Applied via Portal",
      count: allApplications.filter(app => app.appliedOn === "Portal").length,
    },
    {
      key: "company",
      label: "Applied via Company Site",
      count: allApplications.filter(app => app.appliedOn === "Company Site").length,
    },
  ];

  const steps = [
    { label: "Application Sent", date: selectedApp.applicationSent, done: true },
    { label: "Application Viewed", date: selectedApp.applicationViewed, done: !!selectedApp.applicationViewed },
    { label: "Contact Viewed", date: selectedApp.contactViewed, done: !!selectedApp.contactViewed },
    { label: "Awaiting Recruiter Action", date: null, done: false },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#3385AA]/30 border-t-[#3385AA] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (allApplications.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#3385AA]">
             <Briefcase size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Applications Yet</h2>
          <p className="text-gray-500 max-w-md mb-8">You haven't applied to any jobs yet. Browse our jobs portal to find your next opportunity.</p>
          <Link to="/jobs" className="px-8 py-3 bg-[#3385AA] text-white font-bold rounded-xl shadow-lg hover:bg-[#297EA2] transition-all">
            Browse Jobs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const match = selectedApp?.matchCriteria || {};

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold text-gray-900">Job application status</h1>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Boost your chances —{" "}
              <a href="#" className="text-[#42AFCA] font-medium hover:underline">
                Complete your profile
              </a>{" "}
              to attract top recruiters
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">1561</p>
              <p className="text-xs text-gray-500">Total applies</p>
            </div>
            <div className="w-px h-8 sm:h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">207</p>
              <p className="text-xs text-gray-500">Application updates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Left Panel */}
        <div className={`w-full lg:w-80 xl:w-96 flex-shrink-0 ${mobileView === "detail" ? "hidden lg:block" : "block"}`}>
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => handleFilterChange(f.key)}
                className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedFilter === f.key
                    ? "border-[#42AFCA] text-[#42AFCA] bg-[#42AFCA]/10"
                    : "border-gray-300 text-gray-600 hover:border-[#42AFCA] hover:text-[#42AFCA]"
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>

          {/* Application List */}
          <div className="space-y-2 sm:space-y-3">
            {filteredApplications.map((app) => (
              <button
                key={app.id}
                onClick={() => { setSelectedApp(app); setShowDetail(false); setMobileView("detail"); }}
                className={`w-full text-left bg-white rounded-xl border transition-all duration-200 p-3 sm:p-4 hover:shadow-md ${
                  selectedApp.id === app.id
                    ? "border-[#42AFCA] shadow-md ring-1 ring-[#42AFCA]/20"
                    : "border-gray-200 hover:border-[#42AFCA]/50"
                }`}
              >
                <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">{app.title}</p>
                <p className="text-xs text-[#42AFCA] mt-0.5 font-medium">{app.company}</p>
                {app.rating && (
                  <p className="text-xs text-yellow-600 mt-0.5">
                    ⭐ {app.rating} · {app.reviews} Reviews
                  </p>
                )}
                <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
                  <StatusBadge status={app.status} label={app.statusLabel} time={app.statusTime} />
                  <span className="text-xs text-gray-400">Recruiter last active {app.recruiterActive}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className={`flex-1 min-w-0 ${mobileView === "list" ? "hidden lg:block" : "block"}`}>
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-5 shadow-sm">
            {/* Back button — mobile only */}
            <button
              onClick={() => setMobileView("list")}
              className="flex lg:hidden items-center gap-1.5 text-[#42AFCA] text-xs font-medium mb-3"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to applications
            </button>
            {/* Header */}
            <div className="border-b border-gray-100 pb-3 sm:pb-4 mb-4 sm:mb-6">
              <h2 className="text-sm sm:text-lg font-bold text-gray-900 leading-snug">{selectedApp.title}</h2>
              <p className="text-xs sm:text-sm text-[#42AFCA] font-medium mt-0.5">{selectedApp.company}</p>
              <a href="#" className="text-xs sm:text-sm text-[#42AFCA] hover:underline mt-1 inline-block font-medium">
                View similar jobs →
              </a>
            </div>

            {/* Application Status */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4 sm:mb-5">Application status</h3>
              <div className="relative flex items-start">
                {/* Modern Progress Line */}
                <div className="absolute top-[16px] left-0 right-0 h-1 bg-gray-200 mx-4 sm:mx-8 rounded-full" />
                <div
                  className="absolute top-[16px] left-0 h-1 bg-gradient-to-r from-[#42AFCA] to-[#317FA4] mx-4 sm:mx-8 rounded-full transition-all duration-700"
                  style={{
                    width: selectedApp.contactViewed
                      ? "66%"
                      : selectedApp.applicationViewed
                      ? "33%"
                      : "0%",
                  }}
                />
                {steps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 relative px-0.5">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 z-10 transition-all duration-300 shadow-md ${
                        step.done
                          ? "bg-gradient-to-br from-[#42AFCA] to-[#317FA4] border-[#42AFCA] text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      } flex items-center justify-center flex-shrink-0`}
                    >
                      {step.done ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                          <path d="M4.5 8.5l2.5 2.5L11.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                      )}
                    </div>
                    <p className={`mt-2 text-[11px] sm:text-[13px] font-semibold text-center leading-tight ${step.done ? "text-[#317FA4]" : "text-gray-400"}`}>
                      {step.label}
                    </p>
                    {step.date && <p className="hidden sm:block text-[10px] sm:text-[11px] text-gray-400 text-center mt-0.5">{step.date}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3">Activity on this job</h3>
              <div className="flex gap-3 sm:gap-6">
                <div className="flex-1 rounded-2xl border border-[#42AFCA]/30 bg-gradient-to-br from-[#e6f7fa] to-white p-4 sm:p-6 text-center shadow-sm">
                  <div className="flex justify-center mb-2">
                    <svg className="w-7 h-7 text-[#42AFCA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#317FA4]">{selectedApp.totalApplications.toLocaleString()}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Total applications</p>
                </div>
                <div className="flex-1 rounded-2xl border border-[#42AFCA]/30 bg-gradient-to-br from-[#e6f7fa] to-white p-4 sm:p-6 text-center shadow-sm">
                  <div className="flex justify-center mb-2">
                    <svg className="w-7 h-7 text-[#317FA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#317FA4]">{selectedApp.viewedByRecruiter.toLocaleString()}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Viewed by recruiter</p>
                </div>
              </div>
            </div>

            {/* What May Work */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-sm sm:text-base font-bold text-gray-900">What may work for you?</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Following criteria suggests how well you match with the job.</p>
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8">
                <MatchItem label="Early Applicant" matched={match.earlyApplicant} />
                <MatchItem label="Keyskills" matched={match.keyskills} />
                <MatchItem label="Location" matched={match.location} />
                <MatchItem label="Work Experience" matched={match.workExperience} />
                <MatchItem label="Industry" matched={match.industry} />
                <MatchItem label="Department" matched={match.department} />
              </div>
              <button
                onClick={() => setShowDetail(!showDetail)}
                className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#42AFCA] font-semibold hover:underline"
              >
                {showDetail ? "Hide Detail ↑" : "Detail View ↓"}
              </button>

              {showDetail && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-[#42AFCA]/5 rounded-xl border border-[#42AFCA]/20">
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-2">Match Summary</p>
                  <ul className="space-y-1 text-[10px] sm:text-xs text-gray-600">
                    <li>✅ Your location matches the job requirement.</li>
                    <li>✅ Your work experience aligns with the role.</li>
                    <li>❌ Your key skills may not fully match — consider updating your profile.</li>
                    <li>❌ Industry mismatch detected — highlight transferable skills.</li>
                    <li>❌ Department may differ — clarify your functional expertise.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* HR Recruiter */}
            <div className="rounded-xl border border-gray-200 p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{selectedApp.recruiterName}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">{selectedApp.recruiterRole}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Last active {selectedApp.recruiterActive}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}