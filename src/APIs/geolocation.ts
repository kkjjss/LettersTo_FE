import {instance} from '../Utils/http';
import type {Regions, Cities} from '../types/types';

export async function getRegions(): Promise<Regions> {
  return await instance.get('/geolocations/regions');
}

export async function getCities(id: number): Promise<Cities> {
  return await instance.get(`/geolocations/regions/${id}/cities`);
}
