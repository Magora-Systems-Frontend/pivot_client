import { history } from '../../app/history';
import { CLIENT_PAGES } from '../../app/constants';
import { AUTH_LOGOUT } from './constants';

export function logout() {
  return dispatch => {
    dispatch({
      type: AUTH_LOGOUT,
    });
    return history.push(CLIENT_PAGES.LOGIN);
  };
}
