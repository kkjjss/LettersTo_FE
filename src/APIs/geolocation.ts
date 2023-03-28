import {axiosInstance} from '@utils/http';
import type {Regions, Cities} from '@type/types';

export async function getRegions() {
  return await axiosInstance.get<Regions>('/geolocations/regions');
}

export async function getCities(id: number): Promise<Cities> {
  return await axiosInstance.get(`/geolocations/regions/${id}/cities`);
}
