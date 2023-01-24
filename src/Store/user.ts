import create from 'zustand';
import {sendAttendance} from '../APIs/attendances';
import {logIn} from '../APIs/member';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from '../Components/Toast/toast';
import {UserInfo} from '../types/user';

interface UserStore {
  isLoggedIn: boolean;
  isLoading: boolean;

  userInfo: UserInfo;

  action: {
    login: () => void;
  };
}

const useUserStore = create<UserStore>(set => ({
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

  action: {
    login: async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
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
        }
      } catch (error: any) {
        console.error(error.message);
        Toast.show('문제가 발생했습니다');
      } finally {
        set(() => ({isLoading: false}));
      }
    },
  },
}));

export default useUserStore;
