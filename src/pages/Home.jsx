import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import Footer from "../components/Footer";
import CopyNavbar from "../components copy/Navbar";

const Home = () => {
  const jobScrollRef = useRef(null);
  const earlyAccessScrollRef = useRef(null);
  const companiesScrollRef = useRef(null);
  const blogsScrollRef = useRef(null);

  const scrollJobsLeft = () => {
    if (jobScrollRef.current) {
      jobScrollRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollJobsRight = () => {
    if (jobScrollRef.current) {
      jobScrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const scrollEarlyAccessLeft = () => {
    if (earlyAccessScrollRef.current) {
      earlyAccessScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollEarlyAccessRight = () => {
    if (earlyAccessScrollRef.current) {
      earlyAccessScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollCompaniesLeft = () => {
    if (companiesScrollRef.current) {
      companiesScrollRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollCompaniesRight = () => {
    if (companiesScrollRef.current) {
      companiesScrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  const scrollBlogsLeft = () => {
    if (blogsScrollRef.current) {
      blogsScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollBlogsRight = () => {
    if (blogsScrollRef.current) {
      blogsScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CopyNavbar />
      {/* Main Content with Sidebars */}
      <div className="max-w-7xl mx-auto px-4 pt-[100px] pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-12">
            {/* Recommended Jobs Section */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6">
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Recommended jobs for you</h3>
                  <Link to="/jobs" className="text-[#317FA4] hover:text-[#1e293b] font-medium text-sm">
                    View all
                  </Link>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-4 md:gap-6 mt-4 border-b border-gray-200 overflow-x-auto scrollbar-hide">
                  <button className="pb-3 px-1 border-b-2 border-[#317FA4] text-[#317FA4] font-semibold text-sm whitespace-nowrap">
                    Applies (49)
                  </button>
                  <button className="pb-3 px-1 text-gray-600 hover:text-gray-900 font-medium text-sm whitespace-nowrap">
                    Profile (68)
                  </button>
                  <button className="pb-3 px-1 text-gray-600 hover:text-gray-900 font-medium text-sm whitespace-nowrap">
                    Top Candidate (10)
                  </button>
                  <button className="pb-3 px-1 text-gray-600 hover:text-gray-900 font-medium text-sm whitespace-nowrap">
                    You might like (59)
                  </button>
                </div>
              </div>

              {/* Job Cards - Horizontal Scroll */}
              <div className="relative px-5 pt-5 pb-5">
                {/* Left Arrow */}
                <button 
                  onClick={scrollJobsLeft}
                  className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow */}
                <button 
                  onClick={scrollJobsRight}
                  className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div ref={jobScrollRef} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-2 md:px-10">
                  {/* Job Card 1 */}
                  <Link to="/jobs" className="flex-shrink-0 w-64 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">SI</span>
                      </div>
                      <span className="text-xs text-gray-400">3d ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Fresher SQL Developer</h4>
                    <p className="text-xs text-gray-600 mb-2">Shakti Infosys</p>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-orange-500 text-xs">?</span>
                      <span className="text-xs font-semibold text-gray-700">4.2</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Chennai</span>
                    </div>
                  </Link>

                  {/* Job Card 2 */}
                  <Link to="/jobs" className="flex-shrink-0 w-64 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">T</span>
                      </div>
                      <span className="text-xs text-gray-400">1d ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Software Developer</h4>
                    <p className="text-xs text-gray-600 mb-4">MNC</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Pune, Pimpri-Chinch...</span>
                    </div>
                  </Link>

                  {/* Job Card 3 */}
                  <Link to="/jobs" className="flex-shrink-0 w-64 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">T</span>
                      </div>
                      <span className="text-xs text-gray-400">1h ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Application Sup...</h4>
                    <p className="text-xs text-gray-600 mb-2">Truecopy Cr...</p>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-orange-500 text-xs">?</span>
                      <span className="text-xs font-semibold text-gray-700">4.1</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Pune(Aundh)</span>
                    </div>
                  </Link>

                  {/* Job Card 4 */}
                  <Link to="/jobs" className="flex-shrink-0 w-64 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">IT</span>
                      </div>
                      <span className="text-xs text-gray-400">2d ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Full Stack Developer</h4>
                    <p className="text-xs text-gray-600 mb-2">IT Solutions</p>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-orange-500 text-xs">?</span>
                      <span className="text-xs font-semibold text-gray-700">4.0</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Mumbai, Bangalore</span>
                    </div>
                  </Link>

                  {/* Job Card 5 */}
                  <Link to="/jobs" className="flex-shrink-0 w-64 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">TM</span>
                      </div>
                      <span className="text-xs text-gray-400">4d ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">React JS Developer</h4>
                    <p className="text-xs text-gray-600 mb-2">Tech Mahindra</p>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-orange-500 text-xs">?</span>
                      <span className="text-xs font-semibold text-gray-700">3.9</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Hyderabad</span>
                    </div>
                  </Link>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-center gap-1 mt-2">
                  <button className="w-8 h-1 bg-gray-800 rounded hover:bg-gray-600 transition-colors"></button>
                  <button className="w-8 h-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors"></button>
                  <button className="w-8 h-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors"></button>
                  <button className="w-8 h-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors"></button>
                  <button className="w-8 h-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors"></button>
                </div>
              </div>
            </div>

            {/* Early Access Roles Section */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6">
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">75 Early access roles from top companies</h3>
                      <p className="text-xs text-gray-500">See what recruiters are searching for, even before they post a job</p>
                    </div>
                  </div>
                  <Link to="/jobs" className="text-[#47AEC7] hover:text-[#3a9bb5] font-semibold text-sm whitespace-nowrap">
                    View all
                  </Link>
                </div>

                {/* Early Access Job Cards - Horizontal Scroll */}
                <div className="relative">
                  {/* Left Arrow */}
                  <button 
                    onClick={scrollEarlyAccessLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 rounded-full p-2 shadow-lg border border-gray-200 transition-all hover:scale-110"
                    aria-label="Scroll left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Right Arrow */}
                  <button 
                    onClick={scrollEarlyAccessRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 rounded-full p-2 shadow-lg border border-gray-200 transition-all hover:scale-110"
                    aria-label="Scroll right"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div ref={earlyAccessScrollRef} className="flex gap-4 overflow-x-scroll pb-4 scrollbar-hide">
                    {/* Early Access Job Card 1 */}
                    <div className="flex-shrink-0 w-72 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 text-base">Fullstack Developer</h4>
                        <span className="text-xs text-gray-400">5d ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Global BPO & shared services firm</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          3.0+ Yrs
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="2"/>
                          </svg>
                          Corporate
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="2"/>
                          </svg>
                          Service
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          2-5 Yrs
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          6-9 Lacs P.A.
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          Ahmedabad
                        </span>
                      </div>

                      <div className="border-t border-gray-100 pt-3">
                        <p className="text-xs text-gray-500 mb-3">Hiring for one of these companies</p>
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="px-2 py-1 bg-red-100 text-red-700 font-semibold text-xs rounded">EXL</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 font-semibold text-xs rounded">mphasis</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 font-semibold text-xs rounded flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                            </svg>
                            more
                          </span>
                        </div>
                        <button className="w-full py-2 bg-[#47AEC7] hover:bg-[#3a9bb5] text-white text-sm font-semibold rounded-lg transition-colors">
                          Share interest
                        </button>
                      </div>
                    </div>

                    {/* Early Access Job Card 2 */}
                    <div className="flex-shrink-0 w-72 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 text-base">Fullstack Developer</h4>
                        <span className="text-xs text-gray-400">2d ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Service based B2B Firm</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          3.5+ Yrs
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="2"/>
                          </svg>
                          Service
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          0-2 Yrs
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          50k P.A.
                        </span>
                      </div>

                      <div className="border-t border-gray-100 pt-3">
                        <p className="text-xs text-gray-500 mb-3">Hiring for one of these companies</p>
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">team</span>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 font-semibold text-xs rounded flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                          <span className="w-8 h-8 bg-orange-500 rounded-full"></span>
                        </div>
                        <button className="w-full py-2 bg-[#47AEC7] hover:bg-[#3a9bb5] text-white text-sm font-semibold rounded-lg transition-colors">
                          Share interest
                        </button>
                      </div>
                    </div>

                    {/* Early Access Job Card 3 */}
                    <div className="flex-shrink-0 w-72 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 text-base">Frontend Developer</h4>
                        <span className="text-xs text-gray-400">1w ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Top Product Company</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          2.0+ Yrs
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="2"/>
                          </svg>
                          Product
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          3-5 Yrs
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          12-18 Lacs P.A.
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          Bangalore
                        </span>
                      </div>

                      <div className="border-t border-gray-100 pt-3">
                        <p className="text-xs text-gray-500 mb-3">Hiring for one of these companies</p>
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 font-semibold text-xs rounded">Swiggy</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 font-semibold text-xs rounded">Flipkart</span>
                        </div>
                        <button className="w-full py-2 bg-[#47AEC7] hover:bg-[#3a9bb5] text-white text-sm font-semibold rounded-lg transition-colors">
                          Share interest
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NVites: Invitation to apply Section */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6">
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1">NVites: Invitation to apply</h3>
                    <Link to="/jobs" className="text-xs text-[#47AEC7] hover:text-[#3a9bb5] font-medium">
                      View all
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Invitation 1 */}
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Loan Officer</h4>
                      <p className="text-xs text-gray-500 mb-1">Hiring for Banking industry</p>
                      <span className="text-xs text-gray-400">invited 1d ago</span>
                    </div>
                  </div>

                  {/* Invitation 2 */}
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Real Estate Sales Executive</h4>
                      <p className="text-xs text-gray-500 mb-1">Ashley Estates</p>
                      <span className="text-xs text-gray-400">invited 6d ago</span>
                    </div>
                  </div>

                  {/* Invitation 3 */}
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <h4 className="font-semibold text-gray-900 text-sm">Assistant Test Engineer</h4>
                        <span className="flex-shrink-0 px-2 py-0.5 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-[10px] font-bold rounded flex items-center gap-1 whitespace-nowrap">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          Free Pro Nvite
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">Nucleus Software Exports</p>
                      <span className="text-xs text-gray-400">invited 10d ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Survey Section */}
            <div className="bg-gradient-to-br from-[#F4FAFC] to-[#EAF4F8] rounded-xl shadow-md border border-[#D6EAF2] p-6 mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4 text-center">
                How likely are you to recommend us to a friend or family?
              </h3>
              
              {/* Rating Scale */}
              <div className="flex justify-between items-center mb-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                      num === 2
                        ? 'bg-[#317FA4] text-white shadow-lg scale-110'
                        : 'bg-white text-gray-700 hover:bg-blue-100 border border-gray-300'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-gray-600 mb-4">
                <span>Not likely</span>
                <span>Extremely likely</span>
              </div>

              {/* Reasons */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Let us know the reasons for your score
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-[#317FA4] hover:bg-[#EAF4F8] transition-colors flex items-center gap-2">
                    Jobs on Sabkaplacement are not relevant for me
                    <span className="text-gray-400">+</span>
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-[#317FA4] hover:bg-[#EAF4F8] transition-colors flex items-center gap-2">
                    Sabkaplacement is difficult to use
                    <span className="text-gray-400">+</span>
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-[#317FA4] hover:bg-[#EAF4F8] transition-colors flex items-center gap-2">
                    Too many Emails/Notifications
                    <span className="text-gray-400">+</span>
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-[#317FA4] hover:bg-[#EAF4F8] transition-colors flex items-center gap-2">
                    No relevant calls from recruiters
                    <span className="text-gray-400">+</span>
                  </button>
                </div>
              </div>

              {/* Suggestions Text Area */}
              <div className="mb-4">
                <textarea
                  placeholder="Any suggestions to improve?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  rows="3"
                ></textarea>
                <div className="text-right text-xs text-gray-500 mt-1">500 Character(s) Left</div>
              </div>

              {/* Submit Button */}
              <button className="px-6 py-2.5 bg-gray-300 text-gray-500 rounded-full text-sm font-semibold cursor-not-allowed">
                Submit
              </button>
            </div>

            {/* Video Section - HQLTech */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 rounded-xl shadow-xl overflow-hidden mb-6">
              <div className="flex items-center p-6">
                {/* Left Content */}
                <div className="flex-1 pr-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#317FA4] text-white text-xs font-bold rounded-full">
                      HQLTech
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-white text-2xl font-bold">HQLTech</span>
                    <span className="text-white text-xl">? 3.4</span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3">We stand by We</h3>
                  <a 
                    href="https://www.youtube.com/watch?v=ignMhwDEVfU" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-semibold text-sm"
                  >
                    Learn more ?
                  </a>
                </div>

                {/* Right Video Thumbnail */}
                <div className="flex-shrink-0 w-64 h-40 relative rounded-lg overflow-hidden shadow-lg">
                  <a 
                    href="https://www.youtube.com/watch?v=ignMhwDEVfU" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <img 
                      src="https://img.youtube.com/vi/ignMhwDEVfU/mqdefault.jpg" 
                      alt="HQLTech Video" 
                      className="w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-purple-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Top Companies Section - Sabkaplacement Style */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6">
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-gray-900">Top companies</h3>
                  <Link to="/companies" className="text-[#317FA4] hover:text-[#1e293b] font-medium text-sm">
                    View all
                  </Link>
                </div>
                <p className="text-xs text-gray-600">
                  <span className="text-[#317FA4] font-medium">Hiring for Data Science & Analytics</span>
                  <span className="mx-1">�</span>
                  <span className="text-gray-500">Other</span>
                </p>
              </div>

              <div className="p-5 relative">
                {/* Navigation Arrows */}
                <button
                  onClick={scrollCompaniesLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all border border-gray-200"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={scrollCompaniesRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all border border-gray-200"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div ref={companiesScrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth">
                  {/* Pfizer Card */}
                  <div className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xl">P</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Pfizer</h4>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-orange-500 text-sm">?</span>
                        <span className="text-sm font-semibold text-gray-700">3.9</span>
                        <span className="text-xs text-gray-500">2.1K+ reviews</span>
                      </div>
                      <Link 
                        to="/companies" 
                        className="w-full px-4 py-1.5 text-[#317FA4] border border-[#317FA4] rounded-full text-sm font-medium hover:bg-[#EAF4F8] transition-colors"
                      >
                        View jobs
                      </Link>
                    </div>
                  </div>

                  {/* ADP Private Limited Card */}
                  <div className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xl">ADP</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">ADP Private Limited</h4>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-orange-500 text-sm">?</span>
                        <span className="text-sm font-semibold text-gray-700">3.9</span>
                        <span className="text-xs text-gray-500">3.8K+ reviews</span>
                      </div>
                      <Link 
                        to="/companies" 
                        className="w-full px-4 py-1.5 text-[#317FA4] border border-[#317FA4] rounded-full text-sm font-medium hover:bg-[#EAF4F8] transition-colors"
                      >
                        View jobs
                      </Link>
                    </div>
                  </div>

                  {/* ZS Card */}
                  <div className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xl">ZS</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">ZS</h4>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-orange-500 text-sm">?</span>
                        <span className="text-sm font-semibold text-gray-700">3.1</span>
                        <span className="text-xs text-gray-500">2.7K+ reviews</span>
                      </div>
                      <Link 
                        to="/companies" 
                        className="w-full px-4 py-1.5 text-[#317FA4] border border-[#317FA4] rounded-full text-sm font-medium hover:bg-[#EAF4F8] transition-colors"
                      >
                        View jobs
                      </Link>
                    </div>
                  </div>

                  {/* TCS Card */}
                  <div className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xl">TCS</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Tata Consultancy Services</h4>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-orange-500 text-sm">?</span>
                        <span className="text-sm font-semibold text-gray-700">4.1</span>
                        <span className="text-xs text-gray-500">1.2M+ reviews</span>
                      </div>
                      <Link 
                        to="/companies" 
                        className="w-full px-4 py-1.5 text-[#317FA4] border border-[#317FA4] rounded-full text-sm font-medium hover:bg-[#EAF4F8] transition-colors"
                      >
                        View jobs
                      </Link>
                    </div>
                  </div>

                  {/* Wipro Card */}
                  <div className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">WIP</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Wipro</h4>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-orange-500 text-sm">?</span>
                        <span className="text-sm font-semibold text-gray-700">3.9</span>
                        <span className="text-xs text-gray-500">890K+ reviews</span>
                      </div>
                      <Link 
                        to="/companies" 
                        className="w-full px-4 py-1.5 text-[#317FA4] border border-[#317FA4] rounded-full text-sm font-medium hover:bg-[#EAF4F8] transition-colors"
                      >
                        View jobs
                      </Link>
                    </div>
                  </div>

                  {/* Infosys Card */}
                  <div className="flex-shrink-0 w-48 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">INF</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Infosys</h4>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-orange-500 text-sm">?</span>
                        <span className="text-sm font-semibold text-gray-700">4.0</span>
                        <span className="text-xs text-gray-500">750K+ reviews</span>
                      </div>
                      <Link 
                        to="/companies" 
                        className="w-full px-4 py-1.5 text-[#317FA4] border border-[#317FA4] rounded-full text-sm font-medium hover:bg-[#EAF4F8] transition-colors"
                      >
                        View jobs
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stay updated with our blogs Section - Sabkaplacement Style */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6">
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Stay updated with our blogs</h3>
                  <Link to="/resources" className="text-[#317FA4] hover:text-[#1e293b] font-medium text-sm">
                    View all
                  </Link>
                </div>
              </div>

              <div className="p-5 relative">
                {/* Navigation Arrows */}
                <button
                  onClick={scrollBlogsLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all border border-gray-200"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={scrollBlogsRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all border border-gray-200"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div ref={blogsScrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 scroll-smooth">
                  {/* Blog Card 1 */}
                  <div className="flex-shrink-0 w-72 cursor-pointer hover:shadow-lg transition-all rounded-lg">
                    <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-t-lg h-40 flex items-center justify-center p-6">
                      <div className="text-center">
                        <h4 className="text-2xl font-bold text-pink-600 mb-2">WHAT</h4>
                        <h5 className="text-xl font-bold text-pink-600">WOMEN</h5>
                        <p className="text-sm text-pink-700 mt-2">PROFESSIONALS WANT</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-b-lg border border-t-0 border-gray-200">
                      <h4 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">
                        50% women hide marriage & maternity plans amid bias fears
                      </h4>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#317FA4] font-medium">Sabkaplacement blog</span>
                        <span className="text-gray-400">�</span>
                        <span className="text-gray-500">6 Mar 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Blog Card 2 */}
                  <div className="flex-shrink-0 w-72 cursor-pointer hover:shadow-lg transition-all rounded-lg">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-t-lg h-40 flex items-center justify-center p-6">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">??</div>
                        <h4 className="text-lg font-bold">IT Hiring Shows</h4>
                        <p className="text-sm">Meaningful Recovery...</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-b-lg border border-t-0 border-gray-200">
                      <h4 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">
                        Sabkaplacement JobSpeak: IT Hiring Shows Meaningful Recovery...
                      </h4>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#47AEC7] font-medium">Sabkaplacement blog</span>
                        <span className="text-gray-400">�</span>
                        <span className="text-gray-500">4 Mar 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Blog Card 3 */}
                  <div className="flex-shrink-0 w-72 cursor-pointer hover:shadow-lg transition-all rounded-lg">
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-t-lg h-40 flex items-center justify-center p-6">
                      <div className="text-center text-white">
                        <h4 className="text-lg font-bold mb-2">Career Advice from 18</h4>
                        <p className="text-sm">Indian Women Leaders</p>
                        <p className="text-xs mt-2">Lessons on Growth...</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-b-lg border border-t-0 border-gray-200">
                      <h4 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">
                        Career Advice from 18 Indian Women Leaders Lessons on Growth...
                      </h4>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#47AEC7] font-medium">Sabkaplacement blog</span>
                        <span className="text-gray-400">�</span>
                        <span className="text-gray-500">26 Feb 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Blog Card 4 */}
                  <div className="flex-shrink-0 w-72 cursor-pointer hover:shadow-lg transition-all rounded-lg">
                    <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-t-lg h-40 flex items-center justify-center p-6">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">??</div>
                        <h4 className="text-lg font-bold">Job Market Trends</h4>
                        <p className="text-sm">2026 Insights</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-b-lg border border-t-0 border-gray-200">
                      <h4 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">
                        Job Market Trends 2026: What Job Seekers Need to Know
                      </h4>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#47AEC7] font-medium">Sabkaplacement blog</span>
                        <span className="text-gray-400">�</span>
                        <span className="text-gray-500">22 Feb 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Blog Card 5 */}
                  <div className="flex-shrink-0 w-72 cursor-pointer hover:shadow-lg transition-all rounded-lg">
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-t-lg h-40 flex items-center justify-center p-6">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">??</div>
                        <h4 className="text-lg font-bold">Resume Tips</h4>
                        <p className="text-sm">Stand Out from Crowd</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-b-lg border border-t-0 border-gray-200">
                      <h4 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">
                        10 Resume Tips to Help You Stand Out from the Competition
                      </h4>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#47AEC7] font-medium">Sabkaplacement blog</span>
                        <span className="text-gray-400">�</span>
                        <span className="text-gray-500">18 Feb 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;


