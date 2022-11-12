export interface Token {
  idToken: string;
}

export interface RegisterToken {
  registerToken: string;
  accessToken: string;
  refreshToken: string;
  verified: boolean;
}

export type Topic = {
  group: 'ENTERTAINMENT' | 'LIFE_HOBBY' | 'KNOWLEDGE_ETC';
  id: number;
  name: string;
};

export type Topics = Topic[];

export type Personality = {
  id: number;
  name: string;
};

export type Personalities = Personality[];

export type Regions = {
  id: number;
  name: string;
}[];

export type Cities = {
  id: number;
  name: string;
}[];

export interface UserInfo {
  registerToken: string;
  nickname: string;
  topicIds: number[];
  personalityIds: number[];
  geolocationId: number;
}

export interface PublicLetter {
  id: number;
  title: string;
  fromAddress: string;
  fromNickname: string;
  topics: string[];
  personalities: string[];
  paperColor: string;
  stampId?: number;
  createDate?: string;
  [key: string]: any;
};

export type PublicLetters = PublicLetter[];
