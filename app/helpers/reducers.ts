export interface ActionTypes {
  load: string,
  loadSuccess: string,
  error: string,
}
interface StoreItems {
  items: any[],
  isLoading: boolean,
  error: string|null,
}

export function itemsReducer(actionTypes: ActionTypes)  {
  const initialState = {
    items: [],
    isLoading: false,
    error: null,
  };

  return (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.load:
        return {
          ...state,
          isLoading: true,
        };
      case actionTypes.loadSuccess:
        return {
          ...state,
          isLoading: false,
          items: action.payload.items,
        };
      case actionTypes.error:
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
}
