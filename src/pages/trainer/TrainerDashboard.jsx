import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TrainerNavbar from '../../components/TrainerNavbar'
import Footer from '../../components/EmployeeFooter'
import { getTrainerProfile } from '../../services/trainerApi'

export default function TrainerDashboard() {
  const [tab, setTab] = useState('courses')
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getTrainerProfile()
      .then((data) => {
        setProfile(data)
        console.log("Trainer Profile Data:", data) // Added console log
      })
      .catch((err) => setError(err.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  const stats = useMemo(() => {
    const courses = Array.isArray(profile?.courses) ? profile.courses : []
    const students = Array.isArray(profile?.students) ? profile.students : []
    const dashboardStats = profile?.dashboardStats || {}
    const videosUploaded = courses.reduce((acc, c) => acc + (Number(c.videos) || 0), 0)
    const pendingReviews = Math.max(
      0,
      courses.reduce((acc, c) => acc + (Number(c.assignments) || 0), 0) -
        students.reduce((acc, s) => acc + (Number(s.assignmentsDone) || 0), 0)
    )

    return [
      { label: 'Total Courses', value: dashboardStats.totalCourses ?? courses.length },
      { label: 'Total Students', value: dashboardStats.totalStudents ?? students.length },
      { label: 'Videos Uploaded', value: dashboardStats.videosUploaded ?? videosUploaded },
      { label: 'Pending Reviews', value: dashboardStats.pendingReviews ?? pendingReviews },
    ]
  }, [profile])

  const recentCourses = Array.isArray(profile?.courses) ? profile.courses.slice(0, 6) : []
  const recentStudents = Array.isArray(profile?.students) ? profile.students.slice(0, 6) : []

  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <TrainerNavbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#317FA4] via-[#2f7898] to-[#266888] py-8 px-4 animate-rise-in">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Trainer Dashboard</h1>
            <p className="text-white/70 text-sm">{profile?.fullName ? `Welcome back, ${profile.fullName}!` : "Welcome back! Here's your teaching overview."}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/trainer/courses"
              className="px-4 py-2.5 bg-white text-[#317FA4] hover:bg-[#eaf4f8] text-sm font-bold rounded-xl transition-colors shadow-lg btn-pop-hover">
              + New Course
            </Link>
            <Link to="/trainer/students"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors border border-white/20 btn-pop-hover">
              View Students
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Stat Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {stats.map((s, idx) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#d6eaf2] card-lift-hover animate-rise-in" style={{ animationDelay: `${idx * 90}ms` }}>
              <p className="text-2xl font-black text-[#317FA4]">{Number(s.value) || 0}</p>
              <p className="text-xs font-bold text-gray-600 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1 border border-[#d6eaf2] shadow-sm w-full sm:w-fit mb-6">
          {['courses', 'students'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-sm font-bold capitalize transition-colors btn-pop-hover ${tab === t ? 'bg-[#317FA4] text-white shadow-sm' : 'text-gray-500 hover:text-[#317FA4]'}`}>
              {t === 'courses' ? 'My Courses' : 'Recent Students'}
            </button>
          ))}
        </div>

        {/* Courses Tab */}
        {tab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentCourses.map(c => (
              <div key={c._id || c.title} className="bg-white rounded-2xl p-5 shadow-sm border border-[#d6eaf2] card-lift-hover animate-rise-in">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-bold text-[#317FA4] text-sm">{c.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">{c.students} students</span>
                      <span className="text-xs text-gray-500">{c.videos} videos</span>
                    </div>
                  </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${c.status === 'Active' ? 'bg-[#d0eaf5] text-[#317FA4]' : 'bg-amber-100 text-amber-700'}`}>
                    {c.status || 'Draft'}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link to="/trainer/courses" className="flex-1 text-center text-xs font-bold py-2 bg-[#eaf4f8] text-[#317FA4] rounded-xl hover:bg-[#d6eaf2] transition-colors btn-pop-hover">
                    Manage
                  </Link>
                  <Link to="/trainer/students" className="flex-1 text-center text-xs font-bold py-2 bg-[#eef7fb] text-[#317FA4] rounded-xl hover:bg-[#d6eaf2] transition-colors btn-pop-hover">
                    Students
                  </Link>
                </div>
              </div>
            ))}
            {!loading && !error && recentCourses.length === 0 && <p className="text-sm text-gray-500">No courses available yet.</p>}
          </div>
        )}

        {/* Students Tab */}
        {tab === 'students' && (
          <div className="space-y-3">
            {recentStudents.map(s => (
              <div key={s._id || s.email || s.name} className="bg-white rounded-2xl p-4 shadow-sm border border-[#d6eaf2] flex items-center gap-4 card-lift-hover animate-rise-in">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#317FA4] to-[#266888] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 animate-soft-float">
                  {(s.name || 'NA').split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#317FA4]">{s.name}</p>
                  <p className="text-xs text-gray-500 truncate">{s.course}</p>
                </div>

              </div>
            ))}
            {!loading && !error && recentStudents.length === 0 && <p className="text-sm text-gray-500">No students available yet.</p>}
            <div className="text-center pt-2">
              <Link to="/trainer/students" className="text-sm font-bold text-[#317FA4] hover:underline">
                View all students &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Quick Upload Section */}
        <div className="mt-8 bg-gradient-to-r from-[#317FA4] to-[#266888] rounded-2xl p-6 text-white animate-rise-in">
          <h3 className="font-black text-lg mb-1">Quick Upload</h3>
          <p className="text-white/80 text-sm mb-4">Add content to your courses right away</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Upload Video', icon: '🎥', to: '/trainer/courses' },
              { label: 'Upload Notes', icon: '📄', to: '/trainer/courses' },
              { label: 'Add Assignment', icon: '📝', to: '/trainer/courses' },
            ].map(action => (
              <Link key={action.label} to={action.to}
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-3 transition-colors btn-pop-hover">
                <span className="text-xl">{action.icon}</span>
                <span className="text-sm font-bold">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {loading && <div className="max-w-7xl mx-auto px-4 pb-4 text-sm text-gray-500">Loading trainer data...</div>}
      {error && <div className="max-w-7xl mx-auto px-4 pb-4 text-sm text-red-500">{error}</div>}
      <Footer />
    </div>
  )
}
