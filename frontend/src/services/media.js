import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all media
export const getAllMedia = async () => {
  try {
    const response = await api.get('/medias');
    return response.data.media; // Extract media array from response
  } catch (error) {
    throw error;
  }
};

// Get single media by ID
export const getMediaById = async (id) => {
  try {
    const response = await api.get(`/medias/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload new media
export const uploadMedia = async (formData) => {
  try {
    const response = await api.post('/medias/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update media
export const updateMedia = async (id, formData) => {
  try {
    const response = await api.put(`/medias/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete media
export const deleteMedia = async (id) => {
  try {
    const response = await api.delete(`/medias/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
