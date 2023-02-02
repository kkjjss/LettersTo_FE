import type {Topics} from '../types/types';
import {axiosInstance} from '../Utils/http';

export async function getTopics() {
  return await axiosInstance.get<Topics>('/topics');
}
