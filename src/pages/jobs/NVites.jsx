import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

// ── Data ─────────────────────────────────────────────────────────────────────
const nviteJobs = [
  {
    id: 1,
    title: "Loan Officer",
    industry: "Hiring for Banking industry",
    postedBy: "Adidar Consulting",
    postedDate: "23 Mar",
    location: "Ghaziabad, Noida",
    experience: "0 - 3 Years",
    salary: "₹ 0.5 - 3 Lacs pa",
    workMode: "In office",
    skills: ["Calling", "Loan Sales", "Calling Process", "Telesales", "Inbound Sales", "Outbound Sales", "Outbound Calling", "Bpo Sales", "Housing Finance"],
    badge: "exclusive",
    unread: false,
    logo: null,
    designation: "Loan Officer",
    role: "Loan Officer",
    locationFull: "Ghaziabad, Noida",
    industryName: "Banking",
    description: `Position- Loan Officer (Telecallers)
The Job Description and Skillset required for the position is as below:
Qualification: Graduate
Experience: 0- 2 Years/ Prior Mortgage experience would be an added advantage
Basic responsibility: Telecalling
Skill Set Required:
• Good communication skills- bilingual
• Pleasant Voice
• Decisions making skills
• Proactive & Extrovert
• Responsible
• Adaptable
• Good Listening skills
• Willingness to address huge volume of calls, approximately 100 calls a day.`,
    matchKeywords: "Loan Officer, Calling, Loan Sales, Loan Executive, Calling Process, Tele Caller, Telesales, Inbound Sales, Banking, Tele Sales Executive, Outbound Sales, Outbound Calling, Bpo Sales, Housing Finance, Home",
  },
  {
    id: 2,
    title: "Real Estate Sales Executive",
    industry: "",
    postedBy: "Ashley Estate",
    postedDate: "18 Mar",
    location: "Gurugram",
    experience: "0 - 7 Years",
    salary: "₹ 2.5 - 7.5 LPA",
    workMode: "In office",
    skills: ["Real Estate", "Sales", "Lead Generation", "Client Handling", "Property Sales"],
    badge: null,
    unread: true,
    logo: "A",
    designation: "Sales Executive",
    role: "Real Estate Sales Executive",
    locationFull: "Gurugram, Haryana",
    industryName: "Real Estate",
    description: `We are looking for a motivated Real Estate Sales Executive to join our growing team.

Responsibilities:
• Generate leads and convert them into sales
• Handle client queries and property visits
• Maintain relationships with existing and potential clients
• Achieve monthly sales targets

Requirements:
• Excellent communication and negotiation skills
• Self-motivated and target-driven
• Prior real estate experience preferred but not mandatory`,
    matchKeywords: "Sales, Real Estate, Property, Lead Generation, Client Handling",
  },
  {
    id: 3,
    title: "Assistant Test Engineer",
    industry: "",
    postedBy: "TechSoft Solutions",
    postedDate: "20 Mar",
    location: "Noida",
    experience: "0 - 2 Years",
    salary: "₹ 2 - 4 LPA",
    workMode: "Hybrid",
    skills: ["Manual Testing", "Selenium", "JIRA", "Test Cases", "Bug Reporting", "QA"],
    badge: "pro",
    unread: true,
    logo: "T",
    designation: "Assistant Test Engineer",
    role: "QA / Test Engineer",
    locationFull: "Noida, Uttar Pradesh",
    industryName: "IT / Software",
    description: `We are hiring an Assistant Test Engineer to join our QA team.

Qualifications:
• B.Tech / BCA / MCA in Computer Science or related field
• 0-2 years of experience in software testing

Responsibilities:
• Write and execute test cases
• Report and track bugs using JIRA
• Perform regression, smoke and sanity testing
• Work closely with developers to resolve issues

Skills Required:
• Basic knowledge of Selenium
• Good analytical and problem-solving skills
• Familiarity with SDLC and STLC`,
    matchKeywords: "Testing, QA, Selenium, Manual Testing, JIRA, Test Cases",
  },
  {
    id: 4,
    title: "Customer Success Manager",
    industry: "Hiring for SaaS industry",
    postedBy: "GrowthEdge Inc",
    postedDate: "21 Mar",
    location: "Bengaluru",
    experience: "1 - 4 Years",
    salary: "₹ 4 - 9 LPA",
    workMode: "Hybrid",
    skills: ["Customer Success", "Account Management", "Onboarding", "Retention", "SaaS", "CRM"],
    badge: "exclusive",
    unread: false,
    logo: "G",
    designation: "Customer Success Manager",
    role: "Customer Success Manager",
    locationFull: "Bengaluru, Karnataka",
    industryName: "SaaS / Technology",
    description: `GrowthEdge Inc is looking for a proactive Customer Success Manager to manage client relationships.

Responsibilities:
• Own customer onboarding and drive product adoption
• Monitor customer health scores and reduce churn
• Conduct regular check-ins and business reviews
• Collaborate with sales and product teams

Requirements:
• 1-4 years in a customer-facing role in SaaS
• Strong communication and relationship-building skills
• Experience with CRM tools like Salesforce or HubSpot`,
    matchKeywords: "Customer Success, Account Management, SaaS, CRM, Onboarding, Retention",
  },
  {
    id: 5,
    title: "Digital Marketing Executive",
    industry: "",
    postedBy: "BrandWave Agency",
    postedDate: "19 Mar",
    location: "Delhi, Noida",
    experience: "0 - 3 Years",
    salary: "₹ 2.5 - 5 LPA",
    workMode: "In office",
    skills: ["SEO", "SEM", "Google Ads", "Social Media Marketing", "Content Writing", "Analytics"],
    badge: null,
    unread: false,
    logo: "B",
    designation: "Digital Marketing Executive",
    role: "Digital Marketing",
    locationFull: "Delhi / Noida",
    industryName: "Marketing / Advertising",
    description: `BrandWave Agency is looking for a creative Digital Marketing Executive to drive online campaigns.

Responsibilities:
• Plan and execute digital marketing campaigns (SEO, SEM, Social)
• Manage Google Ads and Meta Ads campaigns
• Track performance using Google Analytics
• Create engaging content for social media platforms

Requirements:
• Knowledge of SEO/SEM best practices
• Experience with Google Ads & Meta Ads
• Strong analytical mindset`,
    matchKeywords: "Digital Marketing, SEO, SEM, Google Ads, Social Media, Content",
  },
  {
    id: 6,
    title: "HR Recruiter - IT Staffing",
    industry: "Hiring for IT Staffing",
    postedBy: "PeopleFirst HR",
    postedDate: "22 Mar",
    location: "Hyderabad",
    experience: "0 - 2 Years",
    salary: "₹ 1.8 - 3.5 LPA",
    workMode: "In office",
    skills: ["Recruitment", "Sourcing", "IT Hiring", "Sabkaplacement", "LinkedIn", "End-to-End Recruitment"],
    badge: "pro",
    unread: false,
    logo: "P",
    designation: "HR Recruiter",
    role: "HR / Recruitment",
    locationFull: "Hyderabad, Telangana",
    industryName: "IT Staffing",
    description: `PeopleFirst HR is hiring an enthusiastic IT Recruiter for our fast-growing team.

Responsibilities:
• Source candidates through Sabkaplacement, LinkedIn and other portals
• Screen resumes and conduct initial telephonic interviews
• Coordinate interviews between candidates and clients
• Maintain recruitment MIS and trackers

Requirements:
• Any graduate with good communication skills
• 0-2 years of recruitment experience (IT preferred)
• Familiarity with job portals like Sabkaplacement, Monster`,
    matchKeywords: "Recruitment, HR, IT Hiring, Sourcing, Sabkaplacement, LinkedIn",
  },
  {
    id: 7,
    title: "Inside Sales Representative",
    industry: "Hiring for EdTech industry",
    postedBy: "SkillUp EdTech",
    postedDate: "17 Mar",
    location: "Mumbai, Remote",
    experience: "0 - 3 Years",
    salary: "₹ 3 - 6 LPA",
    workMode: "Remote",
    skills: ["Inside Sales", "Lead Conversion", "Cold Calling", "B2C Sales", "CRM", "EdTech"],
    badge: "exclusive",
    unread: false,
    logo: "S",
    designation: "Inside Sales Representative",
    role: "Sales",
    locationFull: "Mumbai / Remote",
    industryName: "EdTech",
    description: `SkillUp EdTech is seeking driven Inside Sales Representatives to help learners enroll in our programs.

Responsibilities:
• Call leads and convert them into paid enrolments
• Understand learner needs and recommend suitable courses
• Follow up on leads via calls, WhatsApp and email
• Maintain daily call logs in CRM

Requirements:
• Strong communication in Hindi & English
• Prior sales experience is a plus
• Target-driven and self-motivated attitude`,
    matchKeywords: "Inside Sales, Cold Calling, B2C Sales, Lead Conversion, EdTech, CRM",
  },
];

// ── Badge component ───────────────────────────────────────────────────────────
const Badge = ({ type }) => {
  if (type === "exclusive")
    return null;
  if (type === "pro")
    return null;
  return null;
};

// ── Logo/Avatar ───────────────────────────────────────────────────────────────
const CompanyLogo = ({ logo, size = "sm" }) => {
  const dim = size === "lg" ? "w-14 h-14 text-2xl" : "w-9 h-9 text-sm";
  if (!logo)
    return (
      <div className={`${dim} rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0`}>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    );
  const colors = {
    A: "bg-[#d1f2f7] text-[#3a9bb5]",
    T: "bg-[#d1f2f7] text-[#3a9bb5]",
    G: "bg-green-100 text-green-700",
    B: "bg-purple-100 text-purple-700",
    P: "bg-pink-100 text-pink-700",
    S: "bg-teal-100 text-teal-700",
  };
  return (
    <div className={`${dim} rounded-full ${colors[logo] || "bg-gray-100 text-gray-700"} font-bold flex items-center justify-center flex-shrink-0`}>
      {logo}
    </div>
  );
};

// ── Main NVites component ─────────────────────────────────────────────────────
const NVites = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedJob, setSelectedJob] = useState(nviteJobs[0]);
  const [dismissed, setDismissed] = useState([]);
  const [applied, setApplied] = useState([]);
  // Removed showHiddenModal state as hidden jobs modal is deleted
  const [mobileView, setMobileView] = useState("list"); // "list" | "detail"

  const unreadJobs = nviteJobs.filter((j) => j.unread);

  const visibleJobs = nviteJobs.filter((j) => {
    if (dismissed.includes(j.id)) return false;
    if (activeTab === "unread") return j.unread;
    return true;
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileView("list");
    const filtered = nviteJobs.filter((j) => {
      if (dismissed.includes(j.id)) return false;
      if (tab === "unread") return j.unread;
      return true;
    });
    if (filtered.length > 0) setSelectedJob(filtered[0]);
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setMobileView("detail");
  };

  const handleNotInterested = (id) => {
    setDismissed((p) => [...p, id]);
    const next = visibleJobs.find((j) => j.id !== id);
    if (next) { setSelectedJob(next); }
    else { setMobileView("list"); }
  };

  const handleApply = (id) => {
    setApplied((p) => [...p, id]);
  };

  return (
    <div className="min-h-screen bg-white pt-[52px] md:pt-[58px] font-sans">
      <CopyNavbar />

      {/* ── Page title strip ── */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-8 py-2 sm:py-2.5">
        <div className="max-w-[1300px] mx-auto">
          <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-tight">NVites: Your invitation to apply</h1>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
            Recruiters have chosen you from a large pool of candidates to apply to these jobs
          </p>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-3 sm:px-4 lg:px-8 pt-3 pb-8">

        {/* ── Tabs — hidden on mobile when in detail view ── */}
        <div className={`flex gap-2 sm:gap-3 mb-3 sm:mb-4 overflow-x-auto scrollbar-hide ${mobileView === "detail" ? "hidden lg:flex" : "flex"}`}>
          <button
            onClick={() => handleTabChange("all")}
            className={`px-4 sm:px-5 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "all"
                ? "bg-[#47AEC7] border-[#47AEC7] text-white font-semibold shadow-sm"
                : "bg-white border-gray-300 text-gray-600 hover:border-[#47AEC7] hover:text-[#47AEC7]"
            }`}
          >
            All ({nviteJobs.filter((j) => !dismissed.includes(j.id)).length})
          </button>
          <button
            onClick={() => handleTabChange("unread")}
            className={`px-4 sm:px-5 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "unread"
                ? "bg-[#47AEC7] border-[#47AEC7] text-white font-semibold shadow-sm"
                : "bg-white border-gray-300 text-gray-600 hover:border-[#47AEC7] hover:text-[#47AEC7]"
            }`}
          >
            Unread ({unreadJobs.filter((j) => !dismissed.includes(j.id)).length})
          </button>
        </div>

        {/* ── Two-panel layout ── */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5">

          {/* LEFT — job list (hidden on mobile when detail is open) */}
          <div className={`w-full lg:w-[380px] xl:w-[420px] lg:flex-shrink-0 space-y-2 sm:space-y-3 ${mobileView === "detail" ? "hidden lg:block" : "block"}`}>

            {/* Exclusive unlock teaser card */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                {/* stacked logos */}
                <div className="flex -space-x-2">
                  {["bg-[#47AEC7]","bg-[#3a9bb5]","bg-gray-700","bg-purple-500"].map((c, i) => (
                    <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${c} flex items-center justify-center text-white text-xs font-bold`}>
                      {["a","C","B","D"][i].toUpperCase()}
                    </div>
                  ))}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-semibold">
                    +18
                  </div>
                </div>
                <Badge type="exclusive" />
              </div>
              {/* Removed hidden jobs recruiter prompt and button */}
            </div>

            {/* Job cards */}
            {visibleJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => handleSelectJob(job)}
                className={`bg-white rounded-2xl border transition-all cursor-pointer p-4 sm:p-6 shadow-sm relative ${
                  selectedJob?.id === job.id
                    ? "border-[#47AEC7] ring-2 ring-[#47AEC7]/30 shadow-lg"
                    : "border-gray-200 hover:border-[#47AEC7]/60 hover:shadow-xl"
                } hover:scale-[1.01] duration-200`}
              >
                {/* badge top-right */}
                {job.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge type={job.badge} />
                  </div>
                )}

                {/* unread dot */}
                {job.unread && !dismissed.includes(job.id) && (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#e6f7fa]0" />
                )}

                <h3 className="text-base sm:text-lg font-extrabold text-[#1a3c4b] mb-1 pr-20 sm:pr-24 line-clamp-2">{job.title}</h3>
                <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-2">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-2 sm:mb-3">
                                  {/* Skills row */}
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {job.skills && job.skills.slice(0, 5).map((skill, idx) => (
                                      <span key={idx} className="px-2 py-0.5 bg-[#eaf4f8] text-[#317FA4] text-xs rounded-full border border-[#d6eaf2] font-semibold shadow-sm">
                                        {skill}
                                      </span>
                                    ))}
                                    {job.skills && job.skills.length > 5 && (
                                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full border border-gray-200 font-semibold">
                                        +{job.skills.length - 5}
                                      </span>
                                    )}
                                  </div>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {job.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="truncate">{job.salary}</span>
                  </span>
                </div>

                {/* Posted by row */}
                <div className="flex items-center justify-between border-t border-[#eaf4f8] pt-3 mt-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                    <CompanyLogo logo={job.logo} />
                    <div className="min-w-0 flex-1">
                      {job.industry && <p className="text-xs text-gray-500 truncate">{job.industry}</p>}
                      <p className="text-xs text-gray-600 font-medium truncate">{job.postedBy}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{job.postedDate}</span>
                </div>
              </div>
            ))}

            {visibleJobs.length === 0 && (
              <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-6 sm:p-10 text-center text-gray-400 text-xs sm:text-sm">
                No NVites in this category.
              </div>
            )}
          </div>

          {/* RIGHT — detail panel (hidden on mobile when list is shown) */}
          {selectedJob && !dismissed.includes(selectedJob.id) ? (
            <div className={`flex-1 bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm overflow-hidden ${mobileView === "list" ? "hidden lg:block" : "block"}`}>
              {/* Detail header */}
              <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-100">

                {/* Back button — mobile only */}
                <button
                  onClick={() => setMobileView("list")}
                  className="flex lg:hidden items-center gap-1.5 text-[#47AEC7] text-xs font-medium mb-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to jobs
                </button>

                <div className="flex items-start justify-between gap-2 sm:gap-3">
                  <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                    <CompanyLogo logo={selectedJob.logo} size="lg" />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 line-clamp-2 leading-snug">{selectedJob.title}</h2>
                      {selectedJob.industry && (
                        <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 truncate">{selectedJob.industry}</p>
                      )}
                      <p className="text-[11px] sm:text-xs text-gray-500 truncate">Posted by {selectedJob.postedBy}</p>
                    </div>
                  </div>
                  {/* Delete icon */}
                  <button
                    onClick={() => handleNotInterested(selectedJob.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 mt-1"
                    title="Remove"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{selectedJob.locationFull}</span>
                  </span>
                  <span className="flex items-center gap-1 sm:gap-1.5">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{selectedJob.experience}</span>
                  </span>
                  <span className="flex items-center gap-1 sm:gap-1.5">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="truncate">{selectedJob.salary}</span>
                  </span>
                  <span className="flex items-center gap-1 sm:gap-1.5">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 00-1-1H9a1 1 0 00-1 1v5m4 0H9" />
                    </svg>
                    {selectedJob.workMode}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  {selectedJob.skills.map((s, i) => (
                    <span key={i} className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-row gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <button
                    onClick={() => handleNotInterested(selectedJob.id)}
                    className="flex-1 sm:flex-none px-3 sm:px-5 py-2 border border-[#47AEC7] text-[#47AEC7] rounded-full text-xs sm:text-sm font-medium hover:bg-[#e6f7fa] transition-colors text-center"
                  >
                    Not interested
                  </button>
                  <button
                    onClick={() => handleApply(selectedJob.id)}
                    disabled={applied.includes(selectedJob.id)}
                    className={`flex-1 sm:flex-none px-5 sm:px-8 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all text-center ${
                      applied.includes(selectedJob.id)
                        ? "bg-[#47AEC7] text-white cursor-default opacity-80"
                        : "bg-[#47AEC7] text-white hover:bg-[#3a9bb5]"
                    }`}
                  >
                    {applied.includes(selectedJob.id) ? "✓ Applied" : "Apply"}
                  </button>
                </div>
              </div>

              {/* Job description */}
              <div className="p-3 sm:p-4 lg:p-5">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">Job description</h3>
                <div className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {selectedJob.description}
                </div>

                {/* Info grid */}
                <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3 border-t border-gray-100 pt-4 sm:pt-6">
                  {[
                    { label: "Designation", value: selectedJob.designation },
                    { label: "Location",    value: selectedJob.locationFull },
                    { label: "Role",        value: selectedJob.role },
                    { label: "Industry",    value: selectedJob.industryName },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-2 sm:gap-3 text-xs sm:text-sm">
                      <span className="font-semibold text-gray-800 w-24 sm:w-28 flex-shrink-0">{label}:</span>
                      <span className="text-gray-600 break-words">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Match keywords */}
                <div className="mt-4 sm:mt-6 bg-gray-50 rounded-lg p-3 sm:p-4 text-xs text-gray-500 leading-relaxed">
                  You are receiving this job because your profile contained one or more of the following words that the recruiter searched for:{" "}
                  <span className="text-gray-700">{selectedJob.matchKeywords}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex flex-1 bg-white rounded-xl border border-gray-200 items-center justify-center text-gray-400 text-sm">
              Select a job to see details
            </div>
          )}
        </div>
      </div>
      {/* Removed Hidden Jobs Modal and related logic */}

      <Footer />
    </div>
  );
};

export default NVites;


