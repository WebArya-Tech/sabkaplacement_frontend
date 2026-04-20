import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTrainersDropdown, setShowTrainersDropdown] = useState(false);
  const [showJobsDropdown, setShowJobsDropdown] = useState(false);
  const [showCompaniesDropdown, setShowCompaniesDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [showNotificationsSidebar, setShowNotificationsSidebar] = useState(false);
  const [profileEmail, setProfileEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const brandColor = "#3385AA";
  const brandDark = "#317FA4";
  const brandSoft = "#EAF4F8";
  const brandBorder = "#D6EAF2";

  const goToCandidateLogin = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setMenuOpen(false);
    navigate("/jobs");
  };

  const navLinks = [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowJobsDropdown(false);
        setShowCompaniesDropdown(false);
        setShowServicesDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const readEmail = () => {
      try {
        const rawUser = localStorage.getItem("user");
        if (rawUser) {
          const parsed = JSON.parse(rawUser);
          if (parsed?.email) return parsed.email;
        }
      } catch {
        // Ignore parsing errors and try token-specific fallbacks.
      }

      const fallback =
        localStorage.getItem("candidateEmail") ||
        localStorage.getItem("companyEmail") ||
        localStorage.getItem("trainerEmail") ||
        "";
      return fallback;
    };

    const email = readEmail();
    const hasAnyToken =
      localStorage.getItem("token") ||
      localStorage.getItem("companyToken") ||
      localStorage.getItem("trainerToken");
    // Only treat as logged-in when a real token exists.
    // Emails like candidateEmail/companyEmail may be stored during registration,
    // but they are not equivalent to an authenticated session.
    setIsLoggedIn(Boolean(hasAnyToken));
    setProfileEmail(email);
  }, [location.pathname]);

  const LoginModal = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [activeTab, setActiveTab] = useState("login");

    return (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={() => setShowLoginModal(false)}
      >
        <div
          className="bg-white rounded-xl shadow-2xl max-w-xs w-full p-4 border border-gray-100"
          style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 40%, #faf5ff 100%)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Logo */}
          <div className="text-center mb-3">
            <div className="flex justify-center mb-2 py-1">
              <img
                src="/logo.jpeg"
                alt="Sabka Placement Logo"
                className="h-10 w-auto max-h-[40px] object-contain"
              />
            </div>
            <p className="text-gray-500 text-[10px]">Your AI-powered job search assistant</p>
          </div>

          {/* Tabs */}
          <div className="flex mb-3 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 pb-2 text-center text-xs font-semibold transition-all ${activeTab === "login"
                  ? "text-[#3385AA] border-b-2 border-[#3385AA]"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setShowLoginModal(false);
                setShowRegisterModal(true);
              }}
              className="flex-1 pb-2 text-center text-xs font-semibold text-gray-400 hover:text-gray-600 transition-all"
            >
              Sign Up
            </button>
          </div>

          <form
            className="space-y-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              goToCandidateLogin();
            }}
          >
            {/* Continue with LinkedIn */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#3385AA] text-white rounded-lg text-xs font-semibold hover:bg-[#317FA4] transition-all shadow-sm hover:shadow-[#3385AA]/30 hover:shadow-md"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Continue with LinkedIn
            </button>

            {/* Continue with Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="text-xs text-gray-400 font-medium">Or continue with email</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3385AA] focus:border-transparent bg-white/80 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 pr-10 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3385AA] focus:border-transparent bg-white/80 placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 text-[#3385AA] border-gray-300 rounded focus:ring-[#3385AA]"
                />
                <span className="text-xs text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-xs text-[#3385AA] hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white py-2 rounded-lg text-xs font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, ${brandColor} 0%, ${brandDark} 100%)` }}
            >
              Log In
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <button className="hover:text-[#3385AA] hover:underline transition-colors">Terms of Service</button>
              <span>•</span>
              <button className="hover:text-[#3385AA] hover:underline transition-colors">Privacy Policy</button>
              <span>•</span>
              <button className="hover:text-[#3385AA] hover:underline transition-colors">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RegisterModal = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("signup");

    return (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={() => setShowRegisterModal(false)}
      >
        <div
          className="bg-white rounded-xl shadow-2xl max-w-xs w-full p-4 border border-gray-100"
          style={{ background: "linear-gradient(135deg, #faf5ff 0%, #ffffff 40%, #f0f4ff 100%)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Logo */}
          <div className="text-center mb-3">
            <div className="flex justify-center mb-2 py-1">
              <img
                src="/logo.jpeg"
                alt="Sabka Placement Logo"
                className="h-10 w-auto max-h-[40px] object-contain"
              />
            </div>
            <p className="text-gray-500 text-[10px]">Your AI-powered job search assistant</p>
          </div>

          {/* Tabs */}
          <div className="flex mb-3 border-b border-gray-200">
            <button
              onClick={() => {
                setShowRegisterModal(false);
                setShowLoginModal(true);
              }}
              className="flex-1 pb-2 text-center text-xs font-semibold text-gray-400 hover:text-gray-600 transition-all"
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 pb-2 text-center text-xs font-semibold transition-all ${activeTab === "signup"
                  ? "text-[#3385AA] border-b-2 border-[#3385AA]"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-2.5">
            {/* Continue with LinkedIn */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#3385AA] text-white rounded-lg text-xs font-semibold hover:bg-[#317FA4] transition-all shadow-sm hover:shadow-[#3385AA]/30 hover:shadow-md"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Continue with LinkedIn
            </button>

            {/* Continue with Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="text-[10px] text-gray-400 font-medium">Or continue with email</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white/80 placeholder-gray-400"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white/80 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 pr-10 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white/80 placeholder-gray-400"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white py-2 rounded-lg text-xs font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, ${brandColor} 0%, ${brandDark} 100%)` }}
            >
              Sign Up
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <button className="hover:text-[#3385AA] hover:underline transition-colors">Terms of Service</button>
              <span>•</span>
              <button className="hover:text-[#3385AA] hover:underline transition-colors">Privacy Policy</button>
              <span>•</span>
              <button className="hover:text-[#3385AA] hover:underline transition-colors">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RegistrationPopup = () => {
    return (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={() => setShowRegistrationPopup(false)}
      >
        <div
          className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-0 overflow-hidden border border-gray-100 relative animate-bounce-in"
          onClick={(e) => e.stopPropagation()}
          style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 40%, #faf5ff 100%)" }}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowRegistrationPopup(false)}
            className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-[#3385AA] to-[#317FA4] px-4 py-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                <img 
                  src="/logo.jpeg" 
                  alt="Sabka Placement" 
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Welcome to SabkaPlacement!</h2>
            <p className="text-white/90 text-xs">Your dream job is just one click away</p>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Main Message */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full mb-3">
                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-bold text-orange-800">100% Free to Join</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                Unlock 100% Placement Support � Register Now to Get Started!
              </h3>
              
              <p className="text-gray-600 text-xs mb-4">
                Join thousands of job seekers who found their dream jobs through our platform
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-gray-700"><strong>Personalized Job Recommendations</strong> based on your profile</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-gray-700"><strong>Direct Applications</strong> to top companies</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-gray-700"><strong>Career Resources</strong> including resume builder & interview prep</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-gray-700"><strong>Real-time Notifications</strong> about new job openings</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2">
              <Link
                to="/register"
                onClick={() => setShowRegistrationPopup(false)}
                className="block w-full px-4 py-2.5 bg-gradient-to-r from-[#3385AA] to-[#317FA4] text-white text-sm font-bold rounded-lg hover:from-[#317FA4] hover:to-[#317FA4] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
              >
                Create Free Account
              </Link>
              
              <button
                onClick={() => {
                  setShowRegistrationPopup(false);
                  goToCandidateLogin();
                }}
                className="block w-full px-4 py-2.5 bg-white border-2 border-[#3385AA] text-[#3385AA] text-sm font-bold rounded-lg hover:bg-[#EAF4F8] transition-all duration-200 text-center"
              >
                Already have an account? Login
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xl font-bold text-[#3385AA]">10K+</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Active Jobs</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#3385AA]">5K+</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Companies</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#3385AA]">95%</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NotificationsSidebar = () => {
    const notifications = [
      {
        id: 1,
        icon: "🔔",
        bgColor: "bg-orange-100",
        iconColor: "text-orange-500",
        title: "2.7K+ jobseekers in Data Science & Analytics role have already activated Sabkaplacement Pro. Join Now!",
        action: "Activate Now",
        time: "15m ago",
        category: null
      },
      {
        id: 2,
        icon: "🤖",
        bgColor: "bg-[#EAF4F8]",
        iconColor: "text-[#3385AA]",
        title: "I'm Neo, your AI Job Agent. Let's find your next job. Start now!",
        action: null,
        time: "1h ago",
        category: "AI Job Agent"
      },
      {
        id: 3,
        icon: "A",
        bgColor: "bg-yellow-100",
        iconColor: "text-yellow-600",
        title: "Your resume for job application was viewed",
        action: null,
        time: "2h ago",
        category: "Application History"
      },
      {
        id: 4,
        icon: "🔔",
        bgColor: "bg-orange-100",
        iconColor: "text-orange-500",
        title: "25% Off Sabkaplacement Pro for you!",
        subtitle: "Fast track your job hunt with Sabkaplacement Pro",
        action: "Unlock Offer",
        time: "4h ago",
        category: null
      },
      {
        id: 5,
        icon: "R",
        bgColor: "bg-red-100",
        iconColor: "text-red-600",
        title: "Your resume for job application was viewed",
        action: null,
        time: "7h ago",
        category: "Application History"
      },
      {
        id: 6,
        icon: "T",
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        title: "4 roles where you could become a top applicant!",
        subtitle: "Jobs based on your profile",
        action: "View Jobs",
        time: "7h ago",
        category: null
      }
    ];

    return (
      <>
        {/* Overlay */}
        {showNotificationsSidebar && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={() => setShowNotificationsSidebar(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-[450px] md:w-[400px] bg-white shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out ${showNotificationsSidebar ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <button
              onClick={() => setShowNotificationsSidebar(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Notifications List */}
          <div className="h-full overflow-y-auto pb-20 scrollbar-hide">
            {/* Today Section */}
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Today</h3>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-gray-50 hover:bg-gray-100 rounded-xl p-3 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`${notification.bgColor} ${notification.iconColor} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold`}>
                        {notification.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium mb-1">
                          {notification.title}
                        </p>
                        {notification.subtitle && (
                          <p className="text-xs text-gray-500 mb-2">
                            {notification.subtitle}
                          </p>
                        )}
                        {notification.category && (
                          <p className="text-xs text-gray-500 mb-2">
                            {notification.category}
                          </p>
                        )}
                        {notification.action && (
                          <button className="inline-block px-4 py-1.5 text-xs font-semibold border rounded-full hover:bg-[#EAF4F8] transition-colors" style={{ color: brandColor, borderColor: brandColor }}>
                            {notification.action}
                          </button>
                        )}
                      </div>

                      {/* Time */}
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ProfileSidebar = () => {
    if (!isLoggedIn) return null;
    if (!showProfileSidebar) return null;
    return (
      <>
        {/* Invisible click-away overlay � starts below navbar so icons stay visible */}
        <div
          className="fixed top-[80px] md:top-[90px] inset-x-0 bottom-0 z-[100]"
          onClick={() => setShowProfileSidebar(false)}
        />

        {/* Dropdown */}
        <div className="fixed top-[72px] right-3 w-56 bg-white rounded-2xl shadow-xl z-[101] overflow-hidden">
          {/* Email header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-900 truncate">{profileEmail || "user@example.com"}</p>
          </div>

          {/* Menu items */}
          <ul className="py-1">
            <li>
              <Link
                to="/user/profile"
                onClick={() => setShowProfileSidebar(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors text-left"
              >
                <svg className="w-5 h-5 text-gray-800 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/user/my-reviews" onClick={() => setShowProfileSidebar(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors text-left">
                <svg className="w-5 h-5 text-gray-800 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                My reviews
              </Link>
            </li>
            <li>
              <Link to="/user/settings" onClick={() => setShowProfileSidebar(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors text-left">
                <svg className="w-5 h-5 text-gray-800 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96a7.01 7.01 0 00-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 00-.59.22L2.74 8.87a.47.47 0 00.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 00-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z" />
                </svg>
                Settings
              </Link>
            </li>
            <li>
              <Link to="/user/help" onClick={() => setShowProfileSidebar(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors text-left">
                <svg className="w-5 h-5 text-gray-800 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                </svg>
                Help
              </Link>
            </li>
            <li>
              <Link to="/user/privacy-centre" onClick={() => setShowProfileSidebar(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors text-left">
                <svg className="w-5 h-5 text-gray-800 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                Privacy Centre
              </Link>
            </li>
          </ul>

          {/* Sign out */}
          <div className="border-t border-gray-100 px-4 py-3 text-center">
            <button
              onClick={() => { setShowProfileSidebar(false); navigate("/"); }}
              className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {showLoginModal && <LoginModal />}
      {showRegisterModal && <RegisterModal />}
      {showRegistrationPopup && <RegistrationPopup />}
      <NotificationsSidebar />
      <ProfileSidebar />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-white shadow-lg border-b border-[#D6EAF2]"
            : "bg-white border-b border-[#D6EAF2] shadow-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px] md:h-[90px] py-1 md:py-2">
            {/* Logo */}
            <Link to="/jobs" className="flex items-center h-full py-1 flex-shrink-0">
              <img
                src="/logo.jpeg"
                alt="Sabka Placement Logo"
                className="h-12 md:h-14 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity drop-shadow-md"
                style={{ filter: 'brightness(1.05) saturate(1.1) contrast(1.05)' }}
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 ml-4 xl:ml-6">
              {/* Jobs Dropdown */}
              <div
                className="relative dropdown-container"
                onMouseEnter={() => setShowJobsDropdown(true)}
                onMouseLeave={() => setShowJobsDropdown(false)}
              >
                <div className={`flex items-center gap-1 rounded-lg ${location.pathname === "/jobs"
                    ? "bg-[#EAF4F8]"
                    : "hover:bg-[#EAF4F8]"
                  }`}>
                  <Link
                    to="/jobs"
                    className="px-3 xl:px-5 py-2.5 text-sm font-bold transition-all duration-200 relative text-[#317FA4] hover:text-[#3385AA]"
                  >
                    Jobs
                    {/* Badge */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
                  </Link>
                  <button
                    onClick={() => setShowJobsDropdown(!showJobsDropdown)}
                    className="pr-2 xl:pr-4 py-2.5 text-sm font-bold transition-all duration-200 text-[#317FA4] hover:text-[#3385AA]"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${showJobsDropdown ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Jobs Dropdown Menu */}
                <div className={`absolute left-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-200 overflow-hidden z-50 ${showJobsDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                  }`}>
                  <div className="py-2">
                    {/* Recommended Jobs */}
                    <Link
                      to="/jobs"
                      onClick={() => setShowJobsDropdown(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-[#EAF4F8] hover:text-[#3385AA] transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#3385AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">Recommended jobs</span>
                      </div>
                    </Link>

                    {/* Invites */}
                    <Link
                      to="/jobs/invites"
                      onClick={() => setShowJobsDropdown(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-[#EAF4F8] hover:text-[#3385AA] transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">Invites</span>
                      </div>
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        1 New
                      </span>
                    </Link>

                    {/* Application Status */}
                    <Link
                      to="/jobs/applications"
                      onClick={() => setShowJobsDropdown(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-[#EAF4F8] hover:text-[#3385AA] transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Application status</span>
                      </div>
                      <span className="px-2 py-0.5 text-white text-xs font-bold rounded-full" style={{ backgroundColor: brandColor }}>
                        1561
                      </span>
                    </Link>

                    {/* Saved Jobs */}
                    <Link
                      to="/jobs/saved"
                      onClick={() => setShowJobsDropdown(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-[#EAF4F8] hover:text-[#3385AA] transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <span className="font-medium">Saved jobs</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Companies Link */}
              <Link
                to="/companies"
                className={`px-3 xl:px-5 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${location.pathname.startsWith("/companies") ? "text-[#3385AA] bg-[#EAF4F8]" : "text-[#317FA4] hover:text-[#3385AA] hover:bg-[#EAF4F8]"}`}
              >
                Companies
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative dropdown-container"
                onMouseEnter={() => setShowServicesDropdown(true)}
                onMouseLeave={() => setShowServicesDropdown(false)}
              >
                <div className={`flex items-center gap-1 rounded-lg ${location.pathname === "/services"
                    ? "bg-[#EAF4F8]"
                    : "hover:bg-[#EAF4F8]"
                  }`}>
                  <Link
                    to="/services"
                    className="px-3 xl:px-5 py-2.5 text-sm font-bold transition-all duration-200 text-[#317FA4] hover:text-[#3385AA]"
                  >
                    Services
                  </Link>
                  <button
                    onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                    className="pr-2 xl:pr-4 py-2.5 text-sm font-bold transition-all duration-200 text-[#317FA4] hover:text-[#3385AA]"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${showServicesDropdown ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Services Dropdown Menu */}
                <div className={`absolute left-0 top-full mt-2 w-[240px] bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-200 overflow-hidden z-50 ${showServicesDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                  }`}>
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <div className="space-y-0.5">
                          <Link to="/resume-builder" onClick={() => setShowServicesDropdown(false)} className="block px-0 py-1.5 text-sm text-gray-700 hover:text-[#3385AA] transition-colors duration-150">
                            Resume Maker
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Nav Links */}
              {navLinks.map((link) => (
                  <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 xl:px-5 py-2.5 text-sm font-bold rounded-lg transition-all duration-200
                    ${location.pathname === link.path
                      ? "text-[#3385AA] bg-[#EAF4F8]"
                      : "text-[#317FA4] hover:text-[#3385AA] hover:bg-[#EAF4F8]"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
              <div className="hidden lg:flex items-center gap-2 ml-2 flex-shrink-0 overflow-visible">

              {/* Notification Bell */}
              <button
                onClick={() => setShowNotificationsSidebar(!showNotificationsSidebar)}
                className="relative p-1.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 z-50"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none shadow-sm">3</span>
              </button>

              {/* User Profile */}
              {isLoggedIn && (
                <div className="relative flex-shrink-0 z-50 overflow-visible">
                  <button
                    onClick={() => setShowProfileSidebar(!showProfileSidebar)}
                    className="relative w-8 h-8 rounded-full bg-[#3385AA] flex items-center justify-center hover:bg-[#317FA4] transition-colors shadow-md"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none shadow-sm">2</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile: Notification + Profile icons */}
            <div className="lg:hidden flex items-center gap-2 mr-1">
              <button
                onClick={() => setShowNotificationsSidebar(!showNotificationsSidebar)}
                className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">3</span>
              </button>
              {isLoggedIn && (
                <button
                  onClick={() => setShowProfileSidebar(!showProfileSidebar)}
                  className="relative w-8 h-8 rounded-full bg-[#3385AA] flex items-center justify-center hover:bg-[#317FA4] transition-colors shadow-md"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">2</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-1.5 md:p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                />
                <span
                  className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                />
                <span
                  className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
                    }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="bg-white border-t border-gray-200 px-3 sm:px-4 py-3 sm:py-4 space-y-1.5 shadow-lg max-h-[calc(100vh-70px)] overflow-y-auto">
            {/* My Home - Quick Access */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#EAF4F8] hover:text-[#3385AA] rounded-xl transition-colors duration-150"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              My home
            </Link>

            {/* Jobs - Direct Link + Dropdown */}
            <div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowJobsDropdown(!showJobsDropdown); }}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#EAF4F8] hover:text-[#3385AA] rounded-xl transition-colors duration-150"
              >
                <span>Jobs</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${showJobsDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showJobsDropdown && (
                <div className="mt-2 space-y-1 bg-gray-50 p-3 rounded-xl">
                  {/* Recommended Jobs */}
                  <Link
                    to="/jobs"
                    onClick={(e) => { e.stopPropagation(); setShowJobsDropdown(false); setMenuOpen(false); }}
                    className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-white hover:text-[#3385AA] rounded-lg transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-[#3385AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Recommended jobs</span>
                    </div>
                  </Link>

                  {/* Invites */}
                  <Link
                    to="/jobs/invites"
                    onClick={(e) => { e.stopPropagation(); setShowJobsDropdown(false); setMenuOpen(false); }}
                    className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-white hover:text-[#3385AA] rounded-lg transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Invites</span>
                    </div>
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                      1 New
                    </span>
                  </Link>

                  {/* Application Status */}
                  <Link
                    to="/jobs/applications"
                    onClick={(e) => { e.stopPropagation(); setShowJobsDropdown(false); setMenuOpen(false); }}
                    className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-white hover:text-[#3385AA] rounded-lg transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Application status</span>
                    </div>
                    <span className="px-2 py-0.5 text-white text-xs font-bold rounded-full" style={{ backgroundColor: brandColor }}>
                      1561
                    </span>
                  </Link>

                  {/* Saved Jobs */}
                  <Link
                    to="/jobs/saved"
                    onClick={(e) => { e.stopPropagation(); setShowJobsDropdown(false); setMenuOpen(false); }}
                    className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-white hover:text-[#3385AA] rounded-lg transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span className="font-medium">Saved jobs</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Companies Mobile - Direct Link */}
            <Link
              to="/companies"
              onClick={() => setMenuOpen(false)}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#EAF4F8] hover:text-[#3385AA] rounded-xl transition-colors duration-150"
            >
              Companies
            </Link>

            {/* Services Mobile Dropdown */}
            <div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowServicesDropdown(!showServicesDropdown); }}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#EAF4F8] hover:text-[#3385AA] rounded-xl transition-colors duration-150"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${showServicesDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showServicesDropdown && (
                <div className="mt-2 space-y-2 bg-gray-50 p-3 rounded-xl">
                  <div>
                    <div className="space-y-1">
                      <Link to="/resume-builder" onClick={(e) => { e.stopPropagation(); setShowServicesDropdown(false); setMenuOpen(false); }} className="block px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-white hover:text-[#3385AA] transition-colors">
                        Resume Maker
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Links - About & Contact only */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150
                  ${location.pathname === link.path
                    ? "bg-[#EAF4F8] text-[#3385AA]"
                    : "text-gray-700 hover:bg-[#EAF4F8] hover:text-[#3385AA]"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* For Employers Mobile */}
            <div className="pt-2">
              <button
                  onClick={() => navigate("/employee/login")}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#EAF4F8] hover:text-[#3385AA] rounded-xl transition-colors duration-150"
              >
                <span>For employers</span>
                
              </button>

              {/* {showDropdown && (
                <div className="mt-2 space-y-1.5 bg-gray-50 p-3 rounded-xl">
                 
                  <div className="px-2 py-1">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hiring Solutions</h3>
                  </div>

                  
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-150">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#3385AA] to-[#317FA4] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Buy Online</div>
                      <div className="text-xs text-gray-500">Get instant access</div>
                    </div>
                  </button>

                
                  <Link
                    to="/employee/login"
                    onClick={() => {
                      setShowDropdown(false);
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-150"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Employer Login</div>
                      <div className="text-xs text-gray-500">Open employer panel</div>
                    </div>
                  </Link>

                 
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-150">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Access Database</div>
                      <div className="text-xs text-gray-500">Search resumes</div>
                    </div>
                  </button>

                  <div className="border-t border-gray-200 my-2"></div>

               
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-150">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Company Branding</div>
                      <div className="text-xs text-gray-500">Showcase brand</div>
                    </div>
                  </button>

                  
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-150">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Campus Solutions</div>
                      <div className="text-xs text-gray-500">Hire from colleges</div>
                    </div>
                  </button>

                  <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-150">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Resume Display</div>
                      <div className="text-xs text-gray-500">Boost visibility</div>
                    </div>
                  </button>

                  
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-150">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#3385AA] to-[#317FA4] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">AI JD Generator</div>
                      <div className="text-xs text-gray-500">Create JDs with AI</div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full">NEW</span>
                  </button>

                 
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <button className="w-full px-4 py-2.5 bg-gradient-to-r from-[#3385AA] to-[#317FA4] text-white text-sm font-semibold rounded-xl hover:from-[#317FA4] hover:to-[#317FA4] transition-all duration-200 shadow-md">
                      Recruiter Login
                    </button>
                  </div>
                </div>
              )} */}
            </div>

            {/* For Trainers Mobile */}
            <div className="pt-2">
              <button
                onClick={(e) => { e.stopPropagation(); setShowTrainersDropdown(!showTrainersDropdown); }}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-colors duration-150"
              >
                <span>For Trainers</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${showTrainersDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showTrainersDropdown && (
                <div className="mt-2 space-y-1.5 bg-emerald-50/60 p-3 rounded-xl">
                  <div className="px-2 py-1">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Trainer Portal</h3>
                  </div>
                  <Link
                    to="/trainer/login"
                    onClick={() => { setShowTrainersDropdown(false); setMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-150"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Trainer Login</div>
                      <div className="text-xs text-gray-500">Access your trainer panel</div>
                    </div>
                  </Link>
                  <Link
                    to="/trainer/register"
                    onClick={() => { setShowTrainersDropdown(false); setMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-150"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Trainer Register</div>
                      <div className="text-xs text-gray-500">Join as a trainer today</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-200 space-y-2">
              <button
                onClick={() => {
                  goToCandidateLogin();
                }}
                className="w-full px-4 py-3 text-sm font-semibold text-[#3385AA] border-2 border-[#3385AA] rounded-xl hover:bg-[#3385AA] hover:text-white transition-all duration-200 active:scale-95">
                Login
              </button>
              <button
                onClick={() => {
                  setShowRegistrationPopup(true);
                  setShowRegisterModal(false);
                  setShowLoginModal(false);
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-md active:scale-95">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>


    </>
  );
};

export default Navbar;