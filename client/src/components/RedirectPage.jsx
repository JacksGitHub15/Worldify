import React from 'react';
import _ from 'lodash';
import { getParamValues } from '../utils/functions';

export default class RedirectPage extends React.Component {
  componentDidMount() {
    const { setExpiryTime, history, location } = this.props;
    try {
      if (_.isEmpty(location.hash)) {
        // eslint-disable-next-line no-use-before-define
        setExpiryTime(expiryTime);
        return history.push('/dashboard');
      }
      const accessToken = getParamValues(location.hash);
      const expiryTime = new Date().getTime() + accessToken.expires_in * 1000;
      localStorage.setItem('params', JSON.stringify(accessToken));
      localStorage.setItem('expiry_time', expiryTime);
      history.push('/dashboard');
    } catch (error) {
      history.push('/');
    }
    return true;
  }

  render() {
    return null;
  }
}
