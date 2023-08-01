import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getProducersRural = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/producers-rural`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const createProducerRural = async (newProducerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/producers-rural`, newProducerData);
    return response.data;
  } catch (error) {
    console.error('Error creating producer:', error);
    throw error;
  }
};

export const updateProducerRural = async (id, updatedProducerData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/producers-rural/${id}`, updatedProducerData);
    return response.data;
  } catch (error) {
    console.error('Error updating producer:', error);
    throw error;
  }
};

export const deleteProducerRural = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/producers-rural/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting producer:', error);
    throw error;
  }
};
