import { createAction } from '../redux-creators';
import {
  SET_OFFERINGS,
  SET_UNIVERSITIES
} from './admin.action.types';

export const setOfferings = createAction(SET_OFFERINGS);
export const setUniversities = createAction(SET_UNIVERSITIES);