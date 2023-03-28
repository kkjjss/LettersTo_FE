import {axiosInstance} from '@utils/http';

export async function getStampHistories() {
  return await axiosInstance.get('/stamp-histories');
}
