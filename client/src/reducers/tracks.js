import { SET_TRACKARTISTS } from '../utils/constants';

const trackArtistsReducer = (state = {}, action) => {
  const { trackArtists } = action;
  console.log(action)
  switch (action.type) {
    case SET_TRACKARTISTS:
      return trackArtists;
    default:
      return state;
  }
};

export default trackArtistsReducer;
