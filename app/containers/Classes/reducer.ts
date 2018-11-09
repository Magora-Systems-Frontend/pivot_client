import { actionTypes } from './constants';
import { itemsReducer } from 'helpers/reducers';

export const classes = itemsReducer(actionTypes);
