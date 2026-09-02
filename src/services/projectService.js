const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function getProjects() {
  const response = await fetch(`${API_BASE_URL}/projects/`);

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}

export async function createProject(formData) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`${API_BASE_URL}/projects/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }

  return response.json();
}

export async function updateProject(id, formData) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`${API_BASE_URL}/projects/${id}/`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }

  return response.json();
}

export async function deleteProject(id) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`${API_BASE_URL}/projects/${id}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete project');
  }

  return true;
}