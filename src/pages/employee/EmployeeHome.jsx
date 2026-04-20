import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'

const featuredJobs = [
  { id: 1, title: 'Senior React Developer', company: 'TechNova Labs', logo: '/slider1.png', location: 'Bangalore', type: 'Full Time', salary: '18-25 LPA' },
  { id: 2, title: 'Product Manager', company: 'Flipkart', logo: '/slider2.png', location: 'Hyderabad', type: 'Full Time', salary: '22-30 LPA' },
  { id: 3, title: 'UI/UX Designer', company: 'Swiggy', logo: '/slider3.png', location: 'Remote', type: 'Full Time', salary: '12-18 LPA' },
  { id: 4, title: 'DevOps Engineer', company: 'Razorpay', logo: '/slider4.png', location: 'Delhi', type: 'Contract', salary: '20-28 LPA' },
  { id: 5, title: 'Data Scientist', company: 'Amazon', logo: '/slider1.png', location: 'Mumbai', type: 'Full Time', salary: '25-35 LPA' },
  { id: 6, title: 'Backend Engineer', company: 'Zomato', logo: '/slider2.png', location: 'Pune', type: 'Full Time', salary: '15-22 LPA' },
]

const companies = [
  { name: 'TCS', img: '/slider1.png', jobs: 124 },
  { name: 'Infosys', img: '/slider2.png', jobs: 98 },
  { name: 'Wipro', img: '/slider3.png', jobs: 76 },
  { name: 'Flipkart', img: '/slider4.png', jobs: 54 },
  { name: 'Amazon', img: '/slider1.png', jobs: 89 },
  { name: 'Swiggy', img: '/slider2.png', jobs: 43 },
]

const stats = [
  { label: 'Jobs Posted', value: '24', icon: '/jobopenings.png', numValue: 24, change: '+3 this month' },
  { label: 'Applications', value: '1,284', icon: '/animation.png', numValue: 1284, change: '+86 this week' },
  { label: 'Candidates Shortlisted', value: '342', icon: '/boy.png', numValue: 342, change: '+14 today' },
  { label: 'Hirings Done', value: '98', icon: '/girl.png', numValue: 98, change: '+5 this month' },
]

const recentJobs = [
  { id: 1, title: 'Senior React Developer', location: 'Bangalore', type: 'Full Time', applications: 48, status: 'Active', posted: '2 days ago', logo: '/slider1.png' },
  { id: 2, title: 'Product Manager', location: 'Hyderabad', type: 'Full Time', applications: 31, status: 'Active', posted: '4 days ago', logo: '/slider2.png' },
  { id: 3, title: 'UI/UX Designer', location: 'Remote', type: 'Full Time', applications: 22, status: 'Active', posted: '1 week ago', logo: '/slider3.png' },
  { id: 4, title: 'DevOps Engineer', location: 'Delhi', type: 'Contract', applications: 15, status: 'Paused', posted: '2 weeks ago', logo: '/slider4.png' },
]

const recentApps = [
  { id: 1, name: 'Priya Sharma', role: 'Senior React Developer', avatar: 'PS', exp: '4 yrs', location: 'Bangalore', time: '10 min ago', status: 'New' },
  { id: 2, name: 'Rahul Verma', role: 'Product Manager', avatar: 'RV', exp: '6 yrs', location: 'Hyderabad', time: '45 min ago', status: 'Reviewed' },
  { id: 3, name: 'Anjali Mehta', role: 'UI/UX Designer', avatar: 'AM', exp: '3 yrs', location: 'Remote', time: '2 hrs ago', status: 'Shortlisted' },
  { id: 4, name: 'Karan Joshi', role: 'Senior React Developer', avatar: 'KJ', exp: '5 yrs', location: 'Pune', time: '3 hrs ago', status: 'New' },
]

const quickActions = [
  { label: 'Post a Job', desc: 'Create a new job listing', to: '/employee/post-job', icon: '??', color: '#317FA4', light: '#e8f0f8' },
  { label: 'Manage Jobs', desc: 'Edit or pause your postings', to: '/employee/manage-jobs', icon: '??', color: '#16A34A', light: '#f0fdf4' },
  { label: 'Find CVs', desc: 'Browse candidate profiles', to: '/employee/find-cvs', icon: '??', color: '#7C3AED', light: '#f5f3ff' },
  { label: 'Applications', desc: 'Review incoming applications', to: '/employee/applications', icon: '??', color: '#DC2626', light: '#fef2f2' },
]

const appStatusColors = {
  New:        { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
  Reviewed:   { bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE' },
  Shortlisted:{ bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' },
  Rejected:   { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
}

export default function EmployeeHome() {
  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('')
  const [counters, setCounters] = useState({ 0: 0, 1: 0, 2: 0, 3: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    const intervals = []
    stats.forEach((stat, index) => {
      const duration = 2000
      const steps = 60
      const increment = stat.numValue / steps
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        setCounters(prev => ({
          ...prev,
          [index]: Math.min(Math.floor(currentStep * increment), stat.numValue)
        }))
        if (currentStep >= steps) clearInterval(interval)
      }, duration / steps)

      intervals.push(interval)
    })

    return () => intervals.forEach(interval => clearInterval(interval))
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/jobs?q=${encodeURIComponent(jobTitle)}&loc=${encodeURIComponent(location)}`)
  }

  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <EmployeeNavbar />

      {/* -- HERO -- */}
      <section 
        className="min-h-[90vh] flex items-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('/imagehero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-6 py-16 w-full grid lg:grid-cols-2 gap-10 items-center">
          {/* Semi-transparent overlay for left content area */}
          <div className="absolute inset-0 left-0 lg:w-1/2 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

          {/* Left: Content */}
          <div className="relative z-10">
            <span className="inline-block bg-white/15 border border-white/25 text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5 backdrop-blur-sm">
              ?? India's Most Trusted Job Portal
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-xl">
              Build Your Dream Team
            </h1>
            <p className="mt-6 text-white text-base sm:text-lg font-medium leading-relaxed">
              Post jobs and reach thousands of verified candidates instantly. Our intelligent matching system connects you with the right talent for your organization. Hire faster, smarter, and build a team that drives your business forward.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/employee/login"
                className="bg-white text-[#317FA4] font-bold px-7 py-2.5 rounded-xl hover:bg-gray-100 transition-colors text-sm shadow-lg"
              >
                Employer Login
              </Link>
              <Link
                to="/employee/register"
                className="bg-[#3385AA] text-white font-bold px-7 py-2.5 rounded-xl hover:bg-[#317FA4] transition-colors text-sm border border-white/20 shadow-lg"
              >
                Post a Job
              </Link>
            </div>
          </div>

          {/* Right: Hiring Illustration */}
          <div className="hidden lg:flex justify-center lg:justify-end relative z-10">
            <div className="relative w-[420px] h-[380px]">
              {/* Animated circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border-2 border-white/10 animate-ping" style={{ animationDuration: '3s' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full border border-white/15" />
              </div>
              {/* Center card */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
                  <div className="text-6xl mb-4">??</div>
                  <p className="text-white font-extrabold text-xl">Hire Smarter</p>
                  <p className="text-white/70 text-sm mt-1">1,200+ companies trust us</p>
                  <div className="mt-4 flex justify-center gap-2">
                    {['React', 'Node', 'Python', 'Java'].map(s => (
                      <span key={s} className="text-[10px] bg-white/20 text-white px-2 py-1 rounded-full font-semibold">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute top-6 right-4 bg-white rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <span className="text-green-500 text-lg">?</span>
                <div>
                  <p className="text-[10px] font-bold text-gray-800">New Application</p>
                  <p className="text-[9px] text-gray-500">2 min ago</p>
                </div>
              </div>
              <div className="absolute bottom-10 left-2 bg-white rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2" style={{ animation: 'float 3.5s ease-in-out infinite 0.5s' }}>
                <span className="text-blue-500 text-lg">??</span>
                <div>
                  <p className="text-[10px] font-bold text-gray-800">1,284 Applicants</p>
                  <p className="text-[9px] text-gray-500">This week</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* -- STATS BAR -- */}
      <section className="bg-white border-b border-[#d6eaf2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#d6eaf2]">
          {stats.map((s, idx) => (
            <div key={s.label} className="text-center px-4 flex flex-col items-center gap-3">
              <img src={s.icon} alt={s.label} className="w-16 h-16 object-contain" />
              <p className="text-3xl font-extrabold text-[#317FA4]">
                {counters[idx]?.toLocaleString('en-IN')}
                <span className="text-2xl">+</span>
              </p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-14 space-y-20">

        {/* -- FEATURED JOBS -- */}
        <section>
          <div className="flex flex-col items-center justify-center mb-7 text-center">
            <h2 className="text-3xl font-extrabold text-[#317FA4]">Featured Jobs</h2>
            <p className="text-gray-500 text-sm mt-2">Top opportunities handpicked for you</p>
            <Link to="/jobs" className="inline-block mt-6 bg-[#3385AA] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#317FA4] transition-colors text-sm shadow-md">
              View all
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredJobs.map((job) => (
              <Link
                to="/jobs"
                key={job.id}
                className="bg-white border border-[#d6eaf2] rounded-2xl p-5 hover:shadow-xl hover:border-[#3385AA]/40 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-11 h-11 rounded-xl object-cover border border-gray-100 shadow-sm"
                  />
                  <div>
                    <p className="text-xs text-gray-400">{job.company}</p>
                    <h3 className="text-sm font-bold text-[#317FA4] group-hover:text-[#3385AA] transition-colors leading-snug">
                      {job.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 text-gray-500">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="bg-[#eaf4f8] text-[#3385AA] font-semibold px-2 py-0.5 rounded-full">
                    {job.type}
                  </span>
                  <span className="ml-auto font-bold text-[#317FA4]">{job.salary}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* -- WHY US: Image + Text -- */}
        <section className="rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-2xl border border-[#d6eaf2]">
          <div className="relative min-h-[350px] md:min-h-[450px]">
            <img
              src="/employer.png"
              alt="Why Sabka Placement"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5" />
          </div>
          <div className="bg-gradient-to-br from-[#317FA4] to-[#3385AA] p-8 sm:p-12 flex flex-col justify-center text-white">
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full w-fit mb-4">
              Why Sabka Placement?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
              Apna Career Next Level Pe Le Jao
            </h2>
            <p className="mt-3 text-[#cce8f4] text-sm leading-relaxed">
              Lakhs of verified jobs, top recruiters, and smart tools to help you land your dream job faster.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                'Verified companies only',
                'One-click easy apply',
                'Resume builder included',
                'Interview tips & resources',
              ].map((pt) => (
                <li key={pt} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#7dd3f0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {pt}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className="mt-7 inline-block bg-white text-[#317FA4] font-bold px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors text-sm w-fit shadow"
            >
              Get Started Free ?
            </Link>
          </div>
        </section>

        {/* -- TOP COMPANIES -- */}
        <section>
          <div className="flex flex-col items-center justify-center mb-7 text-center">
            <h2 className="text-2xl font-extrabold text-[#317FA4]">Top Hiring Companies</h2>
            <p className="text-gray-500 text-sm mt-1">India's best companies are hiring right now</p>
            <Link to="/companies" className="text-sm font-semibold text-[#3385AA] hover:underline mt-4">
              All Companies ?
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {companies.map((co) => (
              <Link
                to="/companies"
                key={co.name}
                className="bg-white border border-[#d6eaf2] rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-xl hover:border-[#3385AA]/40 transition-all group"
              >
                <img
                  src={co.img}
                  alt={co.name}
                  className="w-14 h-14 object-cover rounded-xl border border-gray-100 group-hover:scale-105 transition-transform shadow-sm"
                />
                <p className="text-sm font-bold text-[#317FA4]">{co.name}</p>
                <span className="text-xs text-[#3385AA] font-semibold">{co.jobs} Jobs</span>
              </Link>
            ))}
          </div>
        </section>

        {/* -- CAREER RESOURCES BANNER (Image) -- */}
        <section 
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center"
          style={{
            backgroundImage: `url('/bloghero.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '300px'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#317FA4]/92 via-[#317FA4]/65 to-transparent flex items-center">
            <div className="px-8 sm:px-14 max-w-lg">
              <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">
                Career Resources
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 leading-snug">
                Free Resume Builder &amp; Interview Tips
              </h2>
              <p className="text-[#cce8f4] text-sm mt-2">
                Professional tools to boost your chances of landing the job.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link
                  to="/resume/builder"
                  className="bg-white text-[#317FA4] font-bold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors text-sm shadow"
                >
                  Build Resume
                </Link>
                <Link
                  to="/info/career-resources"
                  className="border border-white/60 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* -- INTERVIEW TIPS (Image) -- */}
        <section className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <span className="text-xs font-semibold bg-[#eaf4f8] text-[#3385AA] px-3 py-1 rounded-full">
              Interview Prep
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#317FA4] mt-2 leading-snug">
              Your Next Interview with Confidence
            </h2>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Practice with real interview questions from top companies. Get expert tips, HR round guidance, and domain-specific prep material — all free.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {['1000+ interview questions', 'Company-wise question banks', 'Soft skill & HR round tips'].map((pt) => (
                <li key={pt} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3385AA] flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
            <Link
              to="/info/career-resources"
              className="mt-6 inline-block bg-[#317FA4] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#317FA4] transition-colors text-sm shadow"
            >
              Explore Resources ?
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-[#d6eaf2]">
            <img
              src="/interview.png"
              alt="Interview Tips"
              className="w-full h-64 object-cover"
            />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
