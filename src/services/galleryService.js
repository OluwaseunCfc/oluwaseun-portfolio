// src/services/galleryService.js
import { apiFetch } from './apiClient';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function getGalleryImages() {
  const response = await fetch(`${API_BASE_URL}/gallery/`);
  if (!response.ok) {
    throw new Error('Failed to fetch gallery images');
  }
  return response.json();
}

export async function createGalleryImage(formData) {
  const response = await apiFetch('/gallery/', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }
  return response.json();
}

export async function deleteGalleryImage(id) {
  const response = await apiFetch(`/gallery/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete gallery image');
  }
  return true;
}