// Here we handle the Spotify access token so it can be used for every API request

import axios from 'axios';

export const getParamValues = (url) => {
  return url
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const [title, value] = curr.split('=');
      // TODO: Remove `ESLint disable` comment
      // eslint-disable-next-line no-param-reassign
      prev[title] = value;
      return prev;
    }, {});
};

export const setAuthHeader = () => {
  try {
    const params = JSON.parse(localStorage.getItem('params'));
    if (params) {
      axios.defaults.headers.common.Authorization = `Bearer ${params.access_token}`;
    }
  } catch (error) {
    console.log('Error setting auth', error);
  }
};

export const createGlobeArcs = (playlistLocs, userCountry) => {
  return playlistLocs.map((item) => ({
    endLat: item.latitude,
    endLng: item.longitude,
    startLat: userCountry.latitude,
    startLng: userCountry.longitude,
  }));
};
