const initialState = {
  open: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_OPEN':
          return {
              ...state,
              open: action.payload,
          };
      default:
          return state;
  }
};

export default reducer;