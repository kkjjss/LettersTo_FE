import {Topics} from '../types/topic';
import {get} from '../Utils/http';

export async function getTopics(): Promise<Topics> {
  return await get('/topics');
}
