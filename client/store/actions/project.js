import axios from 'axios';
import { LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_FAILURE } from '../types';

// const url = process.env.NEXT_PUBLIC_API_URL;

export const loadProjects = async (dispatch) => {
  try {
    const res = await axios.get('/api/project');
    dispatch({
      type: LOAD_PROJECTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_PROJECTS_FAILURE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export default loadProjects;
