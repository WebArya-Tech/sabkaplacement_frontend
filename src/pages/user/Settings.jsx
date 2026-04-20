import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

function Toast({ msg, onClose }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-[#317FA4] text-white text-sm font-semibold px-4 py-3 rounded-2xl shadow-2xl max-w-[90vw]">
      <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="flex-1 text-sm">{msg}</span>
      <button onClick={onClose} className="ml-1 text-white/60 hover:text-white flex-shrink-0">?</button>
    </div>
  );
}

function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-[#eaf4f8] flex items-center justify-center text-[#3385AA] flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-sm font-bold text-[#317FA4]">{title}</h2>
      </div>
      <div className="px-4 sm:px-5 py-4 space-y-4">{children}</div>
    </div>
  );
}

const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all bg-white";

function PwInput({ value, onChange, show, toggle, placeholder }) {
  return (
    <div className="relative">
      <input type={show ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder}
        className={inputCls} />
      <button type="button" onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {show
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
          }
        </svg>
      </button>
    </div>
  );
}

function ToggleRow({ label, sub, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{sub}</p>}
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

export default function Settings() {
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // Account
  const [email, setEmail]           = useState("snehl9582@gmail.com");
  const [phone, setPhone]           = useState("+91 9876543210");
  const [password, setPassword]     = useState("");
  const [newPass, setNewPass]       = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [showNew, setShowNew]       = useState(false);
  const [showConf, setShowConf]     = useState(false);

  // Notifications

  const [notif, setNotif] = useState({
    jobAlerts:  true,
    appUpdates: true,
    messages:   false,
    newsletter: true,
    reminders:  true,
    smsAlerts:  false,
  });

  const handleSaveAccount = () => {
    if (newPass && newPass !== confirmPass) { showToast("Passwords do not match!"); return; }
    if (newPass && newPass.length < 6) { showToast("Password must be at least 6 characters"); return; }
    showToast("Account settings saved");
    setPassword(""); setNewPass(""); setConfirmPass("");
  };

  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <CopyNavbar />
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-[72px] sm:pt-[80px] pb-16">

        {/* Header */}
        <div className="pt-2 pb-5">
          <div className="relative flex items-center justify-center mb-1">
            <Link to="/user/profile"
              className="absolute left-0 p-1.5 rounded-lg text-gray-400 hover:text-[#3385AA] hover:bg-[#eaf4f8] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 text-center">Settings</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1 text-center">Manage your account and notification preferences.</p>
        </div>

        <div className="space-y-4">

          {/* -- Account -- */}
          <SectionCard
            title="Account"
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)}
                  type="email" className={inputCls} placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                <input value={phone} onChange={e => setPhone(e.target.value)}
                  type="tel" className={inputCls} placeholder="+91 9876543210" />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-700 mb-3">Change Password</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Current</label>
                  <PwInput value={password} onChange={e => setPassword(e.target.value)}
                    show={showPw} toggle={() => setShowPw(!showPw)} placeholder="ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">New</label>
                  <PwInput value={newPass} onChange={e => setNewPass(e.target.value)}
                    show={showNew} toggle={() => setShowNew(!showNew)} placeholder="ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Confirm</label>
                  <PwInput value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                    show={showConf} toggle={() => setShowConf(!showConf)} placeholder="ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button onClick={handleSaveAccount}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#3385AA] rounded-xl hover:bg-[#317FA4] transition-colors">
                Save Changes
              </button>
            </div>
          </SectionCard>

          {/* -- Notifications -- */}
          <SectionCard
            title="Notifications"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
          >
            <ToggleRow label="Job Alerts" sub="Get notified about new matching jobs" checked={notif.jobAlerts} onChange={v => setNotif({ ...notif, jobAlerts: v })} />
            <ToggleRow label="Application Updates" sub="Track status of your job applications" checked={notif.appUpdates} onChange={v => setNotif({ ...notif, appUpdates: v })} />
            <ToggleRow label="Messages" sub="Receive direct messages from employers" checked={notif.messages} onChange={v => setNotif({ ...notif, messages: v })} />
            <ToggleRow label="Newsletter & Tips" sub="Weekly career tips and platform updates" checked={notif.newsletter} onChange={v => setNotif({ ...notif, newsletter: v })} />
            <ToggleRow label="Interview Reminders" sub="Remind me before scheduled interviews" checked={notif.reminders} onChange={v => setNotif({ ...notif, reminders: v })} />
            <ToggleRow label="SMS Alerts" sub="Receive alerts via SMS on your phone" checked={notif.smsAlerts} onChange={v => setNotif({ ...notif, smsAlerts: v })} />
            <div className="flex justify-end pt-1">
              <button onClick={() => showToast("Notification preferences saved")}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#3385AA] rounded-xl hover:bg-[#317FA4] transition-colors">
                Save Preferences
              </button>
            </div>
          </SectionCard>

                          <button onClick={() => showToast("Please contact support to delete your account")}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors">
                  Delete Account
                </button>
              </div>
           
      </main>

      <Footer />
    </div>
  );
}
