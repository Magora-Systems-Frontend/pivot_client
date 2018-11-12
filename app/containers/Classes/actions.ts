import { actionTypes } from "./constants";
import handleError from "helpers/api/handleError";
import * as api from "helpers/api/classes";

export function loadClasses() {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.load,
    });
    try {
      const result = await api.getClasses();
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

export function createClass(data: Object) {
  return async (dispatch, getState) => {
    dispatch({
      type: actionTypes.load,
    });
    const result = await api.createClass(data);
    const { classes } = getState();
    return dispatch({
      type: actionTypes.loadSuccess,
      payload: {
        items: [
          ...classes.items,
          result,
        ]
      },
    });
  }
}

export function updateClass(id: number|string, data: Object) {
  return async (dispatch, getState) => {
    dispatch({
      type: actionTypes.load,
    });
    const result = await api.updateClass(id, data);
    const { classes } = getState();
    return dispatch({
      type: actionTypes.loadSuccess,
      payload: {
        items: [
          ...classes.items.map(classItem => id === classItem.id ? result : classItem),
        ],
      },
    });
  }
}
