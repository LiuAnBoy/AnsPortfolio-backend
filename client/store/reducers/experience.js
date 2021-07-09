import { LOAD_EXPERIENCE_SUCCESS, LOAD_EXPERIENCE_FAILURE } from '../types';

const initialState = {
  loading: true,
  experience: null,
};

const experience = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        experience: payload,
      };
    case LOAD_EXPERIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default experience;
