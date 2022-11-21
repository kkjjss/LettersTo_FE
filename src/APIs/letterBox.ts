import type {LetterBoxes, LetterBoxInfo} from '../types/types';
import {instance} from '../Utils/http';

export async function getLetterBoxes(): Promise<LetterBoxes> {
  return await instance.get('/letter-boxes');
}

export async function getLetterBoxInfo(id: number): Promise<LetterBoxInfo> {
  return await instance.get(`/letter-boxes/${id}`);
}
