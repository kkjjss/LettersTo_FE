import { instance } from '../Utils/http';
import { PublicLetters } from '../types/types';

type PublicLetterData = {
  content: PublicLetters | [];
  cursor: number;
}

export async function getPublicLetters(cursor?: number): Promise<PublicLetterData> {
  if (cursor) {
    return await instance.get('/public-letters', {cursor});
  } else {
    return await instance.get('/public-letters');
  }
}
