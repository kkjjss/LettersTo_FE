import {axiosInstance} from '../Utils/http';

export async function sendAttendance() {
  return await axiosInstance.post('/attendances');
}
