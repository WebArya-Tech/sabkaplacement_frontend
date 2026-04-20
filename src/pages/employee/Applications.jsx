import { useEffect, useState } from 'react'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'
import { getCompanyApplications, updateCompanyApplicationStatus } from '../../services/companyApi'

const badgeClass = {
  New: 'bg-blue-100 text-blue-700',
  Applied: 'bg-blue-100 text-blue-700',
  Pending: 'bg-amber-100 text-amber-700',
  Selected: 'bg-emerald-100 text-emerald-700',
  Shortlisted: 'bg-emerald-100 text-emerald-700',
  Rejected: 'bg-rose-100 text-rose-700',
}

export default function Applications() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadApps() {
      try {
        const data = await getCompanyApplications()
        setApps(data || [])
      } catch (err) {
        console.error("Failed to load apps", err)
      } finally {
        setLoading(false)
      }
    }
    loadApps()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await updateCompanyApplicationStatus(id, status)
      setApps(apps.map(a => a._id === id ? { ...a, status } : a))
    } catch (err) {
      alert("Failed to update status")
    }
  }

  const pendingCount = apps.filter(a => a.status === 'Applied' || a.status === 'Pending').length
  const selectedCount = apps.filter(a => a.status === 'Selected' || a.status === 'Shortlisted').length
  const rejectedCount = apps.filter(a => a.status === 'Rejected').length

  const viewResume = (url) => {
    if (!url) return
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <EmployeeNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="rounded-3xl border border-[#d6eaf2] bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-black text-[#317FA4]">Applications for My Jobs</h1>
          <p className="mt-2 text-sm text-gray-600">Review incoming applications for your job posts.</p>
          
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#fff7e8] p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Pending</p>
              <p className="mt-2 text-3xl font-bold text-[#317FA4]">{pendingCount}</p>
            </div>
            <div className="rounded-2xl bg-[#ebfbf2] p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Shortlisted</p>
              <p className="mt-2 text-3xl font-bold text-[#317FA4]">{selectedCount}</p>
            </div>
            <div className="rounded-2xl bg-[#fff0f2] p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-700">Rejected</p>
              <p className="mt-2 text-3xl font-bold text-[#317FA4]">{rejectedCount}</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-gray-500">Loading applications...</p>
            ) : apps.length === 0 ? (
              <p className="text-gray-500">No applications received yet.</p>
            ) : (
              apps.map((application) => {
                const candidateName = application.candidateId?.fullName || 'Candidate'
                return (
                  <article key={application._id} className="rounded-2xl border border-[#d6eaf2] bg-[#fbfdff] p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-bold text-[#317FA4]">{candidateName}</h2>
                        <p className="text-sm text-[#317FA4]">{application.jobId?.title || 'Job'}</p>
                        <p className="mt-2 text-xs text-gray-500">
                          <button onClick={() => viewResume(application.resume)} className="inline-flex items-center gap-1 text-[#317FA4] hover:text-blue-700 font-semibold px-3 py-1.5 bg-[#eaf4f8] rounded-lg transition-colors border border-[#d6eaf2]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            View Resume
                          </button>
                        </p>
                        <p className="mt-2 text-xs text-gray-500">Applied on {new Date(application.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass[application.status] || badgeClass.New}`}>
                          {application.status}
                        </span>
                        <select 
                          className="text-xs border rounded p-1"
                          value={application.status} 
                          onChange={(e) => handleStatusChange(application._id, e.target.value)}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </article>
                )
              })
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
