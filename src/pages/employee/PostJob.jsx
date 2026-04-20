import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import EmployeeFooter from '../../components/EmployeeFooter'
import { createJob } from '../../services/jobsApi'

const initialForm = {
  jobTitle: '', jobType: 'Full-time', experience: '', location: '',
  workMode: 'Hybrid', salary: '', skills: '', description: '',
  requirements: '', benefits: '', deadline: '', openings: '',
}

const inp = 'w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#3385AA] focus:ring-2 focus:ring-[#3385AA]/20'
const inpNoIcon = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#3385AA] focus:ring-2 focus:ring-[#3385AA]/20'

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
        {children}
      </div>
    </div>
  )
}

function Section({ icon, title, subtitle, children, step }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-[#f8fafc] to-white">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#317FA4] to-[#3385AA] flex items-center justify-center text-white shadow-md">
            {icon}
          </div>
          {step && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#3385AA] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow border-2 border-white">
              {step}
            </span>
          )}
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#317FA4]">{title}</h2>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4">{children}</div>
    </div>
  )
}

export default function EmployeePostJob() {
  const [form, setForm] = useState(initialForm)
  const [published, setPublished] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const parseSalaryRange = (salaryText) => {
    const nums = (salaryText || '').replace(/,/g, '').match(/\d+/g) || []
    if (nums.length === 0) return {}
    if (nums.length === 1) return { salaryMin: Number(nums[0]) }
    return { salaryMin: Number(nums[0]), salaryMax: Number(nums[1]) }
  }

  const handlePublish = async () => {
    setError('')
    setSaving(true)
    try {
      const payload = {
        title: form.jobTitle,
        description: form.description,
        skillsRequired: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
        experienceRequired: form.experience,
        location: form.location,
        jobType: form.jobType,
        ...parseSalaryRange(form.salary),
      }
      await createJob(payload)
      setPublished(true)
    } catch (err) {
      setError(err.message || 'Failed to publish job')
    } finally {
      setSaving(false)
    }
  }

  if (published) {
    return (
      <div className="min-h-screen bg-[#f4f9fc] flex flex-col">
        <EmployeeNavbar />
        <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-16">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-10 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg mb-5">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-[#317FA4]">Job Published! 🎉</h2>
            <p className="mt-2 text-gray-500 text-sm">
              <span className="font-bold text-[#317FA4]">{form.jobTitle || 'Your Job'}</span> at{' '}
              <span className="font-bold text-[#3385AA]">{form.companyName || 'Your Company'}</span> is now live.
            </p>
            <p className="text-xs text-gray-400 mt-1">Candidates can find and apply immediately.</p>
            <div className="mt-7 flex flex-col gap-3">
              <Link to="/employee/manage-jobs" className="block bg-[#317FA4] text-white font-bold py-3 rounded-xl hover:bg-[#317FA4] transition-colors text-sm">
                View Manage Jobs
              </Link>
              <button onClick={() => { setForm(initialForm); setPublished(false) }}
                className="border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm w-full">
                Post Another Job
              </button>
            </div>
          </div>
        </div>
        <EmployeeFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f9fc] flex flex-col">
      <EmployeeNavbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#317FA4] via-[#317FA4] to-[#3385AA] rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-12 w-28 h-28 bg-white/5 rounded-full translate-y-1/2 pointer-events-none" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-0.5">Hire Talent</p>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Post a New Job</h1>
              <p className="text-white/70 text-sm mt-0.5">Reach thousands of qualified candidates instantly — it's free!</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">

          {/* ── FORM ── */}
          <div className="lg:col-span-2">
            <form onSubmit={(e) => { e.preventDefault(); handlePublish() }}>
              {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

              {/* Role Details */}
              <Section
                step={2}
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                title="Role Details"
                subtitle="The clearer the role, the better the applications"
              >
                <Field label="Job Title *" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>
                  <input type="text" name="jobTitle" value={form.jobTitle} onChange={onChange} required placeholder="e.g. Senior React Developer" className={inp} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Job Type *">
                    <select name="jobType" value={form.jobType} onChange={onChange} required className={inpNoIcon}>
                      <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                    </select>
                  </Field>
                  <Field label="Experience *" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                    <input type="text" name="experience" value={form.experience} onChange={onChange} required placeholder="2–4 years" className={inp} />
                  </Field>
                  <Field label="Work Mode *">
                    <select name="workMode" value={form.workMode} onChange={onChange} required className={inpNoIcon}>
                      <option>Office</option><option>Remote</option><option>Hybrid</option>
                    </select>
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Location *" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
                    <input type="text" name="location" value={form.location} onChange={onChange} required placeholder="Mumbai, Maharashtra" className={inp} />
                  </Field>
                  <Field label="Salary Range" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                    <input type="text" name="salary" value={form.salary} onChange={onChange} placeholder="₹10–15 LPA" className={inp} />
                  </Field>
                  <Field label="No. of Openings" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
                    <input type="number" name="openings" value={form.openings} onChange={onChange} placeholder="3" min="1" className={inp} />
                  </Field>
                  <Field label="Application Deadline" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}>
                    <input type="date" name="deadline" value={form.deadline} onChange={onChange} className={inp} />
                  </Field>
                </div>
              </Section>

              {/* Skills & Description */}
              <Section
                step={3}
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                title="Skills & Description"
                subtitle="Attract the right talent with clear details"
              >
                <Field label="Required Skills *" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>}>
                  <input type="text" name="skills" value={form.skills} onChange={onChange} required placeholder="React, Node.js, TypeScript (comma separated)" className={inp} />
                </Field>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Job Description *</label>
                  <textarea name="description" value={form.description} onChange={onChange} required rows={5}
                    placeholder="Describe responsibilities, goals, and day-to-day work."
                    className={`${inpNoIcon} resize-none`} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Requirements</label>
                  <textarea name="requirements" value={form.requirements} onChange={onChange} rows={4}
                    placeholder="Mandatory qualifications and must-haves."
                    className={`${inpNoIcon} resize-none`} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Benefits & Perks</label>
                  <textarea name="benefits" value={form.benefits} onChange={onChange} rows={3}
                    placeholder="Medical, WFH allowance, growth plan…"
                    className={`${inpNoIcon} resize-none`} />
                </div>
              </Section>

              {/* Submit */}
              <button type="submit" disabled={saving}
                className="w-full py-3.5 bg-gradient-to-r from-[#317FA4] to-[#3385AA] text-white font-bold rounded-2xl text-sm shadow-lg hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                {saving ? 'Publishing...' : "Publish Job Now — It's Free!"}
              </button>
            </form>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm font-bold text-[#317FA4] mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#3385AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Posting Checklist
                </p>
                {(() => {
                  const items = [
                    ['Job title filled', !!form.jobTitle],
                    ['Location & work mode', !!form.location],
                    ['Skills mentioned', !!form.skills],
                    ['Job description added', !!form.description],
                    ['Salary range filled', !!form.salary],
                  ]
                  const doneCount = items.filter(([, d]) => d).length
                  const pct = Math.round((doneCount / items.length) * 100)
                  const barColor = pct === 100 ? '#10b981' : '#3385AA'
                  return (
                    <>
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-gray-500">{doneCount}/{items.length} completed</span>
                          <span className="font-bold" style={{ color: barColor }}>{pct}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: barColor }} />
                        </div>
                      </div>
                      <ul className="space-y-2.5">
                        {items.map(([label, done]) => (
                          <li key={label} className="flex items-center gap-2.5">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all ${done ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                              {done ? '✓' : '○'}
                            </span>
                            <span className={`text-sm ${done ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>{label}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )
                })()}
              </div>

              <div className="bg-gradient-to-br from-[#317FA4] to-[#3385AA] rounded-2xl p-5 text-white">
                <p className="font-bold text-sm mb-1">💡 Pro Tip</p>
                <p className="text-xs text-white/75 leading-relaxed">Jobs with salary range get <strong className="text-white">3x more</strong> applications. Always add a salary range!</p>
              </div>
            </div>
          </aside>

        </div>
      </main>
      <EmployeeFooter />
    </div>
  )
}
