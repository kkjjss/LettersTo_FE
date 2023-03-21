import type {Personalities} from '../types/types';
import {axiosInstance} from '../Utils/http';

export async function getPersonalities() {
  return await axiosInstance.get<Personalities>('/personalities');
}
