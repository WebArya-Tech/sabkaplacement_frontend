const BASE_URL = 'http://localhost:5000/api'

const authHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function handleJson(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.message || 'Request failed')
  }
  return data?.data ?? data
}

export async function getAdminDashboard() {
  const res = await fetch(`${BASE_URL}/admin/dashboard`, { headers: authHeaders() })
  return handleJson(res)
}

export async function getPendingCompanies() {
  const res = await fetch(`${BASE_URL}/admin/companies/pending`, { headers: authHeaders() })
  return handleJson(res)
}

export async function approveCompany(companyId) {
  const res = await fetch(`${BASE_URL}/admin/companies/${companyId}/approve`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
  return handleJson(res)
}

export async function rejectCompany(companyId, remarks) {
  const res = await fetch(`${BASE_URL}/admin/companies/${companyId}/reject`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ remarks }),
  })
  return handleJson(res)
}

export async function getPendingTrainers() {
  const res = await fetch(`${BASE_URL}/admin/trainers/pending`, { headers: authHeaders() })
  return handleJson(res)
}

export async function approveTrainer(trainerId) {
  const res = await fetch(`${BASE_URL}/admin/trainers/${trainerId}/approve`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
  return handleJson(res)
}

export async function rejectTrainer(trainerId, remarks) {
  const res = await fetch(`${BASE_URL}/admin/trainers/${trainerId}/reject`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ remarks: remarks || '' }),
  })
  return handleJson(res)
}

export async function getPendingJobs() {
  const res = await fetch(`${BASE_URL}/admin/jobs/pending`, { headers: authHeaders() })
  return handleJson(res)
}

export async function approveJob(jobId) {
  const res = await fetch(`${BASE_URL}/admin/jobs/${jobId}/approve`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
  return handleJson(res)
}

export async function rejectJob(jobId, remarks) {
  const res = await fetch(`${BASE_URL}/admin/jobs/${jobId}/reject`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ remarks: remarks || '' }),
  })
  return handleJson(res)
}

export async function deleteJob(jobId) {
  const res = await fetch(`${BASE_URL}/admin/jobs/${jobId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  return handleJson(res)
}
