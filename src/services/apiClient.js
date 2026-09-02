const API_BASE_URL = 'http://127.0.0.1:8000/api';

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) return null;

  const data = await response.json();
  localStorage.setItem('authToken', data.access);
  return data.access;
}

export async function apiFetch(endpoint, options = {}) {
  const buildHeaders = (token) => {
    const headers = { ...(options.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  };

  let token = localStorage.getItem('authToken');

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: buildHeaders(token),
  });

  if (response.status === 401) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: buildHeaders(newToken),
      });
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/admin/login';
      throw new Error('Session expired. Please log in again.');
    }
  }

  return response;
}