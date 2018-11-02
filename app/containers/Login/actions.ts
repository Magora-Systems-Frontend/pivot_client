import * as authApi from "../../helpers/api/auth";
import { sget } from "../../helpers/handlers";
import { SubmissionError } from "redux-form";
import { AUTH_LOGIN, AUTH_USER_INFO } from "../../helpers/auth/constants";

export function login(data) {
  return async dispatch => {
    try {
      const result = await authApi.login(data);
      dispatch({
        type: AUTH_LOGIN,
        payload: {
          [AUTH_USER_INFO]: result
        }
      });
      return result;
    } catch (errorResponse) {
      const errors = sget(errorResponse, "data.errors", []);
      errors.forEach(error => {
        if (error.code === "invalid-email-or-password") {
          throw new SubmissionError({
            email: error.detail || error.title
          });
        }
      });
      throw new Error(errorResponse);
    }
  };
}
