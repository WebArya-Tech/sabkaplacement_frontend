import { useState } from 'react'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'

const allCandidates = [
  {
    id: 1, name: 'Aarav Sharma', role: 'Frontend Developer', location: 'Bangalore',
    experience: '3 years', salary: '₹12–16 LPA', skills: ['React', 'JavaScript', 'Tailwind'],
    education: 'B.Tech CSE — IIT Delhi', avatar: '/boy.png', available: true, match: 94,
    about: 'Passionate frontend dev with 3 yrs of React experience. Open to hybrid/remote roles.',
  },
  {
    id: 2, name: 'Priya Singh', role: 'Backend Engineer', location: 'Hyderabad',
    experience: '4 years', salary: '₹14–18 LPA', skills: ['Node.js', 'MongoDB', 'AWS'],
    education: 'B.Tech IT — NIT Trichy', avatar: '/girl.png', available: true, match: 89,
    about: 'Backend engineer specialising in scalable APIs and cloud deployments.',
  },
  {
    id: 3, name: 'Rohan Verma', role: 'UI/UX Designer', location: 'Remote',
    experience: '2 years', salary: '₹8–12 LPA', skills: ['Figma', 'Adobe XD', 'CSS'],
    education: 'B.Des — NID Ahmedabad', avatar: '/boy.png', available: false, match: 81,
    about: 'Creative designer focused on user-centric product design and motion.',
  },
  {
    id: 4, name: 'Nikita Rao', role: 'Data Scientist', location: 'Pune',
    experience: '5 years', salary: '₹18–24 LPA', skills: ['Python', 'ML', 'TensorFlow'],
    education: 'M.Tech Data Science — IISc', avatar: '/girl1.png', available: true, match: 87,
    about: 'Data scientist with expertise in ML pipelines and predictive analytics.',
  },
  {
    id: 5, name: 'Karan Mehta', role: 'DevOps Engineer', location: 'Mumbai',
    experience: '4 years', salary: '₹16–22 LPA', skills: ['Docker', 'Kubernetes', 'CI/CD'],
    education: 'B.Tech Electronics — BITS Pilani', avatar: '/boy.png', available: true, match: 85,
    about: 'DevOps specialist streamlining deployments with container orchestration.',
  },
  {
    id: 6, name: 'Sneha Gupta', role: 'Product Manager', location: 'Delhi',
    experience: '6 years', salary: '₹22–30 LPA', skills: ['Roadmapping', 'Analytics', 'Agile'],
    education: 'MBA — IIM Ahmedabad', avatar: '/girl.png', available: true, match: 91,
    about: 'PM with a track record of shipping 0→1 products in fintech & edtech.',
  },
  {
    id: 7, name: 'Arjun Patel', role: 'Full Stack Developer', location: 'Bangalore',
    experience: '3 years', salary: '₹13–17 LPA', skills: ['React', 'Node.js', 'PostgreSQL'],
    education: 'B.Tech CSE — VIT Vellore', avatar: '/boy.png', available: false, match: 78,
    about: 'Full stack developer with hands-on experience in MERN and SQL databases.',
  },
  {
    id: 8, name: 'Meera Iyer', role: 'HR Recruiter', location: 'Chennai',
    experience: '5 years', salary: '₹10–14 LPA', skills: ['Talent Acquisition', 'HRMS', 'Interviewing'],
    education: 'MBA HR — Symbiosis Pune', avatar: '/girl1.png', available: true, match: 83,
    about: 'Experienced HR professional specialising in tech hiring and employer branding.',
  },
]

const expOptions = ['Any', '0–1 yr', '1–3 yrs', '3–5 yrs', '5+ yrs']
const locationOptions = ['Any', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune', 'Chennai', 'Remote']

export default function EmployerCV() {
  const [search, setSearch] = useState('')
  const [expFilter, setExpFilter] = useState('Any')
  const [locFilter, setLocFilter] = useState('Any')
  const [availFilter, setAvailFilter] = useState(false)
  const [contactedId, setContactedId] = useState(null)
  const [savedIds, setSavedIds] = useState([])

  const toggle = (id) => setSavedIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id])

  const filtered = allCandidates.filter((c) => {
    const q = search.toLowerCase()
    const matchQ = !q || c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q))
    const matchLoc = locFilter === 'Any' || c.location === locFilter
    const matchExp = expFilter === 'Any' || (() => {
      const yrs = parseInt(c.experience)
      if (expFilter === '0–1 yr') return yrs <= 1
      if (expFilter === '1–3 yrs') return yrs >= 1 && yrs <= 3
      if (expFilter === '3–5 yrs') return yrs >= 3 && yrs <= 5
      if (expFilter === '5+ yrs') return yrs >= 5
      return true
    })()
    const matchAvail = !availFilter || c.available
    return matchQ && matchLoc && matchExp && matchAvail
  })

  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <div className="pointer-events-none fixed -left-24 top-28 h-72 w-72 rounded-full bg-[#cdeefa]/40 blur-3xl z-0" />
      <div className="pointer-events-none fixed right-0 top-60 h-64 w-64 rounded-full bg-[#e3d9ff]/30 blur-3xl z-0" />

      <EmployeeNavbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#317FA4] to-[#1a5577]">
        <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none select-none">
          <img src="/Resume.png" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-white/15 border border-white/25 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest mb-5">
              CV &amp; RESUME SEARCH
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
              Find Your Next<br />
              <span className="text-[#7dd3f0]">Great Hire — Fast</span>
            </h1>
            <p className="text-[#b8dff0] text-base mb-10 max-w-md font-medium">
              8 lakh+ verified profiles. Filter by skills & experience.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { v: `${filtered.length} M`, label: 'Profiles' },
                { v: '8L+', label: 'CVs' },
                { v: '2.4K+', label: 'Skills' },
                { v: '24hr', label: 'Response' },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-3 py-2 text-center">
                  <p className="text-white font-extrabold text-base leading-none">{s.v}</p>
                  <p className="text-[#a8d8f0] text-[10px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10">

        {/* ── SEARCH + FILTERS ── */}
        <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-lg p-5 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search */}
            <div className="flex items-center gap-2 flex-1 border border-[#d6eaf2] rounded-xl px-4 py-3 focus-within:border-[#3385AA] focus-within:ring-4 focus-within:ring-[#dff1f8] transition-all bg-[#f7fcff]">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, role, or skill…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400"
              />
            </div>

            {/* Experience */}
            <select
              value={expFilter}
              onChange={(e) => setExpFilter(e.target.value)}
              className="border border-[#d6eaf2] rounded-xl px-4 py-3 text-sm text-gray-700 bg-[#f7fcff] outline-none focus:border-[#3385AA] focus:ring-4 focus:ring-[#dff1f8] transition-all"
            >
              {expOptions.map((o) => <option key={o}>{o}</option>)}
            </select>

            {/* Location */}
            <select
              value={locFilter}
              onChange={(e) => setLocFilter(e.target.value)}
              className="border border-[#d6eaf2] rounded-xl px-4 py-3 text-sm text-gray-700 bg-[#f7fcff] outline-none focus:border-[#3385AA] focus:ring-4 focus:ring-[#dff1f8] transition-all"
            >
              {locationOptions.map((o) => <option key={o}>{o}</option>)}
            </select>

            {/* Available toggle */}
            <button
              onClick={() => setAvailFilter((p) => !p)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-all flex-shrink-0 whitespace-nowrap ${
                availFilter ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' : 'bg-[#f7fcff] text-gray-600 border-[#d6eaf2] hover:border-[#3385AA]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${availFilter ? 'bg-white' : 'bg-emerald-400'}`} />
              Available Now
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-gray-500">
              Showing <span className="font-semibold text-[#317FA4]">{filtered.length}</span> of {allCandidates.length} profiles
            </p>
            <button
              onClick={() => { setSearch(''); setExpFilter('Any'); setLocFilter('Any'); setAvailFilter(false) }}
              className="text-xs font-semibold text-[#3385AA] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* ── CANDIDATE GRID ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-[#317FA4]">No candidates found</h3>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm hover:shadow-xl hover:border-[#3385AA]/40 transition-all group flex flex-col overflow-hidden"
              >
                {/* Top gradient bar */}
                <div className="h-1.5 bg-gradient-to-r from-[#317FA4] via-[#3385AA] to-[#7dd3f0]" />

                <div className="p-5 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#d6eaf2] group-hover:border-[#3385AA] transition-colors shadow-sm"
                        />
                        {c.available && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Available" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-[#317FA4] leading-tight">{c.name}</h3>
                        <p className="text-xs text-gray-500">{c.role}</p>
                      </div>
                    </div>
                    {/* Save / Bookmark */}
                    <button
                      onClick={() => toggle(c.id)}
                      className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${savedIds.includes(c.id) ? 'text-[#3385AA] bg-[#eaf4f8]' : 'text-gray-300 hover:text-[#3385AA] hover:bg-[#eaf4f8]'}`}
                      title={savedIds.includes(c.id) ? 'Unsave' : 'Save profile'}
                    >
                      <svg className="w-4 h-4" fill={savedIds.includes(c.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>

                  {/* Match score */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Match Score</span>
                      <span className={`text-xs font-extrabold ${c.match >= 90 ? 'text-emerald-600' : c.match >= 80 ? 'text-[#3385AA]' : 'text-amber-500'}`}>{c.match}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${c.match >= 90 ? 'bg-emerald-500' : c.match >= 80 ? 'bg-[#3385AA]' : 'bg-amber-400'}`}
                        style={{ width: `${c.match}%` }}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{c.location}</span>
                      <span className="mx-1 text-gray-300">·</span>
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{c.experience}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold text-[#317FA4]">{c.salary}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-2">{c.education}</p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.skills.map((sk) => (
                      <span key={sk} className="text-[10px] font-semibold bg-[#eaf4f8] text-[#3385AA] px-2 py-0.5 rounded-full border border-[#c9e3ed]">
                        {sk}
                      </span>
                    ))}
                  </div>

                  {/* About */}
                  <p className="text-[11px] text-gray-500 line-clamp-2 mb-4 flex-1">{c.about}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => setContactedId(c.id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        contactedId === c.id
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-[#317FA4] text-white hover:bg-[#317FA4] shadow-sm hover:shadow-md'
                      }`}
                    >
                      {contactedId === c.id ? '✓ Contacted' : 'Contact Now'}
                    </button>
                    <button className="px-3 py-2 rounded-xl text-xs font-bold border border-[#d6eaf2] text-gray-600 hover:border-[#3385AA] hover:text-[#3385AA] hover:bg-[#f0f8fc] transition-all">
                      View CV
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SAVED PROFILES BANNER ── */}
        {savedIds.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-[#317FA4] text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur">
              <svg className="w-4 h-4 text-[#7dd3f0]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {savedIds.length} profile{savedIds.length > 1 ? 's' : ''} saved
              <button onClick={() => setSavedIds([])} className="ml-2 text-white/50 hover:text-white text-xs">Clear</button>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  )
}
