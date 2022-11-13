import {PublicLetterWriteRequest} from '../types/types';
import {instanceWithAuth} from '../Utils/http';

export async function postPublicLetter(
  publicLetterData: PublicLetterWriteRequest,
) {
  return await instanceWithAuth.post('/public-letters', publicLetterData);
}
