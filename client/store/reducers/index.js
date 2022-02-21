import { combineReducers } from 'redux';

import experienceReducer from './experience';
import projectReducer from './project';
import tagReducer from './tag';
import profileReducer from './profile';
import emailReducer from './email';

const reducers = {
  experience: experienceReducer,
  projects: projectReducer,
  tags: tagReducer,
  profile: profileReducer,
  email: emailReducer,
};

export default combineReducers(reducers);
