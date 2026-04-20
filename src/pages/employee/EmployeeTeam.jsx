import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'

const members = [
  { name: 'Ritika S.', role: 'Lead Recruiter', ownership: 'Engineering Hiring' },
  { name: 'Mohit K.', role: 'Talent Partner', ownership: 'Sales Hiring' },
  { name: 'Aditi R.', role: 'HR Manager', ownership: 'Operations Hiring' },
]

export default function EmployeeTeam() {
  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <EmployeeNavbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#317FA4] mb-5">Employee Team</h1>
        <div className="grid md:grid-cols-3 gap-4">
          {members.map((member) => (
            <article key={member.name} className="bg-white border border-[#d6eaf2] rounded-xl p-5 shadow-sm">
              <p className="text-base font-bold text-[#317FA4]">{member.name}</p>
              <p className="text-sm text-[#3385AA] mt-1">{member.role}</p>
              <p className="text-sm text-gray-600 mt-2">{member.ownership}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
