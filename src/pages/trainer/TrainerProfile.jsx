import { useState, useEffect } from 'react'
import TrainerNavbar from '../../components/TrainerNavbar'
import Footer from '../../components/EmployeeFooter'
import { getTrainerProfile, updateTrainerProfile } from '../../services/trainerApi'

const emptyProfile = {
  name: '', phone: '', email: '', institute: '',
  specialization: '', experience: '', qualification: '',
  bio: '', linkedin: '', website: '',
}

const INP = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all bg-white"
const LBL = "block text-xs font-bold text-[#317FA4] uppercase tracking-wider mb-1.5"

export default function TrainerProfile() {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState(emptyProfile)
  const [draft, setDraft] = useState(emptyProfile)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    getTrainerProfile()
      .then(data => {
        const mapped = {
          name: data.fullName || '',
          phone: data.phoneNumber || '',
          email: data.email || '',
          institute: data.instituteName || '',
          specialization: data.specialization || '',
          experience: data.experience || '',
          qualification: data.highestQualification || '',
          bio: data.shortBio || '',
          linkedin: data.linkedinProfile || '',
          website: data.website || '',
        }
        setProfile(mapped)
        setDraft(mapped)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const set = (k, v) => setDraft(d => ({ ...d, [k]: v }))

  const handleSave = async (e) => {
    e.preventDefault()
    setSaveLoading(true)
    setError('')
    try {
      await updateTrainerProfile({
        fullName: draft.name,
        phoneNumber: draft.phone,
        email: draft.email,
        instituteName: draft.institute,
        specialization: draft.specialization,
        experience: draft.experience,
        highestQualification: draft.qualification,
        shortBio: draft.bio,
        linkedinProfile: draft.linkedin,
        website: draft.website,
      })
      setProfile({ ...draft })
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaveLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f0f6f9] flex items-center justify-center">
      <TrainerNavbar />
      <p className="text-[#317FA4] font-semibold">Loading profile...</p>
    </div>
  )

  const initials = profile.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')

  if (!editing) {
    return (
      <div className="min-h-screen bg-[#f0f6f9]">
        <TrainerNavbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {error && <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3"><p className="text-sm text-red-600 font-semibold">{error}</p></div>}
          {saved && (
            <div className="mb-4 bg-[#eaf4f9] border border-[#b8ddef] rounded-xl p-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#3385AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              <p className="text-sm text-[#317FA4] font-semibold">Profile updated successfully!</p>
            </div>
          )}
          <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm">
            <div className="h-24 bg-gradient-to-r from-[#317FA4] to-[#3385AA] relative rounded-t-2xl">
              <button onClick={() => { setDraft({ ...profile }); setEditing(true) }}
                className="absolute top-3 right-4 px-4 py-1.5 bg-white/15 text-white border border-white/35 rounded-lg text-sm font-semibold hover:bg-white/25 transition-all">
                Edit Profile
              </button>
            </div>
            <div className="px-6 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3385AA] to-[#317FA4] flex items-center justify-center text-white text-xl font-black shadow-lg -mt-8 mb-3 border-4 border-white relative z-10">
                {initials}
              </div>
              <h1 className="text-xl font-black text-[#317FA4]">{profile.name}</h1>
              <p className="text-sm text-[#3385AA] font-semibold mb-1">{profile.institute} &middot; {profile.specialization}</p>
              <p className="text-sm text-gray-500 mb-4">{profile.bio}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Phone', val: profile.phone },
                  { label: 'Email', val: profile.email },
                  { label: 'Qualification', val: profile.qualification },
                  { label: 'Experience', val: profile.experience },
                ].map(item => (
                  <div key={item.label} className="border-b border-gray-100 pb-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-[#317FA4]">{item.val || <span className="text-gray-400">Not set</span>}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <TrainerNavbar />
      <div className="bg-gradient-to-r from-[#317FA4] to-[#317FA4] py-5 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-xl font-black text-white">Edit Profile</h1>
          <button onClick={() => setEditing(false)} className="px-4 py-1.5 bg-white/15 text-white border border-white/35 rounded-lg text-sm font-semibold">Back</button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3"><p className="text-sm text-red-600 font-semibold">{error}</p></div>}
          <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm p-5 sm:p-6">
            <p className="text-xs font-black text-[#317FA4] uppercase tracking-wider pb-3 mb-4 border-b border-[#eaf4f8]">Personal Information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={LBL}>Full Name *</label><input value={draft.name} onChange={e => set('name', e.target.value)} className={INP} /></div>
              <div><label className={LBL}>Phone Number</label><input type="tel" value={draft.phone} onChange={e => set('phone', e.target.value)} className={INP} /></div>
              <div><label className={LBL}>Email Address</label><input type="email" value={draft.email} onChange={e => set('email', e.target.value)} className={INP} /></div>
              <div><label className={LBL}>Institute Name</label><input value={draft.institute} onChange={e => set('institute', e.target.value)} className={INP} /></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm p-5 sm:p-6">
            <p className="text-xs font-black text-[#317FA4] uppercase tracking-wider pb-3 mb-4 border-b border-[#eaf4f8]">Professional Details</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={LBL}>Specialization</label>
                <select value={draft.specialization} onChange={e => set('specialization', e.target.value)} className={INP}>
                  {['Web Development','Data Science','UI/UX Design','Mobile Development','Cloud Computing','Cybersecurity','Machine Learning','DevOps'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className={LBL}>Experience</label>
                <select value={draft.experience} onChange={e => set('experience', e.target.value)} className={INP}>
                  {['Less than 1 year','1-2 years','3-5 years','5-7 years','7 years','7-10 years','10+ years'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className={LBL}>Qualification</label>
                <select value={draft.qualification} onChange={e => set('qualification', e.target.value)} className={INP}>
                  {["Bachelor's Degree","Master's Degree","PhD","Diploma","Professional Certificate"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm p-5 sm:p-6">
            <p className="text-xs font-black text-[#317FA4] uppercase tracking-wider pb-3 mb-4 border-b border-[#eaf4f8]">Bio</p>
            <textarea rows={4} value={draft.bio} onChange={e => set('bio', e.target.value)} className={INP} style={{ resize: 'vertical' }} />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saveLoading} className="px-8 py-3 bg-gradient-to-r from-[#317FA4] to-[#317FA4] text-white text-sm font-bold rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center gap-2">
              {saveLoading ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Saving...</> : 'Save Changes'}
            </button>
            <button type="button" onClick={() => setEditing(false)} className="px-6 py-3 bg-white text-gray-500 border border-gray-200 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all">Cancel</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
