import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import albumsReducer from '../reducers/albums';
import artistsReducer from '../reducers/artists';
import playlistReducer from '../reducers/playlist';
import locationsReducer from '../reducers/locations';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  combineReducers(
    {
      albums: albumsReducer,
      artists: artistsReducer,
      playlist: playlistReducer,
      locations: locationsReducer,
    },
    devToolsEnhancer
  ),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
