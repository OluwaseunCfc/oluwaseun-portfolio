const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function getProjects() {
  const response = await fetch(`${API_BASE_URL}/projects/`);

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}