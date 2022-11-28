import create from 'zustand';
import {
  Personalities,
  Topics,
  Stamps,
  PaperColor,
  PaperStyle,
  DeliveryLetterWriteRequest,
} from '../types/types';

interface Store {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  registerToken: string | undefined;
  setRegisterToken: (value: string) => void;

  topics: Topics;
  setTopics: (value: Topics) => void;

  personalities: Personalities;
  setPersonalities: (value: Personalities) => void;

  signUpInfo: {
    nickname: string | undefined;
    personalityIds: number[] | undefined;
    topicIds: number[] | undefined;
    geolocationId: number | undefined;
  };
  setNickname: (value: string) => void;
  setTopicIds: (value: number[]) => void;
  setPersonalityIds: (value: number[]) => void;
  setAddress: (value: number) => void;
  clearSignupInfo: () => void;

  userInfo:
    | {
        nickname: string;
        personalityIds: number[];
        topicIds: number[];
        geolocationId: number;
        parentGeolocationId: number;
        stampQuantity: number;
      }
    | undefined;
  setUserInfo: (value: {
    nickname: string;
    personalityIds: number[];
    topicIds: number[];
    geolocationId: number;
    parentGeolocationId: number;
    stampQuantity: number;
  }) => void;

  setStampQuantity: (value: number) => void;

  signOut: () => void;

  letter:
    | {
        title: string;
        text: string;
        paperStyle: PaperStyle;
        paperColor: PaperColor;
        alignType: 'LEFT' | 'CENTER' | 'RIGHT';
        images?: string[];
      }
    | undefined;

  setLetter: (letterData: {
    title: string;
    text: string;
    paperStyle: PaperStyle;
    paperColor: PaperColor;
    alignType: 'LEFT' | 'CENTER' | 'RIGHT';
    images?: string[];
  }) => void;

  cover: {
    topicIds: number[];
    personalityIds: number[];
    stamp: number | undefined;
  };
  setCoverTopicIds: (topicIds: number[]) => void;
  setCoverPersonalityIds: (personalityIds: number[]) => void;
  setCoverStampId: (stampId: number | undefined) => void;
  setInitialCoverData: () => void;

  stamps: Stamps;
  setStamps: (value: Stamps) => void;
}

const useStore = create<Store>(set => ({
  isLoggedIn: false,
  setIsLoggedIn: value => set(() => ({isLoggedIn: value})),

  isLoading: true,
  setIsLoading: value => set(() => ({isLoading: value})),

  registerToken: undefined,
  setRegisterToken: value => set(() => ({registerToken: value})),

  topics: [],
  setTopics: value => set(() => ({topics: value})),

  personalities: [],
  setPersonalities: value => set(() => ({personalities: value})),

  signUpInfo: {
    nickname: undefined,
    personalityIds: undefined,
    topicIds: undefined,
    geolocationId: undefined,
  },

  setNickname: value =>
    set(state => ({signUpInfo: {...state.signUpInfo, nickname: value}})),

  setTopicIds: value =>
    set(state => ({signUpInfo: {...state.signUpInfo, topicIds: value}})),

  setPersonalityIds: value =>
    set(state => ({signUpInfo: {...state.signUpInfo, personalityIds: value}})),

  setAddress: value =>
    set(state => ({signUpInfo: {...state.signUpInfo, geolocationId: value}})),

  clearSignupInfo: () =>
    set(() => ({
      signUpInfo: {
        nickname: undefined,
        personalityIds: undefined,
        topicIds: undefined,
        geolocationId: undefined,
      },
    })),

  userInfo: undefined,

  setUserInfo: value => set(() => ({userInfo: value})),

  setStampQuantity: value =>
    set(state => {
      if (state.userInfo) {
        return {userInfo: {...state.userInfo, stampQuantity: value}};
      } else {
        return {};
      }
    }),

  signOut: () =>
    set(() => ({userInfo: undefined, isLoggedIn: false, isLoading: true})),

  letter: undefined,

  setLetter: letterData => set(() => ({letter: {...letterData}})),

  cover: {
    topicIds: [],
    personalityIds: [],
    stamp: undefined,
  },

  setCoverTopicIds: topicIds =>
    set(state => ({cover: {...state.cover, topicIds: topicIds}})),

  setCoverPersonalityIds: personalityIds =>
    set(state => ({cover: {...state.cover, personalityIds: personalityIds}})),

  setCoverStampId: stampId =>
    set(state => ({cover: {...state.cover, stamp: stampId}})),

  setInitialCoverData: () =>
    set(state => ({
      cover: {
        topicIds: state.userInfo?.topicIds ?? [],
        personalityIds: state.userInfo?.personalityIds ?? [],
        stamp: undefined,
      },
    })),

  stamps: [
    {id: 1, image: require('../Assets/stamp_sample/1.jpg')},
    {id: 2, image: require('../Assets/stamp_sample/2.jpg')},
    {id: 3, image: require('../Assets/stamp_sample/3.jpg')},
    {id: 4, image: require('../Assets/stamp_sample/4.jpg')},
    {id: 5, image: require('../Assets/stamp_sample/5.jpg')},
    {id: 6, image: require('../Assets/stamp_sample/6.jpg')},
  ],

  setStamps: value => set(() => ({stamps: [...value]})),
}));

export default useStore;

interface LetterEditorStore {
  deliveryLetter: DeliveryLetterWriteRequest;

  deliveryLetterTo:
    | {
        toNickname: string;
        toAddress: string;
      }
    | undefined;

  setDeliveryLetterData: (value: DeliveryLetterWriteRequest) => void;

  setDeliverLetterTo: (value: {toNickname: string; toAddress: string}) => void;

  initializeDeliverLetter: () => void;

  isDeliveryLetterSetComplete: () => boolean;
}

export const useLetterEditorStore = create<LetterEditorStore>((set, get) => ({
  deliveryLetter: {
    id: undefined,
    title: undefined,
    content: undefined,
    paperType: undefined,
    paperColor: undefined,
    alignType: undefined,
    stampId: undefined,
    files: [],
    deliveryType: undefined,
  },

  deliveryLetterTo: undefined,

  setDeliverLetterTo: (value: {toNickname: string; toAddress: string}) =>
    set(() => ({deliveryLetterTo: value})),

  setDeliveryLetterData: (value: DeliveryLetterWriteRequest) =>
    set(state => ({deliveryLetter: {...state.deliveryLetter, ...value}})),

  initializeDeliverLetter: () =>
    set(() => ({
      deliveryLetter: {
        id: undefined,
        title: undefined,
        content: undefined,
        paperType: undefined,
        paperColor: undefined,
        alignType: undefined,
        stampId: undefined,
        files: [],
        deliveryType: undefined,
      },
    })),

  isDeliveryLetterSetComplete: () => {
    const letter = get().deliveryLetter;

    return !Object.values(letter).includes(undefined);
  },
}));
