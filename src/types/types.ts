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
    stampQuantity: number;
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
    id: number;
    image: any;
};

export type Stamps = Stamp[];

export type PaperColor =
    | 'PINK'
    | 'ORANGE'
    | 'YELLOW'
    | 'GREEN'
    | 'MINT'
    | 'SKY_BLUE'
    | 'BLUE'
    | 'PURPLE'
    | 'LAVENDER';

export type PaperStyle = 'GRID' | 'DOT' | 'PLAIN';

export type PublicLetterWriteRequest = {
    title: string;
    content: string;
    paperType: PaperStyle;
    paperColor: PaperColor;
    stampId: number;
    alignType: 'LEFT' | 'CENTER' | 'RIGHT';
    topics: number[];
    personalities: number[];
    files?: string[];
};

export interface PublicLetter {
    id: number;
    title: string;
    fromAddress: string;
    fromNickname: string;
    topics: string[];
    personalities: string[];
    paperColor: PaperColor;
    stampId?: number;
    alignType: 'LEFT' | 'CENTER' | 'RIGHT';
    createDate?: Date;
    [key: string]: any;
}

export type PublicLetters = PublicLetter[];

export interface PublicLetterContent {
    id: number;
    title: string;
    content: string;
    fromAddress: string;
    fromNickname: string;
    paperColor: PaperColor;
    paperType: PaperStyle | 'LINE';
    alignType: 'LEFT' | 'CENTER' | 'RIGHT';
    stampId: number;
    replied: boolean;
    files: string[];
    createdDate: Date;
}

export interface DeliveryLetterWriteRequest {
    id?: number;
    title?: string;
    content?: string;
    paperType?: PaperStyle;
    paperColor?: PaperColor;
    alignType?: 'LEFT' | 'CENTER' | 'RIGHT';
    stampId?: number;
    files?: string[];
    deliveryType?: 'NONE' | 'STANDARD' | 'EXPRESS';
}

export interface LetterBox {
    fromMemberId: number;
    fromMemberNickname: string;
    new: boolean;
}

export type LetterBoxes = LetterBox[];

export interface LetterBoxInfo {
    fromNickname: string;
    fromAddress: string;
    startDate: Date;
    topics: string[];
    personalities: string[];
    [key: string]: any;
}
