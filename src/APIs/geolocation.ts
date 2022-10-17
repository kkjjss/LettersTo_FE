import {get} from '../Utils/http';
import type {Regions, Cities} from '../types/types';

export async function getRegions(): Promise<Regions> {
  return await get('/geolocations/regions');
}

export async function getCities(id: number): Promise<Cities> {
  return await get(`/geolocations/regions/${id}/cities`);
}
