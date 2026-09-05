// src/services/experienceService.js
import { apiFetch } from './apiClient';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function getExperience() {
  const response = await fetch(`${API_BASE_URL}/experience/`);
  if (!response.ok) {
    throw new Error('Failed to fetch experience');
  }
  return response.json();
}

export async function createExperience(data) {
  const response = await apiFetch('/experience/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }
  return response.json();
}

export async function updateExperience(id, data) {
  const response = await apiFetch(`/experience/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }
  return response.json();
}

export async function deleteExperience(id) {
  const response = await apiFetch(`/experience/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete experience');
  }
  return true;
}