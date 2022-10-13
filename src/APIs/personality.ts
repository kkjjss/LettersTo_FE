import {Personalities} from '../types/personality';
import {get} from '../Utils/http';

export async function getPersonalities(): Promise<Personalities> {
  return await get('/personalities');
}
