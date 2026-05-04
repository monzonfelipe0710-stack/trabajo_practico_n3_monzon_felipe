// Acciones del reducer
export const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  EDIT_ITEM: 'EDIT_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  SET_ITEMS: 'SET_ITEMS',
};

// Estado inicial
export const initialState = {
  items: [],
};

// Reducer function para gestionar el estado global
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const newItem = {
        id: Date.now(),
        ...action.payload,
      };
      return {
        ...state,
        items: [...state.items, newItem],
      };
    }

    case ACTIONS.EDIT_ITEM: {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.data }
            : item
        ),
      };
    }

    case ACTIONS.DELETE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case ACTIONS.SET_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }

    default:
      return state;
  }
};
