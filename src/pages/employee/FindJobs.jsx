import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'

const jobCards = [
  {
    title: 'Frontend Developer',
    company: 'TechNova Labs',
    location: 'Noida',
    salary: '8-12 LPA',
    experience: '2-4 years',
    type: 'Full-time',
    skills: ['React', 'JavaScript', 'Tailwind'],
  },
  {
    title: 'Product Designer',
    company: 'PixelCraft',
    location: 'Bengaluru',
    salary: '10-16 LPA',
    experience: '3-5 years',
    type: 'Hybrid',
    skills: ['Figma', 'Design Systems', 'UX Research'],
  },
  {
    title: 'Backend Engineer',
    company: 'StackBridge',
    location: 'Pune',
    salary: '12-18 LPA',
    experience: '3-6 years',
    type: 'Remote',
    skills: ['Node.js', 'Express', 'MongoDB'],
  },
]

export default function FindJobs() {
  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <EmployeeNavbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="rounded-3xl border border-[#cfe6f1] bg-gradient-to-r from-[#317FA4] via-[#165677] to-[#317FA4] p-6 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d9eef8]">Find Jobs</p>
          <h1 className="mt-2 text-3xl font-black">Discover roles that match your profile</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#d9eef8]">Search by title, company or location and filter the results like a premium job portal.</p>
          <div className="mt-5 grid gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur md:grid-cols-[1.3fr_1fr_auto]">
            <input className="rounded-xl border border-white/20 bg-white px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400" placeholder="Job title, skill or company" />
            <input className="rounded-xl border border-white/20 bg-white px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400" placeholder="Location" />
            <button className="rounded-xl bg-[#317FA4] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0a2a40]">Search Jobs</button>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-[#d6eaf2] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-[#317FA4]">Filters</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Salary</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#eaf4f8] px-3 py-1 text-xs font-semibold text-[#317FA4]">5-10 LPA</span>
                    <span className="rounded-full bg-[#f3f6fb] px-3 py-1 text-xs font-semibold text-gray-600">10-20 LPA</span>
                    <span className="rounded-full bg-[#f3f6fb] px-3 py-1 text-xs font-semibold text-gray-600">20+ LPA</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Experience</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#eaf4f8] px-3 py-1 text-xs font-semibold text-[#317FA4]">0-2 years</span>
                    <span className="rounded-full bg-[#f3f6fb] px-3 py-1 text-xs font-semibold text-gray-600">2-5 years</span>
                    <span className="rounded-full bg-[#f3f6fb] px-3 py-1 text-xs font-semibold text-gray-600">5+ years</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Job Type</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#eaf4f8] px-3 py-1 text-xs font-semibold text-[#317FA4]">Full-time</span>
                    <span className="rounded-full bg-[#f3f6fb] px-3 py-1 text-xs font-semibold text-gray-600">Remote</span>
                    <span className="rounded-full bg-[#f3f6fb] px-3 py-1 text-xs font-semibold text-gray-600">Hybrid</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            {jobCards.map((job) => (
              <article key={`${job.company}-${job.title}`} className="rounded-2xl border border-[#d6eaf2] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#317FA4] to-[#165677] text-lg font-bold text-white">
                      {job.company[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#317FA4]">{job.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-[#317FA4]">{job.company}</p>
                      <p className="mt-1 text-sm text-gray-600">{job.location} • {job.experience} • {job.salary}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#ecf8ef] px-3 py-1 text-xs font-semibold text-emerald-700">{job.type}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-[#f4f7fb] px-3 py-1 text-xs font-medium text-gray-600">{skill}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-xl bg-[#317FA4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e293b]">Apply Now</button>
                  <button className="rounded-xl border border-[#d6eaf2] px-4 py-2 text-sm font-semibold text-[#317FA4] hover:bg-[#f8fbfd]">Save Job</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
