import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import EmployeeFooter from '../../components/EmployeeFooter'
import { getCompanyApplications, getCompanyJobs, updateCompanyApplicationStatus } from '../../services/companyApi'
import { deleteJob } from '../../services/jobsApi'

const statusStyle = {
  Active:  { bg: '#F0FDF4', color: '#16A34A', dot: '#16A34A' },
  Paused:  { bg: '#FFFBEB', color: '#D97706', dot: '#D97706' },
  Closed:  { bg: '#F3F4F6', color: '#6B7280', dot: '#9CA3AF' },
}

const appStyle = {
  New:        { bg: '#EFF6FF', color: '#2563EB' },
  Applied:    { bg: '#EFF6FF', color: '#2563EB' },
  Reviewed:   { bg: '#F5F3FF', color: '#7C3AED' },
  Shortlisted:{ bg: '#F0FDF4', color: '#16A34A' },
  Rejected:   { bg: '#FEF2F2', color: '#DC2626' },
}

export default function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [apps, setApps] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedApp, setSelectedApp] = useState(null)

  const totalApps = useMemo(() => jobs.reduce((s, j) => s + (j.applications || 0), 0), [jobs])
  const activeJobs = useMemo(() => jobs.filter((j) => j.status === 'Active').length, [jobs])

  const loadDashboard = async () => {
    setLoading(true)
    setError('')
    try {
      const [jobsData, appsData] = await Promise.all([getCompanyJobs(), getCompanyApplications()])
      const appCountByJob = (appsData || []).reduce((acc, app) => {
        const key = app.jobId?._id || ''
        if (!key) return acc
        acc[key] = (acc[key] || 0) + 1
        return acc
      }, {})

      const mappedJobs = (jobsData || []).map((job) => ({
        id: job._id,
        title: job.title || 'Untitled Job',
        location: job.location || 'N/A',
        type: job.jobType || 'Full-time',
        applications: appCountByJob[job._id] || 0,
        status: job.status === 'Pending' ? 'Paused' : job.status,
        posted: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently',
      }))

      const mappedApps = (appsData || []).map((app) => {
        const candidateName = app.candidateId?.fullName || 'Candidate'
          const candidate = app.candidateId || {}
        
        // Priority for resume: 
        // 1. Application-specific resume (the one they used when applying)
        // 2. Profile-wide resume
        const resumeUrl = app.resume || candidate.resume || ''
        
        return {
          id: app._id,
          name: candidateName,
          role: app.jobId?.title || 'Job Application',
          avatar: candidateName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
          exp: candidate.workExperience || 'N/A',
          location: candidate.location?.city || candidate.location?.state || 'N/A',
          time: app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'Recently',
          status: app.status === 'Applied' ? 'New' : app.status,
          resume: resumeUrl,
          email: candidate.email || 'N/A',
          phone: candidate.mobileNumber || 'N/A',
          skills: candidate.skills || [],
          education: candidate.education || {},
          summary: candidate.summary || '',
        }
      })

      setJobs(mappedJobs)
      setApps(mappedApps)
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteJob(id)
      setJobs((j) => j.filter((x) => x.id !== id))
    } catch (err) {
      setError(err.message || 'Failed to delete job')
    } finally {
      setDeleteId(null)
    }
  }
  const handleAppStatus = async (id, status) => {
    try {
      const backendStatus = status === 'New' ? 'Applied' : status
      await updateCompanyApplicationStatus(id, backendStatus)
      setApps((a) => a.map((x) => x.id === id ? { ...x, status } : x))
    } catch (err) {
      setError(err.message || 'Failed to update application status')
    }
  }

  const viewResume = (url) => {
    if (!url) return
    window.open(url, '_blank')
  }

  const stats = [
    {
      label: 'Jobs Posted', value: jobs.length, color: '#2563EB', bg: '#EFF6FF', tab: 'jobs',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    },
    {
      label: 'Active Jobs', value: activeJobs, color: '#16A34A', bg: '#F0FDF4', tab: 'jobs',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      label: 'Total Applicants', value: totalApps, color: '#7C3AED', bg: '#F5F3FF', tab: 'applications',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    },
    {
      label: 'Shortlisted', value: apps.filter(a => a.status === 'Shortlisted').length, color: '#D97706', bg: '#FFFBEB', tab: 'applications',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f4f9fc] flex flex-col">
      <EmployeeNavbar />

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-up">
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-[#317FA4] to-[#266888] text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
                  {selectedApp.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-none">{selectedApp.name}</h3>
                  <p className="text-sm text-white/80 mt-1">{selectedApp.role}</p>
                </div>
              </div>
              <button onClick={() => setSelectedApp(null)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 grid lg:grid-cols-2 gap-8">
              {/* Left Column: Details */}
              <div className="space-y-8">
                <section>
                  <h4 className="text-sm font-bold text-[#317FA4] uppercase tracking-widest mb-4">Candidate Information</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Email</p>
                      <p className="text-sm font-semibold text-gray-700 truncate" title={selectedApp.email}>{selectedApp.email !== 'N/A' ? selectedApp.email : 'No email available'}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Phone</p>
                      <p className="text-sm font-semibold text-gray-700">{selectedApp.phone !== 'N/A' ? selectedApp.phone : 'No phone available'}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Experience</p>
                      <p className="text-sm font-semibold text-gray-700">{selectedApp.exp}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Location</p>
                      <p className="text-sm font-semibold text-gray-700">{selectedApp.location}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-bold text-[#317FA4] uppercase tracking-widest mb-4">Professional Summary</h4>
                  <p className="text-sm text-gray-600 leading-relaxed bg-blue-50/30 p-5 rounded-2xl border border-blue-100/50">
                    {selectedApp.summary || 'No summary provided.'}
                  </p>
                </section>

                <section>
                  <h4 className="text-sm font-bold text-[#317FA4] uppercase tracking-widest mb-4">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.skills && selectedApp.skills.length > 0 ? (
                      selectedApp.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-[#eaf4f8] text-[#317FA4] text-xs font-bold rounded-lg border border-[#d6eaf2]">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">No skills listed.</p>
                    )}
                  </div>
                </section>
                
                <div className="pt-4 flex gap-3">
                  <button onClick={() => { handleAppStatus(selectedApp.id, 'Shortlisted'); setSelectedApp(null); }}
                    className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95">
                    Shortlist Candidate
                  </button>
                  <button onClick={() => { handleAppStatus(selectedApp.id, 'Rejected'); setSelectedApp(null); }}
                    className="flex-1 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-100 transition-all active:scale-95">
                    Reject
                  </button>
                </div>
              </div>

              {/* Right Column: Resume Viewer */}
              <div className="flex flex-col h-full min-h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[#317FA4] uppercase tracking-widest">Resume Preview</h4>
                  {selectedApp.resume && (
                    <div className="flex items-center gap-3">
                      <a href={selectedApp.resume} target="_blank" rel="noopener noreferrer" 
                        className="text-xs font-bold text-[#317FA4] hover:underline flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Full Screen
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden relative group min-h-[400px]">
                  {selectedApp.resume ? (
                    <div className="w-full h-full relative">
                      {/* Loading indicator */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 -z-10">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 border-4 border-[#317FA4]/20 border-t-[#317FA4] rounded-full animate-spin" />
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading Resume...</p>
                        </div>
                      </div>
                      
                      {/* Using a hybrid approach: direct iframe for PDFs, Google Viewer as fallback */}
                      <iframe 
                        src={selectedApp.resume.toLowerCase().includes('.pdf') || selectedApp.resume.includes('/image/upload/') 
                          ? selectedApp.resume 
                          : `https://docs.google.com/viewer?url=${encodeURIComponent(selectedApp.resume)}&embedded=true`
                        } 
                        className="w-full h-full border-none bg-white relative z-10"
                        title="Resume Preview"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                      <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <p className="font-bold text-sm">No resume available</p>
                      <p className="text-xs mt-1">The candidate has not uploaded a resume yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Delete Job?</h3>
            <p className="text-xs text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2 text-sm font-semibold bg-red-500 text-white rounded-xl hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {loading && <p className="mb-3 text-sm text-gray-500">Loading dashboard data...</p>}
        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#317FA4] via-[#2f7898] to-[#266888] rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden shadow-xl animate-rise-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-16 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 pointer-events-none" />
          <div className="absolute top-6 right-40 w-16 h-16 bg-white/5 rounded-full pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Employer Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Employer Dashboard</h1>
              <p className="text-white/70 text-sm mt-1">Welcome back! Here's what's happening with your jobs today.</p>
            </div>
            <Link to="/employee/post-job"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#317FA4] text-sm font-bold rounded-xl shadow-lg btn-pop-hover flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Post New Job
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, idx) => (
            <button key={s.label} onClick={() => setActiveTab(s.tab)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-5 text-left group overflow-hidden relative card-lift-hover animate-rise-in"
              style={{ animationDelay: `${idx * 90}ms` }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-300 group-hover:h-1.5" style={{ background: s.color }} />
              <div className="flex items-center justify-between mb-3 mt-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{ background: s.bg, color: s.color }}>
                  {s.icon}
                </div>
                <span className="text-xl sm:text-2xl font-black" style={{ color: s.color }}>{s.value}</span>
              </div>
              <p className="text-xs font-semibold text-gray-500 group-hover:text-gray-700 transition-colors">{s.label}</p>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5 mb-6 w-full sm:w-fit overflow-x-auto">
          {[['overview', 'Overview'], ['jobs', 'Jobs'], ['applications', 'Applications']].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all btn-pop-hover ${activeTab === key ? 'bg-[#317FA4] text-white shadow-sm' : 'text-gray-500 hover:text-[#317FA4] hover:bg-[#eaf4f8]'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Jobs */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-[#317FA4]">Recent Job Postings</h2>
                <button onClick={() => setActiveTab('jobs')} className="text-xs font-semibold text-[#317FA4] hover:underline">View all</button>
              </div>
              <div className="divide-y divide-gray-50">
                {jobs.slice(0, 3).map(job => {
                  const s = statusStyle[job.status] || statusStyle.Closed
                  return (
                    <div key={job.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors card-lift-hover">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#317FA4] to-[#266888] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 animate-soft-float">
                        {job.title.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{job.title}</p>
                        <p className="text-xs text-gray-400">{job.location} · {job.type}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs font-semibold text-gray-500">{job.applications} apps</span>
                        <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: s.bg, color: s.color }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                          {job.status}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recent Applicants */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-[#317FA4]">Recent Applicants</h2>
                <button onClick={() => setActiveTab('applications')} className="text-xs font-semibold text-[#317FA4] hover:underline">View all</button>
              </div>
              <div className="divide-y divide-gray-50">
                {apps.slice(0, 4).map(app => {
                  const s = appStyle[app.status] || appStyle.New
                  return (
                    <div key={app.id} onClick={() => setSelectedApp(app)} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors card-lift-hover cursor-pointer">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#317FA4] to-[#266888] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 animate-soft-float">
                        {app.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{app.name}</p>
                        <p className="text-xs text-gray-400 truncate">{app.role}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: s.bg, color: s.color }}>{app.status}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── JOBS TAB ── */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-[#317FA4]">All Job Postings</h2>
              <Link to="/employee/post-job" className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#317FA4] text-white text-xs font-bold rounded-xl transition-colors btn-pop-hover">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Post Job
              </Link>
            </div>
            {/* Mobile card view */}
            <div className="md:hidden divide-y divide-gray-50">
              {jobs.map(job => {
                const s = statusStyle[job.status] || statusStyle.Closed
                return (
                  <div key={job.id} className="p-4 card-lift-hover">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#317FA4] to-[#266888] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 animate-soft-float">
                          {job.title.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">{job.title}</p>
                          <p className="text-xs text-gray-400">{job.location} · {job.type}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: s.bg, color: s.color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />{job.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-[#317FA4] font-bold">{job.applications} applications</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setActiveTab('applications')} className="w-8 h-8 rounded-lg bg-[#eaf4f8] text-[#317FA4] flex items-center justify-center hover:bg-[#d6eaf2] transition-colors btn-pop-hover">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-[#f3f9fc] text-[#317FA4] flex items-center justify-center hover:bg-[#dff0f7] transition-colors btn-pop-hover">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button onClick={() => setDeleteId(job.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors btn-pop-hover">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Desktop table view */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3 text-left">Job Title</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-center">Apps</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {jobs.map(job => {
                    const s = statusStyle[job.status] || statusStyle.Closed
                    return (
                      <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#317FA4] to-[#266888] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 animate-soft-float">
                              {job.title.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{job.title}</p>
                              <p className="text-xs text-gray-400">{job.posted}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{job.location}</td>
                        <td className="px-4 py-4 text-gray-600">{job.type}</td>
                        <td className="px-4 py-4 text-center font-bold text-[#317FA4]">{job.applications}</td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: s.bg, color: s.color }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />{job.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => setActiveTab('applications')} title="View Applications"
                              className="w-8 h-8 rounded-lg bg-[#eaf4f8] text-[#317FA4] flex items-center justify-center hover:bg-[#d6eaf2] transition-colors btn-pop-hover">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                            <button title="Edit Job"
                              className="w-8 h-8 rounded-lg bg-[#f3f9fc] text-[#317FA4] flex items-center justify-center hover:bg-[#dff0f7] transition-colors btn-pop-hover">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button onClick={() => setDeleteId(job.id)} title="Delete Job"
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── APPLICATIONS TAB ── */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-[#317FA4]">All Applications</h2>
              <p className="text-xs text-gray-400 mt-0.5">{apps.length} total candidates</p>
            </div>
            <div className="divide-y divide-gray-50">
              {apps.map(app => {
                const s = appStyle[app.status] || appStyle.New
                return (
                  <div key={app.id} onClick={() => setSelectedApp(app)} className="flex flex-col gap-3 px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#3385AA] to-[#317FA4] flex items-center justify-center text-white text-sm font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
                        {app.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-gray-900 text-sm">{app.name}</p>
                        <p className="text-xs text-gray-500 truncate">{app.role} · {app.exp} · {app.location}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{app.time}</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full flex-shrink-0" style={{ background: s.bg, color: s.color }}>{app.status}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pl-[52px]">
                      <button onClick={(e) => { e.stopPropagation(); handleAppStatus(app.id, 'Shortlisted'); }}
                        className="px-3 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                        Shortlist
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleAppStatus(app.id, 'Rejected'); }}
                        className="px-3 py-1.5 text-xs font-bold bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                        Reject
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedApp(app); }} className="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        View Profile & Resume
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </main>
      <EmployeeFooter />
    </div>
  )
}
