import React, { useEffect } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Job from './components/Job'
import TrainingInstitute from './components/TrainingInstitute'
import Jobcategories from './components/Jobcategories'
import Testimonials from './components/Testimonials'
import EmployerSection from './components/EmployerSection'
import TrainerSection from './components/TrainerSection'
import Footer from './components copy/Footer'
import HomePage from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import About from './pages/info/About'
import CareerResources from './pages/info/CareerResources'
import Contact from './pages/info/Contact'
import Services from './pages/info/Services'
import InfoTestimonials from './pages/info/Testimonials'
import TopTechnologies from './pages/info/TopTechnologies'
import JobsPage from './pages/jobs/Jobs'
import Apply from './pages/jobs/Apply'
import Application from './pages/jobs/Application'
import PostJob from './pages/jobs/PostJob'
import SavedJobs from './pages/jobs/SavedJobs'
import NVites from './pages/jobs/NVites'
import ResumeBuilder from './pages/resume/ResumeBuilder'
import InterviewPreparation from './components/SabkaplacementPro/InterviewPreparation'
import CareerInsights from './components/SabkaplacementPro/CareerInsights'
import SalaryCalculator from './components/SabkaplacementPro/SalaryCalculator'
import ResumeQuality from './pages/resume/ResumeQuality'
import ResumeWriting from './pages/resume/ResumeWriting'
import VisualResume from './pages/resume/VisualResume'
import Companies from './pages/companies/Companies'
import Topcompanies from './pages/companies/Topcompanies'
import Startup from './pages/companies/startup'
import ProductBased from './pages/companies/Productbased'
import Mnc from './pages/companies/Mnc'
import ITcompanies from './pages/companies/Itcompnies'
import FintechCompanies from './pages/companies/Fintechcompanies'
import Internet from './pages/companies/Internet'
import Unicorn from './pages/companies/uvicorn'
import Profile from './pages/user/Profile'
import MyReviews from './pages/user/MyReviews'
import Settings from './pages/user/Settings'
import Help from './pages/user/Help'
import PrivacyCentre from './pages/user/PrivacyCentre'
import PriorityApplicant from './pages/user/Priorityapplicant'
import EmployeeLogin from './pages/employee/Login'
import EmployeeRegister from './pages/employee/Register'
import Dashboard from './pages/employee/Dashboard'
import Applications from './pages/employee/Applications'
import EmployeeSavedJobs from './pages/employee/SavedJobs'
import EmployeeNotifications from './pages/employee/Notifications'
import EmployeeProfile from './pages/employee/Profile'
import ManageJobs from './pages/employee/ManageJobs'
import EmployeePostJob from './pages/employee/PostJob'
import Candidates from './pages/employee/Candidates'
import CompanyProfile from './pages/employee/CompanyProfile'
import TrainerLogin from './pages/trainer/TrainerLogin'
import TrainerRegister from './pages/trainer/TrainerRegister'
import TrainerDashboard from './pages/trainer/TrainerDashboard'
import TrainerCourses from './pages/trainer/TrainerCourses'
import TrainerStudents from './pages/trainer/TrainerStudents'
import TrainerProfile from './pages/trainer/TrainerProfile'
import TrainerNotifications from './pages/trainer/TrainerNotifications'
import CopyNavbar from './components copy/Navbar'
import CopyFooter from './components copy/Footer'
import CompanyCard from './components copy/companies/CompanyCard'
import JobCard from './components copy/jobs/JobCard'
import CompanyBanner from './components/CompanyBanner'
import CountNumber from './components/CountNumber'
import TopCompaniesScroll from './components/TopCompaniesScroll'
import TechGridSection from './components/TechGridSection'
import AboutSection from './components/AboutSection'
import ResumeSection from './components/ResumeSection'
import ExploreJobs from './components/ExploreJobs'
import TrendingBlogs from './components/TrendingBlogs'
import BlogPage from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import CommunityHub from './pages/community/CommunityHub'
import CommunityForum from './pages/community/Forum'
import Groups from './pages/community/Groups'
import Chat from './pages/community/Chat'
import Announcements from './pages/community/Announcements'
import TopBar from './components/TopBar'
import SocialSidebar from './components/SocialSidebar'
import FloatingButtons from './components/FloatingButtons'
import { useLocation } from 'react-router-dom'
import AdminPanel from './panel4/AdminPanel'
import CandidateDashboard from './pages/user/CandidateDashboard'

function GlobalComponents() {
  const location = useLocation()
  const isEmployeeRoute = location.pathname.startsWith('/employee') || location.pathname.startsWith('/trainer')
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register'
  const isPanel4Route = location.pathname.startsWith('/panel4')
  const isCompaniesRoute = location.pathname.startsWith('/companies')
  const isInfoRoute = location.pathname.startsWith('/services') || location.pathname.startsWith('/about') || location.pathname.startsWith('/contact') || location.pathname.startsWith('/forum') || location.pathname.startsWith('/testimonials') || location.pathname.startsWith('/career')
  const isHomeRoute = location.pathname === '/home'
  const isUserRoute = location.pathname.startsWith('/user')
  const isJobsRoute = location.pathname.startsWith('/jobs') || location.pathname.startsWith('/apply') || location.pathname === '/nvites'
  if (isEmployeeRoute || isAuthRoute || isHomeRoute || isPanel4Route || isUserRoute) return null
  return (
    <>
      {!isCompaniesRoute && !isJobsRoute && !isInfoRoute && <TopBar />}
      {!isCompaniesRoute && !isInfoRoute && !isHomeRoute && !isJobsRoute && <SocialSidebar />}
      <FloatingButtons />
    </>
  )
}

const LandingPage = () => (
  <div className="flex flex-col">
    <Navbar />
    <Hero />
    <CompanyBanner />
    <CountNumber />
    <TrainingInstitute />
    <TechGridSection />
    <AboutSection />
    <ResumeSection />
    <TopCompaniesScroll />
    <TrendingBlogs />
    <Testimonials />
    <Footer />
  </div>
)

const StaticPage = ({ title, message }) => (
  <div className="min-h-screen bg-[#f5f7fb]">
    <Navbar />
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#317FA4] mb-4">{title}</h1>
      <p className="text-gray-700 text-lg">{message}</p>
    </main>
    <Footer />
  </div>
)

const CopyCompanyCardPreview = () => {
  const sampleCompany = { id: 1, name: 'TechNova', logo: 'T', rating: 4.4, reviews: '2.1k', location: 'Hyderabad', employees: '500-1000', openings: 12 }
  return <div className="min-h-screen bg-[#f5f7fb] p-6"><CompanyCard company={sampleCompany} /></div>
}

const CopyJobCardPreview = () => {
  const sampleJob = { id: 1, title: 'Frontend Developer', company: 'TechNova', rating: 4.2, reviews: '1.4k', postedBy: 'HR Team', logo: 'T', experience: '2-5 years', salary: '8-14 LPA', location: 'Remote', description: 'Build responsive React UI components.', skills: ['React', 'JavaScript', 'Tailwind CSS', 'REST APIs'], posted: '2 days ago' }
  return <div className="min-h-screen bg-[#f5f7fb] p-6"><JobCard job={sampleJob} isSelected={false} onToggleSelect={() => {}} /></div>
}

const CopyPagesHub = () => {
  const links = [
    { label: 'Pages Home (Home.jsx)', to: '/home' },
    { label: 'Component Copy Navbar', to: '/copy/navbar' },
    { label: 'Component Copy Footer', to: '/copy/footer' },
    { label: 'Component Copy Company Card', to: '/copy/company-card' },
    { label: 'Component Copy Job Card', to: '/copy/job-card' },
  ]
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <CopyNavbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#317FA4] mb-3">Component Copy Pages</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((item) => (
            <Link key={item.to} to={item.to} className="rounded-lg bg-white border border-gray-200 px-4 py-4 font-semibold text-[#317FA4] hover:border-[#42AFCA] hover:text-[#42AFCA] transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' })
  }, [])
  return (
    <BrowserRouter>
      <GlobalComponents />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />

        {/* Employee routes — no TopBar/SocialSidebar needed, standalone pages */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/dashboard" element={<Dashboard />} />
        <Route path="/employee/home" element={<Navigate to="/employee/dashboard" replace />} />
        <Route path="/employee/find-jobs" element={<Navigate to="/employee/dashboard" replace />} />
        <Route path="/employee/find-cvs" element={<Navigate to="/employee/dashboard" replace />} />
        <Route path="/employee/applications" element={<Applications />} />
        <Route path="/employee/saved-jobs" element={<EmployeeSavedJobs />} />
        <Route path="/employee/notifications" element={<EmployeeNotifications />} />
        <Route path="/employee/profile" element={<EmployeeProfile />} />
        <Route path="/employee/manage-jobs" element={<ManageJobs />} />
        <Route path="/employee/post-job" element={<EmployeePostJob />} />
        <Route path="/employee/candidates" element={<Candidates />} />
        <Route path="/employee/company-profile" element={<CompanyProfile />} />

        {/* Trainer routes */}
        <Route path="/trainer/login" element={<TrainerLogin />} />
        <Route path="/trainer/register" element={<TrainerRegister />} />
        <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
        <Route path="/trainer/courses" element={<TrainerCourses />} />
        <Route path="/trainer/students" element={<TrainerStudents />} />
        <Route path="/trainer/profile" element={<TrainerProfile />} />
        <Route path="/trainer/notifications" element={<TrainerNotifications />} />

        <Route path="/about" element={<About />} />
        <Route path="/forum" element={<CommunityForum />} />
        <Route path="/services" element={<Navigate to="/resume/builder" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career-resources" element={<CareerResources />} />
        <Route path="/testimonials" element={<InfoTestimonials />} />
        <Route path="/technologies" element={<TopTechnologies />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        <Route path="/community" element={<CommunityHub />} />
        <Route path="/community/forum" element={<CommunityForum />} />
        <Route path="/community/groups" element={<Groups />} />
        <Route path="/community/chat" element={<Chat />} />
        <Route path="/community/announcements" element={<Announcements />} />

        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/apply" element={<Apply />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/application" element={<Application />} />
        <Route path="/jobs/post-job" element={<PostJob />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs/saved" element={<SavedJobs />} />
        <Route path="/nvites" element={<NVites />} />

        <Route path="/resume/builder" element={<ResumeBuilder />} />
        <Route path="/pro/interview-preparation" element={<InterviewPreparation />} />
        <Route path="/pro/career-insights" element={<CareerInsights />} />
        <Route path="/pro/salary-calculator" element={<SalaryCalculator />} />
        <Route path="/resume/quality" element={<ResumeQuality />} />
        <Route path="/resume/writing" element={<ResumeWriting />} />
        <Route path="/resume/visual" element={<VisualResume />} />

        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/top" element={<Topcompanies />} />
        <Route path="/companies/startup" element={<Startup />} />
        <Route path="/companies/product-based" element={<ProductBased />} />
        <Route path="/companies/mnc" element={<Mnc />} />
        <Route path="/companies/it" element={<ITcompanies />} />
        <Route path="/companies/fintech" element={<FintechCompanies />} />
        <Route path="/companies/internet" element={<Internet />} />
        <Route path="/companies/unicorn" element={<Unicorn />} />

        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/dashboard" element={<CandidateDashboard />} />
        <Route path="/user/my-reviews" element={<MyReviews />} />
        <Route path="/user/settings" element={<Settings />} />
        <Route path="/user/help" element={<Help />} />
        <Route path="/user/privacy-centre" element={<PrivacyCentre />} />
        <Route path="/user/priority-applicant" element={<PriorityApplicant />} />

        <Route path="/copy/navbar" element={<CopyNavbar />} />
        <Route path="/copy/footer" element={<CopyFooter />} />
        <Route path="/copy/company-card" element={<CopyCompanyCardPreview />} />
        <Route path="/copy/job-card" element={<CopyJobCardPreview />} />
        <Route path="/copy/pages" element={<CopyPagesHub />} />

        {/* Admin-only panel */}
        <Route path="/panel4" element={<AdminPanel />} />

        <Route path="/careers" element={<Navigate to="/career-resources" replace />} />
        <Route path="/jobs/invites" element={<Navigate to="/nvites" replace />} />
        <Route path="/jobs/applications" element={<Navigate to="/application" replace />} />
        <Route path="/companies/productbased" element={<Navigate to="/companies/product-based" replace />} />
        <Route path="/resources" element={<Navigate to="/career-resources" replace />} />
        <Route path="/resume-writing" element={<Navigate to="/resume/writing" replace />} />
        <Route path="/visual-resume" element={<Navigate to="/resume/visual" replace />} />
        <Route path="/resume-quality" element={<Navigate to="/resume/quality" replace />} />
        <Route path="/resume-builder" element={<Navigate to="/resume/builder" replace />} />
        <Route path="/help" element={<StaticPage title="Help Center" message="Support resources will be added here soon." />} />
        <Route path="/notices" element={<StaticPage title="Summons/Notices" message="Important legal or platform notices will appear here." />} />
        <Route path="/grievances" element={<StaticPage title="Grievances" message="Raise and track grievance requests on this page." />} />
        <Route path="/report" element={<StaticPage title="Report Issue" message="Issue reporting form will be published here." />} />
        <Route path="/privacy" element={<StaticPage title="Privacy Policy" message="Privacy policy details will be displayed here." />} />
        <Route path="/terms" element={<StaticPage title="Terms & Conditions" message="Terms and conditions content will be available here." />} />
        <Route path="/fraud-alert" element={<StaticPage title="Fraud Alert" message="Fraud prevention and safety advisories will be listed here." />} />
        <Route path="/trust-safety" element={<StaticPage title="Trust & Safety" message="Trust and safety standards will be shown here." />} />
        <Route path="/sitemap" element={<StaticPage title="Sitemap" message="Complete website structure will be displayed here." />} />
        <Route path="/credits" element={<StaticPage title="Credits" message="Team and contributor credits will be listed here." />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

