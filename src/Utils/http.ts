import AsyncStorage from '@react-native-async-storage/async-storage';
import {HOST_URL_TEST as host} from '../constants';

export async function post(path: string, body: {}, headers?: {}): Promise<any> {
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

export async function get(
  path: string,
  auth: boolean,
  params?: {[key: string]: any},
  headers?: {},
) {
  let query = '';
  if (params) {
    Object.keys(params).map((key, index) => {
      query += `${index === 0 ? '?' : '&'}${key}=${params[key]}`;
    });
  }
  const url = host + path + query;
  if (auth) {
    const access_token = await AsyncStorage.getItem('accessToken');

    headers = {
      ...headers,
      Authorization: `Bearer ${access_token}`,
    };
  }
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data.message);
  }
}
