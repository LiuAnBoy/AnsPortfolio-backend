import {
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_FAILURE,
} from "../types";

const initialState = {
  loading: true,
  payload: null,
  selectedItem: null,
};

const loadProjects = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: payload,
      };
    case LOAD_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        payload: payload,
      };
    default:
      return state;
  }
};

export default loadProjects;
