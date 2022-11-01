import create from 'zustand';
interface Store {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  registerToken: string | undefined;
  setRegisterToken: (value: string) => void;

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
}

const useStore = create<Store>(set => ({
  isLoggedIn: false,
  setIsLoggedIn: value => set(() => ({isLoggedIn: value})),

  isLoading: true,
  setIsLoading: value => set(() => ({isLoading: value})),

  registerToken: undefined,
  setRegisterToken: value => set(() => ({registerToken: value})),

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
}));

export default useStore;
