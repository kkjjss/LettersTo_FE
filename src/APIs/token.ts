import {instance} from '../Utils/http';
import type {Token, RegisterToken} from '../types/types';

export async function postToken(body: Token): Promise<RegisterToken> {
  return await instance.post('/token', body);
}
