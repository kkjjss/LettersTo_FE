import type {Topics} from '../types/types';
import {instance} from '../Utils/http';

export async function getTopics(): Promise<Topics> {
  return await instance.get('/topics');
}
