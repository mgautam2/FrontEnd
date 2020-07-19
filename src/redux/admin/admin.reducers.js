import {
  SET_OFFERINGS,
  SET_UNIVERSITIES,
  SET_TERMS,
} from './admin.action.types';
import { initialState } from './admin.state';
  
const adminReducer = (state = initialState, action) => {
  const { type, value } = action;

  switch (type) {
    case SET_OFFERINGS:
      return { ...state, offerings: value };
    case SET_UNIVERSITIES:
      return{...state, universities: value};
    case SET_TERMS:
      return{...state, terms: value};

    default:
      return state;
  }
};
  
export default adminReducer;
  