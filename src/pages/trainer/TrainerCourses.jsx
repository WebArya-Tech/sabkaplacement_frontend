import { useEffect, useState } from 'react'
import TrainerNavbar from '../../components/TrainerNavbar'
import Footer from '../../components/EmployeeFooter'
import { getTrainerProfile, updateTrainerProfile } from '../../services/trainerApi'

export default function TrainerCourses() {
  const [courses, setCourses] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [showNewCourse, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSubject, setNewSubject] = useState('')
  const [activeTab, setActiveTab] = useState('videos')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getTrainerProfile()
      .then((profile) => setCourses(Array.isArray(profile.courses) ? profile.courses : []))
      .catch((err) => setError(err.message || 'Failed to load courses'))
      .finally(() => setLoading(false))
  }, [])

  const persistCourses = async (nextCourses) => {
    setSaving(true)
    setError('')
    try {
      await updateTrainerProfile({ courses: nextCourses })
      setCourses(nextCourses)
    } catch (err) {
      setError(err.message || 'Failed to update courses')
    } finally {
      setSaving(false)
    }
  }

  const incrementContent = async (courseId, key) => {
    const next = courses.map((course) =>
      (course._id || course.title) === courseId ? { ...course, [key]: (Number(course[key]) || 0) + 1 } : course
    )
    await persistCourses(next)
  }

  const addCourse = async () => {
    if (!newTitle || !newSubject) return
    const nextCourses = [...courses, {
      title: newTitle,
      subject: newSubject,
      students: 0,
      videos: 0,
      notes: 0,
      assignments: 0,
      status: 'Draft',
    }]
    await persistCourses(nextCourses)
    setNewTitle('')
    setNewSubject('')
    setShowNew(false)
  }

  const selectedCourse = courses.find((course) => (course._id || course.title) === selectedCourseId) || null

  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <TrainerNavbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#317FA4] via-[#2f7898] to-[#266888] py-7 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">My Courses</h1>
            <p className="text-white/70 text-sm">{courses.length} courses &middot; Upload videos, notes & assignments</p>
          </div>
          <button onClick={() => setShowNew(true)}
            className="self-start sm:self-auto px-4 py-2 bg-white text-[#317FA4] text-sm font-black rounded-xl hover:bg-[#eef7fb] transition-colors shadow-lg btn-pop-hover">
            + Create New Course
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* New Course Form */}
        {showNewCourse && (
          <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm p-5 mb-6">
            <h3 className="text-sm font-bold text-[#317FA4] mb-4">Create New Course</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Course Title *</label>
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Python for Data Science"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Subject *</label>
                <select value={newSubject} onChange={e => setNewSubject(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] bg-white transition-all">
                  <option value="">Select subject</option>
                  {['Web Development','Data Science','UI/UX Design','Digital Marketing','Java / Backend','Python','Cloud Computing','Cybersecurity'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={addCourse} className="px-5 py-2 bg-gradient-to-r from-[#3385AA] to-[#317FA4] text-white text-sm font-bold rounded-xl hover:from-[#3385AA] hover:to-[#317FA4] transition-all shadow-md">
                Create Course
              </button>
              <button onClick={() => setShowNew(false)} className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {loading && <p className="text-sm text-gray-500">Loading courses...</p>}
        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
        <div className={`grid gap-4 ${selectedCourse ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
          <div className={`${selectedCourse ? 'xl:col-span-1' : 'md:col-span-2'} grid grid-cols-1 sm:grid-cols-2 gap-4 content-start`}>
            {courses.map(course => (
              <div key={course._id || course.title}
                onClick={() => setSelectedCourseId((course._id || course.title) === selectedCourseId ? null : (course._id || course.title))}
                className={`bg-white rounded-2xl border shadow-sm p-8 cursor-pointer transition-all hover:shadow-md ${selectedCourse && (selectedCourse._id || selectedCourse.title) === (course._id || course.title) ? 'border-[#3385AA] shadow-[#d0eaf5]' : 'border-[#d6eaf2]'}`}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${course.status === 'Active' ? 'bg-[#d0eaf5] text-[#317FA4]' : 'bg-amber-100 text-amber-700'}`}>
                      {course.status}
                    </span>
                    <h3 className="font-black text-[#317FA4] text-xl mt-3 mb-1">{course.title}</h3>
                    <p className="text-base text-gray-500">{course.subject}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Videos', val: course.videos, color: 'text-purple-600', bg: 'bg-purple-50', icon: '🎥' },
                    { label: 'Notes', val: course.notes, color: 'text-blue-600', bg: 'bg-blue-50', icon: '📄' },
                    { label: 'Tasks', val: course.assignments, color: 'text-orange-600', bg: 'bg-orange-50', icon: '📝' },
                  ].map(s => (
                    <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center flex flex-col items-center`}>
                      <span className="text-2xl mb-1">{s.icon}</span>
                      <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                      <p className="text-xs text-gray-500 font-semibold mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Upload buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'videos', label: '🎥 Video' },
                    { key: 'notes', label: '📄 Notes' },
                    { key: 'assignments', label: '📝 Task' },
                  ].map(type => (
                    <button key={type.key} onClick={e => { e.stopPropagation(); incrementContent(course._id || course.title, type.key) }}
                      disabled={saving}
                      className={`py-2 text-xs font-bold rounded-xl transition-colors ${
                        type.key === 'videos' ? 'bg-purple-50 text-purple-700 hover:bg-purple-100' :
                        type.key === 'notes' ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' :
                        'bg-orange-50 text-orange-700 hover:bg-orange-100'
                      }`}>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {!loading && courses.length === 0 && <p className="text-sm text-gray-500">No courses found. Create one to start.</p>}
          </div>

          {/* Course Detail Panel */}
          {selectedCourse && (
            <div className="xl:col-span-2 bg-white rounded-2xl border border-[#d6eaf2] shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#3385AA] to-[#317FA4] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-black text-lg">{selectedCourse.title}</h2>
                    <p className="text-white/80 text-sm">{selectedCourse.subject} &middot; {selectedCourse.students} students enrolled</p>
                  </div>
                    <button onClick={() => setSelectedCourseId(null)} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex gap-1 bg-gray-50 rounded-xl p-1 mb-5 w-fit">
                  {['videos','notes','assignments'].map(t => (
                    <button key={t} onClick={() => setActiveTab(t)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${activeTab === t ? 'bg-white text-[#317FA4] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      {t}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {activeTab === 'videos' && Array.from({ length: Math.min(selectedCourse.videos, 4) }, (_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">Lecture {i + 1} — Module {i + 1}</p>
                        <p className="text-xs text-gray-500">12:30 &middot; Uploaded 2 days ago</p>
                      </div>
                      <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Published</span>
                    </div>
                  ))}
                  {activeTab === 'notes' && Array.from({ length: Math.min(selectedCourse.notes, 4) }, (_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">Chapter {i + 1} Notes</p>
                        <p className="text-xs text-gray-500">PDF &middot; 2.{i + 1} MB</p>
                      </div>
                      <button className="text-[10px] font-bold text-blue-700 hover:underline">Download</button>
                    </div>
                  ))}
                  {activeTab === 'assignments' && Array.from({ length: Math.min(selectedCourse.assignments, 4) }, (_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">Assignment {i + 1}</p>
                        <p className="text-xs text-gray-500">Due: April {14 + i}, 2026 &middot; {Math.floor(Math.random() * 20) + 5} submissions</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${i === 0 ? 'bg-red-100 text-red-700' : 'bg-[#d0eaf5] text-[#317FA4]'}`}>
                        {i === 0 ? 'Pending review' : 'Graded'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <button onClick={() => incrementContent(selectedCourse._id || selectedCourse.title, activeTab)}
                    disabled={saving}
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#3385AA] to-[#317FA4] text-white text-xs font-bold rounded-xl hover:from-[#3385AA] hover:to-[#317FA4] transition-all shadow-md">
                    {saving ? 'Saving...' : `+ Upload ${activeTab === 'videos' ? 'Video' : activeTab === 'notes' ? 'Notes' : 'Assignment'}`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
