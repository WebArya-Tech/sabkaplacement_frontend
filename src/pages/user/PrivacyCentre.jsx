import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

function ToggleRow({ label, sub, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? "bg-[#3385AA]" : "bg-gray-200"}`}
      >
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-1"}`} />
      </button>
    </div>
  );
}

function SectionCard({ icon, iconBg, iconColor, title, sub, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-[#317FA4]">{title}</p>
          {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
      </div>
      <div className="px-5 py-2">{children}</div>
    </div>
  );
}

export default function PrivacyCentre() {
  const [saved, setSaved] = useState(false);

  const [visibility, setVisibility] = useState({
    publicProfile: true,
    resumeVisible: false,
    showActivity:  true,
    showInSearch:  true,
  });

  const [dataUsage, setDataUsage] = useState({
    jobRecommendations: true,
    analyticsTracking:  false,
    marketingEmails:    true,
    thirdPartySharing:  false,
  });

  const [communication, setCommunication] = useState({
    allowMessages:   true,
    allowRecruiter:  true,
    allowFollowUp:   false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <CopyNavbar />

      {saved && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-[#317FA4] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl">
          <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Privacy settings saved
          <button onClick={() => setSaved(false)} className="ml-2 text-white/60 hover:text-white">✕</button>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-[72px] sm:pt-[80px] pb-16">

        {/* Header */}
        <div className="pt-2 pb-6">
          <div className="relative flex items-center justify-center mb-1">
            <Link to="/user/profile" className="absolute left-0 p-1.5 rounded-lg text-gray-400 hover:text-[#3385AA] hover:bg-[#eaf4f8] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 text-center">Privacy Centre</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1 text-center">Control how your data is used and who can see your profile.</p>
        </div>

        {/* Info banner */}
        <div className="flex gap-3 items-start bg-[#eaf4f8] border border-[#c2dfe9] rounded-2xl px-4 py-3.5 mb-6">
          <svg className="w-4 h-4 text-[#3385AA] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-[#317FA4] leading-relaxed">
            Your personal information is stored securely and is never sold to third parties. Changes take effect immediately after saving.
          </p>
        </div>

        <div className="space-y-5">

          {/* Profile Visibility */}
          <SectionCard
            iconBg="bg-[#eaf4f8]" iconColor="text-[#3385AA]"
            title="Profile Visibility"
            sub="Control who can find and view your profile"
            icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>}
          >
            <ToggleRow label="Public Profile" sub="Employers and recruiters can view your profile" checked={visibility.publicProfile} onChange={v => setVisibility({ ...visibility, publicProfile: v })} />
            <ToggleRow label="Resume Visibility" sub="Allow recruiters to download your resume" checked={visibility.resumeVisible} onChange={v => setVisibility({ ...visibility, resumeVisible: v })} />
            <ToggleRow label="Show Activity Status" sub="Display when you were last active on the platform" checked={visibility.showActivity} onChange={v => setVisibility({ ...visibility, showActivity: v })} />
            <ToggleRow label="Appear in Search Results" sub="Let your profile appear when employers search candidates" checked={visibility.showInSearch} onChange={v => setVisibility({ ...visibility, showInSearch: v })} />
          </SectionCard>

          {/* Data & Personalisation */}
          <SectionCard
            iconBg="bg-violet-50" iconColor="text-violet-600"
            title="Data & Personalisation"
            sub="Manage how we use your data to improve your experience"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>}
          >
            <ToggleRow label="Personalised Job Recommendations" sub="Use your activity to suggest relevant jobs" checked={dataUsage.jobRecommendations} onChange={v => setDataUsage({ ...dataUsage, jobRecommendations: v })} />
            <ToggleRow label="Analytics & Performance Tracking" sub="Help us improve the platform with anonymous usage data" checked={dataUsage.analyticsTracking} onChange={v => setDataUsage({ ...dataUsage, analyticsTracking: v })} />
            <ToggleRow label="Marketing Emails" sub="Receive promotions, offers and platform news" checked={dataUsage.marketingEmails} onChange={v => setDataUsage({ ...dataUsage, marketingEmails: v })} />
            <ToggleRow label="Third-Party Data Sharing" sub="Share anonymised data with our trusted partners" checked={dataUsage.thirdPartySharing} onChange={v => setDataUsage({ ...dataUsage, thirdPartySharing: v })} />
          </SectionCard>

          {/* Communication Preferences */}
          <SectionCard
            iconBg="bg-emerald-50" iconColor="text-emerald-600"
            title="Communication Preferences"
            sub="Choose who can contact you directly"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>}
          >
            <ToggleRow label="Allow Direct Messages" sub="Employers can send you messages on the platform" checked={communication.allowMessages} onChange={v => setCommunication({ ...communication, allowMessages: v })} />
            <ToggleRow label="Allow Recruiter Outreach" sub="Recruitment agencies can contact you with opportunities" checked={communication.allowRecruiter} onChange={v => setCommunication({ ...communication, allowRecruiter: v })} />
            <ToggleRow label="Allow Follow-up Emails" sub="Receive follow-up emails from companies you applied to" checked={communication.allowFollowUp} onChange={v => setCommunication({ ...communication, allowFollowUp: v })} />
          </SectionCard>

          {/* Save button */}
          <div className="flex justify-end">
            <button onClick={handleSave}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#3385AA] rounded-xl hover:bg-[#317FA4] transition-colors shadow-sm">
              Save All Changes
            </button>
          </div>

          {/* Data Rights */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#317FA4]">Your Data Rights</p>
                <p className="text-xs text-gray-400">Under applicable privacy laws</p>
              </div>
            </div>
            <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Download My Data", desc: "Export a copy of all your personal data", icon: "⬇️" },
                { label: "Request Data Deletion", desc: "Ask us to permanently delete your data", icon: "🗑️" },
                { label: "View Privacy Policy", desc: "Read our full privacy policy document", icon: "📄" },
              ].map(item => (
                <button key={item.label}
                  className="text-left p-3 rounded-xl border border-gray-100 hover:border-[#3385AA] hover:bg-[#eaf4f8] transition-all group">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-xs font-bold text-gray-800 group-hover:text-[#3385AA] mt-1.5 transition-colors">{item.label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

