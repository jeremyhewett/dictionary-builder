import _ from 'lodash';
import Cookies from 'js-cookie';
import history from 'services/history';
import { state as appState } from 'App';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const request = async (url, options) => {
  url = url.startsWith('/') ? url : `/api/${url}`;
  const defaultOptions = {
    headers: {
      'X-CSRF-TOKEN': `${Cookies.get('CSRF-TOKEN')}`
    },
    redirect: 'follow'
  };

  let response = await fetch(url, _.defaultsDeep({}, options, defaultOptions));
  if (response.ok) {
    return (await response.json()).data;
  }
  if (response.status === 401) {
    appState.set('user', null);
    history.push('/sign-in');
    await delay();
  }
  throw response.status;
};

const get = async(url, options = {}) => {
  const defaultOptions = {
    method: 'GET'
  };

  return await request(url, _.defaultsDeep({}, options, defaultOptions));
};

const put = async (url, data = null, options = {}) => {
  const defaultOptions = {
    method: 'PUT'
  };

  if (data !== null && data !== undefined) {
    defaultOptions.headers = {
      'Content-Type': 'application/json'
    };
    defaultOptions.body = JSON.stringify({ data });
  }

  return await request(url, _.defaultsDeep({}, options, defaultOptions));
};

const post = async (url, data = null, options = {}) => {
  const defaultOptions = {
    method: 'POST'
  };

  if (data !== null && data !== undefined) {
    defaultOptions.headers = {
      'Content-Type': 'application/json'
    };
    defaultOptions.body = JSON.stringify({ data });
  }

  return await request(url, _.defaultsDeep({}, options, defaultOptions));
};

export default { get, put, post };