import * as React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useState} from 'react';
import useStore from '../Store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signUp} from '../APIs/member';

import type {UserInfo} from '../types/types';

type Props = {
  disableSignUp: boolean;
  onPress: () => void;
};

export function SignUpButton({disableSignUp, onPress: onPressSignUp}: Props) {
  const [disable, setDisable] = useState(false);
  const store = useStore();

  const onPress = async () => {
    setDisable(true);
    onPressSignUp();
    try {
      if (
        store.registerToken &&
        store.signUpInfo.nickname &&
        store.signUpInfo.topicIds &&
        store.signUpInfo.personalityIds &&
        store.signUpInfo.geolocationId
      ) {
        const userInfo: UserInfo = {
          registerToken: store.registerToken,
          nickname: store.signUpInfo.nickname,
          topicIds: store.signUpInfo.topicIds,
          personalityIds: store.signUpInfo.personalityIds,
          geolocationId: store.signUpInfo.geolocationId,
        };

        const {accessToken, refreshToken} = await signUp(userInfo);

        await Promise.all([
          AsyncStorage.setItem('accessToken', accessToken),
          AsyncStorage.setItem('refreshToken', refreshToken),
        ]);

        store.clearSignupInfo();
        store.setIsLoading(true);
      }
    } catch (error: any) {
      console.error(error.message);
      Alert.alert('error', error.message);
    } finally {
      setDisable(false);
    }
  };

  return (
    <TouchableWithoutFeedback
      disabled={disableSignUp || disable}
      onPress={onPress}>
      <View
        style={[
          styles.signUpButton,
          {
            backgroundColor: !disableSignUp ? '#ff6ece' : '#ffc7f0',
          },
        ]}>
        <Text style={styles.nextButtonText}>가입 완료!</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {fontFamily: 'Galmuri11', color: 'white'},
});
