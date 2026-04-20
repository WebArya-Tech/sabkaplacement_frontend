import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const SavedJobs = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [applyJob, setApplyJob] = useState(null); // job being applied to
  const [applyStep, setApplyStep] = useState(1); // 1 = form, 2 = success
  const [resumeFile, setResumeFile] = useState(null);
  const [removedJobs, setRemovedJobs] = useState([]);
  const [alertShown, setAlertShown] = useState(false);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", experience: "", coverLetter: "",
  });

  // Sample saved jobs data
  const savedJobs = [
    {
      id: 1,
      title: "Full-Stack Developer",
      company: "Vebsarl India Projects Pvt Ltd",
      logo: "V",
      rating: 3.8,
      reviews: 10,
      experience: "0-5 Yrs",
      salary: "Not disclosed",
      location: "Chennai",
      description: "Role & responsibilities Feature development and API integration.Develop reusable...",
      skills: ["CI/CD", "SDLC", "Hibernate", "Restfull Api", "Fullstack Development", "Graphql Apis"],
      posted: "3 Days Ago",
      savedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Senior Backend Developer",
      company: "Tech Solutions Inc",
      logo: "T",
      rating: 4.5,
      reviews: 45,
      experience: "3-7 Yrs",
      salary: "15-25 Lacs PA",
      location: "Bangalore",
      description: "Looking for experienced backend developer with strong knowledge in Node.js, Express...",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Microservices", "AWS"],
      posted: "1 Week Ago",
      savedDate: "5 days ago",
    },
    {
      id: 3,
      title: "React Developer",
      company: "Digital Innovations Pvt Ltd",
      logo: "D",
      rating: 4.2,
      reviews: 28,
      experience: "2-5 Yrs",
      salary: "8-15 Lacs PA",
      location: "Pune",
      description: "We are seeking a talented React Developer to join our frontend team. Build amazing...",
      skills: ["React.js", "Redux", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind"],
      posted: "4 Days Ago",
      savedDate: "1 week ago",
    },
    {
      id: 4,
      title: "Python Developer",
      company: "AI Solutions Group",
      logo: "A",
      rating: 4.0,
      reviews: 32,
      experience: "1-4 Yrs",
      salary: "6-12 Lacs PA",
      location: "Hyderabad",
      description: "Join our AI team as a Python Developer. Work on cutting-edge machine learning projects...",
      skills: ["Python", "Django", "Flask", "Machine Learning", "Data Science", "SQL"],
      posted: "2 Days Ago",
      savedDate: "3 days ago",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Cloud Systems Ltd",
      logo: "C",
      rating: 4.6,
      reviews: 52,
      experience: "2-6 Yrs",
      salary: "12-20 Lacs PA",
      location: "Mumbai",
      description: "Looking for DevOps Engineer to manage cloud infrastructure and CI/CD pipelines...",
      skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "CI/CD", "Linux"],
      posted: "5 Days Ago",
      savedDate: "1 week ago",
    },
  ];

  const handleSelectJob = (jobId) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === savedJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(savedJobs.map((job) => job.id));
    }
  };

  const handleRemoveSelected = () => {
    setRemovedJobs([...removedJobs, ...selectedJobs]);
    setSelectedJobs([]);
  };

  // Removed all apply modal and form handlers

  const handleCreateAlert = () => {
    setAlertShown(true);
    setTimeout(() => setAlertShown(false), 3000);
  };

  const visibleJobs = savedJobs.filter((j) => !removedJobs.includes(j.id));

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <CopyNavbar />
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-[68px]" />

      {/* Job Alert Toast */}
      {alertShown && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[60] bg-[#47AEC7] text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg">
          ✓ Job alert created successfully!
        </div>
      )}
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Title row + select all inline */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Saved Jobs</h1>
                <p className="text-xs text-gray-500 mt-0.5">{visibleJobs.length} jobs saved</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedJobs.length === visibleJobs.length && visibleJobs.length > 0}
                  onChange={handleSelectAll}
                  className="w-3.5 h-3.5 text-[#47AEC7] border-gray-300 rounded focus:ring-[#47AEC7]"
                />
                <span className="text-xs text-gray-600 font-medium">
                  {selectedJobs.length > 0 ? `${selectedJobs.length} selected` : "Select all"}
                </span>
              </label>
            </div>

            {/* Action buttons row */}
            <div className="flex flex-row flex-wrap items-center gap-1.5 sm:gap-2">
              <Link
                to="/jobs/invites"
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[#47AEC7] border border-[#47AEC7] text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#e6f7fa] transition-colors duration-200 relative"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                View Invites
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">1</span>
              </Link>
              <Link
                to="/jobs/applications"
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[#47AEC7] border border-[#47AEC7] text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#e6f7fa] transition-colors duration-200"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Applications
              </Link>
              <button className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#47AEC7] text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#3a9bb5] transition-colors duration-200">
                Search Similar Jobs
              </button>
              {selectedJobs.length > 0 && (
                <>
                  <button
                    onClick={handleRemoveSelected}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    Remove Selected
                  </button>
                  <button className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-[#47AEC7] border border-[#47AEC7] rounded-lg hover:bg-[#e6f7fa] transition-colors duration-200">
                    Apply to Selected
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Jobs List */}
            <div className="flex-1 space-y-3 sm:space-y-4">
              {visibleJobs.length === 0 ? (
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-6 sm:p-12 text-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    No saved jobs yet
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    Start saving jobs you're interested in to view them here
                  </p>
                  <Link
                    to="/jobs"
                    className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#47AEC7] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#3a9bb5] transition-colors duration-200"
                  >
                    Browse Jobs
                  </Link>
                </div>
              ) : (
                visibleJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg hover:border-[#d1f2f7] border border-gray-200 transition-all duration-200 ${
                      selectedJobs.includes(job.id) ? "ring-2 ring-[#47AEC7]/50 border-[#47AEC7]" : ""
                    }`}
                  >
                    <div className="p-3 sm:p-4 lg:p-5">
                      <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                        {/* Checkbox */}
                        <div className="pt-0.5 sm:pt-1">
                          <input
                            type="checkbox"
                            checked={selectedJobs.includes(job.id)}
                            onChange={() => handleSelectJob(job.id)}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#47AEC7] border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>

                        {/* Company Logo */}
                        <div className="flex-shrink-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-base sm:text-lg lg:text-xl font-bold">
                            {job.logo}
                          </div>
                        </div>

                        {/* Job Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                            <div className="flex-1">
                              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 hover:text-[#47AEC7] cursor-pointer line-clamp-2">
                                {job.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">{job.company}</p>
                              {job.rating && (
                                <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                                  <span className="text-xs font-semibold text-gray-700">
                                    {job.rating}
                                  </span>
                                  <span className="text-yellow-500">★</span>
                                  <span className="text-xs text-gray-500">
                                    ({job.reviews} Reviews)
                                  </span>
                                </div>
                              )}
                            </div>
                            <span
                              className="ml-2 sm:ml-4 p-1.5 sm:p-2 text-[#47AEC7]"
                              title="Saved"
                            >
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                            <div className="flex items-center gap-1">
                              <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <span>{job.experience}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                              <span className="truncate">{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span>{job.location}</span>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                            {job.skills.slice(0, 3).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 3 && (
                              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[#47AEC7] text-xs font-medium">
                                +{job.skills.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pt-2 sm:pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-0.5 sm:gap-1">
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {job.posted}
                              </span>
                              <span className="flex items-center gap-0.5 sm:gap-1 text-[#47AEC7]">
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Saved {job.savedDate}
                              </span>
                            </div>
                            <button
                              onClick={() => handleOpenApply(job)}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#47AEC7] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-[#3a9bb5] transition-colors duration-200 w-full sm:w-auto text-center"
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0">
              <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-5 lg:sticky lg:top-[68px]">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-0">
                  <button className="w-full px-2 sm:px-3 py-2 bg-[#e6f7fa] text-[#47AEC7] text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#d1f2f7] transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Find Similar Jobs
                  </button>
                  <button
                    onClick={handleCreateAlert}
                    className="w-full px-2 sm:px-3 py-2 bg-[#e6f7fa] text-[#47AEC7] text-[10px] sm:text-xs font-medium rounded-lg hover:bg-[#d1f2f7] transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Create Job Alert
                  </button>
                  <Link
                    to="/jobs"
                    className="w-full px-2 sm:px-3 py-2 bg-gray-100 text-gray-700 text-[10px] sm:text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Browse All Jobs
                  </Link>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                    Job Statistics
                  </h4>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Saved:</span>
                      <span className="font-semibold text-gray-900">
                        {visibleJobs.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected:</span>
                      <span className="font-semibold text-[#47AEC7]">
                        {selectedJobs.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 hidden lg:block">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                    Tips
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs text-gray-600">
                    <li className="flex items-start gap-1.5 sm:gap-2">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Apply early to increase your chances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Customize your resume for each job</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Set up job alerts for similar positions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Apply Modal */}
      {applyJob && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

            {applyStep === 1 ? (
              <>
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-[#47AEC7] to-[#2a8faa] px-5 py-4 flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-xs mb-0.5">Applying for</p>
                    <h2 className="text-white font-bold text-base sm:text-lg leading-tight">{applyJob.title}</h2>
                    <p className="text-white/80 text-xs mt-0.5">{applyJob.company}</p>
                  </div>
                  <button onClick={handleCloseApply} className="text-white/70 hover:text-white mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmitApply} className="overflow-y-auto flex-1 px-5 py-4 space-y-3">
                  {/* Name + Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder="e.g. Sneha Sharma"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#47AEC7] focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Phone <span className="text-red-400">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleFormChange}
                        placeholder="e.g. 9876543210"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#47AEC7] focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="e.g. sneha@gmail.com"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#47AEC7] focus:border-transparent placeholder-gray-400"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Total Experience</label>
                    <select
                      name="experience"
                      value={form.experience}
                      onChange={handleFormChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#47AEC7] focus:border-transparent bg-white"
                    >
                      <option value="">Select experience</option>
                      <option value="fresher">Fresher (0 years)</option>
                      <option value="0-1">0–1 Year</option>
                      <option value="1-2">1–2 Years</option>
                      <option value="2-5">2–5 Years</option>
                      <option value="5-10">5–10 Years</option>
                      <option value="10+">10+ Years</option>
                    </select>
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Upload Resume <span className="text-red-400">*</span></label>
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className="border-2 border-dashed border-[#47AEC7]/40 rounded-xl p-4 text-center cursor-pointer hover:border-[#47AEC7] hover:bg-[#e6f7fa]/30 transition-all duration-200"
                    >
                      {resumeFile ? (
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs text-[#47AEC7] font-medium">{resumeFile.name}</span>
                          <button type="button" onClick={(e) => { e.stopPropagation(); setResumeFile(null); }} className="text-gray-400 hover:text-red-500 text-xs">✕</button>
                        </div>
                      ) : (
                        <>
                          <svg className="w-6 h-6 text-[#47AEC7]/60 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-xs text-gray-500">Click to upload <span className="text-[#47AEC7] font-medium">PDF, DOC, DOCX</span></p>
                          <p className="text-[10px] text-gray-400 mt-0.5">Max 5MB</p>
                        </>
                      )}
                    </div>
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Cover Letter <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea
                      name="coverLetter"
                      value={form.coverLetter}
                      onChange={handleFormChange}
                      rows={3}
                      placeholder="Tell the recruiter why you're a great fit for this role..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#47AEC7] focus:border-transparent placeholder-gray-400 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-1 pb-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-[#47AEC7] to-[#2a8faa] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200 shadow-md"
                    >
                      Submit Application
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-2">Your information is secure and encrypted</p>
                  </div>
                </form>
              </>
            ) : (
              /* Success Screen */
              <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#e6f7fa] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Application Submitted!</h3>
                <p className="text-sm text-gray-500 mb-1">{applyJob.title}</p>
                <p className="text-xs text-[#47AEC7] font-medium mb-5">{applyJob.company}</p>
                <p className="text-xs text-gray-500 mb-6 max-w-xs">Your application has been sent. The recruiter will review it and get back to you soon.</p>
                <button
                  onClick={handleCloseApply}
                  className="px-6 py-2.5 bg-[#47AEC7] text-white text-sm font-semibold rounded-xl hover:bg-[#3a9bb5] transition-colors duration-200"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;



