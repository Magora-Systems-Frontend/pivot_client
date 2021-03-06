import { actionTypes } from "./constants";
import { actionTypes as classCollectionsActionTypes } from '../ClassCollections/constants';
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

export function moveClass(id: number|string, newCollectionId: number|string, oldCollectionId?: number|string) {
  return async (dispatch, getState) => {
    dispatch({
      type: actionTypes.load,
    });
    await api.moveClass(id, newCollectionId);
    const { classes, classCollections } = getState();
    const allClasses = [
      ...classes.items,
      ...classCollections.items.reduce((res, cur) => [...res, ...cur.classes], []),
    ];
    const classItem = allClasses.find(item => item.id === id);
    return Promise.all([
      dispatch({
        type: actionTypes.loadSuccess,
        payload: {
          items: classes.items.map(item => id !== item.id ? item : {
            ...item,
            collectionId: newCollectionId,
          }),
        },
      }),
      dispatch({
        type: classCollectionsActionTypes.loadSuccess,
        payload: {
          items: [
            ...classCollections.items.map(collection => {
              if (collection.id === oldCollectionId) {
                return {
                  ...collection,
                  classes: collection.classes.filter(classId => classId !== id)
                }
              }
              if (collection.id === newCollectionId) {
                return {
                  ...collection,
                  classes: [...collection.classes, id],
                }
              }
              return collection;
            }),
          ],
        },
      }),
    ])
  }
}
