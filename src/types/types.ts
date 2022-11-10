export interface Selector {
  start: number;
  end: number;
}

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

export type TexticonCategory =
  | 'happy'
  | 'worry'
  | 'angry'
  | 'upfeeling'
  | 'wink'
  | 'sad'
  | 'love';

export type Texticons = {
  [key in TexticonCategory]: {
    key: string;
    list: string[];
  };
};

export type Stamp = {
  id: string;
  image: any;
};

export type Stamps = Stamp[];
