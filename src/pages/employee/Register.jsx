import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerCompany } from '../../services/companyApi'

export default function EmployerRegister() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  // Basic Employer Details
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  // Company Information
  const [companyName, setCompanyName] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [industryType, setIndustryType] = useState('')
  const [companySize, setCompanySize] = useState('')

  // Business & Legal Details
  const [gstNumber, setGstNumber] = useState('')
  const [panNumber, setPanNumber] = useState('')
  const [cinNumber, setCinNumber] = useState('')
  const [yearEstablished, setYearEstablished] = useState('')
  const [website, setWebsite] = useState('')

  // Location
  const [country, setCountry] = useState('')
  const [stateVal, setStateVal] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')

  // About Company
  const [description, setDescription] = useState('')
  const [logoFile, setLogoFile] = useState(null)

  // Documents
  const [gstCert, setGstCert] = useState(null)
  const [regCert, setRegCert] = useState(null)
  const [panCard, setPanCard] = useState(null)

  // Verification
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('fullName', name)
      fd.append('designation', designation)
      fd.append('email', email)
      fd.append('mobileNumber', mobile)
      fd.append('password', password)
      fd.append('companyName', companyName)
      fd.append('companyType', companyType)
      fd.append('industryType', industryType)
      fd.append('companySize', companySize.replace('–', '-'))
      if (gstNumber) fd.append('gstNumber', gstNumber)
      fd.append('panNumber', panNumber)
      fd.append('cinNumber', cinNumber)
      fd.append('yearOfEstablishment', yearEstablished)
      if (website) fd.append('companyWebsite', website)
      fd.append('country', country)
      fd.append('state', stateVal)
      fd.append('city', city)
      fd.append('pincode', pincode)
      fd.append('officeAddress', address)
      fd.append('acceptTerms', terms)
      fd.append('acceptPrivacyPolicy', privacy)
      if (logoFile) fd.append('companyLogo', logoFile)
      if (gstCert) fd.append('gstCertificate', gstCert)
      if (regCert) fd.append('companyRegistrationCertificate', regCert)
      if (panCard) fd.append('panCardFile', panCard)
      await registerCompany(fd)
      navigate('/employee/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const SectionHeader = ({ title, icon }) => (
    <div className="flex items-center gap-2 pt-4 pb-1">
      <div className="w-7 h-7 bg-gradient-to-br from-[#317FA4] to-[#317FA4] rounded-md flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-xs font-bold text-[#317FA4] uppercase tracking-widest">{title}</h3>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  )

  const inputClass =
    'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#317FA4] focus:border-transparent transition-all bg-white placeholder-gray-400 text-sm'
  const selectClass =
    'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#317FA4] focus:border-transparent transition-all bg-white text-sm cursor-pointer'

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-2xl px-4">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-gray-100">

            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-[#317FA4] to-[#317FA4] rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Employer Registration</h2>
              <p className="text-gray-500 text-sm">Register your company on SabkaPlacement</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-3">

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              {/* ── SECTION 1: Basic Employer Details ── */}
              <SectionHeader title="Basic Employer Details" icon={<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Employer / HR Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  required className={inputClass} placeholder="Enter HR / Recruiter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Designation <span className="text-red-500">*</span>
                </label>
                <select value={designation} onChange={(e) => setDesignation(e.target.value)} required className={selectClass}>
                  <option value="">Select Designation</option>
                  <option>HR Manager</option>
                  <option>Recruiter</option>
                  <option>Founder</option>
                  <option>Co-Founder</option>
                  <option>Talent Acquisition Lead</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Official Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    required className={inputClass} placeholder="official@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)}
                    required maxLength={10} className={inputClass} placeholder="10-digit mobile number"
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
                    required minLength={8}
                    className={`${inputClass} pr-10`}
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

              <SectionHeader title="Company Information" icon={<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                  required className={inputClass} placeholder="Enter your company name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Company Type <span className="text-red-500">*</span>
                  </label>
                  <select value={companyType} onChange={(e) => setCompanyType(e.target.value)} required className={selectClass}>
                    <option value="">Select Company Type</option>
                    <option>Private</option>
                    <option>Startup</option>
                    <option>NGO</option>
                    <option>Public Limited</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Industry Type <span className="text-red-500">*</span>
                  </label>
                  <select value={industryType} onChange={(e) => setIndustryType(e.target.value)} required className={selectClass}>
                    <option value="">Select Industry</option>
                    <option>IT / Software</option>
                    <option>Marketing / Advertising</option>
                    <option>Healthcare / Pharma</option>
                    <option>Finance & Banking</option>
                    <option>Education</option>
                    <option>Manufacturing</option>
                    <option>Retail & E-commerce</option>
                    <option>Telecom</option>
                    <option>Real Estate</option>
                    <option>Logistics</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Company Size <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['1–10', '10–50', '50–200', '200+'].map((size) => (
                    <button
                      key={size} type="button" onClick={() => setCompanySize(size)}
                      className={`py-2 rounded-lg border text-xs font-semibold transition-all ${
                        companySize === size
                          ? 'border-[#317FA4] bg-[#317FA4] text-white shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-[#317FA4]/50 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── SECTION 3: Business & Legal Details ── */}
              <SectionHeader title="Business & Legal Details" icon={<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    GST Number{' '}
                    <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text" value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    maxLength={15} className={inputClass} placeholder="15-digit GST number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    required maxLength={10} className={inputClass} placeholder="ABCDE1234F"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Company Registration No. (CIN) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" value={cinNumber}
                    onChange={(e) => setCinNumber(e.target.value.toUpperCase())}
                    required className={inputClass} placeholder="e.g. U72900MH2015PTC123456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Year of Establishment <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number" value={yearEstablished}
                    onChange={(e) => setYearEstablished(e.target.value)}
                    required min={1800} max={new Date().getFullYear()}
                    className={inputClass} placeholder={`e.g. 2015`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Company Website</label>
                <input
                  type="url" value={website} onChange={(e) => setWebsite(e.target.value)}
                  className={inputClass} placeholder="https://www.yourcompany.com"
                />
              </div>

              {/* ── SECTION 4: Location ── */}
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
                    required className={inputClass} placeholder="Enter state"
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
                    required className={inputClass} placeholder="Enter city"
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
                  Office Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={address} onChange={(e) => setAddress(e.target.value)}
                  required rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#317FA4] focus:border-transparent transition-all bg-white placeholder-gray-400 text-sm resize-none"
                  placeholder="Enter full office address"
                />
              </div>

              {/* ── SECTION 5: Upload Documents ── */}
              <SectionHeader title="Upload Documents" icon={<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>} />

              <div className="space-y-2">
                {[
                  { label: 'GST Certificate', file: gstCert, setter: setGstCert, id: 'gst-cert', required: false },
                  { label: 'Company Registration Certificate', file: regCert, setter: setRegCert, id: 'reg-cert', required: true },
                  { label: 'PAN Card', file: panCard, setter: setPanCard, id: 'pan-card', required: true },
                ].map(({ label, file, setter, id, required }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        {label}{' '}
                        {required
                          ? <span className="text-red-500">*</span>
                          : <span className="text-gray-400 font-normal text-xs">(Optional)</span>}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {file ? file.name : 'PDF, JPG, PNG — max 5 MB'}
                      </p>
                    </div>
                    <label
                      htmlFor={id}
                      className="cursor-pointer px-4 py-1.5 bg-white border border-gray-300 hover:border-[#317FA4] text-gray-700 hover:text-[#317FA4] text-xs font-semibold rounded-lg transition-all"
                    >
                      {file ? 'Change' : 'Upload'}
                      <input
                        type="file" id={id} accept=".pdf,.jpg,.jpeg,.png"
                        required={required}
                        onChange={(e) => setter(e.target.files[0])} className="hidden"
                      />
                    </label>
                  </div>
                ))}
              </div>

              {/* Terms & Privacy */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox" id="terms" checked={terms}
                    onChange={(e) => setTerms(e.target.checked)} required
                    className="w-4 h-4 mt-0.5 accent-[#317FA4] border-gray-200 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I accept the{' '}
                    <span className="text-[#317FA4] font-semibold cursor-pointer hover:underline">
                      Terms of Service
                    </span>
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox" id="privacy" checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)} required
                    className="w-4 h-4 mt-0.5 accent-[#317FA4] border-gray-200 rounded"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I accept the{' '}
                    <span className="text-[#317FA4] font-semibold cursor-pointer hover:underline">
                      Privacy Policy
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#317FA4] to-[#317FA4] text-white font-semibold rounded-xl hover:from-[#317FA4] hover:to-[#317FA4] transition-all duration-200 shadow-md hover:shadow-lg text-sm mt-1 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Registering...</>
                ) : 'Create Employer Account'}
              </button>
            </form>

            <div className="mt-5 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/employee/login" className="text-[#317FA4] font-semibold hover:underline">
                  Employer Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


