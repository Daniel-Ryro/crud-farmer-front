// actions.js
import { getProducersRural } from '../services/api';

export const fetchProducers = () => async (dispatch) => {
  try {
    const producers = await getProducersRural();
    dispatch({ type: 'SET_PRODUCERS', payload: producers });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
