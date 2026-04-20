import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";
import { getProfile, updateProfile } from "../../services/api";

function Toast({ msg, onClose }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-[#317FA4] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl">
      <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      {msg}
      <button onClick={onClose} className="ml-2 text-white/60 hover:text-white">x</button>
    </div>
  );
}

function Modal({ title, onClose, onSave, children }) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-3 sm:mx-0">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-[#317FA4]">{title}</h3>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4 space-y-4">{children}</div>
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 text-sm font-semibold text-white bg-[#3385AA] rounded-xl hover:bg-[#317FA4] transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    {children}
  </div>
);
const Input = (props) => (
  <input {...props} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all" />
);
const SelectEl = ({ children, ...props }) => (
  <select {...props} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all bg-white">
    {children}
  </select>
);
const Textarea = (props) => (
  <textarea {...props} rows={4} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA]/30 focus:border-[#3385AA] transition-all resize-none" />
);

function SectionCard({ title, icon, children, onEdit }) {
  return (
    <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#edf5f9]">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[#eaf4f8] flex items-center justify-center text-[#3385AA]">{icon}</span>
          <h2 className="text-sm sm:text-base font-bold text-[#317FA4]">{title}</h2>
        </div>
        {onEdit && (
          <button onClick={onEdit} className="flex items-center gap-1 text-xs font-semibold text-[#3385AA] hover:text-[#317FA4] px-2 py-1 rounded-lg hover:bg-[#eaf4f8] transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        )}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

const IconBriefcase = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
const IconGrad    = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>);
const IconSkill   = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>);
const IconDoc     = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const IconLang    = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>);
const IconCert    = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>);
const IconPref    = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>);

export default function Profile() {
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const [modal, setModal] = useState(null);
  const closeModal = () => setModal(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError]     = useState('');

  const photoRef  = useRef();
  const resumeRef = useRef();

  const [photoImage, setPhotoImage] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [profileStats, setProfileStats] = useState({ profileViews: 0, applications: 0, interviews: 0, savedJobs: 0 });

  const [info, setInfo] = useState({ name:'', role:'', company:'', qualification:'', location:'', email:'', phone:'' });
  const [draftInfo, setDraftInfo] = useState({});

  const [summary, setSummary] = useState('');
  const [draftSummary, setDraftSummary] = useState('');

  // Fetch profile on mount
  useEffect(() => {
    getProfile()
      .then((data) => {
        setInfo({
          name:          data.fullName                        || '',
          role:          data.workExperience                  || '',
          company:       data.education?.collegeName          || '',
          qualification: data.education?.highestQualification || '',
          location: `${data.location?.city?.trim() || ''}, ${data.location?.state?.trim() || ''}, ${data.location?.country?.trim() || ''}`.replace(/(^,\s*|,\s*$)/g, '').replace(/,\s*,/g, ','),
          email:         data.email                          || '',
          phone:         data.mobileNumber                   || '',
        });
        setSummary(data.summary || '');
        setSkills(Array.isArray(data.skills) ? data.skills : []);
        setExperiences((data.experiences || []).map((e, idx) => ({ id: e._id || idx + 1, ...e })));
        setEducation((data.educationHistory || []).map((e, idx) => ({ id: e._id || idx + 1, ...e })));
        setCerts((data.certifications || []).map((c, idx) => ({ id: c._id || idx + 1, ...c })));
        setLanguages(Array.isArray(data.languages) ? data.languages : []);
        setPrefs({
          jobType: data.preferences?.jobType || '',
          desiredRole: data.preferences?.desiredRole || '',
          ctc: data.preferences?.ctc || '',
          notice: data.preferences?.notice || '',
          city: data.preferences?.city || '',
          relocation: data.preferences?.relocation || '',
        });
        setProfileStats({
          profileViews: data.stats?.profileViews || 0,
          applications: data.stats?.applications || 0,
          interviews: data.stats?.interviews || 0,
          savedJobs: data.stats?.savedJobs || 0,
        });
        if (data.resume)   setResumeName(data.resume)  // full URL/path store karo;
        if (data.photoUrl) setPhotoImage(data.photoUrl);
      })
      .catch((err) => setPageError(err.message))
      .finally(() => setPageLoading(false));
  }, []);

  const [experiences, setExperiences] = useState([]);
  const emptyExp = { role:"", company:"", type:"Full-time", duration:"", location:"", desc:"" };
  const [draftExp, setDraftExp] = useState(emptyExp);
  const [editingExpId, setEditingExpId] = useState(null);

  const [education, setEducation] = useState([]);
  const emptyEdu = { degree:"", institute:"", year:"", grade:"" };
  const [draftEdu, setDraftEdu] = useState(emptyEdu);
  const [editingEduId, setEditingEduId] = useState(null);

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [certs, setCerts] = useState([]);
  const emptyCert = { name:"", issuer:"", year:"" };
  const [draftCert, setDraftCert] = useState(emptyCert);

  const [prefs, setPrefs] = useState({ jobType:"", desiredRole:"", ctc:"", notice:"", city:"", relocation:"" });
  const [draftPrefs, setDraftPrefs] = useState({});

  const [languages, setLanguages] = useState([]);
  const [draftLangs, setDraftLangs] = useState([]);

  const handlePhotoChange = (e) => { const f = e.target.files[0]; if (f) { setPhotoImage(URL.createObjectURL(f)); showToast("Profile photo updated!"); } };
  const handleResumeChange = async (e) => {
    const f = e.target.files[0];
    if (f) {
      setResumeName(f.name);
      setResumeFile(f);
      
      const fd = new FormData();
      fd.append('resume', f);
      
      try {
        const updated = await updateProfile(fd);
        if (updated.resume) {
          setResumeName(updated.resume);
          showToast("Resume uploaded successfully!");
        }
      } catch (err) {
        showToast(err.message || "Failed to upload resume");
      }
    }
  };
  const handleShare = () => { if (navigator.clipboard) navigator.clipboard.writeText(window.location.href).then(() => showToast("Profile link copied!")); else showToast("Profile link copied!"); };
  const handleDownloadCV = () => {
    if (!resumeName) { showToast('No resume uploaded'); return; }
    // agar cloudinary URL hai toh direct use karo, warna localhost se banao
    const url = resumeName.startsWith('http')
      ? resumeName
      : `http://localhost:5000/${resumeName}`
    const a = document.createElement('a')
    a.href = url
    a.download = resumeName.split('/').pop() || 'resume'
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  };

  const buildFormData = (fields) => {
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
    if (resumeFile) fd.append('resume', resumeFile);
    return fd;
  };

  const saveProfile = async () => {
    const merged = { ...info, ...draftInfo };
    try {
      await updateProfile(buildFormData({
        fullName:     merged.name,
        mobileNumber: merged.phone,
        email:        merged.email,
        workExperience: merged.role,
        collegeName:  merged.company,
      }));
      setInfo(merged);
      closeModal();
      showToast('Profile updated!');
    } catch (err) { showToast(err.message); }
  };

  const saveSummary = async () => {
    try {
      await updateProfile(buildFormData({ summary: draftSummary }));
      setSummary(draftSummary);
      closeModal();
      showToast('Summary updated!');
    } catch (err) { showToast(err.message); }
  };
  const saveExp = async () => {
    if (!draftExp.role || !draftExp.company) return;
    const updated = editingExpId
      ? experiences.map(e => e.id === editingExpId ? { ...draftExp, id: editingExpId } : e)
      : [...experiences, { ...draftExp, id: Date.now() }];
    try {
      await updateProfile(buildFormData({ experiences: JSON.stringify(updated.map(({ id, ...rest }) => rest)) }));
      setExperiences(updated);
      closeModal();
      showToast(editingExpId ? "Experience updated!" : "Experience added!");
    } catch (err) { showToast(err.message); }
  };
  const saveEdu = async () => {
    if (!draftEdu.degree || !draftEdu.institute) return;
    const updated = editingEduId
      ? education.map(e => e.id === editingEduId ? { ...draftEdu, id: editingEduId } : e)
      : [...education, { ...draftEdu, id: Date.now() }];
    try {
      await updateProfile(buildFormData({ educationHistory: JSON.stringify(updated.map(({ id, ...rest }) => rest)) }));
      setEducation(updated);
      closeModal();
      showToast(editingEduId ? "Education updated!" : "Education added!");
    } catch (err) { showToast(err.message); }
  };
  const addSkill = async () => {
    const s = newSkill.trim();
    if (s && !skills.includes(s)) {
      const updated = [...skills, s];
      try {
        await updateProfile(buildFormData({ skills: JSON.stringify(updated) }));
        setSkills(updated);
        showToast(s + " added!");
      } catch (err) { showToast(err.message); }
    }
    setNewSkill(""); closeModal();
  };
  const saveCert = async () => {
    if (!draftCert.name) return;
    const updated = [...certs, { ...draftCert, id: Date.now() }];
    try {
      await updateProfile(buildFormData({ certifications: JSON.stringify(updated.map(({ id, ...rest }) => rest)) }));
      setCerts(updated);
      closeModal();
      showToast("Certification added!");
    } catch (err) { showToast(err.message); }
  };
  const savePrefs = async () => {
    const merged = { ...prefs, ...draftPrefs };
    try {
      await updateProfile(buildFormData({ preferences: JSON.stringify(merged) }));
      setPrefs(merged);
      closeModal();
      showToast("Preferences updated!");
    } catch (err) { showToast(err.message); }
  };
  const saveLangs = async () => {
    try {
      await updateProfile(buildFormData({ languages: JSON.stringify(draftLangs) }));
      setLanguages(draftLangs);
      closeModal();
      showToast("Languages updated!");
    } catch (err) { showToast(err.message); }
  };

  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <CopyNavbar />

      <input ref={photoRef}  type="file" accept="image/*"           className="hidden" onChange={handlePhotoChange} />
      <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx"   className="hidden" onChange={handleResumeChange} />

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {pageLoading && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-[#3385AA] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {pageError && !pageLoading && (
        <div className="max-w-5xl mx-auto px-4 pt-24 text-center">
          <p className="text-red-500 font-semibold">{pageError}</p>
        </div>
      )}

      {modal === "editProfile" && (
        <Modal title="Edit Profile" onClose={closeModal} onSave={saveProfile}>
          <Field label="Full Name"><Input value={draftInfo.name ?? info.name} onChange={e => setDraftInfo({...draftInfo, name:e.target.value})} /></Field>
          <Field label="Work Experience"><Input value={draftInfo.role ?? info.role} onChange={e => setDraftInfo({...draftInfo, role:e.target.value})} /></Field>
          <Field label="College Name"><Input value={draftInfo.company ?? info.company} onChange={e => setDraftInfo({...draftInfo, company:e.target.value})} /></Field>
          <Field label="Qualification"><Input value={draftInfo.qualification ?? info.qualification} onChange={e => setDraftInfo({...draftInfo, qualification:e.target.value})} /></Field>
          <Field label="Location"><Input value={draftInfo.location ?? info.location} onChange={e => setDraftInfo({...draftInfo, location:e.target.value})} /></Field>
          <Field label="Email"><Input type="email" value={draftInfo.email ?? info.email} onChange={e => setDraftInfo({...draftInfo, email:e.target.value})} /></Field>
          <Field label="Phone"><Input value={draftInfo.phone ?? info.phone} onChange={e => setDraftInfo({...draftInfo, phone:e.target.value})} /></Field>
        </Modal>
      )}

      {modal === "editSummary" && (
        <Modal title="Edit Professional Summary" onClose={closeModal} onSave={saveSummary}>
          <Field label="Summary"><Textarea value={draftSummary} onChange={e => setDraftSummary(e.target.value)} /></Field>
        </Modal>
      )}

      {(modal === "addExp" || modal === "editExp") && (
        <Modal title={modal === "editExp" ? "Edit Experience" : "Add Experience"} onClose={closeModal} onSave={saveExp}>
          <Field label="Job Title"><Input value={draftExp.role} onChange={e => setDraftExp({...draftExp, role:e.target.value})} placeholder="e.g. Senior Frontend Developer" /></Field>
          <Field label="Company"><Input value={draftExp.company} onChange={e => setDraftExp({...draftExp, company:e.target.value})} placeholder="e.g. TechNova Labs" /></Field>
          <Field label="Employment Type">
            <SelectEl value={draftExp.type} onChange={e => setDraftExp({...draftExp, type:e.target.value})}>
              {["Full-time","Part-time","Internship","Contract","Freelance"].map(t => <option key={t}>{t}</option>)}
            </SelectEl>
          </Field>
          <Field label="Duration"><Input value={draftExp.duration} onChange={e => setDraftExp({...draftExp, duration:e.target.value})} placeholder="e.g. Jan 2023 - Present" /></Field>
          <Field label="Location"><Input value={draftExp.location} onChange={e => setDraftExp({...draftExp, location:e.target.value})} placeholder="e.g. Bengaluru, India" /></Field>
          <Field label="Description"><Textarea value={draftExp.desc} onChange={e => setDraftExp({...draftExp, desc:e.target.value})} placeholder="Describe your responsibilities..." /></Field>
        </Modal>
      )}

      {(modal === "addEdu" || modal === "editEdu") && (
        <Modal title={modal === "editEdu" ? "Edit Education" : "Add Education"} onClose={closeModal} onSave={saveEdu}>
          <Field label="Degree / Course"><Input value={draftEdu.degree} onChange={e => setDraftEdu({...draftEdu, degree:e.target.value})} placeholder="e.g. B.Tech - Computer Science" /></Field>
          <Field label="Institute"><Input value={draftEdu.institute} onChange={e => setDraftEdu({...draftEdu, institute:e.target.value})} placeholder="e.g. Delhi Technological University" /></Field>
          <Field label="Year"><Input value={draftEdu.year} onChange={e => setDraftEdu({...draftEdu, year:e.target.value})} placeholder="e.g. 2019 - 2023" /></Field>
          <Field label="Grade / CGPA"><Input value={draftEdu.grade} onChange={e => setDraftEdu({...draftEdu, grade:e.target.value})} placeholder="e.g. 8.4 CGPA or 82%" /></Field>
        </Modal>
      )}

      {modal === "addSkill" && (
        <Modal title="Manage Skills" onClose={closeModal} onSave={addSkill}>
          <Field label="Add New Skill">
            <Input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="e.g. Vue.js, Docker, Python..." onKeyDown={e => e.key === "Enter" && addSkill()} autoFocus />
          </Field>
          {skills.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-semibold">Click any skill to remove it</p>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <button key={s} onClick={async () => {
                    const updatedSkills = skills.filter((x) => x !== s);
                    try {
                      await updateProfile(buildFormData({ skills: JSON.stringify(updatedSkills) }));
                      setSkills(updatedSkills);
                      showToast(s + " removed");
                    } catch (err) { showToast(err.message); }
                  }}
                    className="px-3 py-1 bg-[#eaf4f8] text-[#3385AA] text-xs font-semibold rounded-xl border border-[#c5e0ec] hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                    {s} x
                  </button>
                ))}
              </div>
            </div>
          )}
        </Modal>
      )}

      {modal === "addCert" && (
        <Modal title="Add Certification" onClose={closeModal} onSave={saveCert}>
          <Field label="Certification Name"><Input value={draftCert.name} onChange={e => setDraftCert({...draftCert, name:e.target.value})} placeholder="e.g. AWS Solutions Architect" /></Field>
          <Field label="Issuing Organization"><Input value={draftCert.issuer} onChange={e => setDraftCert({...draftCert, issuer:e.target.value})} placeholder="e.g. Amazon Web Services" /></Field>
          <Field label="Year"><Input value={draftCert.year} onChange={e => setDraftCert({...draftCert, year:e.target.value})} placeholder="e.g. 2024" /></Field>
        </Modal>
      )}

      {modal === "editPref" && (
        <Modal title="Edit Job Preferences" onClose={closeModal} onSave={savePrefs}>
          <Field label="Job Type"><Input value={draftPrefs.jobType ?? prefs.jobType} onChange={e => setDraftPrefs({...draftPrefs, jobType:e.target.value})} /></Field>
          <Field label="Desired Role"><Input value={draftPrefs.desiredRole ?? prefs.desiredRole} onChange={e => setDraftPrefs({...draftPrefs, desiredRole:e.target.value})} /></Field>
          <Field label="Expected CTC"><Input value={draftPrefs.ctc ?? prefs.ctc} onChange={e => setDraftPrefs({...draftPrefs, ctc:e.target.value})} /></Field>
          <Field label="Notice Period"><Input value={draftPrefs.notice ?? prefs.notice} onChange={e => setDraftPrefs({...draftPrefs, notice:e.target.value})} /></Field>
          <Field label="Preferred City"><Input value={draftPrefs.city ?? prefs.city} onChange={e => setDraftPrefs({...draftPrefs, city:e.target.value})} /></Field>
          <Field label="Open to Relocation">
            <SelectEl value={draftPrefs.relocation ?? prefs.relocation} onChange={e => setDraftPrefs({...draftPrefs, relocation:e.target.value})}>
              <option>Yes</option><option>No</option>
            </SelectEl>
          </Field>
        </Modal>
      )}

      {modal === "editLang" && (
        <Modal title="Edit Languages" onClose={closeModal} onSave={saveLangs}>
          <div className="space-y-3">
            {draftLangs.map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input value={l.name} onChange={e => { const a=[...draftLangs]; a[i]={...a[i],name:e.target.value}; setDraftLangs(a); }} placeholder="Language" />
                <SelectEl value={l.level} onChange={e => { const a=[...draftLangs]; a[i]={...a[i],level:e.target.value}; setDraftLangs(a); }}>
                  {["Native","Fluent","Professional","Conversational","Basic"].map(v => <option key={v}>{v}</option>)}
                </SelectEl>
                <button onClick={() => setDraftLangs(draftLangs.filter((_,j) => j !== i))} className="flex-shrink-0 p-1.5 text-red-400 hover:text-red-600 bg-red-50 rounded-lg">x</button>
              </div>
            ))}
          </div>
          <button onClick={() => setDraftLangs([...draftLangs, {name:"",level:"Professional"}])}
            className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-[#aad5e6] rounded-xl text-xs font-semibold text-[#3385AA] hover:bg-[#eaf4f8] transition-colors">
            + Add Language
          </button>
        </Modal>
      )}

      <main className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 pt-[70px] sm:pt-[78px] pb-12">{!pageLoading && !pageError && (<>

        <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm overflow-hidden mb-5">
          <div className="h-28 sm:h-36 w-full" style={{ background:"linear-gradient(135deg,#317FA4 0%,#3385AA 55%,#47AEC7 100%)" }} />

          <div className="px-4 sm:px-6 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10 sm:-mt-12">
              <div className="relative inline-block group cursor-pointer" onClick={() => photoRef.current.click()}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#3385AA] to-[#317FA4] border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                  {photoImage
                    ? <img src={photoImage} alt="avatar" className="w-full h-full object-cover" />
                    : <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
                  }
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                  </div>
                </div>

              </div>

              <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                <button onClick={() => { setDraftInfo({...info}); setModal("editProfile"); }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#3385AA] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#317FA4] transition-colors shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Edit Profile
                </button>
                <button onClick={handleDownloadCV}
                  className="flex items-center gap-1.5 px-4 py-2 border border-[#d0e8f0] text-[#3385AA] text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#eaf4f8] transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download CV
                </button>
                <button onClick={handleShare}
                  className="flex items-center gap-1.5 px-4 py-2 border border-[#d0e8f0] text-[#3385AA] text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#eaf4f8] transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  Share
                </button>
              </div>
            </div>

            <div className="mt-3">
              <h1 className="text-xl sm:text-2xl font-black text-[#317FA4]">{info.name}</h1>
              <p className="text-sm text-gray-600 font-medium mt-0.5">{info.role} {info.company ? `· ${info.company}` : ''} {info.qualification ? `· ${info.qualification}` : ''}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {info.location}
                </span>
                <span className="flex items-center gap-1 max-w-[180px] sm:max-w-none">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="truncate">{info.email}</span>
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {info.phone}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4 pt-4 border-t border-[#edf5f9]">
              {[
                { label:"Profile Views", value:String(profileStats.profileViews || 0), to:null },
                { label:"Applications", value:String(profileStats.applications || 0), to:"/employee/applications" },
                { label:"Interviews", value:String(profileStats.interviews || 0), to:null },
                { label:"Saved Jobs", value:String(profileStats.savedJobs || 0), to:"/saved-jobs" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-lg sm:text-2xl font-black text-[#317FA4]">{s.value}</div>
                  {s.to
                    ? <Link to={s.to} className="text-[10px] sm:text-xs text-[#3385AA] hover:underline mt-0.5 block font-semibold">{s.label}</Link>
                    : <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{s.label}</div>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          <div className="space-y-5 lg:col-span-1">

            <SectionCard title="Job Preferences" icon={<IconPref />} onEdit={() => { setDraftPrefs({...prefs}); setModal("editPref"); }}>
              <dl className="space-y-3 text-xs">
                {[
                  ["Job Type", prefs.jobType],
                  ["Desired Role", prefs.desiredRole],
                  ["Expected CTC", prefs.ctc],
                  ["Notice Period", prefs.notice],
                  ["Preferred City", prefs.city],
                  ["Open to Relocation", prefs.relocation],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-2">
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="text-[#317FA4] font-semibold text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </SectionCard>

            <SectionCard title="Languages" icon={<IconLang />} onEdit={() => { setDraftLangs([...languages]); setModal("editLang"); }}>
              <ul className="space-y-2">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#317FA4]">{l.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#eaf4f8] text-[#3385AA] font-semibold text-[10px]">{l.level}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Resume / CV" icon={<IconDoc />} onEdit={() => resumeRef.current.click()}>
              {resumeName ? (
                <div className="flex items-center gap-3 p-3 bg-[#f4f9fc] border border-dashed border-[#aad5e6] rounded-xl">
                  <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#317FA4] truncate">{resumeName.split('/').pop()}</p>
                    <p className="text-[10px] text-gray-400">Ready to use</p>
                  </div>
                  <button onClick={handleDownloadCV} className="flex-shrink-0 p-1 text-[#3385AA] hover:text-[#317FA4]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                </div>
              ) : (
                <button onClick={() => resumeRef.current.click()}
                  className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 border border-dashed border-[#aad5e6] rounded-xl text-xs font-semibold text-[#3385AA] hover:bg-[#eaf4f8] transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Upload New Resume
                </button>
              )}
            </SectionCard>
          </div>

          <div className="space-y-5 lg:col-span-2">

            <SectionCard title="Professional Summary" icon={<IconDoc />} onEdit={() => { setDraftSummary(summary); setModal("editSummary"); }}>
              <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Open to Work","Available Immediately"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full border border-emerald-200">{tag}</span>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Work Experience" icon={<IconBriefcase />} onEdit={() => { setDraftExp({...emptyExp}); setEditingExpId(null); setModal("addExp"); }}>
              <div className="space-y-5">
                {experiences.map((exp, i) => (
                  <div key={exp.id} className={`relative pl-5 ${i < experiences.length - 1 ? "pb-5 border-b border-[#edf5f9]" : ""}`}>
                    <span className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-[#3385AA] border-2 border-white shadow" />
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-[#317FA4]">{exp.role}</h3>
                        <p className="text-xs text-[#3385AA] font-semibold mt-0.5">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="px-2.5 py-0.5 bg-[#eaf4f8] text-[#3385AA] text-[10px] font-semibold rounded-full">{exp.type}</span>
                        <button onClick={() => { setDraftExp({...exp}); setEditingExpId(exp.id); setModal("editExp"); }}
                          className="p-1 text-gray-400 hover:text-[#3385AA] hover:bg-[#eaf4f8] rounded transition-colors" title="Edit">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button onClick={async () => {
                          const updated = experiences.filter((e) => e.id !== exp.id);
                          try {
                            await updateProfile(buildFormData({ experiences: JSON.stringify(updated.map(({ id, ...rest }) => rest)) }));
                            setExperiences(updated);
                            showToast("Experience removed");
                          } catch (err) { showToast(err.message); }
                        }}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[11px] text-gray-400">
                      <span>{exp.duration}</span><span>{exp.location}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => { setDraftExp({...emptyExp}); setEditingExpId(null); setModal("addExp"); }}
                className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-[#aad5e6] rounded-xl text-xs font-semibold text-[#3385AA] hover:bg-[#eaf4f8] transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Experience
              </button>
            </SectionCard>

            <SectionCard title="Education" icon={<IconGrad />} onEdit={() => { setDraftEdu({...emptyEdu}); setEditingEduId(null); setModal("addEdu"); }}>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={edu.id} className={`relative pl-5 ${i < education.length - 1 ? "pb-4 border-b border-[#edf5f9]" : ""}`}>
                    <span className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-[#47AEC7] border-2 border-white shadow" />
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-[#317FA4]">{edu.degree}</h3>
                        <p className="text-xs text-[#3385AA] font-semibold mt-0.5">{edu.institute}</p>
                        <div className="flex items-center gap-4 mt-1 text-[11px] text-gray-400">
                          <span>{edu.year}</span>
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-semibold">{edu.grade}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => { setDraftEdu({...edu}); setEditingEduId(edu.id); setModal("editEdu"); }}
                          className="p-1 text-gray-400 hover:text-[#3385AA] hover:bg-[#eaf4f8] rounded transition-colors" title="Edit">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button onClick={async () => {
                          const updated = education.filter((e) => e.id !== edu.id);
                          try {
                            await updateProfile(buildFormData({ educationHistory: JSON.stringify(updated.map(({ id, ...rest }) => rest)) }));
                            setEducation(updated);
                            showToast("Education removed");
                          } catch (err) { showToast(err.message); }
                        }}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => { setDraftEdu({...emptyEdu}); setEditingEduId(null); setModal("addEdu"); }}
                className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-[#aad5e6] rounded-xl text-xs font-semibold text-[#3385AA] hover:bg-[#eaf4f8] transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Education
              </button>
            </SectionCard>

            <SectionCard title="Skills" icon={<IconSkill />} onEdit={() => { setNewSkill(""); setModal("addSkill"); }}>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-[#eaf4f8] text-[#3385AA] text-xs font-semibold rounded-xl border border-[#c5e0ec]">{skill}</span>
                ))}
                <button onClick={() => { setNewSkill(""); setModal("addSkill"); }}
                  className="px-3 py-1.5 border border-dashed border-[#aad5e6] text-[#3385AA] text-xs font-semibold rounded-xl hover:bg-[#eaf4f8] transition-colors flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add Skill
                </button>
              </div>
            </SectionCard>

            <SectionCard title="Certifications" icon={<IconCert />} onEdit={() => { setDraftCert({...emptyCert}); setModal("addCert"); }}>
              <ul className="space-y-3">
                {certs.map((cert) => (
                  <li key={cert.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1l2.753 5.674 6.247.907-4.5 4.388 1.056 6.215L12 15.187l-5.556 2.997 1.056-6.215L3 7.581l6.247-.907L12 1z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#317FA4] truncate">{cert.name}</p>
                      <p className="text-[11px] text-gray-400">{cert.issuer} - {cert.year}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto">
                      <span className="hidden xs:inline px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-semibold rounded-full sm:inline">Verified</span>
                      <button onClick={async () => {
                        const updated = certs.filter((c) => c.id !== cert.id);
                        try {
                          await updateProfile(buildFormData({ certifications: JSON.stringify(updated.map(({ id, ...rest }) => rest)) }));
                          setCerts(updated);
                          showToast("Certification removed");
                        } catch (err) { showToast(err.message); }
                      }}
                        className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={() => { setDraftCert({...emptyCert}); setModal("addCert"); }}
                className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-[#aad5e6] rounded-xl text-xs font-semibold text-[#3385AA] hover:bg-[#eaf4f8] transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Certification
              </button>
            </SectionCard>

          </div>
        </div>
      </>) }</main>

      <Footer />
    </div>
  );
}




