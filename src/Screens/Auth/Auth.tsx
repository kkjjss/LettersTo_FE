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
import * as tokenAPI from '../../APIs/token';

import {KakaoOAuthToken} from '@react-native-seoul/kakao-login';

import {login} from '@react-native-seoul/kakao-login';
import useStore from '../../Store/store';

type Props = NativeStackScreenProps<StackParamsList, 'Auth'>;

export function Auth({navigation}: Props) {
  const store = useStore();

  function signUpWithSocialService(socialService: string) {
    switch (socialService) {
      case 'google':
        navigation.navigate('NicknameForm');
        break;
      default:
        break;
    }
  }

  function isKakaoOAuthToken(arg: any): arg is KakaoOAuthToken {
    return arg.idToken !== undefined;
  }

  const signUpWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      if (isKakaoOAuthToken(token)) {
        const tokenInfo = {
          idToken: token.idToken,
        };
        const registerToken = await tokenAPI.postToken(tokenInfo);

        if (registerToken) {
          store.setToken(registerToken);
          navigation.navigate('NicknameForm');
        }
      } else {
        throw new Error('KakaoOAuthToken가 아닌 토큰');
      }
    } catch (err) {
      console.error(err);

      // dev
      navigation.navigate('NicknameForm');
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
          <TouchableWithoutFeedback onPress={signUpWithKakao}>
            <View style={[styles.loginButton, {backgroundColor: '#F9E54C'}]}>
              <Text style={[styles.loginText]}>카카오로 시작하기</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[styles.loginButton, {backgroundColor: '#03C75A'}]}>
              <Text style={[styles.loginText]}>네이버로 시작하기</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => signUpWithSocialService('google')}>
            <View
              style={[
                styles.loginButton,
                // eslint-disable-next-line react-native/no-inline-styles
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
