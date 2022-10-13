import {post} from '../Utils/http';
import type {Token, RegisterToken} from '../types/token';

export async function postToken(body: Token): Promise<RegisterToken> {
  return await post('/token', body);
}
