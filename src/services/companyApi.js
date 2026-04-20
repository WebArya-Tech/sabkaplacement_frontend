import { BASE_URL } from './api'

const authHeaders = () => {
  const token = localStorage.getItem('companyToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function registerCompany(formData) {
  const res = await fetch(`${BASE_URL}/company/register`, {
    method: 'POST',
    body: formData,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Registration failed')
  return json.data ?? json
}

export async function sendCompanyEmailOtp(email) {
  const res = await fetch(`${BASE_URL}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), purpose: 'employer-registration' }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to send OTP')
  return json.data ?? json
}

export async function loginCompany({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Login failed')
  return json.data ?? json
}

export async function getCompanyProfile() {
  const res = await fetch(`${BASE_URL}/company/profile`, {
    headers: authHeaders(),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to fetch profile')
  return json.data ?? json
}

export async function updateCompanyProfile(data) {
  const res = await fetch(`${BASE_URL}/company/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to update profile')
  return json.data ?? json
}

export async function getCompanyJobs() {
  const res = await fetch(`${BASE_URL}/company/jobs`, {
    headers: authHeaders(),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to fetch company jobs')
  return json.data ?? []
}

export async function getCompanyApplications() {
  const res = await fetch(`${BASE_URL}/company/applications`, {
    headers: authHeaders(),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to fetch applications')
  return json.data ?? []
}

export async function updateCompanyApplicationStatus(applicationId, status) {
  const res = await fetch(`${BASE_URL}/company/applications/${applicationId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ status }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to update application status')
  return json.data ?? json
}

export async function getPublicCompanies(limit = 20) {
  const res = await fetch(`${BASE_URL}/company/public/companies?limit=${encodeURIComponent(limit)}`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to fetch public companies')
  return json.data ?? []
}

export async function getPublicCompanySummary() {
  const res = await fetch(`${BASE_URL}/company/public/summary`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to fetch public summary')
  return json.data ?? {}
}
