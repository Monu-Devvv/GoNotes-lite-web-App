const BASE_URL = `${import.meta.env.VITE_API_URL}/api/notes`

// get token from localStorage
function getHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`   // send token with every request
  }
}

export async function fetchNotes() {
  const res = await fetch(BASE_URL, { headers: getHeaders() })
  return res.json()
}

export async function createNote(noteData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(noteData)
  })
  return res.json()
}

export async function updateNote(id, changes) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(changes)
  })
  return res.json()
}

export async function deleteNote(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
}