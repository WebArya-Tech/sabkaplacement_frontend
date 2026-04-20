import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerTrainer } from '../../services/trainerApi'

const subjects = ['Web Development', 'Data Science', 'UI/UX Design', 'Digital Marketing', 'Java / Backend', 'Python', 'Cloud Computing', 'Cybersecurity', 'DevOps', 'Other']

const inputCls = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA] focus:border-transparent transition-all bg-white placeholder-gray-400'

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5"> *</span>}
      </label>
      {children}
    </div>
  )
}

export default function TrainerRegister() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '',
    instituteName: '', specialization: '', experience: '', qualification: '',
    bio: '', linkedin: '',
  })
  const [showPw, setShowPw] = useState(false)

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await registerTrainer({
        fullName: form.fullName,
        phoneNumber: form.phone,
        email: form.email,
        password: form.password,
        instituteName: form.instituteName,
        specialization: form.specialization,
        experience: form.experience,
        highestQualification: form.qualification,
        shortBio: form.bio,
        linkedinProfile: form.linkedin,
      })
      if (res.token) localStorage.setItem('trainerToken', res.token)
      navigate('/trainer/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf4f8] via-white to-[#dff0ff] flex items-center justify-center p-3 sm:p-4">

      <div className="w-full max-w-lg">
        <div className="bg-white rounded-xl shadow-xl border border-[#d5e8f1] overflow-hidden">

          <div className="h-1.5 bg-gradient-to-r from-[#3385AA] to-[#317FA4]" />

          <div className="px-4 sm:px-8 py-6 sm:py-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 w-14 h-14 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-[#3385AA] to-[#1e6080]">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-[#317FA4]">Register as a Trainer</h1>
              <p className="text-gray-500 text-sm mt-1">Share your expertise with thousands of students</p>
            </div>

            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required>
                  <input type="text" value={form.fullName} onChange={e => set('fullName', e.target.value)} required placeholder="Rajesh Kumar" className={inputCls} />
                </Field>
                <Field label="Phone Number" required>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} required placeholder="+91 98765 43210" className={inputCls} />
                </Field>
              </div>

              <Field label="Email Address" required>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required placeholder="trainer@example.com" className={inputCls} />
              </Field>

              <Field label="Password" required>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} required
                    placeholder="Min. 8 characters"
                    className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPw
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59" />
                        : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></>
                      }
                    </svg>
                  </button>
                </div>
              </Field>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Professional Details</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Institute / Organisation" required>
                  <input type="text" value={form.instituteName} onChange={e => set('instituteName', e.target.value)} required placeholder="ABC Training Institute" className={inputCls} />
                </Field>
                <Field label="Specialization" required>
                  <select value={form.specialization} onChange={e => set('specialization', e.target.value)} required className={inputCls}>
                    <option value="">Select subject</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Experience" required>
                  <select value={form.experience} onChange={e => set('experience', e.target.value)} required className={inputCls}>
                    <option value="">Select years</option>
                    {['Less than 1 year', '1-2 years', '3-5 years', '5-10 years', '10+ years'].map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </Field>
                <Field label="Highest Qualification" required>
                  <select value={form.qualification} onChange={e => set('qualification', e.target.value)} required className={inputCls}>
                    <option value="">Select</option>
                    {["Bachelor's Degree", "Master's Degree", 'PhD', 'Diploma', 'Professional Certification'].map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Short Bio">
                <textarea value={form.bio} onChange={e => set('bio', e.target.value)} rows={3}
                  placeholder="Tell students about yourself and your teaching style..."
                  className={`${inputCls} resize-none`} />
              </Field>

              <Field label="LinkedIn Profile (optional)">
                <input type="url" value={form.linkedin} onChange={e => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/yourname" className={inputCls} />
              </Field>

              <button type="submit" disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-[#3385AA] to-[#317FA4] text-white font-bold text-sm rounded-lg hover:from-[#3385AA] hover:to-[#317FA4] active:scale-[0.98] transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
                {loading
                  ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating Account...</>
                  : 'Create Trainer Account'
                }
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-sm text-gray-500">
                Already registered?{' '}
                <Link to="/trainer/login" className="text-[#3385AA] font-bold hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
