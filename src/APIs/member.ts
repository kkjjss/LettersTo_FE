import type {RegisterToken, UserInfo} from '../types/types';
import {get, post} from '../Utils/http';

export async function signUp(userInfo: UserInfo): Promise<RegisterToken> {
  return await post('/members', {...userInfo});
}

export async function logIn() {
  return await get('/members', true);
}

export async function existsNickname(nickname: string): Promise<boolean> {
  return await get('/members/nickname/exists', false, {nickname});
}
