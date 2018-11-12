/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { LOCATION_CHANGE } from "react-router-redux";
import { reducer as form } from "redux-form";
import auth from "../helpers/auth/reducer";
import { classes } from '../containers/Classes/reducer';
import { classCollections } from '../containers/ClassCollections/reducer';
import modal from '../containers/Modal/reducer';

import { getPureObject } from "../helpers/handlers";

// Initial routing state
const routeInitialState = {
  location: null
};

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return {
        ...state,
        location: getPureObject(action.payload)
      };
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer() {
  return combineReducers({
    route: routeReducer,
    form,
    auth,
    modal,
    classes,
    classCollections,
  });
}
