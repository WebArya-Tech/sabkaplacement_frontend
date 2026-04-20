import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'

const candidates = [
  { name: 'Aarav Sharma', role: 'Frontend Developer', experience: '3 years', score: 92, stage: 'Interview' },
  { name: 'Priya Singh', role: 'Node.js Backend Engineer', experience: '4 years', score: 88, stage: 'Shortlisted' },
  { name: 'Rohan Verma', role: 'UI/UX Designer', experience: '2 years', score: 81, stage: 'Screening' },
  { name: 'Nikita Rao', role: 'HR Recruiter', experience: '5 years', score: 86, stage: 'Offer' },
]

const stageClass = {
  Screening: 'bg-blue-100 text-blue-700',
  Shortlisted: 'bg-violet-100 text-violet-700',
  Interview: 'bg-emerald-100 text-emerald-700',
  Offer: 'bg-amber-100 text-amber-700',
}

export default function Candidates() {
  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <EmployeeNavbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <section className="rounded-2xl border border-[#d6eaf2] bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-[#317FA4]">Candidates</h1>
          <p className="mt-1 text-sm text-gray-600">Review top applicants and move them to the next hiring stage.</p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl border border-[#d6eaf2] bg-[#f8fcff] p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Total Profiles</p>
              <p className="mt-2 text-3xl font-bold text-[#317FA4]">247</p>
            </article>
            <article className="rounded-xl border border-[#d6eaf2] bg-[#f8fcff] p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Shortlisted</p>
              <p className="mt-2 text-3xl font-bold text-[#317FA4]">39</p>
            </article>
            <article className="rounded-xl border border-[#d6eaf2] bg-[#f8fcff] p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Interviews</p>
              <p className="mt-2 text-3xl font-bold text-emerald-600">17</p>
            </article>
            <article className="rounded-xl border border-[#d6eaf2] bg-[#f8fcff] p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Offers Sent</p>
              <p className="mt-2 text-3xl font-bold text-amber-600">6</p>
            </article>
          </div>
          <div className="mt-6 space-y-3">
            {candidates.map((candidate) => (
              <article key={candidate.name} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#d6eaf2] bg-[#fbfdff] p-4">
                <div>
                  <h3 className="text-lg font-bold text-[#317FA4]">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">{candidate.role} &middot; {candidate.experience}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#eaf4f8] px-3 py-1 text-xs font-semibold text-[#317FA4]">Match {candidate.score}%</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stageClass[candidate.stage]}`}>{candidate.stage}</span>
                  <button className="rounded-md bg-[#317FA4] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1e293b]">View</button>
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
