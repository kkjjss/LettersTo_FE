import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import {LinearGradient} from 'expo-linear-gradient';
import useStore from '../../Store/store';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn} from '../../APIs/member';
import {RegisterToken} from '../../types/types';
import {useKakaoLogin} from '../../Hooks/Auth/useKaKaoLogin';

type Props = NativeStackScreenProps<StackParamsList, 'Auth'>;

export function Auth({navigation}: Props) {
  const store = useStore();

  const [disableSignUp, setDisableSignUp] = useState(false);

  const {signUpWithKakao} = useKakaoLogin();

  const onPressSignUpWithKaKao = async () => {
    setDisableSignUp(true);
    try {
      const userTokens = await signUpWithKakao();
      await loginWithToken(userTokens);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setDisableSignUp(false);
    }
  };

  const loginWithToken = async (userTokens: RegisterToken) => {
    if (userTokens.verified === false) {
      store.setRegisterToken(userTokens.registerToken);
      navigation.navigate('NicknameForm');
    } else {
      AsyncStorage.setItem('accessToken', userTokens.accessToken);
      AsyncStorage.setItem('refreshToken', userTokens.refreshToken);
      const userInfo = await logIn();
      store.setUserInfo({
        nickname: userInfo.nickname,
        personalityIds: userInfo.personalityIds,
        topicIds: userInfo.topicIds,
        geolocationId: userInfo.geolocationId,
        parentGeolocationId: userInfo.parentGeolocationId,
      });
      store.setIsLoggedIn(true);
    }
  };

  return (
    <LinearGradient
      colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>
            로그인 및 회원가입 1초 만에 시작하기
          </Text>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            disabled={disableSignUp}
            onPress={onPressSignUpWithKaKao}>
            <View style={[styles.loginButton, {backgroundColor: '#F9E54C'}]}>
              <Text style={[styles.loginText]}>카카오로 시작하기</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[styles.loginButton, {backgroundColor: '#03C75A'}]}>
              <Text style={[styles.loginText]}>네이버로 시작하기</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.loginButton,
                {
                  backgroundColor: '#ffffff',
                  borderWidth: 1,
                  borderColor: '#0000cc',
                },
              ]}>
              <Text style={[styles.loginText]}>이메일로 시작하기</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.bottomWrap}>
          <Text style={styles.bottomText}>
            회원가입 시 개인정보처리방침을 읽었으며
          </Text>
          <Text style={styles.bottomText}>
            이용약관에 동의하신 것으로 간주합니다
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  titleWrap: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {fontFamily: 'Galmuri11'},
  buttonWrap: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    width: 327,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  loginText: {
    fontFamily: 'Galmuri11',
    fontSize: 15,
  },
  bottomWrap: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  bottomText: {fontFamily: 'Galmuri11', fontSize: 12, color: '#0000cc'},
});
