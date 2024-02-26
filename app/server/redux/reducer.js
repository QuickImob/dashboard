const initialState = {
  open: false,
  local: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_OPEN':
          return {
              ...state,
              open: action.payload,
          };
      case 'TOGGLE_TOUR_CLASS':
          return {
            ...state,
            local: action.payload.local,
          };
      default:
          return state;
  }
};

export default reducer;