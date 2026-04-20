import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerCandidate } from '../../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  // Personal Details
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Location
  const [country, setCountry] = useState('')
  const [stateVal, setStateVal] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')

  // Education
  const [qualification, setQualification] = useState('')
  const [college, setCollege] = useState('')

  // Skills & Experience
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState([])
  const [expType, setExpType] = useState('')
  const [expYears, setExpYears] = useState('')

  // Job Preferences
  const [preferredLocation, setPreferredLocation] = useState('')
  const [jobType, setJobType] = useState('')

  // Documents
  const [resumeFile, setResumeFile] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  // Verification
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const s = skillInput.trim().replace(/,$/, '')
      if (s && !skills.includes(s)) setSkills([...skills, s])
      setSkillInput('')
    }
  }
  const removeSkill = (s) => setSkills(skills.filter((x) => x !== s))

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const [regError, setRegError] = useState('')
  const [regLoading, setRegLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegError('')
    setRegLoading(true)
    try {
      const normalizedSkills = [...skills]
      if (skillInput.trim()) {
        normalizedSkills.push(skillInput.trim().replace(/,$/, ''))
      }

      if (normalizedSkills.length === 0) throw new Error('Please add at least one skill')

      const fd = new FormData()
      fd.append('fullName', name)
      fd.append('dateOfBirth', dob)
      fd.append('gender', gender)
      fd.append('mobileNumber', mobile)
      fd.append('email', email)
      fd.append('password', password)
      fd.append('location[country]', country)
      fd.append('location[state]', stateVal)
      fd.append('location[city]', city)
      fd.append('location[fullAddress]', address)
      fd.append('location[pincode]', pincode)
      fd.append('highestQualification', qualification)
      fd.append('collegeName', college)
      fd.append('skills', JSON.stringify(normalizedSkills))
      fd.append('workExperience', expType === 'Experienced' ? expYears : 'Fresher')
      fd.append('preferredJobLocation', preferredLocation)
      fd.append('jobType', jobType)
      fd.append('acceptTerms', terms ? 'true' : 'false')
      fd.append('acceptPrivacyPolicy', privacy ? 'true' : 'false')
      if (resumeFile) fd.append('resume', resumeFile)

      await registerCandidate(fd)
      navigate('/login', { state: { message: 'Registration successful, please login' } })
    } catch (err) {
      setRegError(err.message)
    } finally {
      setRegLoading(false)
    }
  }

  const SectionHeader = ({ title, icon }) => (
    <div className="flex items-center gap-2 pt-4 pb-1">
      <div className="w-7 h-7 bg-gradient-to-br from-[#3283A7] to-[#1e6080] rounded-md flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-xs font-bold text-[#3283A7] uppercase tracking-widest">{title}</h3>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  )

  const inputClass =
    'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3283A7] focus:border-transparent transition-all bg-white placeholder-gray-400 text-sm'
  const selectClass =
    'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3283A7] focus:border-transparent transition-all bg-white text-sm cursor-pointer'

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-2xl px-4">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-gray-100">

            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-[#3283A7] to-[#1e6080] rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Candidate Registration</h2>
              <p className="text-gray-500 text-sm">Start your career journey with SabkaPlacement</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-3">

              {/* -- SECTION 1: Personal Details -- */}
              <SectionHeader title="Personal Details" icon={<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  required className={inputClass} placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date" value={dob} onChange={(e) => setDob(e.target.value)}
                    required max={new Date().toISOString().split('T')[0]}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2 pt-1">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <button
                        key={g} type="button" onClick={() => setGender(g)}
                        className={`flex-1 py-2 rounded-lg border text-xs font-semibold transition-all ${
                          gender === g
                            ? 'border-[#3385AA] bg-[#3385AA] text-white shadow-sm'
                            : 'border-gray-200 text-gray-600 hover:border-[#3385AA]/50 bg-white'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)}
                    required maxLength={10} className={inputClass} placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    required className={inputClass} placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required minLength={8} className={`${inputClass} pr-10`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      ) : (
                        <>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters</p>
              </div>

              {/* -- SECTION 2: Location -- */}
              <SectionHeader title="Location" icon={<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} required className={selectClass}>
                    <option value="">Select Country</option>
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>UAE</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" value={stateVal} onChange={(e) => setStateVal(e.target.value)}
                    required className={inputClass} placeholder="Enter your state"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" value={city} onChange={(e) => setCity(e.target.value)}
                    required className={inputClass} placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" value={pincode} onChange={(e) => setPincode(e.target.value)}
                    required maxLength={6} className={inputClass} placeholder="6-digit pincode"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={address} onChange={(e) => setAddress(e.target.value)}
                  required rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3385AA] focus:border-transparent transition-all bg-white placeholder-gray-400 text-sm resize-none"
                  placeholder="Enter your full residential address"
                />
              </div>

              {/* -- SECTION 3: Education -- */}
              <SectionHeader title="Education" icon={<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>} />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Highest Qualification <span className="text-red-500">*</span>
                </label>
                <select value={qualification} onChange={(e) => setQualification(e.target.value)} required className={selectClass}>
                  <option value="">Select Qualification</option>
                  <option>10th / SSC</option>
                  <option>12th / HSC</option>
                  <option>Diploma</option>
                  <option>Bachelor's Degree (B.Tech / B.E / B.Sc / B.Com / BA)</option>
                  <option>Master's Degree (M.Tech / M.E / M.Sc / MBA / MA)</option>
                  <option>PhD / Doctorate</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  College / University Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" value={college} onChange={(e) => setCollege(e.target.value)}
                  required className={inputClass} placeholder="e.g. IIT Bombay, Mumbai University"
                />
              </div>

              {/* -- SECTION 4: Skills & Experience -- */}
              <SectionHeader title="Skills & Experience" icon={<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Skills <span className="text-red-500">*</span>
                  <span className="text-gray-400 font-normal ml-1 text-xs">(Press Enter or comma to add)</span>
                </label>
                <div className="border border-gray-200 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-[#3385AA] min-h-[42px] flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="flex items-center gap-1 bg-[#3385AA] text-white text-xs px-2.5 py-1 rounded-full font-medium"
                    >
                      {s}
                      <button type="button" onClick={() => removeSkill(s)} className="hover:text-red-300 transition-colors text-xs leading-none">�</button>
                    </span>
                  ))}
                  <input
                    type="text" value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    className="flex-1 min-w-[120px] outline-none text-sm placeholder-gray-400 bg-transparent"
                    placeholder={skills.length === 0 ? 'e.g. Java, Marketing, Sales' : ''}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Example: Java, React, Marketing, Sales, Communication</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Work Experience <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 mb-2">
                  {['Fresher', 'Experienced'].map((t) => (
                    <button
                      key={t} type="button" onClick={() => setExpType(t)}
                      className={`flex-1 py-2 rounded-lg border text-xs font-semibold transition-all ${
                        expType === t
                          ? 'border-[#3385AA] bg-[#3385AA] text-white shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-[#3385AA]/50 bg-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {expType === 'Experienced' && (
                  <select value={expYears} onChange={(e) => setExpYears(e.target.value)} required className={selectClass}>
                    <option value="">Select Years of Experience</option>
                    <option>Less than 1 Year</option>
                    <option>1�2 Years</option>
                    <option>2�3 Years</option>
                    <option>3�5 Years</option>
                    <option>5�7 Years</option>
                    <option>7�10 Years</option>
                    <option>10+ Years</option>
                  </select>
                )}
              </div>

              {/* -- SECTION 5: Job Preferences -- */}
              <SectionHeader title="Job Preferences" icon={<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>} />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Job Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" value={preferredLocation} onChange={(e) => setPreferredLocation(e.target.value)}
                  required className={inputClass} placeholder="e.g. Mumbai, Pune, Bangalore, Remote"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Full Time', 'Part Time', 'Internship', 'Remote', 'Hybrid'].map((t) => (
                    <button
                      key={t} type="button" onClick={() => setJobType(t)}
                      className={`py-2 rounded-lg border text-xs font-semibold transition-all ${
                        jobType === t
                          ? 'border-[#3385AA] bg-[#3385AA] text-white shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-[#3385AA]/50 bg-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* -- SECTION 6: Documents -- */}
              <SectionHeader title="Documents" icon={<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Upload Resume <span className="text-red-500">*</span>
                </label>
                <label
                  htmlFor="resume-upload"
                  className="flex items-center justify-between border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-[#3385AA]/40 hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        {resumeFile ? resumeFile.name : 'Choose your resume'}
                      </p>
                      <p className="text-xs text-gray-400">PDF or DOC � max 5 MB</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#3283A7] to-[#1e6080] text-white text-xs font-semibold rounded-lg shadow-sm transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    {resumeFile ? 'Change' : 'Upload'}
                  </span>
                  <input
                    type="file" id="resume-upload" accept=".pdf,.doc,.docx"
                    required onChange={(e) => setResumeFile(e.target.files[0])} className="hidden"
                  />
                </label>
              </div>

              {/* Terms & Privacy */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox" id="terms" checked={terms}
                    onChange={(e) => setTerms(e.target.checked)} required
                    className="w-4 h-4 mt-0.5 accent-[#3385AA] border-gray-200 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I accept the{' '}
                    <span className="text-[#3385AA] font-semibold cursor-pointer hover:underline">Terms &amp; Conditions</span>
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox" id="privacy" checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)} required
                    className="w-4 h-4 mt-0.5 accent-[#3385AA] border-gray-200 rounded"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I accept the{' '}
                    <span className="text-[#3385AA] font-semibold cursor-pointer hover:underline">Privacy Policy</span>
                  </label>
                </div>
              </div>

              {regError && <p className="text-red-500 text-sm text-center">{regError}</p>}

              {/* Submit */}
              <button
                type="submit"
                disabled={regLoading}
                className="w-full py-3 bg-gradient-to-r from-[#3385AA] to-[#1e6080] text-white font-semibold rounded-xl hover:from-[#1e6080] hover:to-[#3385AA] transition-all duration-200 shadow-md hover:shadow-lg text-sm mt-1 disabled:opacity-60"
              >
                {regLoading ? 'Creating Account...' : 'Create Candidate Account'}
              </button>

              {/* Divider */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">OR SIGN UP WITH</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  Continue with LinkedIn
                </button>
              </div>
            </form>

            <div className="mt-5 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#3385AA] font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

