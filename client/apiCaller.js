import fetch from 'isomorphic-fetch';
import appConfig from '../appConfig';

/*eslint-disable no-undef*/
export const API_URL = (typeof window === 'undefined') ?
process.env.BASE_URL || (`http://localhost:${process.env.PORT || appConfig.appPort}/api`) :
'/api';
/*eslint-disable no-undef*/
export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      /*eslint-disable no-undef*/
        return Promise.reject(json);
        /*eslint-disable no-undef*/
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}