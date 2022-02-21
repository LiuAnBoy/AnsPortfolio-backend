import { LOAD_PROFILE_FAILURE, LOAD_PROFILE_SUCCESS } from '../types';

const initialState = {
  loading: true,
  payload: null,
};

const Profile = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        payload,
      };
    case LOAD_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        payload: null,
      };
    default:
      return state;
  }
};

export default Profile;
