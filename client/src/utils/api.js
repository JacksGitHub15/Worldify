// We're adding the access_token in the Authorization Header by calling setAuthHeader
// This file makes the API calls using axios

import axios from 'axios';
import { setAuthHeader } from './functions';

export const getSpotify = async (url, params) => {
  setAuthHeader();
  const result = await axios.get(url, params);
  return result.data;
};

export const postSpotify = async (url, params) => {
  setAuthHeader();
  const result = await axios.post(url, params);
  return result.data;
};
