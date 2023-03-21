import {axiosInstance} from '../Utils/http';
import {ReportData} from '../types/types';

export async function reportLetter(reportData: ReportData) {
  return await axiosInstance.post('/reports', reportData);
}
