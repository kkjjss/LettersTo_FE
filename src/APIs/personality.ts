import type {Personalities} from '../types/types';
import {instance} from '../Utils/http';

export async function getPersonalities(): Promise<Personalities> {
  return await instance.get('/personalities');
}
