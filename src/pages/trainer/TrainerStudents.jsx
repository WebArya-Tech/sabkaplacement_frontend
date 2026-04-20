import { useEffect, useMemo, useState } from 'react'
import TrainerNavbar from '../../components/TrainerNavbar'
import Footer from '../../components/EmployeeFooter'
import { getTrainerProfile } from '../../services/trainerApi'

export default function TrainerStudents() {
  const [allStudents, setAllStudents] = useState([])
  const [search, setSearch]             = useState('')
  const [filterCourse, setFilterCourse] = useState('All Courses')
  const [filterStatus, setFilterStatus] = useState('All')
  const [selected, setSelected]         = useState(null)
  const [sortBy, setSortBy]             = useState('name')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getTrainerProfile()
      .then((profile) => setAllStudents(Array.isArray(profile.students) ? profile.students : []))
      .catch((err) => setError(err.message || 'Failed to load students'))
      .finally(() => setLoading(false))
  }, [])

  const courses = useMemo(() => {
    const unique = [...new Set(allStudents.map((s) => s.course).filter(Boolean))]
    return ['All Courses', ...unique]
  }, [allStudents])

  const filtered = allStudents
    .filter(s => {
      const q = search.toLowerCase()
      if (q && !s.name.toLowerCase().includes(q) && !s.email.toLowerCase().includes(q)) return false
      if (filterCourse !== 'All Courses' && s.course !== filterCourse) return false
      if (filterStatus !== 'All' && s.status !== filterStatus) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'progress') return b.progress - a.progress
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  const progressColor = (p) => p >= 80 ? 'from-[#3385AA] to-green-500' : p >= 50 ? 'from-blue-400 to-[#3385AA]' : p >= 30 ? 'from-amber-400 to-orange-500' : 'from-red-400 to-rose-500'
  const statusBadge   = (s) => s === 'Active' ? 'bg-[#d0eaf5] text-[#317FA4]' : s === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'

  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <TrainerNavbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#317FA4] via-[#2f7898] to-[#266888] py-7 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">My Students</h1>
          <p className="text-white/70 text-sm">{allStudents.length} enrolled students &middot; Track progress & engagement</p>
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-[540px] mx-auto">
            {[
              { label: 'Total Students', val: allStudents.length },
              { label: 'Active', val: allStudents.filter(s => s.status === 'Active').length },
              { label: 'Completed', val: allStudents.filter(s => s.status === 'Completed').length },
            ].map(stat => (
              <div key={stat.label} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-6 text-center min-w-[120px]">
                <p className="text-3xl leading-none font-black text-white">{stat.val}</p>
                <p className="text-white/80 text-xs font-semibold mt-2 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
            </svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all" />
          </div>
          <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 bg-white w-full sm:w-auto">
            {courses.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 bg-white w-full sm:w-auto">
            {['All','Active','Inactive','Completed'].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 bg-white w-full sm:w-auto">
            <option value="name">Sort: Name</option>
            <option value="progress">Sort: Progress</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Student List */}
          <div className="flex-1 space-y-3">
            <p className="text-sm text-gray-500 mb-2">Showing <span className="font-bold text-[#317FA4]">{filtered.length}</span> students</p>
            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl border border-[#d6eaf2] p-12 text-center">
                <p className="text-3xl mb-2">👥</p>
                <p className="text-gray-500 text-sm">No students match your filters.</p>
              </div>
            )}
            {filtered.map(s => (
              <div key={s.id} onClick={() => setSelected(sel => sel?.id === s.id ? null : s)}
                className={`bg-white rounded-2xl border shadow-sm p-4 cursor-pointer hover:shadow-md transition-all ${selected?.id === s.id ? 'border-[#3385AA] shadow-[#d0eaf5]' : 'border-[#d6eaf2]'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#307CA0] to-[#307CA0] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {(s.name || 'NA').split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-[#317FA4]">{s.name}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadge(s.status)}`}>{s.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{s.course}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Enrolled: {s.enrolled}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-lg font-black text-[#317FA4]">{s.progress}%</p>
                    <p className="text-[10px] text-gray-400">completed</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full bg-gradient-to-r ${progressColor(s.progress)} transition-all`} style={{ width: `${s.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Student Detail Panel */}
          {selected && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm overflow-hidden lg:sticky lg:top-24">
                <div className="bg-[#317DA0] p-5 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-black">
                      {(selected.name || 'NA').split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <button onClick={() => setSelected(null)} className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                  <h3 className="font-black text-lg">{selected.name}</h3>
                  <p className="text-white/80 text-xs">{selected.email}</p>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Current Course</p>
                    <p className="text-sm font-bold text-[#317FA4]">{selected.course}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Enrolled on {selected.enrolled}</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Overall Progress</p>
                      <span className={`text-xs font-black ${selected.progress >= 70 ? 'text-[#3385AA]' : selected.progress >= 40 ? 'text-amber-600' : 'text-red-600'}`}>{selected.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full bg-gradient-to-r ${progressColor(selected.progress)}`} style={{ width: `${selected.progress}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Videos', val: selected.videosWatched, icon: '🎥', color: 'bg-purple-50 text-purple-700' },
                      { label: 'Notes', val: selected.notesDownloaded, icon: '📄', color: 'bg-blue-50 text-blue-700' },
                      { label: 'Tasks', val: selected.assignmentsDone, icon: '✅', color: 'bg-[#eaf4f9] text-[#317FA4]' },
                    ].map(stat => (
                      <div key={stat.label} className={`${stat.color} rounded-xl p-2.5 text-center`}>
                        <p className="text-base">{stat.icon}</p>
                        <p className="text-base font-black">{stat.val}</p>
                        <p className="text-[10px] font-semibold opacity-80">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-2.5 bg-[#307CA0] text-white text-sm font-bold rounded-xl hover:bg-[#246080] transition-all shadow-md">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading && <div className="max-w-7xl mx-auto px-4 pb-4 text-sm text-gray-500">Loading students...</div>}
      {error && <div className="max-w-7xl mx-auto px-4 pb-4 text-sm text-red-500">{error}</div>}
      <Footer />
    </div>
  )
}
