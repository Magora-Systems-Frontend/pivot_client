import configureStore from './configureStore';
import { history } from './history';

const initialState = {};

export const store = configureStore(initialState, history);
