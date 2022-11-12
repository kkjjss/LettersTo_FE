import {instance} from '../Utils/http';

export async function getPublicLetters() {
  return await instance.get('/public-letters');
}