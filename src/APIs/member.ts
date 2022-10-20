import type {RegisterToken, UserInfo} from '../types/types';
import {instance, instanceWithAuth} from '../Utils/http';

export async function signUp(userInfo: UserInfo): Promise<RegisterToken> {
  return await instance.post('/members', {...userInfo});
}

export async function logIn() {
  return await instanceWithAuth.get('/members');
}

export async function existsNickname(nickname: string): Promise<boolean> {
  return await instance.get('/members/nickname/exists', {nickname});
}

export async function patchUserInfo(userInfo: {
  nickname?: string;
  geolocationId?: number;
  topicIds?: number[];
  personalityIds?: number[];
}) {
  return await instanceWithAuth.patch('/members', userInfo);
}
