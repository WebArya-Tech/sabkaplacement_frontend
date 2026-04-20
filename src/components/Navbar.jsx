import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Jobs', path: '/jobs' },
  { label: 'Companies', path: '/companies' },
  { label: 'Forum', path: '/forum' },
  { label: 'Blog', path: '/blog' },
]

const proItems = [
  {
    title: 'Resume Builder',
    subtitle: 'Build your professional resume',
    to: '/resume/builder',
    iconBg: '#e8f2fb',
    iconEl: (
      <svg width="18" height="18" fill="none" stroke="#317FA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    title: 'Job Tracker',
    subtitle: 'Track your applications',
    to: '/application',
    iconBg: '#ede9fe',
    iconEl: (
      <svg width="18" height="18" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    title: 'Interview Prep',
    subtitle: 'Prepare for interviews',
    to: '/pro/interview-preparation',
    iconBg: '#fff3e8',
    iconEl: (
      <svg width="18" height="18" fill="none" stroke="#ea6c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    title: 'Career Insights',
    subtitle: 'Get personalized insights',
    to: '/pro/career-insights',
    iconBg: '#dcfce7',
    iconEl: (
      <svg width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    title: 'Salary Calculator',
    subtitle: 'Know your worth',
    to: '/pro/salary-calculator',
    iconBg: '#fef3c7',
    iconEl: (
      <svg width="18" height="18" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v2m0 8v2m-4-6h8M9.5 9.5C9.5 8.12 10.62 7 12 7s2.5 1.12 2.5 2.5c0 2.5-5 2.5-5 5 0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5"/>
      </svg>
    ),
  },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [proOpen, setProOpen] = useState(false)
  const [employerOpen, setEmployerOpen] = useState(false)
  const [candidateOpen, setCandidateOpen] = useState(false)
  const [trainerOpen, setTrainerOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('profile')
    window.location.href = '/'
  }

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

        {/* Logo � bigger size */}
        <Link to="/" className="cursor-pointer">
          <img src="/logo.jpeg" alt="Sabka Placement" className="h-14 w-auto object-contain rounded-md" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link to={item.path} className="text-gray-700 font-semibold text-sm hover:text-[#3385AA] transition-colors cursor-pointer">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <div
            className="relative"
            onMouseEnter={() => setProOpen(true)}
            onMouseLeave={() => setProOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProOpen((p) => !p)}
              className="px-3 py-2 text-sm font-semibold text-[#317FA4] hover:text-[#3385AA] transition-colors"
            >
              Sabkaplacement Pro
            </button>

            <div className={`absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-3 transition-all duration-150 z-50 ${proOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`}>
              <h3 className="text-sm font-bold text-[#317FA4]">Sabkaplacement Pro</h3>
              <p className="text-xs text-gray-500 mb-2">Your personalized career assistant</p>
              <div className="flex flex-col gap-1">
                {proItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    onClick={() => setProOpen(false)}
                    className="rounded-lg px-3 py-2 hover:bg-[#f1f8fc] transition-colors flex items-center gap-3"
                  >
                    <span style={{ width:34, height:34, borderRadius:9, background:item.iconBg, display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{item.iconEl}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setEmployerOpen(true)}
            onMouseLeave={() => setEmployerOpen(false)}
          >
            <button
              type="button"
              onClick={() => setEmployerOpen((p) => !p)}
              className="px-4 py-2 text-sm font-semibold text-[#3385AA] border border-[#3385AA] rounded-lg hover:bg-[#3385AA] hover:text-white transition-colors flex items-center gap-1"
            >
              Employer
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-50 transition-all duration-150 ${employerOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`}>
              {/* Employer Portal heading with icon */}
              <div className="flex items-center gap-2 px-3 py-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3385AA] to-[#317FA4] flex items-center justify-center shadow-sm flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h1v11H4V10zm6 0h1v11h-1V10zm5 0h1v11h-1V10zm5 0h1v11h-1V10z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-[#3385AA] uppercase tracking-wider">Employer Portal</p>
              </div>

              <Link
                to="/employee/login"
                onClick={() => setEmployerOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#f1f8fc] transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e8f4f9] to-[#d0eaf5] flex items-center justify-center group-hover:from-[#3385AA] group-hover:to-[#317FA4] transition-all shadow-sm">
                  <svg className="w-4 h-4 text-[#3385AA] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-[#3385AA] transition-colors">Employer Login</p>
                  <p className="text-xs text-gray-500">Sign in to your account</p>
                </div>
              </Link>

              <Link
                to="/employee/register"
                onClick={() => setEmployerOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#f1f8fc] transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e8f4f9] to-[#d0eaf5] flex items-center justify-center group-hover:from-[#3385AA] group-hover:to-[#317FA4] transition-all shadow-sm">
                  <svg className="w-4 h-4 text-[#3385AA] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-[#3385AA] transition-colors">Employer Register</p>
                  <p className="text-xs text-gray-500">Create your company account</p>
                </div>
              </Link>

            </div>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setCandidateOpen(true)}
            onMouseLeave={() => setCandidateOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCandidateOpen((p) => !p)}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#3385AA] rounded-lg hover:bg-[#317FA4] transition-colors flex items-center gap-1"
            >
              {token && user?.role === 'candidate' ? user.name : 'Candidates'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-50 transition-all duration-150 ${candidateOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5">Candidate Portal</p>
              
              {token && user?.role === 'candidate' ? (
                <>
                  <Link
                    to="/user/dashboard"
                    onClick={() => setCandidateOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#f1f8fc] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#e8f4f9] flex items-center justify-center group-hover:bg-[#3385AA] transition-colors">
                      <svg className="w-4 h-4 text-[#3385AA] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Dashboard</p>
                  </Link>
                  <Link
                    to="/user/profile"
                    onClick={() => setCandidateOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#f1f8fc] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#e8f4f9] flex items-center justify-center group-hover:bg-[#3385AA] transition-colors">
                      <svg className="w-4 h-4 text-[#3385AA] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">My Profile</p>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-red-50 transition-colors group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                      <svg className="w-4 h-4 text-red-500 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600">Logout</p>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setCandidateOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#f1f8fc] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#e8f4f9] flex items-center justify-center group-hover:bg-[#3385AA] transition-colors">
                      <svg className="w-4 h-4 text-[#3385AA] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Candidate Login</p>
                      <p className="text-xs text-gray-500">Sign in to your account</p>
                    </div>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setCandidateOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#f1f8fc] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#e8f4f9] flex items-center justify-center group-hover:bg-[#3385AA] transition-colors">
                      <svg className="w-4 h-4 text-[#3385AA] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Candidate Register</p>
                      <p className="text-xs text-gray-500">Create your free account</p>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Trainer Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTrainerOpen(true)}
            onMouseLeave={() => setTrainerOpen(false)}
          >
            <button
              type="button"
              onClick={() => setTrainerOpen((p) => !p)}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#3385AA] rounded-lg hover:bg-[#317FA4] transition-colors flex items-center gap-1"
            >
              Trainers
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-50 transition-all duration-150 ${trainerOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5">Trainer Portal</p>
              <Link
                to="/trainer/login"
                onClick={() => setTrainerOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#f1f8fc] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#e8f4f9] flex items-center justify-center group-hover:bg-[#3385AA] transition-colors">
                  <svg className="w-4 h-4 text-[#3385AA] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Trainer Login</p>
                  <p className="text-xs text-gray-500">Access your panel</p>
                </div>
              </Link>
              <Link
                to="/trainer/register"
                onClick={() => setTrainerOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-[#f1f8fc] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#e8f4f9] flex items-center justify-center group-hover:bg-[#3385AA] transition-colors">
                  <svg className="w-4 h-4 text-[#3385AA] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Trainer Register</p>
                  <p className="text-xs text-gray-500">Join as a trainer</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Hamburger - Mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
          className="lg:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block w-5 h-0.5 bg-gray-700" />
          <span className="block w-5 h-0.5 bg-gray-700" />
          <span className="block w-5 h-0.5 bg-gray-700" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-4">
          <ul className="list-none m-0 p-0 flex flex-col gap-3">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-semibold text-sm hover:text-[#3385AA] transition-colors cursor-pointer"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-gray-200 p-3 bg-[#f8fbfd]">
            <h3 className="text-sm font-bold text-[#317FA4]">Sabkaplacement Pro</h3>
            <p className="text-xs text-gray-500 mb-2">Your personalized career assistant</p>
            <div className="flex flex-col gap-1">
              {proItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-2 hover:bg-white transition-colors flex items-center gap-3"
                >
                  <span style={{ width:34, height:34, borderRadius:9, background:item.iconBg, display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{item.iconEl}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>

          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Employer</p>
            <Link
              to="/employee/login"
              onClick={() => setMenuOpen(false)}
              className="text-center px-4 py-2 text-sm font-semibold text-[#3385AA] border border-[#3385AA] rounded-lg hover:bg-[#3385AA] hover:text-white transition-colors"
            >
              Employer Login
            </Link>
            <Link
              to="/employee/register"
              onClick={() => setMenuOpen(false)}
              className="text-center px-4 py-2 text-sm font-semibold text-[#3385AA] border border-[#3385AA] rounded-lg hover:bg-[#3385AA] hover:text-white transition-colors"
            >
              Employer Register
            </Link>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Candidates</p>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-center px-4 py-2 text-sm font-semibold text-white bg-[#3385AA] rounded-lg hover:bg-[#317FA4] transition-colors"
            >
              Candidate Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="text-center px-4 py-2 text-sm font-semibold text-white bg-[#3385AA] rounded-lg hover:bg-[#317FA4] transition-colors"
            >
              Candidate Register
            </Link>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Trainers</p>
            <Link
              to="/trainer/login"
              onClick={() => setMenuOpen(false)}
              className="text-center px-4 py-2 text-sm font-semibold text-white bg-[#3385AA] rounded-lg hover:bg-[#317FA4] transition-colors"
            >
              Trainer Login
            </Link>
            <Link
              to="/trainer/register"
              onClick={() => setMenuOpen(false)}
              className="text-center px-4 py-2 text-sm font-semibold text-[#3385AA] border border-[#3385AA] rounded-lg hover:bg-[#3385AA] hover:text-white transition-colors"
            >
              Trainer Register
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
