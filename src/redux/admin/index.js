import { createReduxStore, createSelector } from '../redux-creators';
import adminReducer from './admin.reducers';
import * as adminActions from './admin.actions';

export const connectWithRedux = createSelector(adminActions);

export const adminStore = createReduxStore(adminReducer);