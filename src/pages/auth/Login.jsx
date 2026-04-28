import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/api'

export default function Login({ defaultRole = 'candidate' }) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(defaultRole)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage = location.state?.message || ''

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await loginUser({ email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      if (data.profile) localStorage.setItem('profile', JSON.stringify(data.profile))
      const params = new URLSearchParams(location.search)
      const redirectPath = params.get('redirect')
      const userRole = data.user?.role
      if (redirectPath) {
        navigate(redirectPath)
      } else if (userRole === 'admin') {
        navigate('/panel4')
      } else if (userRole === 'company' || userRole === 'employee') {
        navigate('/employee/dashboard')
      } else if (userRole === 'trainer') {
        navigate('/trainer/dashboard')
      } else if (userRole === 'candidate') {
        navigate('/user/dashboard')
      } else {
        navigate('/jobs')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${role === 'employee' ? 'bg-gradient-to-br from-[#eaf4f8] via-white to-[#dff0ff]' : 'bg-gradient-to-br from-teal-50 via-white to-blue-50'} flex flex-col`}>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm px-4 py-12">
          <div className={`rounded-xl shadow-xl p-6 border ${role === 'employee' ? 'bg-white border-[#d5e8f1]' : 'bg-white/95 border-gray-100'}`}>
          <div className="text-center mb-6">
            <div className={`mx-auto mb-3 w-14 h-14 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-[#3385AA] to-[#1e6080]`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className={`text-xl font-bold mb-1 ${role === 'employee' ? 'text-[#317FA4]' : 'text-gray-900'}`}>
              {role === 'employee' ? 'Employer Login' : 'Candidate Login'}
            </h2>
            <p className={`text-sm ${role === 'employee' ? 'text-[#317FA4]' : 'text-gray-500'}`}>
              {role === 'employee' ? 'Sign in to your Employer Portal' : 'Sign in to your Candidate Portal'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
              {successMessage && (
                <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-center">{successMessage}</p>
              )}
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3385AA] focus:border-transparent transition-all bg-white placeholder-gray-400 text-sm`}
                  placeholder="name@company.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3385AA] focus:border-transparent transition-all bg-white placeholder-gray-400 text-sm`}
                    placeholder="Your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-[#3385AA] focus:ring-[#3385AA]" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button type="button" onClick={() => navigate('/forgot-password')} className="font-semibold hover:underline text-[#3385AA]">
                  Forgot Password?
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-center">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm bg-gradient-to-r from-[#3385AA] to-[#1e6080] hover:from-[#1e6080] hover:to-[#3385AA] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : role === 'employee' ? 'Login to Employer Portal' : 'Login to Candidate Portal'}
              </button>
            </form>

            <div className="mt-3 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to={role === 'employee' ? '/employee/register' : '/register'} className="font-semibold hover:underline text-[#3385AA]">
                {role === 'employee' ? 'Register as Employer' : 'Register as Candidate'}
              </Link>
            </p>
          </div>
          </div>
        </div>
      </main>

    </div>
  )
}
