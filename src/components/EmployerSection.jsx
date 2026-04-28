import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerSection = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resume, setResume] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileRef = useRef(null);

  const closeModal = () => {
    setModal(null);
    setEmail('');
    setPassword('');
    setResume(null);
    setShowPassword(false);
  };

  const switchTo = (view) => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setModal(view);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(modal === 'register' ? 'Registration successful! Welcome to Sabplacement.' : 'Login successful! Welcome back.');
    closeModal();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setResume(file);
  };

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(110deg,#3385AA 0%,#3385AA 55%,#2a6d8f 100%)' }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140].map((offset, i) => (
            <path
              key={i}
              d={`M0,${80 + offset} C200,${40 + offset} 400,${130 + offset} 600,${70 + offset} S900,${20 + offset} 1200,${90 + offset}`}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.2"
            />
          ))}
        </svg>

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-10 sm:px-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Premium Handpicked</h2>
            <p className="mt-1 text-2xl font-light text-white/90 sm:text-3xl">Jobs for you</p>
            <p className="mt-3 text-sm text-white/75">
              Premium Handpicked Jobs that you will not find anywhere else
            </p>
          </div>

          <button
            onClick={() => setModal('register')}
            className="flex-shrink-0 rounded-xl border border-[#6aabca] bg-white px-8 py-3 text-base font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
            style={{ color: '#3385AA' }}
          >
            Register Now!
          </button>
        </div>
      </section>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.65)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold text-gray-500 hover:bg-gray-200 hover:text-gray-800"
            >
              ×
            </button>

            <div className="p-8">
              {modal === 'register' ? (
                <>
                  <p className="text-2xl font-light text-gray-700">Welcome Guest,</p>
                  <h2 className="mb-6 text-3xl font-bold text-gray-900">Register here</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3385AA]"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                          placeholder="Enter 6 characters or more"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3385AA]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3C7 3 2.73 6.11 1 10.5 2.73 14.89 7 18 12 18s9.27-3.11 11-7.5C21.27 6.11 17 3 12 3zm0 12.5a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Attach Resume</label>
                        <span className="text-xs text-gray-400">Use a PDF, doc, or docx file - max 2MB</span>
                      </div>
                      <div
                        onClick={() => fileRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 transition-colors"
                        style={{ borderColor: isDragOver ? '#3385AA' : '#D1D5DB' }}
                      >
                        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {resume ? resume.name : 'Upload or drag and drop'}
                        </span>
                      </div>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => setResume(e.target.files[0] || null)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg py-3 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg,#3385AA,#2a6d8f)' }}
                    >
                      Register
                    </button>

                    <p className="text-center text-sm text-gray-500">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => switchTo('login')}
                        className="font-bold hover:underline"
                        style={{ color: '#3385AA' }}
                      >
                        Login now!
                      </button>
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="text-xs text-gray-400">or</span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <p className="text-2xl font-light text-gray-700">Welcome Back,</p>
                  <h2 className="mb-6 text-3xl font-bold text-gray-900">Login here</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3385AA]"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                          placeholder="Enter your password"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3385AA]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3C7 3 2.73 6.11 1 10.5 2.73 14.89 7 18 12 18s9.27-3.11 11-7.5C21.27 6.11 17 3 12 3zm0 12.5a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button type="button" onClick={() => navigate('/forgot-password?role=company')} className="text-sm hover:underline" style={{ color: '#3385AA' }}>
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg py-3 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg,#3385AA,#2a6d8f)' }}
                    >
                      Login
                    </button>

                    <p className="text-center text-sm text-gray-500">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => switchTo('register')}
                        className="font-bold hover:underline"
                        style={{ color: '#3385AA' }}
                      >
                        Register now!
                      </button>
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="text-xs text-gray-400">or</span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployerSection;
