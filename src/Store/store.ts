import create from 'zustand';
import {Personalities, Topics, Stamps} from '../types/types';

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
      }
    | undefined;
  setUserInfo: (value: {
    nickname: string;
    personalityIds: number[];
    topicIds: number[];
    geolocationId: number;
    parentGeolocationId: number;
  }) => void;

  signOut: () => void;

  letter:
    | {
        title: string;
        text: string;
        paperStyle: string;
        paperColor: string;
        align: string;
        images?: string[];
      }
    | undefined;
  setLetter: (letterData: {
    title: string;
    text: string;
    paperStyle: string;
    paperColor: string;
    align: string;
    images?: string[];
  }) => void;

  cover: {
    topicIds: number[];
    personalityIds: number[];
    stamp: string | undefined;
  };
  setCoverTopicIds: (topicIds: number[]) => void;
  setCoverPersonalityIds: (personalityIds: number[]) => void;
  setCoverStampId: (stampId: string) => void;
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

  stamps: [],

  setStamps: value => set(() => ({stamps: [...value]})),
}));

export default useStore;
