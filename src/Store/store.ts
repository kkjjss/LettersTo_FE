import create from 'zustand';
import {
  // Personalities,
  // Topics,
  Stamps,
  PaperColor,
  PaperStyle,
  DeliveryLetterWriteRequest,
} from '@type/types';
import {subDate} from '@utils/dateFormatter';

interface Store {
  // isLoggedIn: boolean;
  // setIsLoggedIn: (value: boolean) => void;

  // isLoading: boolean;
  // setIsLoading: (value: boolean) => void;

  // registerToken: string | undefined;
  // setRegisterToken: (value: string) => void;

  // topics: Topics;
  // setTopics: (value: Topics) => void;

  // personalities: Personalities;
  // setPersonalities: (value: Personalities) => void;

  // signUpInfo: {
  //   nickname: string | undefined;
  //   personalityIds: number[] | undefined;
  //   topicIds: number[] | undefined;
  //   geolocationId: number | undefined;
  // };
  // setNickname: (value: string) => void;
  // setTopicIds: (value: number[]) => void;
  // setPersonalityIds: (value: number[]) => void;
  // setAddress: (value: number) => void;
  // clearSignupInfo: () => void;

  // userInfo:
  //   | {
  //       nickname: string;
  //       personalityIds: number[];
  //       topicIds: number[];
  //       geolocationId: number;
  //       parentGeolocationId: number;
  //       stampQuantity: number;
  //     }
  //   | undefined;
  // setUserInfo: (value: {
  //   nickname: string;
  //   personalityIds: number[];
  //   topicIds: number[];
  //   geolocationId: number;
  //   parentGeolocationId: number;
  //   stampQuantity: number;
  // }) => void;

  // setStampQuantity: (value: number) => void;

  // signOut: () => void;

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
    nickname: string;
    address: {
      region: string;
      city: string;
    };
  };
  setCoverTopicIds: (topicIds: number[]) => void;
  setCoverPersonalityIds: (personalityIds: number[]) => void;
  setCoverStampId: (stampId: number | undefined) => void;
  setCoverNickname: (nickname: string) => void;
  setCoverAddress: (region: string, city: string) => void;

  stamps: Stamps;
  setStamps: (value: Stamps) => void;
}

const useStore = create<Store>(set => ({
  // isLoggedIn: false,
  // setIsLoggedIn: value => set(() => ({isLoggedIn: value})),

  // isLoading: true,
  // setIsLoading: value => set(() => ({isLoading: value})),

  // registerToken: undefined,
  // setRegisterToken: value => set(() => ({registerToken: value})),

  // topics: [],
  // setTopics: value => set(() => ({topics: value})),

  // personalities: [],
  // setPersonalities: value => set(() => ({personalities: value})),

  // signUpInfo: {
  //   nickname: undefined,
  //   personalityIds: undefined,
  //   topicIds: undefined,
  //   geolocationId: undefined,
  // },

  // setNickname: value =>
  //   set(state => ({signUpInfo: {...state.signUpInfo, nickname: value}})),

  // setTopicIds: value =>
  //   set(state => ({signUpInfo: {...state.signUpInfo, topicIds: value}})),

  // setPersonalityIds: value =>
  //   set(state => ({signUpInfo: {...state.signUpInfo, personalityIds: value}})),

  // setAddress: value =>
  //   set(state => ({signUpInfo: {...state.signUpInfo, geolocationId: value}})),

  // clearSignupInfo: () =>
  //   set(() => ({
  //     signUpInfo: {
  //       nickname: undefined,
  //       personalityIds: undefined,
  //       topicIds: undefined,
  //       geolocationId: undefined,
  //     },
  //   })),

  // userInfo: undefined,

  // setUserInfo: value => set(() => ({userInfo: value})),

  // setStampQuantity: value =>
  //   set(state => {
  //     if (state.userInfo) {
  //       return {userInfo: {...state.userInfo, stampQuantity: value}};
  //     } else {
  //       return {};
  //     }
  //   }),

  // signOut: () =>
  //   set(() => ({userInfo: undefined, isLoggedIn: false, isLoading: true})),

  letter: undefined,

  setLetter: letterData => set(() => ({letter: {...letterData}})),

  cover: {
    topicIds: [],
    personalityIds: [],
    stamp: undefined,
    nickname: '',
    address: {
      region: '',
      city: '',
    },
  },

  setCoverTopicIds: topicIds =>
    set(state => ({cover: {...state.cover, topicIds: topicIds}})),

  setCoverPersonalityIds: personalityIds =>
    set(state => ({cover: {...state.cover, personalityIds: personalityIds}})),

  setCoverStampId: stampId =>
    set(state => ({cover: {...state.cover, stamp: stampId}})),

  setCoverNickname: nickname =>
    set(state => ({cover: {...state.cover, nickname}})),

  setCoverAddress: (region, city) =>
    set(state => ({cover: {...state.cover, address: {region, city}}})),

  // setInitialCoverData: () =>
  //   set(state => ({
  //     cover: {
  //       topicIds: state.userInfo?.topicIds ?? [],
  //       personalityIds: state.userInfo?.personalityIds ?? [],
  //       stamp: undefined,
  //     },
  //   })),

  stamps: [
    {id: 1, image: require('@assets/stamp/1.png')},
    {id: 2, image: require('@assets/stamp/2.png')},
    {id: 3, image: require('@assets/stamp/3.png')},
    {id: 4, image: require('@assets/stamp/4.png')},
    {id: 5, image: require('@assets/stamp/5.png')},
    {id: 6, image: require('@assets/stamp/6.png')},
    {id: 7, image: require('@assets/stamp/7.png')},
    {id: 8, image: require('@assets/stamp/8.png')},
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

  standardDeliveryDate: string;

  setDeliveryLetterData: (value: DeliveryLetterWriteRequest) => void;

  setDeliverLetterTo: (value: {toNickname: string; toAddress: string}) => void;

  setStandardDeliveryDate: (value: string) => void;

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

  standardDeliveryDate: '',

  setDeliverLetterTo: (value: {toNickname: string; toAddress: string}) =>
    set(() => ({deliveryLetterTo: value})),

  setDeliveryLetterData: (value: DeliveryLetterWriteRequest) =>
    set(state => ({deliveryLetter: {...state.deliveryLetter, ...value}})),

  setStandardDeliveryDate: (deliveryDate: string) => {
    const {days, hours, minutes} = subDate(new Date(deliveryDate), new Date());

    let dateString = '';
    if (days > 0) dateString = days + '일 ';
    if (hours > 0) dateString += hours + '시간 ';
    if (minutes > 0) dateString += minutes + '분 ';

    set(() => ({standardDeliveryDate: dateString}));
  },

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
