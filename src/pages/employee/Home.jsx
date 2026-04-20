import { Link } from 'react-router-dom'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'

const statCards = [
  { label: 'Recommended Jobs', value: '24', note: 'Matched for your profile' },
  { label: 'Applied Jobs', value: '12', note: '3 updated today' },
  { label: 'Saved Jobs', value: '8', note: 'Ready to apply' },
  { label: 'Alerts', value: '5', note: '2 new notifications' },
]

const recommendedJobs = [
  {
    title: 'Frontend Developer',
    description: 'TechNova Labs • Noida • 8-12 LPA',
    to: '/employee/find-jobs',
  },
  {
    title: 'Product Designer',
    description: 'PixelCraft • Bengaluru • Hybrid',
    to: '/employee/find-jobs',
  },
  {
    title: 'Backend Engineer',
    description: 'StackBridge • Pune • Remote',
    to: '/employee/find-jobs',
  },
]

export default function EmployeeHome() {
  return (
    <div className="min-h-screen bg-[#f5f9fc]">
      <EmployeeNavbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <section className="rounded-2xl border border-[#d5e8f1] bg-gradient-to-r from-[#317FA4] via-[#317FA4] to-[#317FA4] p-6 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8edf7]">Home</p>
          <h1 className="mt-2 text-3xl font-bold">Your personalized job search starts here</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#d8edf7]">
            Explore recommended jobs, track applications, save opportunities and keep your profile recruiter-ready.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/employee/find-jobs" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#317FA4] transition hover:bg-[#ecf7ff]">
              Find Jobs
            </Link>
            <Link to="/employee/profile" className="rounded-lg border border-white px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              Update Profile
            </Link>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => (
            <article key={item.label} className="rounded-xl border border-[#d5e8f1] bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-gray-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-[#317FA4]">{item.value}</p>
              <p className="mt-1 text-xs font-medium text-[#317FA4]">{item.note}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-[#d5e8f1] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#317FA4]">Recommended Jobs</h2>
              <Link to="/employee/find-jobs" className="text-sm font-semibold text-[#317FA4]">View all</Link>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {recommendedJobs.map((item) => (
              <Link key={item.title} to={item.to} className="rounded-xl border border-[#d5e8f1] p-4 transition hover:border-[#317FA4] hover:bg-[#f7fcff]">
                <h3 className="font-bold text-[#317FA4]">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                <p className="mt-3 text-sm font-semibold text-[#317FA4]">Quick Apply</p>
              </Link>
            ))}
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-[#d5e8f1] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-[#317FA4]">Profile Status</h2>
              <div className="mt-4">
                <div className="h-3 overflow-hidden rounded-full bg-[#e8eef4]">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#317FA4] to-[#56b8d8]" />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#317FA4]">78% complete</p>
                <p className="mt-1 text-sm text-gray-600">Add projects and resume to improve profile visibility.</p>
              </div>
            </section>

            <section className="rounded-2xl border border-[#d5e8f1] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-[#317FA4]">Alerts</h2>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <p>2 recruiters viewed your profile today.</p>
                <p>1 interview call waiting in notifications.</p>
                <p>5 new jobs match your skills.</p>
              </div>
            </section>

            <section className="rounded-2xl border border-[#d5e8f1] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-[#317FA4]">Quick Apply</h2>
              <p className="mt-2 text-sm text-gray-600">Apply faster to top matching roles in one click.</p>
              <Link to="/employee/find-jobs" className="mt-4 inline-flex rounded-xl bg-[#317FA4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e293b]">
                Start Applying
              </Link>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
