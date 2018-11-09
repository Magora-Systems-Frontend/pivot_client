import { ActionTypes } from 'helpers/reducers';

export const LOAD_CLASS_COLLECTIONS = 'pivot/home/LOAD_CLASS_COLLECTIONS';
export const LOAD_CLASS_COLLECTIONS_SUCCESS = 'pivot/home/LOAD_CLASS_COLLECTIONS_SUCCESS';
export const LOAD_CLASS_COLLECTIONS_ERROR = 'pivot/home/LOAD_CLASS_COLLECTIONS_ERROR';

export const actionTypes: ActionTypes = {
  load: LOAD_CLASS_COLLECTIONS,
  loadSuccess: LOAD_CLASS_COLLECTIONS_SUCCESS,
  error: LOAD_CLASS_COLLECTIONS_ERROR,
};
