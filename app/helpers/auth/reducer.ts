import { getFromLocalState, writeToLocalState } from "../localstorage";
import { reducerPresetData } from "../handlers";
import { AUTH_LOGOUT, AUTH_USER_INFO } from "./constants";

interface AppState {
  type?: string,
  payload: object,
}

const initialState: AppState = {
  type: null,
  payload: {
    [AUTH_USER_INFO]: getFromLocalState(AUTH_USER_INFO)
  }
};

/**
 * Merge route into the global application state
 */
export default function authReducer(state = initialState, action): AppState {
  const checkedState = reducerPresetData({
    action,
    state,
    eventPrefix: "AUTH"
  });

  switch (action.type) {
    case AUTH_LOGOUT:
      writeToLocalState(AUTH_USER_INFO, null);
      return {
        type: null,
        payload: {}
      };
    default:
      return checkedState;
  }
}
