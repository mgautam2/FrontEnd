import { createAction } from '../redux-creators';
import {
  SET_OFFERINGS,
  SET_UNIVERSITIES,
  SET_TERMS
} from './admin.action.types';

export const setOfferings = createAction(SET_OFFERINGS);
export const setUniversities = createAction(SET_UNIVERSITIES);
export const setTerms = createAction(SET_TERMS);