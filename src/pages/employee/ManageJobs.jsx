import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import EmployeeFooter from '../../components/EmployeeFooter'
import { getCompanyApplications, getCompanyJobs } from '../../services/companyApi'
import { deleteJob, updateJob } from '../../services/jobsApi'

const statusStyle = {
  Active: { bg: '#F0FDF4', color: '#16A34A', dot: '#16A34A' },
  Paused: { bg: '#FFFBEB', color: '#D97706', dot: '#D97706' },
  Closed: { bg: '#F3F4F6', color: '#6B7280', dot: '#9CA3AF' },
}

export default function ManageJobs() {
  const [jobs, setJobs] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const filteredJobs = filter === 'All' ? jobs : jobs.filter(j => j.status === filter)
  const activeCount = useMemo(() => jobs.filter((j) => j.status === 'Active').length, [jobs])
  const pausedCount = useMemo(() => jobs.filter((j) => j.status === 'Paused').length, [jobs])

  const loadJobs = async () => {
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
      const mapped = (jobsData || []).map((job) => ({
        id: job._id,
        title: job.title || 'Untitled Job',
        company: job.companyId?.companyName || '',
        location: job.location || 'N/A',
        type: job.jobType || 'Full-time',
        applicants: appCountByJob[job._id] || 0,
        status: job.status === 'Pending' ? 'Paused' : job.status,
        posted: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently',
      }))
      setJobs(mapped)
    } catch (err) {
      setError(err.message || 'Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteJob(id)
      setJobs((prev) => prev.filter((j) => j.id !== id))
    } catch (err) {
      setError(err.message || 'Failed to delete job')
    } finally {
      setDeleteId(null)
    }
  }

  const toggleStatus = async (id) => {
    const current = jobs.find((j) => j.id === id)
    if (!current) return
    const next = current.status === 'Active' ? 'Closed' : 'Active'
    try {
      const updated = await updateJob(id, { status: next })
      setJobs((prev) => prev.map((j) => (
        j.id === id
          ? { ...j, status: updated.status === 'Pending' ? 'Paused' : updated.status }
          : j
      )))
    } catch (err) {
      setError(err.message || 'Failed to update job status')
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f9fc] flex flex-col">
      <EmployeeNavbar />

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

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#317FA4] via-[#317FA4] to-[#3385AA] rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-20 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Job Management</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Manage Jobs</h1>
              <p className="text-white/70 text-sm mt-1">Track, edit, and manage all your posted job listings.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-white/10 rounded-xl px-3 sm:px-4 py-2 text-center border border-white/20">
                  <p className="text-white font-black text-lg sm:text-xl leading-none">{activeCount}</p>
                  <p className="text-white/60 text-[10px] sm:text-xs mt-0.5">Active</p>
                </div>
                <div className="bg-white/10 rounded-xl px-3 sm:px-4 py-2 text-center border border-white/20">
                  <p className="text-white font-black text-lg sm:text-xl leading-none">{pausedCount}</p>
                  <p className="text-white/60 text-[10px] sm:text-xs mt-0.5">Paused</p>
                </div>
                <div className="bg-white/10 rounded-xl px-3 sm:px-4 py-2 text-center border border-white/20">
                  <p className="text-white font-black text-lg sm:text-xl leading-none">{jobs.length}</p>
                  <p className="text-white/60 text-[10px] sm:text-xs mt-0.5">Total</p>
                </div>
              </div>
              <Link to="/employee/post-job"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#317FA4] text-sm font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Post New Job
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        {jobs.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            {['All', 'Active', 'Paused'].map(f => {
              const count = f === 'All' ? jobs.length : jobs.filter(j => j.status === f).length
              return (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    filter === f ? 'bg-[#317FA4] text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-200 hover:border-[#3385AA] hover:text-[#3385AA]'
                  }`}>
                  {f}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    filter === f ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>{count}</span>
                </button>
              )
            })}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-16 text-center">
            <p className="text-sm text-gray-500">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-16 text-center">
            <div className="w-16 h-16 bg-[#eaf4f8] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#3385AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#317FA4] mb-2">No Jobs Posted Yet</h3>
            <p className="text-sm text-gray-500 mb-6">Start hiring by posting your first job listing.</p>
            <Link to="/employee/post-job"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#317FA4] to-[#3385AA] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {error && <p className="px-6 pt-4 text-sm text-red-500">{error}</p>}
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#317FA4]">{filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} {filter === 'All' ? 'Posted' : `(${filter})`}</h2>
            </div>
            {/* Mobile card view */}
            <div className="md:hidden divide-y divide-gray-100">
              {filteredJobs.map(job => {
                const s = statusStyle[job.status] || statusStyle.Closed
                return (
                  <div key={job.id} className="p-4 border-l-4" style={{ borderLeftColor: s.color }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#317FA4] to-[#3385AA] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {job.title.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">{job.title}</p>
                          <p className="text-xs text-gray-400">{job.company}</p>
                        </div>
                      </div>
                      <button onClick={() => toggleStatus(job.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 hover:opacity-80 transition-opacity"
                        style={{ background: s.bg, color: s.color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                        {job.status}
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="text-xs text-gray-500">{job.location}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{job.type}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs font-bold text-[#3385AA]">{job.applicants} applicants</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{job.posted}</span>
                    </div>
                    <div className="flex justify-end mt-3">
                      <button onClick={() => setDeleteId(job.id)}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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
                    <th className="px-4 py-3 text-center">Applicants</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Posted</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredJobs.map(job => {
                    const s = statusStyle[job.status] || statusStyle.Closed
                    return (
                      <tr key={job.id} className="hover:bg-gray-50/80 transition-colors border-l-4" style={{ borderLeftColor: s.color }}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#317FA4] to-[#3385AA] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {job.title.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{job.title}</p>
                              <p className="text-xs text-gray-400">{job.company}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{job.location}</td>
                        <td className="px-4 py-4 text-gray-600">{job.type}</td>
                        <td className="px-4 py-4 text-center font-bold text-[#3385AA]">{job.applicants}</td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => toggleStatus(job.id)}
                            className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ background: s.bg, color: s.color }}
                            title="Click to toggle status">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                            {job.status}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-center text-xs text-gray-500">{job.posted}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => setDeleteId(job.id)} title="Delete"
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
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
      </main>
      <EmployeeFooter />
    </div>
  )
}
