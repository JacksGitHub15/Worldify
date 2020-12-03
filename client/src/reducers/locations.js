import { SET_LOCATIONS } from '../utils/constants';

const locationsReducer = (state = {}, action) => {
  const { locations } = action;
  console.log(action);
  switch (action.type) {
    case SET_LOCATIONS:
      return locations;
    default:
      return state;
  }
};

export default locationsReducer;
