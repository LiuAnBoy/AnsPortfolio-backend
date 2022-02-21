import axios from 'axios';
import { LOAD_TAGS_SUCCESS, LOAD_TAGS_FAILURE } from '../types';

// const url = process.env.NEXT_PUBLIC_API_URL;

export const loadTags = async (dispatch) => {
  try {
    const res = await axios.get('/api/tag');
    dispatch({
      type: LOAD_TAGS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_TAGS_FAILURE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export default loadTags;
