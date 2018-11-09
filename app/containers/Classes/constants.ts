import { ActionTypes } from 'helpers/reducers';

export const LOAD_CLASSES = 'pivot/home/LOAD_CLASSES';
export const LOAD_CLASSES_SUCCESS = 'pivot/home/LOAD_CLASSES_SUCCESS';
export const LOAD_CLASSES_ERROR = 'pivot/home/LOAD_CLASSES_ERROR';

export const actionTypes: ActionTypes = {
  load: LOAD_CLASSES,
  loadSuccess: LOAD_CLASSES_SUCCESS,
  error: LOAD_CLASSES_ERROR,
};
