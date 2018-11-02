import { logout } from "../auth/actions";

export default function handleError(e, dispatch) {
  const {
    data: { message, errors },
    status
  } = e;
  if (status === 401) {
    return dispatch(logout());
  }
  if (errors) {
    console.error(errors);
  }
  return message;
}
