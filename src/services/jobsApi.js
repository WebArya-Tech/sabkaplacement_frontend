const BASE_URL = 'http://localhost:5000/api'

const tokenHeaders = (tokenKey = 'token') => {
  const token = localStorage.getItem(tokenKey)
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getAllJobs(params = {}) {
  const query = new URLSearchParams(params).toString()
  const url = `${BASE_URL}/jobs${query ? `?${query}` : ''}`
  const res = await fetch(url)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to fetch jobs')
  return json.data ?? []
}

export async function createJob(payload) {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...tokenHeaders('companyToken') },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to create job')
  return json.data ?? json
}

export async function updateJob(jobId, payload) {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...tokenHeaders('companyToken') },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to update job')
  return json.data ?? json
}

export async function deleteJob(jobId) {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: 'DELETE',
    headers: tokenHeaders('companyToken'),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to delete job')
  return json.data ?? json
}

export async function getCandidateApplications() {
  const res = await fetch(`${BASE_URL}/candidate/applications`, {
    headers: tokenHeaders('token'),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to fetch applications')
  return json.data ?? []
}

export async function applyForJob(jobId, formData) {
  const res = await fetch(`${BASE_URL}/jobs/apply/${jobId}`, {
    method: 'POST',
    headers: tokenHeaders('token'),
    body: formData,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to apply for job')
  return json.data ?? json
}
