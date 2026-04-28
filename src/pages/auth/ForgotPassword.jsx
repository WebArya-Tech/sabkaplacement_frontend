import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { requestPasswordReset, verifyPasswordResetOtp, resetPasswordWithOtp } from '../../services/api'

const roleStyles = {
  candidate: {
    gradient: 'from-teal-50 via-white to-blue-50',
    card: 'border-gray-100',
    iconBg: 'from-[#3385AA] to-[#1e6080]',
    accent: 'text-[#317FA4]',
    button: 'from-[#317FA4] to-[#3385AA]',
    inputFocus: 'focus:ring-[#3385AA]',
    label: 'text-gray-700',
    placeholder: 'placeholder-gray-400',
  },
  employee: {
    gradient: 'from-[#eaf4f8] via-white to-[#dff0ff]',
    card: 'border-[#d5e8f1]',
    iconBg: 'from-[#3385AA] to-[#1e6080]',
    accent: 'text-[#317FA4]',
    button: 'from-[#317FA4] to-[#3385AA]',
    inputFocus: 'focus:ring-[#3385AA]',
    label: 'text-gray-700',
    placeholder: 'placeholder-gray-400',
  },
  trainer: {
    gradient: 'from-[#eaf4f8] via-white to-[#dff0ff]',
    card: 'border-[#d5e8f1]',
    iconBg: 'from-[#3385AA] to-[#1e6080]',
    accent: 'text-[#317FA4]',
    button: 'from-[#317FA4] to-[#3385AA]',
    inputFocus: 'focus:ring-[#3385AA]',
    label: 'text-gray-700',
    placeholder: 'placeholder-gray-400',
  },
}

const roleLabels = {
  candidate: 'Candidate',
  employee: 'Employer',
  trainer: 'Trainer',
}

export default function ForgotPassword() {
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role') || 'candidate'
  const styles = roleStyles[role] || roleStyles.candidate
  const roleLabel = roleLabels[role] || 'User'

  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [resetToken, setResetToken] = useState('') // New state for reset token
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await requestPasswordReset(email)
      setSuccess('OTP sent to your email address!')
      setStep(2)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await verifyPasswordResetOtp(email, otp)
      setResetToken(response.resetToken) // Store the reset token
      setSuccess('OTP verified! Now set your new password.')
      setStep(3)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await resetPasswordWithOtp(resetToken, newPassword)
      setSuccess('Password reset successfully!')
      setTimeout(() => {
        navigate(`/${role === 'employee' ? 'employee' : role === 'trainer' ? 'trainer' : ''}/login`, {
          state: { message: 'Password reset successful. Please login with your new password.' }
        })
      }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loginPath = role === 'employee' ? '/employee/login' : role === 'trainer' ? '/trainer/login' : '/login'

  return (
    <div className={`min-h-screen bg-gradient-to-br ${styles.gradient} flex flex-col`}>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className={`rounded-xl shadow-xl p-6 border bg-white ${styles.card}`}>
            <div className="text-center mb-6">
              <div className={`mx-auto mb-3 w-14 h-14 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br ${styles.iconBg}`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className={`text-xl font-bold mb-1 ${styles.accent}`}>
                Reset Password
              </h2>
              <p className="text-sm text-gray-500">
                {roleLabel} Password Reset
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-center mb-3">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-center mb-3">
                {success}
              </p>
            )}

            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-3">
                <p className="text-sm text-gray-600 text-center mb-2">
                  Enter your registered email address and we'll send you an OTP to reset your password.
                </p>
                <div>
                  <label className={`block text-sm font-semibold ${styles.label} mb-1.5`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${styles.inputFocus} focus:border-transparent transition-all bg-white ${styles.placeholder} text-sm`}
                    placeholder="name@example.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 bg-gradient-to-r ${styles.button} text-white font-bold text-sm rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2`}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending OTP...
                    </>
                  ) : 'Send OTP'}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-3">
                <p className="text-sm text-gray-600 text-center mb-2">
                  Enter the 6-digit OTP sent to <strong>{email}</strong>
                </p>
                <div>
                  <label className={`block text-sm font-semibold ${styles.label} mb-1.5`}>
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    maxLength={6}
                    className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${styles.inputFocus} focus:border-transparent transition-all bg-white ${styles.placeholder} text-sm text-center text-lg tracking-widest font-mono`}
                    placeholder="------"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 bg-gradient-to-r ${styles.button} text-white font-bold text-sm rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2`}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Verifying...
                    </>
                  ) : 'Verify OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 py-1"
                >
                  Change email address
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <p className="text-sm text-gray-600 text-center mb-2">
                  Set your new password below.
                </p>
                <div>
                  <label className={`block text-sm font-semibold ${styles.label} mb-1.5`}>
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${styles.inputFocus} focus:border-transparent transition-all bg-white ${styles.placeholder} text-sm pr-10`}
                      placeholder="Min. 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        ) : (
                          <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-semibold ${styles.label} mb-1.5`}>
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${styles.inputFocus} focus:border-transparent transition-all bg-white ${styles.placeholder} text-sm`}
                    placeholder="Re-enter password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 bg-gradient-to-r ${styles.button} text-white font-bold text-sm rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2`}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Resetting...
                    </>
                  ) : 'Reset Password'}
                </button>
              </form>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Remember your password?{' '}
                <a href={loginPath} className={`${styles.accent} font-semibold hover:underline`}>
                  Back to Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}