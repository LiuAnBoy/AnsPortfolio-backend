import { LOAD_TAGS_SUCCESS, LOAD_TAGS_FAILURE } from '../types';

const initialState = {
  loading: true,
  payload: null,
};

const loadTags = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOAD_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        payload,
      };
    case LOAD_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        payload,
      };
    default:
      return state;
  }
};

export default loadTags;
