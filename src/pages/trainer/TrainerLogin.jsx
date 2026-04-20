import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginTrainer } from '../../services/trainerApi'

export default function TrainerLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await loginTrainer({ email, password })
      if (res.token) localStorage.setItem('trainerToken', res.token)
      navigate('/trainer/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf4f8] via-white to-[#dff0ff] flex items-center justify-center p-3 sm:p-4">

      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-xl border border-[#d5e8f1] overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#3385AA] to-[#317FA4]" />

          <div className="px-4 sm:px-8 py-6 sm:py-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 w-14 h-14 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-[#3385AA] to-[#1e6080]">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-[#317FA4]">Trainer Login</h1>
              <p className="text-gray-500 text-sm mt-1">Sign in to your Trainer Portal</p>
            </div>

            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-3">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="trainer@institute.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA] focus:border-transparent transition-all bg-white placeholder-gray-400" />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3385AA] focus:border-transparent transition-all bg-white placeholder-gray-400 pr-10" />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPw
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      }
                    </svg>
                  </button>
                </div>
                <div className="flex justify-end mt-1.5">
                  <button type="button" className="text-xs text-[#3385AA] hover:underline font-medium">Forgot password?</button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-[#3385AA] to-[#317FA4] text-white font-bold text-sm rounded-lg hover:from-[#3385AA] hover:to-[#317FA4] active:scale-[0.98] transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2">
                {loading
                  ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Signing in...</>
                  : 'Sign In to Trainer Panel'
                }
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/trainer/register" className="text-[#3385AA] font-bold hover:underline">Register as Trainer</Link>
              </p>
              <p className="text-xs text-gray-400 mt-3">
                <Link to="/" className="hover:text-gray-600 hover:underline">Back to main website</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
