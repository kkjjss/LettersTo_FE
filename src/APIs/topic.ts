import type {Topics} from '../types/types';
import {get} from '../Utils/http';

export async function getTopics(): Promise<Topics> {
  return await get('/topics');
}
