export const setOpen = (open) => {
  return {
      type: 'SET_OPEN',
      payload: open,
  };
};

export const toggleTourClass = (local) => ({
  type: 'TOGGLE_TOUR_CLASS',
  payload: { local },
});