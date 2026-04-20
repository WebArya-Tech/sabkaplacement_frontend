import { useState, useEffect } from 'react'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'
import { getCompanyProfile, updateCompanyProfile } from '../../services/companyApi'

const INP = "w-full rounded-lg border border-[#d6eaf2] px-3 py-2.5 text-sm outline-none focus:border-[#317FA4] focus:ring-2 focus:ring-[#eaf4f8] bg-white"
const LBL = "mb-1 block text-xs font-bold text-[#317FA4] uppercase tracking-wide"

export default function CompanyProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({})
  const [saved, setSaved] = useState(false)

  const mapProfileToDraft = (data = {}) => ({
    companyName: data.company?.companyName || data.companyName || '',
    tagline: data.tagline || '',
    industry: data.company?.industryType || data.industry || '',
    location: data.location?.city || data.locationText || '',
    phone: data.mobileNumber || data.phone || '',
    email: data.userId?.email || data.email || '',
    website: data.business?.companyWebsite || data.website || '',
    about: data.about || '',
    companyType: data.company?.companyType || '',
    companySize: data.company?.companySize || '',
    gstNumber: data.business?.gstNumber || '',
    panNumber: data.business?.panNumber || '',
    cinNumber: data.business?.cinNumber || '',
    yearOfEstablishment: data.business?.yearOfEstablishment || '',
    country: data.location?.country || '',
    state: data.location?.state || '',
    city: data.location?.city || '',
    pincode: data.location?.pincode || '',
    officeAddress: data.location?.officeAddress || '',
  })

  useEffect(() => {
    getCompanyProfile()
      .then(data => {
        setProfile(data)
        setDraft(mapProfileToDraft(data))
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const startEdit = () => { setDraft(mapProfileToDraft(profile)); setEditing(true) }
  const cancelEdit = () => setEditing(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setDraft(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        company: {
          companyName: draft.companyName,
          companyType: draft.companyType,
          industryType: draft.industry,
          companySize: draft.companySize,
        },
        business: {
          gstNumber: draft.gstNumber || '',
          panNumber: draft.panNumber,
          cinNumber: draft.cinNumber,
          yearOfEstablishment: draft.yearOfEstablishment ? Number(draft.yearOfEstablishment) : undefined,
          companyWebsite: draft.website || '',
        },
        location: {
          country: draft.country,
          state: draft.state,
          city: draft.city || draft.location,
          pincode: draft.pincode,
          officeAddress: draft.officeAddress,
        },
      }
      const updated = await updateCompanyProfile(payload)
      setProfile(updated)
      setDraft(mapProfileToDraft(updated))
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg className="w-8 h-8 animate-spin text-[#317FA4]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
    </div>
  )

  if (error && !profile) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#dc2626' }}>{error}</p>
    </div>
  )

  const initials = (profile?.companyName || '')
    .split(' ').filter(Boolean).slice(0, 2)
    .map(w => w[0].toUpperCase()).join('')

  if (!editing) {
    return (
      <div style={{ minHeight: '100vh', background: '#f0f5fb', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <EmployeeNavbar />
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '28px 16px 48px' }}>
          {saved && (
            <div style={{ marginBottom: 16, background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 10, padding: '10px 16px', color: '#15803d', fontSize: '0.85rem', fontWeight: 700 }}>
              Profile updated successfully!
            </div>
          )}
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #dde8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <div style={{ height: 100, background: 'linear-gradient(135deg, #0c2d48 0%, #317FA4 60%, #2a6494 100%)', position: 'relative', borderRadius: '20px 20px 0 0' }}>
              <button onClick={startEdit}
                style={{ position: 'absolute', top: 14, right: 16, padding: '7px 18px', background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 8, fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
                Edit Profile
              </button>
            </div>
            <div style={{ padding: '0 28px 24px' }}>
              <div style={{ marginTop: -36, marginBottom: 14, position: 'relative', zIndex: 10 }}>
                <div style={{ width: 72, height: 72, borderRadius: 16, background: 'linear-gradient(135deg,#317FA4,#2a6494)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.3rem', border: '4px solid #fff', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
                  {initials}
                </div>
              </div>
              <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#317FA4' }}>{profile.company?.companyName || profile.companyName}</h1>
              {profile.tagline && <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#2a6494', fontStyle: 'italic', fontWeight: 600 }}>{profile.tagline}</p>}
            </div>
            <div style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {profile.about && (
                <div>
                  <p style={{ margin: '0 0 6px', fontSize: '0.7rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em' }}>About</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151', lineHeight: 1.65 }}>{profile.about}</p>
                </div>
              )}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                {(profile.mobileNumber || profile.phone) && <div style={{ fontSize: '0.85rem', color: '#374151' }}><strong style={{ color: '#317FA4' }}>Phone:</strong> {profile.mobileNumber || profile.phone}</div>}
                {(profile.userId?.email || profile.email) && <div style={{ fontSize: '0.85rem', color: '#374151' }}><strong style={{ color: '#317FA4' }}>Email:</strong> {profile.userId?.email || profile.email}</div>}
                {(profile.business?.companyWebsite || profile.website) && <div style={{ fontSize: '0.85rem' }}><strong style={{ color: '#317FA4' }}>Website:</strong> <a href={profile.business?.companyWebsite || profile.website} target="_blank" rel="noopener noreferrer" style={{ color: '#317FA4' }}>{(profile.business?.companyWebsite || profile.website).replace(/^https?:\/\//, '')}</a></div>}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f5fb', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <EmployeeNavbar />
      <div style={{ background: 'linear-gradient(135deg, #0c2d48 0%, #317FA4 100%)', padding: '22px 24px 20px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <h1 style={{ margin: 0, color: '#fff', fontSize: '1.3rem', fontWeight: 800 }}>Edit Company Profile</h1>
          <button onClick={cancelEdit} style={{ padding: '7px 18px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: 8, fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Back</button>
        </div>
      </div>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '24px 16px 48px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {error && <p style={{ color: '#dc2626', fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #dde8f0', padding: '22px 24px' }}>
            <p style={{ margin: '0 0 16px', fontSize: '0.78rem', fontWeight: 800, color: '#317FA4', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Basic Information</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><label className={LBL}>Company Name *</label><input name="companyName" value={draft.companyName} onChange={handleChange} className={INP} /></div>
              <div><label className={LBL}>Tagline</label><input name="tagline" value={draft.tagline || ''} onChange={handleChange} className={INP} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={LBL}>Industry</label><input name="industry" value={draft.industry || ''} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>Location</label><input name="location" value={draft.location || ''} onChange={handleChange} className={INP} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={LBL}>Company Type</label><input name="companyType" value={draft.companyType || ''} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>Company Size</label><input name="companySize" value={draft.companySize || ''} onChange={handleChange} className={INP} placeholder="1-10 / 10-50 / 50-200 / 200+" /></div>
              </div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #dde8f0', padding: '22px 24px' }}>
            <p style={{ margin: '0 0 16px', fontSize: '0.78rem', fontWeight: 800, color: '#317FA4', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={LBL}>Phone</label><input name="phone" value={draft.phone || ''} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>Email</label><input name="email" value={draft.email || ''} onChange={handleChange} className={INP} disabled /></div>
              </div>
              <div><label className={LBL}>Website</label><input name="website" value={draft.website || ''} onChange={handleChange} className={INP} /></div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #dde8f0', padding: '22px 24px' }}>
            <p style={{ margin: '0 0 16px', fontSize: '0.78rem', fontWeight: 800, color: '#317FA4', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Business and Location</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={LBL}>GST Number</label><input name="gstNumber" value={draft.gstNumber || ''} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>PAN Number</label><input name="panNumber" value={draft.panNumber || ''} onChange={handleChange} className={INP} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={LBL}>CIN Number</label><input name="cinNumber" value={draft.cinNumber || ''} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>Year Of Establishment</label><input name="yearOfEstablishment" value={draft.yearOfEstablishment || ''} onChange={handleChange} className={INP} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><label className={LBL}>Country</label><input name="country" value={draft.country || ''} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>State</label><input name="state" value={draft.state || ''} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>City</label><input name="city" value={draft.city || ''} onChange={handleChange} className={INP} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={LBL}>Pincode</label><input name="pincode" value={draft.pincode || ''} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>Office Address</label><input name="officeAddress" value={draft.officeAddress || ''} onChange={handleChange} className={INP} /></div>
              </div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #dde8f0', padding: '22px 24px' }}>
            <p style={{ margin: '0 0 16px', fontSize: '0.78rem', fontWeight: 800, color: '#317FA4', textTransform: 'uppercase', letterSpacing: '0.07em' }}>About</p>
            <textarea rows={5} name="about" value={draft.about || ''} onChange={handleChange} className={INP} style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" style={{ padding: '11px 30px', background: 'linear-gradient(135deg,#0c2d48,#317FA4)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Save Changes</button>
            <button type="button" onClick={cancelEdit} style={{ padding: '11px 22px', background: '#fff', color: '#6B7280', border: '1.5px solid #d1d5db', borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
