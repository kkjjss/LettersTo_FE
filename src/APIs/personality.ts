import type {Personalities} from '../types/types';
import {axiosInstance} from '@utils/http';

export async function getPersonalities() {
  return await axiosInstance.get<Personalities>('/personalities');
}
