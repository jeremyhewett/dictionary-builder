import _ from 'lodash';
import Cookies from 'js-cookie';
import history from 'services/history';
import { state as appState } from 'App';

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const url = '/api/graphql';

const request = async (options) => {

  const defaultOptions = {
    headers: {
      'X-CSRF-TOKEN': `${Cookies.get('CSRF-TOKEN')}`
    },
    redirect: 'follow'
  };

  let response = await fetch(url, _.defaultsDeep({}, options, defaultOptions));
  if (response.ok) {
    let text = await response.text();
    try {
      return JSON.parse(text).data;
    } catch {
      return text;
    }
  }
  if (response.status === 401) {
    appState.set('user', null);
    history.push('/sign-in');
    await delay();
  }
  throw response.status;
};

const query = async (query, args) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, args })
  };

  return await request(options);
};

export default { query };
