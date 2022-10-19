// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamsList} from '../types/stackParamList';
import useStore from '../Store/store';
import {logIn} from '../APIs/member';

type Props = NativeStackScreenProps<StackParamsList, 'Splash'>;

export function Splash({}: Props) {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const store = useStore();

  useEffect(() => {
    async function checkForService() {
      try {
        // 유저 정보 받아옴
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        // 있으면 로그인
        if (accessToken && refreshToken) {
          console.log(
            'Login With AccessToken/RefreshToken: ',
            accessToken,
            refreshToken,
          );

          const userInfo = await logIn();
          store.setUserInfo({
            nickname: userInfo.nickname,
            personalityIds: userInfo.personalityIds,
            topicIds: userInfo.topicIds,
            geolocationId: userInfo.geolocationId,
          });

          store.setIsLoggedIn(true);
        }

        // 끝나면 로딩 끝
        setAnimating(false);
        store.setIsLoading(false);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    checkForService();
  }, [store]);

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
