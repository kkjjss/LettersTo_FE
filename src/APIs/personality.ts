import type {Personalities} from '../types/types';
import {get} from '../Utils/http';

export async function getPersonalities(): Promise<Personalities> {
  return await get('/personalities');
}
