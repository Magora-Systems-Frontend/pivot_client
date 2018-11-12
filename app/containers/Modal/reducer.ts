import { actionTypes } from './constants';

const initialState = {
  Node: null,
  isShow: false,
  options: {},
};

export default (state = initialState, action:{ type: string, payload?: any }) => {
  switch (action.type) {
    case actionTypes.MODAL_SHOW:
      return {
        ...state,
        isShow: true,
        Node: action.payload.Node,
        title: action.payload.title,
        options: action.payload.options,
      };
    case actionTypes.MODAL_SET_NODE:
      return {
        ...state,
        Node: action.payload.Node,
        options: action.payload.options,
      };
    case actionTypes.MODAL_HIDE:
      return {
        ...state,
        isShow: false,
      };
    default:
      return state;
  }
};
