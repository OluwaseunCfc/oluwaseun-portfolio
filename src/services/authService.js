const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid email or password.');
  }

  const data = await response.json();
  localStorage.setItem('authToken', data.access);
  localStorage.setItem('refreshToken', data.refresh);
  return data;
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem('authToken'));
}