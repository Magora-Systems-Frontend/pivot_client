import { actionTypes } from "./constants";

export function showModal({
  Node, title, options = {},
}) {
  return {
    type: actionTypes.MODAL_SHOW,
    payload: {
      Node,
      title,
      options,
    },
  };
}

export function hideModal() {
  return {
    type: actionTypes.MODAL_HIDE,
  };
}

export function setModalNode(Node, options = {}) {
  return {
    type: actionTypes.MODAL_SET_NODE,
    payload: {
      Node,
      options,
    },
  };
}
