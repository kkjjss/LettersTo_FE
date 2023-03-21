import {instanceWithAuth} from '../Utils/http';
import {ReportData} from '../types/types';

export async function reportLetter(reportData: ReportData) {
  return await instanceWithAuth.post('/reports', reportData);
}
