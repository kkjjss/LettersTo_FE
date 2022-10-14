import {get} from '../Utils/http';
import type {Regions} from '../types/types';

export async function getRegions(): Promise<Regions> {
  return await get('/geolocations/regions');
}
