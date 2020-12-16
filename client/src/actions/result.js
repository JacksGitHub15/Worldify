import {
  SET_ALBUMS,
  ADD_ALBUMS,
  SET_ARTISTS,
  ADD_ARTISTS,
  SET_PLAYLIST,
  ADD_PLAYLIST,
  SET_LOCATIONS,
} from '../utils/constants';

import { getSpotify } from '../utils/api';

export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
});

export const addAlbums = (albums) => ({
  type: ADD_ALBUMS,
  albums,
});

export const setArtists = (artists) => ({
  type: SET_ARTISTS,
  artists,
});

export const addArtists = (artists) => ({
  type: ADD_ARTISTS,
  artists,
});

export const setPlayList = (playlists) => ({
  type: SET_PLAYLIST,
  playlists,
});

export const addPlaylist = (playlists) => ({
  type: ADD_PLAYLIST,
  playlists,
});

export const setLocations = (locations) => ({
  type: SET_LOCATIONS,
  trackArtists: locations,
});

export const initiateGetResult = (searchTerm) => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&type=album,playlist,artist`;
      const result = await getSpotify(API_URL);
      const { albums, artists, playlists } = result;
      dispatch(setAlbums(albums));
      dispatch(setArtists(artists));
      return dispatch(setPlayList(playlists));
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const initiateLoadMoreAlbums = (url) => {
  return async (dispatch) => {
    try {
      console.log('url', url);
      const result = await getSpotify(url);
      console.log('categoriess', result);
      return dispatch(addAlbums(result.albums));
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const initiateLoadMoreArtists = (url) => {
  return async (dispatch) => {
    try {
      console.log('url', url);
      const result = await getSpotify(url);
      console.log('categoriess', result);
      return dispatch(addArtists(result.artists));
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const initiateLoadMorePlaylist = (url) => {
  return async (dispatch) => {
    try {
      console.log('url', url);
      const result = await getSpotify(url);
      console.log('categoriess', result);
      return dispatch(addPlaylist(result.playlists));
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};
