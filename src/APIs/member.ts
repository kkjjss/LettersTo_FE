import type {UserInfo, RegisterInfo, AuthTokens} from '../types/auth';
import {instance, instanceWithAuth} from '../Utils/http';

export async function signUp(registerInfo: RegisterInfo): Promise<AuthTokens> {
  return await instance.post('/members', {...registerInfo});
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
