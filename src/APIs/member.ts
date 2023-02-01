import type {UserInfo, RegisterInfo, AuthTokens} from '../types/auth';
import {axiosInstance, instance, instanceWithAuth} from '../Utils/http';

export async function signUp(registerInfo: RegisterInfo): Promise<AuthTokens> {
  return await instance.post('/members', {...registerInfo});
}

export async function logIn() {
  return await axiosInstance.get<UserInfo>('/members');
}

export async function existsNickname(nickname: string): Promise<boolean> {
  return await axiosInstance.get<boolean>('/members/nickname/exists', {
    params: {nickname},
  });
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
