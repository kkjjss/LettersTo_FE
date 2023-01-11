// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamsList} from '../types/stackParamList';
import useStore from '../Store/store';
import {logIn} from '../APIs/member';
import {sendAttendance} from '../APIs/attendances';
import {showToast} from '../Components/Toast/toast';

type Props = NativeStackScreenProps<StackParamsList, 'Splash'>;

export function Splash({}: Props) {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const {setUserInfo, setIsLoggedIn, setIsLoading} = useStore();

  useEffect(() => {
    const checkForService = async () => {
      // await AsyncStorage.clear();
      try {
        // 유저 정보 받아옴
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        // 있으면 로그인
        if (accessToken && refreshToken) {
          console.log(
            'Login With \nAccessToken:',
            accessToken,
            '\nRefreshToken: ',
            refreshToken,
          );

          const userInfo = await logIn();
          setUserInfo({
            nickname: userInfo.nickname,
            personalityIds: userInfo.personalityIds,
            topicIds: userInfo.topicIds,
            geolocationId: userInfo.geolocationId,
            parentGeolocationId: userInfo.parentGeolocationId,
            stampQuantity: userInfo.stampQuantity,
          });

          setIsLoggedIn(true);
          sendAttendanceOnLaunching();
        }

        // 끝나면 로딩 끝
        setAnimating(false);
        setIsLoading(false);
      } catch (error: any) {
        console.error(error.message);
        showToast('문제가 발생했습니다');
        setIsLoading(false);
      }
    };

    const sendAttendanceOnLaunching = () => {
      return sendAttendance();
    };

    checkForService();
  }, [setIsLoading, setIsLoggedIn, setUserInfo]);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#6990F7"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
