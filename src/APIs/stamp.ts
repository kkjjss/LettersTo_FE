import {instanceWithAuth} from '../Utils/http';

export async function getStampHistories() {
  return await instanceWithAuth.get('/stamp-histories');
}
