import {axiosInstance} from '../Utils/http';

export async function getStampHistories() {
  return await axiosInstance.get('/stamp-histories');
}
