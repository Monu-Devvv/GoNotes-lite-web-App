// All notes API calls
// BASE_URL reads from .env file — change VITE_API_URL in .env to switch backend
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/notes`

// attach JWT token to every request so backend knows who you are
function getHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
}

export async function fetchNotes() {
  const res = await fetch(BASE_URL, { headers: getHeaders() })
  return res.json()
}

export async function createNote(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function updateNote(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function deleteNote(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
}
