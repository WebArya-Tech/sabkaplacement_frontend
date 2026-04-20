export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
export const FILE_BASE_URL = BASE_URL.replace('/api', '')

const authHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getProfile() {
  const res = await fetch(`${BASE_URL}/candidate/profile`, {
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to fetch profile')
  return data.data ?? data
}

export async function updateProfile(formData) {
  const res = await fetch(`${BASE_URL}/candidate/profile`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to update profile')
  return data.data ?? data
}
export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')
  return data.data ?? data
}

export async function registerCandidate(formData) {
  const res = await fetch(`${BASE_URL}/candidate/register`, {
    method: 'POST',
    body: formData,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Registration failed')
  return data.data ?? data
}

export async function sendCandidateEmailOtp(email) {
  const res = await fetch(`${BASE_URL}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), purpose: 'candidate-registration' }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to send OTP')
  return data.data ?? data
}