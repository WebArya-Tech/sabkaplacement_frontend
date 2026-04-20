import { BASE_URL } from './api'

const authHeaders = () => {
  const token =
    localStorage.getItem('token') ||
    localStorage.getItem('companyToken') ||
    localStorage.getItem('trainerToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getForumPosts(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE_URL}/forum/posts${query ? `?${query}` : ''}`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to fetch posts')
  return json.posts ?? []
}

export async function createForumPost(payload) {
  const res = await fetch(`${BASE_URL}/forum/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to create post')
  return json.data ?? json
}

export async function upvoteForumPost(postId) {
  const res = await fetch(`${BASE_URL}/forum/posts/${postId}/upvote`, {
    method: 'POST',
    headers: authHeaders(),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to upvote post')
  return json.data ?? json
}

export async function addForumComment(postId, content) {
  const res = await fetch(`${BASE_URL}/forum/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ content }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to add comment')
  return json.data ?? json
}

export async function getForumComments(postId, params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE_URL}/forum/posts/${postId}/comments${query ? `?${query}` : ''}`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to fetch comments')
  return json.comments ?? []
}
