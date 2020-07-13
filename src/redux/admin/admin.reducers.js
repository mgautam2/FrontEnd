import {
  SET_OFFERINGS,
} from './admin.action.types';
import { initialState } from './admin.state';
  
const adminReducer = (state = initialState, action) => {
  const { type, value } = action;

  switch (type) {
    case SET_OFFERINGS:
      return { ...state, offerings: value };

    default:
      return state;
  }
};
  
export default adminReducer;
  