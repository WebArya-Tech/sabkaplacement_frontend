import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";
import { applyForJob } from "../../services/jobsApi";

const Apply = () => {
  const { id, jobId } = useParams();
  const targetJobId = jobId || id;
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    
    setLoading(true);
    try {
      const data = new FormData();
      if (resumeFile) {
        data.append("resume", resumeFile);
      }
      
      await applyForJob(targetJobId, data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to submit application. Ensure you are logged in as a candidate and have created a profile.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-16 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Application Submitted! 🎉</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your application has been sent. The employer will review and get back to you soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/jobs")}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg"
              >
                Browse More Jobs
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pb-16">
      <CopyNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-full shadow-lg mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-bold">APPLY FOR FREE - NO CHARGES</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Apply for This Job</h1>
          <p className="text-xl text-gray-600">Fill out the form below to submit your application</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">1-Click Apply</h2>
            <p className="text-gray-500 mt-2">
              We'll directly submit the details from your Candidate Profile to the employer. You don't need to manually re-enter anything!
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">Want to use a different resume?</h3>
            <p className="text-sm text-blue-700 mb-4">
              If left blank, we will automatically use the default resume attached to your profile.
            </p>
            <div>
              <input
                type="file"
                name="resume"
                onChange={(e) => setResumeFile(e.target.files[0])}
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            {errorMsg && <p className="text-red-500 text-sm text-center mb-4 p-3 bg-red-50 rounded-lg">{errorMsg}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                "🚀 Submit Application (FREE)"
              )}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              By clicking submit, you agree to share your profile with the employer.
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Apply;


