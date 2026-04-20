import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  approveCompany,
  approveTrainer,
  approveJob,
  getAdminDashboard,
  getPendingCompanies,
  getPendingJobs,
  getPendingTrainers,
  rejectCompany,
  rejectJob,
  rejectTrainer,
  deleteJob,
} from '../services/adminApi'

const getCompanyLogo = (company) => company?.logo || company?.company?.companyLogo || ''
const getCompanyCity = (company) => company?.location?.city || ''

const StatCard = ({ title, count }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="text-3xl font-bold text-[#317FA4] mb-1">{count}</div>
    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</div>
  </div>
)

export default function AdminPanel() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('companies')
  const [dashboard, setDashboard] = useState({ companies: 0, trainers: 0, jobs: 0 })
  const [pendingCompanies, setPendingCompanies] = useState([])
  const [pendingTrainers, setPendingTrainers] = useState([])
  const [pendingJobs, setPendingJobs] = useState([])
  const [companyRejectionRemarks, setCompanyRejectionRemarks] = useState({})
  const [trainerRejectionRemarks, setTrainerRejectionRemarks] = useState({})
  const [jobRejectionRemarks, setJobRejectionRemarks] = useState({})

  const refresh = async () => {
    try {
      const [companies, trainers, jobs, stats] = await Promise.all([
        getPendingCompanies(),
        getPendingTrainers(),
        getPendingJobs(),
        getAdminDashboard(),
      ])
      setPendingCompanies(companies || [])
      setPendingTrainers(trainers || [])
      setPendingJobs(jobs || [])
      setDashboard(stats || { companies: 0, trainers: 0, jobs: 0 })
    } catch (err) {
      console.error('Refresh failed:', err)
      setError(err.message || 'Failed to refresh data')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login?redirect=/panel4')
      return
    }

    const run = async () => {
      try {
        await refresh()
      } catch (err) {
        setError(err.message || 'Failed to load admin panel')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [navigate])

  const handleApproveCompany = async (companyId) => {
    try {
      await approveCompany(companyId)
      await refresh()
    } catch (err) {
      alert(err.message || 'Approval failed')
    }
  }

  const handleRejectCompany = async (companyId) => {
    try {
      const remarks = companyRejectionRemarks[companyId] || ''
      await rejectCompany(companyId, remarks)
      await refresh()
    } catch (err) {
      alert(err.message || 'Rejection failed')
    }
  }

  const handleApproveTrainer = async (trainerId) => {
    try {
      await approveTrainer(trainerId)
      await refresh()
    } catch (err) {
      alert(err.message || 'Approval failed')
    }
  }

  const handleRejectTrainer = async (trainerId) => {
    try {
      const remarks = trainerRejectionRemarks[trainerId] || ''
      await rejectTrainer(trainerId, remarks)
      await refresh()
    } catch (err) {
      alert(err.message || 'Rejection failed')
    }
  }

  const handleApproveJob = async (jobId) => {
    try {
      await approveJob(jobId)
      await refresh()
    } catch (err) {
      alert(err.message || 'Approval failed')
    }
  }

  const handleRejectJob = async (jobId) => {
    try {
      const remarks = jobRejectionRemarks[jobId] || ''
      await rejectJob(jobId, remarks)
      await refresh()
    } catch (err) {
      alert(err.message || 'Rejection failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="text-xl font-bold text-gray-600 animate-pulse">Loading admin panel...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-[#317FA4]">Admin Verification Panel</h1>
          <p className="text-gray-600 mt-2">Approve or reject pending employer (company), trainer, and job accounts.</p>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <section className="bg-white rounded-xl border border-gray-200">
          <div className="flex gap-2 p-3 border-b border-gray-100">
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'companies' ? 'bg-[#317FA4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending Employers
            </button>
            <button
              onClick={() => setActiveTab('trainers')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'trainers' ? 'bg-[#317FA4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending Trainers
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'jobs' ? 'bg-[#317FA4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending Jobs
            </button>
          </div>

          <div className="p-4">
            {dashboard && (
              <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-gray-50 border border-gray-100 p-4">
                  <div className="text-sm text-gray-500">Pending Companies</div>
                  <div className="text-xl font-bold text-gray-900">{pendingCompanies.length}</div>
                </div>
                <div className="rounded-lg bg-gray-50 border border-gray-100 p-4">
                  <div className="text-sm text-gray-500">Pending Trainers</div>
                  <div className="text-xl font-bold text-gray-900">{pendingTrainers.length}</div>
                </div>
                <div className="rounded-lg bg-gray-50 border border-gray-100 p-4">
                  <div className="text-sm text-gray-500">Active Jobs</div>
                  <div className="text-xl font-bold text-gray-900">{dashboard?.jobs?.active ?? 0}</div>
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <div>
                {pendingCompanies.length === 0 ? (
                  <div className="text-gray-600">No pending employers right now.</div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {pendingCompanies.map((company) => {
                      const logo = getCompanyLogo(company)
                      return (
                        <div key={company._id} className="rounded-xl border border-gray-200 bg-white p-4">
                          <div className="flex gap-4">
                            <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                              {logo ? (
                                <img src={logo} alt={company.companyName || 'Company'} className="w-full h-full object-cover" />
                              ) : (
                                <div className="text-sm font-bold text-gray-600">
                                  {(company.companyName || 'C').slice(0, 1).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-gray-900">{company.companyName || company.company?.companyName}</div>
                              <div className="text-sm text-gray-600 mt-1">{company.userId?.email || company.userId?.name || '—'}</div>
                              <div className="text-sm text-gray-500 mt-1">{getCompanyCity(company)} {company.industry ? `• ${company.industry}` : ''}</div>
                            </div>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <button
                              onClick={() => handleApproveCompany(company._id)}
                              className="flex-1 px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                            >
                              Approve
                            </button>
                            <div className="w-44">
                              <input
                                value={companyRejectionRemarks[company._id] || ''}
                                onChange={(e) => setCompanyRejectionRemarks((prev) => ({ ...prev, [company._id]: e.target.value }))}
                                placeholder="Rejection remarks"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                              />
                            </div>
                            <button
                              onClick={() => handleRejectCompany(company._id)}
                              className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'jobs' && (
              <div>
                {pendingJobs.length === 0 ? (
                  <div className="text-gray-600">No pending jobs right now.</div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {pendingJobs.map((job) => (
                      <div key={job._id} className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="font-bold text-gray-900 mb-2">{job.title}</div>
                        <div className="text-sm text-gray-600 mb-1">{job.company?.companyName || job.company?.companyName || 'Company'}</div>
                        <div className="text-sm text-gray-500 mb-2">{job.location}</div>
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => handleApproveJob(job._id)}
                            className="flex-1 px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectJob(job._id)}
                            className="flex-1 px-3 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this job permanently?')) {
                                deleteJob(job._id).then(refresh).catch(console.error)
                              }
                            }}
                            className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'trainers' && (
              <div>
                {pendingTrainers.length === 0 ? (
                  <div className="text-gray-600">No pending trainers right now.</div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {pendingTrainers.map((trainer) => (
                      <div key={trainer._id} className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="flex gap-4">
                          <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                            <div className="text-sm font-bold text-gray-600">
                              {(trainer.fullName || 'T').slice(0, 1).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-gray-900">{trainer.fullName}</div>
                            <div className="text-sm text-gray-600 mt-1">{trainer.email || '—'}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {trainer.instituteName} {trainer.specialization ? `• ${trainer.specialization}` : ''}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => handleApproveTrainer(trainer._id)}
                            className="flex-1 px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <div className="w-44">
                            <input
                              value={trainerRejectionRemarks[trainer._id] || ''}
                              onChange={(e) => setTrainerRejectionRemarks((prev) => ({ ...prev, [trainer._id]: e.target.value }))}
                              placeholder="Rejection remarks"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                            />
                          </div>
                          <button
                            onClick={() => handleRejectTrainer(trainer._id)}
                            className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
