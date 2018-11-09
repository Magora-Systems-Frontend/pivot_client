import { actionTypes } from "./constants";
import handleError from "helpers/api/handleError";
import * as api from "helpers/api/classes";
import { classCollections } from './reducer';

export function loadClassCollections() {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.load,
    });
    try {
      const result = await api.getClassCollections();
      return dispatch({
        type: actionTypes.loadSuccess,
        payload: result,
      });
    } catch (e) {
      const message = await handleError(e, dispatch);
      dispatch({
        type: actionTypes.error,
        payload: message,
      });
      return Promise.reject(message);
    }
  };
}

export function createClassCollection(data: Object) {
  return async (dispatch, getState) => {
    dispatch({
      type: actionTypes.load,
    });
    const result = await api.createClassCollection(data);
    const { classCollections } = getState();
    return dispatch({
      type: actionTypes.loadSuccess,
      payload: {
        items: [
          ...classCollections.items,
          result
        ]
      },
    });
  }
}
