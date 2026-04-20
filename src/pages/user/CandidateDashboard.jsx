import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getProfile } from '../../services/api';
import { getCandidateApplications, getAllJobs } from '../../services/jobsApi';

const StatCard = ({ title, count, link, icon, color }) => (
  <Link to={link} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-white`}>
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-900">{count}</div>
      <div className="text-sm text-gray-500 font-medium">{title}</div>
    </div>
  </Link>
);

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [apps, setApps] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [profileData, appsData, allJobs] = await Promise.all([
          getProfile(),
          getCandidateApplications(),
          getAllJobs()
        ]);
        setProfile(profileData);
        setApps(appsData || []);
        // Take 3 most recent jobs
        setRecentJobs((allJobs || []).slice(0, 3));
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#317FA4]/30 border-t-[#317FA4] rounded-full animate-spin"></div>
      </div>
    );
  }

  const calculateProfileStrength = () => {
    if (!profile) return "0%";
    let score = 0;
    const fields = ['fullName', 'mobileNumber', 'location', 'education', 'skills', 'summary', 'resume'];
    fields.forEach(f => {
      if (profile[f] && (Array.isArray(profile[f]) ? profile[f].length > 0 : true)) score += 1;
    });
    return `${Math.round((score / fields.length) * 100)}%`;
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Welcome Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {profile?.fullName || user.name || 'Candidate'}!</h1>
          <p className="text-gray-600">Track your applications and manage your professional profile.</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Applied Jobs" 
            count={apps.length} 
            link="/application" 
            color="bg-blue-500"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          />
          <StatCard 
            title="Saved Jobs" 
            count={profile?.stats?.savedJobs || 0} 
            link="/jobs/saved" 
            color="bg-emerald-500"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>}
          />
          <StatCard 
            title="Profile Strength" 
            count={calculateProfileStrength()} 
            link="/user/profile" 
            color="bg-amber-500"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - Recent Applications */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Recent Applications</h2>
                <Link to="/application" className="text-sm font-semibold text-[#317FA4] hover:underline">View All</Link>
              </div>
              <div className="p-6">
                {apps.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
                    <Link to="/jobs" className="inline-block bg-[#317FA4] text-white px-6 py-2 rounded-xl font-bold shadow-sm hover:bg-[#297EA2] transition-colors">Browse Jobs</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {apps.slice(0, 3).map((app, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/50">
                        <div>
                          <div className="font-bold text-gray-900">{app.jobId?.title || 'Job Title'}</div>
                          <div className="text-sm text-gray-500">{app.jobId?.companyId?.companyName || 'Company Name'}</div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            app.status === 'Rejected' ? 'bg-red-100 text-red-600' : 
                            app.status === 'Shortlisted' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {app.status}
                          </span>
                          <div className="text-[10px] text-gray-400 mt-1">{new Date(app.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Recommended Jobs</h2>
                <Link to="/jobs" className="text-sm font-semibold text-[#317FA4] hover:underline">Browse All</Link>
              </div>
              <div className="p-6">
                {recentJobs.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No jobs available right now.</p>
                ) : (
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <div key={job._id} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                          <Link to={`/apply/${job._id}`} className="font-bold text-gray-900 hover:text-[#317FA4] truncate block">
                            {job.title}
                          </Link>
                          <div className="text-sm text-gray-500 truncate">
                            {job.companyId?.companyName || 'Company'} • {job.location || 'Location'}
                          </div>
                        </div>
                        <Link to={`/apply/${job._id}`} className="ml-4 px-4 py-1.5 bg-[#317FA4] text-white text-xs font-bold rounded-lg hover:bg-[#297EA2] transition-colors shrink-0">
                          Apply
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar - Profile Completion & Quick Links */}
          <div className="space-y-6">
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#eaf4f8] flex items-center justify-center mx-auto mb-4 text-[#317FA4] font-bold text-2xl uppercase">
                {user.name?.charAt(0) || 'U'}
              </div>
              <h3 className="font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500 mb-6">{user.email}</p>
              <Link to="/user/profile" className="block w-full py-2 border border-[#317FA4] text-[#317FA4] rounded-xl font-bold hover:bg-[#317FA4] hover:text-white transition-all">Edit Profile</Link>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-2">
                <Link to="/resume/builder" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </span>
                  <span className="text-sm font-semibold text-gray-700">Resume Builder</span>
                </Link>
                {profile?.resume && (
                  <button 
                    onClick={() => window.open(profile.resume, '_blank')}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-700">View My Resume</span>
                  </button>
                )}
                <Link to="/pro/interview-preparation" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </span>
                  <span className="text-sm font-semibold text-gray-700">Interview Prep</span>
                </Link>
                <Link to="/user/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </span>
                  <span className="text-sm font-semibold text-gray-700">Settings</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
