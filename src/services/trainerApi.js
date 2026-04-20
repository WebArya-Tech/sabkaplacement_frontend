const BASE_URL = 'http://localhost:5000/api'

const authHeaders = () => {
  const token = localStorage.getItem('trainerToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function registerTrainer(data) {
  const res = await fetch(`${BASE_URL}/trainers/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Registration failed')
  return json.data ?? json
}

export async function loginTrainer({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Login failed')
  return json.data ?? json
}

export async function getTrainerProfile() {
  const res = await fetch(`${BASE_URL}/trainers/profile`, {
    headers: authHeaders(),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to fetch profile')
  return json.data ?? json
}

export async function updateTrainerProfile(data) {
  const res = await fetch(`${BASE_URL}/trainers/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to update profile')
  return json.data ?? json
}
