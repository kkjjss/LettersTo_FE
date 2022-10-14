export interface Token {
  idToken: string;
}

export interface RegisterToken {
  registerToken: string;
  accessToken: string;
  refreshToken: string;
  verified: boolean;
}

export type Topics = {
  id: number;
  name: string;
}[];

export type Personalities = {
  id: number;
  name: string;
}[];

export interface UserInfo {
  refreshToken: string;
  nickname: string;
  topickIds: number[];
  personalityIds: number[];
  geolocationId: number;
}
