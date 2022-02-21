import axios from 'axios';
import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILURE } from '../types';

// const url = process.env.NEXT_PUBLIC_API_URL;

export const loadProfile = async (dispatch) => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: LOAD_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_PROFILE_FAILURE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export default loadProfile;
