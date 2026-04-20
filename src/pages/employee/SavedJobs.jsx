import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'

const savedJobs = [
  { title: 'React Developer', company: 'OrbitSoft', location: 'Remote', salary: '9-13 LPA' },
  { title: 'Data Analyst', company: 'InsightGrid', location: 'Gurugram', salary: '7-11 LPA' },
  { title: 'Product Manager', company: 'ScaleForge', location: 'Bengaluru', salary: '18-24 LPA' },
]

export default function SavedJobs() {
  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <EmployeeNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="rounded-3xl border border-[#d6eaf2] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-black text-[#317FA4]">Saved Jobs</h1>
              <p className="mt-2 text-sm text-gray-600">Keep your shortlisted opportunities ready and apply when you want.</p>
            </div>
            <span className="rounded-full bg-[#eaf4f8] px-4 py-2 text-sm font-semibold text-[#317FA4]">{savedJobs.length} jobs saved</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {savedJobs.map((job) => (
              <article key={`${job.company}-${job.title}`} className="rounded-2xl border border-[#d6eaf2] bg-[#fbfdff] p-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf4f8] text-lg font-bold text-[#317FA4]">
                  {job.company[0]}
                </div>
                <h2 className="mt-4 text-lg font-bold text-[#317FA4]">{job.title}</h2>
                <p className="mt-1 text-sm font-semibold text-[#317FA4]">{job.company}</p>
                <p className="mt-1 text-sm text-gray-600">{job.location} &middot; {job.salary}</p>
                <div className="mt-5 flex gap-3">
                  <button className="rounded-xl bg-[#317FA4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e293b]">Apply Now</button>
                  <button className="rounded-xl border border-[#d6eaf2] px-4 py-2 text-sm font-semibold text-[#317FA4] hover:bg-[#f8fbfd]">Remove</button>
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
