import {instanceWithAuth} from '../Utils/http';

export async function sendAttendance() {
  return await instanceWithAuth.post('/attendances');
}
