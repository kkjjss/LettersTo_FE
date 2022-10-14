import {HOST_URL_TEST as host} from '../constants';

export async function post(path: string, body: {}, headers = {}): Promise<any> {
  const url = host + path;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data.message);
  }
}

export async function get(path: string, params?: {[key: string]: any}) {
  let query = '';
  if (params) {
    Object.keys(params).map((key, index) => {
      query += `${index === 0 ? '?' : '&'}${key}=${params[key]}`;
    });
  }
  const url = host + path + query;
  const res = await fetch(url);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data.message);
  }
}
