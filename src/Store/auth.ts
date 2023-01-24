import create from 'zustand';
import {sendAttendance} from '../APIs/attendances';
import {logIn} from '../APIs/member';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RegisterInfo, UserInfo} from '../types/auth';

interface AuthStore {
  isLoggedIn: boolean;
  isLoading: boolean;

  userInfo: UserInfo;

  registerInfo: RegisterInfo;

  action: {
    loginWithExistTokens: () => void;
    initRegisterInfo: (registerToken: string) => void;
  };
}

const useAuthStore = create<AuthStore>(set => ({
  isLoggedIn: false,
  isLoading: true,

  userInfo: {
    nickname: '',
    personalityIds: [],
    topicIds: [],
    geolocationId: 0,
    parentGeolocationId: 0,
    stampQuantity: 0,
  },

  registerInfo: {
    registerToken: '',
    nickname: '',
    geolocationId: 0,
    topicIds: [],
    personalityIds: [],
  },

  action: {
    loginWithExistTokens: async () => {
      try {
        const [accessToken, refreshToken] = await Promise.all([
          AsyncStorage.getItem('accessToken'),
          AsyncStorage.getItem('refreshToken'),
        ]);

        if (!accessToken || !refreshToken) {
          throw new Error('저장된 토큰이 없습니다.');
        }

        console.log(
          'Login With \nAccessToken:',
          accessToken,
          '\nRefreshToken: ',
          refreshToken,
        );

        const userInfo = await logIn();

        set(() => ({
          isLoggedIn: true,
          userInfo: {...userInfo},
        }));

        sendAttendance();
      } catch (error: any) {
        console.error(error.message);
      } finally {
        set(() => ({isLoading: false}));
      }
    },
    initRegisterInfo: registerToken =>
      set(() => ({
        registerInfo: {
          registerToken,
          nickname: '',
          geolocationId: 0,
          topicIds: [],
          personalityIds: [],
        },
      })),
  },
}));

export default useAuthStore;
