import { LOAD_EXPERIENCE_FAILURE, LOAD_EXPERIENCE_SUCCESS } from '../types';
import axios from 'axios';

export const loadExperience = async dispatch => {
  try {
    const res = await axios.get('/api/experience');
    dispatch({
      type: LOAD_EXPERIENCE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_EXPERIENCE_FAILURE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

