import type {LetterBoxes} from '../types/types';
import {instance} from '../Utils/http';

export async function getLetterBoxes(): Promise<LetterBoxes> {
  return await instance.get('/letter-boxes');
}