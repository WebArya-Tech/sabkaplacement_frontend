import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'

const skills = ['React', 'JavaScript', 'Node.js', 'Tailwind CSS', 'MongoDB']
const education = [
  { title: 'B.Tech in Computer Science', subtitle: 'Delhi Technical University - 2019 to 2023' },
]
const experience = [
  { title: 'Frontend Developer Intern', subtitle: 'PixelCraft - 6 months' },
  { title: 'Junior Web Developer', subtitle: 'OrbitSoft - 1.5 years' },
]

export default function EmployeeProfile() {
  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <EmployeeNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="overflow-hidden rounded-3xl border border-[#d6eaf2] bg-white shadow-sm">
          <div className="h-40 bg-gradient-to-r from-[#317FA4] via-[#317FA4] to-[#56b8d8]" />
          <div className="px-6 pb-6">
            <div className="-mt-16 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <img
                  src="https://ui-avatars.com/api/?name=Sneha+Lata&background=297EA2&color=fff&size=180"
                  alt="Profile"
                  className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg"
                />
                <div className="pb-2">
                  <h1 className="text-3xl font-black text-[#317FA4]">Sneha Lata</h1>
                  <p className="mt-1 text-sm font-semibold text-[#317FA4]">MERN Stack Developer</p>
                  <p className="mt-1 text-sm text-gray-600">Noida &middot; Open to work &middot; Immediate joiner</p>
                </div>
              </div>
              <button className="rounded-xl bg-[#317FA4] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e293b]">Edit Profile</button>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <section className="rounded-2xl border border-[#d6eaf2] p-5">
                  <h2 className="text-lg font-bold text-[#317FA4]">Personal Details</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-gray-700">
                    <div><span className="font-semibold text-[#317FA4]">Email:</span> sneha@example.com</div>
                    <div><span className="font-semibold text-[#317FA4]">Phone:</span> +91 98765 43210</div>
                    <div><span className="font-semibold text-[#317FA4]">Preferred Role:</span> Frontend / Full Stack</div>
                    <div><span className="font-semibold text-[#317FA4]">Experience:</span> 2 years</div>
                  </div>
                </section>
                <section className="rounded-2xl border border-[#d6eaf2] p-5">
                  <h2 className="text-lg font-bold text-[#317FA4]">Skills</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-[#eaf4f8] px-3 py-1 text-sm font-semibold text-[#317FA4]">{skill}</span>
                    ))}
                  </div>
                </section>
                <section className="rounded-2xl border border-[#d6eaf2] p-5">
                  <h2 className="text-lg font-bold text-[#317FA4]">Education</h2>
                  <div className="mt-4 space-y-3">
                    {education.map((item) => (
                      <div key={item.title} className="rounded-xl bg-[#f8fbfd] p-4">
                        <p className="font-semibold text-[#317FA4]">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="rounded-2xl border border-[#d6eaf2] p-5">
                  <h2 className="text-lg font-bold text-[#317FA4]">Experience</h2>
                  <div className="mt-4 space-y-3">
                    {experience.map((item) => (
                      <div key={item.title} className="rounded-xl bg-[#f8fbfd] p-4">
                        <p className="font-semibold text-[#317FA4]">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="space-y-6">
                <section className="rounded-2xl border border-[#d6eaf2] p-5">
                  <h2 className="text-lg font-bold text-[#317FA4]">Resume</h2>
                  <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#eef8fd] to-[#f7fbff] p-5 text-center">
                    <p className="text-sm font-semibold text-[#317FA4]">sneha_lata_resume.pdf</p>
                    <p className="mt-2 text-xs text-gray-600">Last updated 2 days ago</p>
                    <div className="mt-4 flex flex-col gap-2">
                      <button className="rounded-xl bg-[#317FA4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e293b]">Upload / Update Resume</button>
                      <button className="rounded-xl border border-[#d6eaf2] px-4 py-2 text-sm font-semibold text-[#317FA4] hover:bg-white">Preview Resume</button>
                    </div>
                  </div>
                </section>
                <section className="rounded-2xl border border-[#d6eaf2] p-5">
                  <h2 className="text-lg font-bold text-[#317FA4]">Profile Strength</h2>
                  <div className="mt-4">
                    <div className="h-3 overflow-hidden rounded-full bg-[#e6eef4]">
                      <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#317FA4] to-[#56b8d8]" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-[#317FA4]">82% complete</p>
                    <p className="mt-1 text-sm text-gray-600">Add certification and project details to improve recruiter visibility.</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
