import type {LetterBoxes, LetterBoxInfo} from '../types/types';
import {instance, instanceWithAuth} from '../Utils/http';

export async function getLetterBoxes(): Promise<LetterBoxes> {
  return await instanceWithAuth.get('/letter-boxes');
}

export async function getLetterBoxInfo(id: number): Promise<LetterBoxInfo> {
  return await instanceWithAuth.get(`/letter-boxes/${id}`);
}
