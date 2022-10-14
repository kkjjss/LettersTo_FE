import type {RegisterToken, UserInfo} from '../types/types';
import {get, post} from '../Utils/http';

export async function signUp(userInfo: UserInfo): Promise<RegisterToken> {
  return await post('/member', {...userInfo});
}

export async function existNickname(nickname: string): Promise<boolean> {
  return await get('/member', {nickname});
}
