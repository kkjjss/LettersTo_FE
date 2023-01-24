import type {RegisterToken, UserInfo as RegisterInfo} from '../types/types';
import type {UserInfo} from '../types/user';
import {instance, instanceWithAuth} from '../Utils/http';

export async function signUp(userInfo: RegisterInfo): Promise<RegisterToken> {
  return await instance.post('/members', {...userInfo});
}

export async function logIn(): Promise<UserInfo> {
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

export async function deleteAccount() {
  return await instanceWithAuth.delete('/members');
}
