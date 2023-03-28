import type {Topics} from '../types/types';
import {axiosInstance} from '@utils/http';

export async function getTopics() {
  return await axiosInstance.get<Topics>('/topics');
}
