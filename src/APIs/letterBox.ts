import type {LetterBoxes, LetterBoxInfo, DeliveryLetters} from '@type/types';
import {instanceWithAuth} from '@utils/http';

export async function getLetterBoxes(): Promise<LetterBoxes> {
  return await instanceWithAuth.get('/letter-boxes');
}

export async function getLetterBoxInfo(id: number): Promise<LetterBoxInfo> {
  return await instanceWithAuth.get(`/letter-boxes/${id}`);
}

type DeliveryLetterData = {
  content: DeliveryLetters | [];
  cursor: number;
};

export async function getDeliveryLetters(data: {
  cursor?: number;
  fromMemberId: number;
}): Promise<DeliveryLetterData> {
  return await instanceWithAuth.get('/delivery-letters', data);
}
