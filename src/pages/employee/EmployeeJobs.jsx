import { useEffect, useState } from 'react'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'
import { getCompanyJobs } from '../../services/companyApi'

export default function EmployeeJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCompanyJobs()
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || 'Failed to load jobs'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <EmployeeNavbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#317FA4] mb-5">Employee Jobs</h1>
        {loading && <p className="text-sm text-gray-500">Loading jobs...</p>}
        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
        {!loading && !error && jobs.length === 0 && <p className="text-sm text-gray-500">No jobs posted yet.</p>}
        <div className="grid md:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <article key={job._id} className="bg-white border border-[#d6eaf2] rounded-xl p-5 shadow-sm">
              <h2 className="font-bold text-[#317FA4]">{job.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{job.location || 'Location not specified'}</p>
              <p className="text-sm text-gray-600 mt-1">
                Applicants: {Array.isArray(job.applications) ? job.applications.length : 0}
              </p>
              <span className="inline-block mt-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#eaf4f8] text-[#3385AA]">
                {job.status || 'Active'}
              </span>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
