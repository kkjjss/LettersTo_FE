import create from 'zustand';
import type {RegisterToken} from '../types/token';
interface Store {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  token: RegisterToken | undefined;
  setToken: (value: RegisterToken) => void;

  setNickname: (value: string) => void;

  signUpInfo: {
    nickname: string | undefined;
    personalityIds: number[] | undefined;
    topicIds: number[] | undefined;
    address: {
      state: string | undefined;
      city: string | undefined;
    };
  };
}

const useStore = create<Store>(set => ({
  isLoggedIn: false,
  setIsLoggedIn: value => set(() => ({isLoggedIn: value})),

  isLoading: true,
  setIsLoading: value => set(() => ({isLoading: value})),

  token: undefined,
  setToken: value => set(() => ({token: value})),

  signUpInfo: {
    nickname: undefined,
    personalityIds: undefined,
    topicIds: undefined,
    address: {
      state: undefined,
      city: undefined,
    },
  },
  setNickname: value =>
    set(state => ({signUpInfo: {...state.signUpInfo, nickname: value}})),

  setTopicIds: (value: number[]) =>
    set(state => ({signUpInfo: {...state.signUpInfo, topicIds: value}})),

  setPersonalityIds: (value: number[]) =>
    set(state => ({signUpInfo: {...state.signUpInfo, personalityIds: value}})),

  setAddress: (value: {state: string; city: string}) =>
    set(state => ({signUpInfo: {...state.signUpInfo, address: value}})),
}));

export default useStore;
