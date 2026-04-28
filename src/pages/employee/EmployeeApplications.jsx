import { useEffect, useState } from 'react'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'
import { getCompanyApplications, updateCompanyApplicationStatus } from '../../services/companyApi'

const statusOptions = ['Applied', 'Seen', 'Reviewing', 'Shortlisted', 'Rejected']

export default function EmployeeApplications() {
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCompanyApplications()
      .then((data) => setApplicants(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || 'Failed to load applications'))
      .finally(() => setLoading(false))
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateCompanyApplicationStatus(id, status)
      setApplicants((prev) => prev.map((a) => (a._id === id ? { ...a, status: updated.status || status } : a)))
    } catch (err) {
      setError(err.message || 'Failed to update status')
    }
  }

  const handleViewResume = (item) => {
    window.open(item.resume, '_blank')
    // If status is 'Seen' or 'Applied', update it to 'Reviewing'
    if (item.status === 'Applied' || item.status === 'Seen') {
      handleStatusChange(item._id, 'Reviewing')
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <EmployeeNavbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#317FA4] mb-5">Employee Applications</h1>
        {loading && <p className="text-sm text-gray-500">Loading applications...</p>}
        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
        {!loading && !error && applicants.length === 0 && <p className="text-sm text-gray-500">No applications yet.</p>}
        <div className="grid md:grid-cols-3 gap-4">
          {applicants.map((item) => (
            <article key={item._id} className="bg-white border border-[#d6eaf2] rounded-xl p-5 shadow-sm">
              <p className="text-base font-bold text-[#317FA4]">{item.candidateId?.fullName || 'Candidate'}</p>
              <p className="text-sm text-gray-600 mt-1">Role: {item.jobId?.title || 'Job'}</p>
              {item.resume && (
                <button
                  onClick={() => handleViewResume(item)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#317FA4] hover:text-[#42AFCA] bg-[#eaf4f8] px-3 py-1.5 rounded-lg border border-[#d6eaf2] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Resume
                </button>
              )}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Status</span>
                <select
                  value={item.status || 'Applied'}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#eaf4f8] text-[#3385AA] border border-[#d6eaf2]"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
