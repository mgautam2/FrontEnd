import { createAction } from '../redux-creators';
import {
  SET_OFFERINGS
} from './admin.action.types';

export const setOfferings = createAction(SET_OFFERINGS);