import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import albumsReducer from '../reducers/albums';
import artistsReducer from '../reducers/artists';
import playlistReducer from '../reducers/playlist';
import trackArtistsReducer from '../reducers/tracks';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  combineReducers({
    albums: albumsReducer,
    artists: artistsReducer,
    playlist: playlistReducer,
    tracks: trackArtistsReducer
  }, devToolsEnhancer),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;