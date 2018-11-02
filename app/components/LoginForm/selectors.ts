import { sget } from "../../helpers/handlers";
import { LOGIN_FORM } from "./constants";

export const getForm = state => sget(state, `form.${LOGIN_FORM}`);
