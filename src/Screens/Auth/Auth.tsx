import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Alert,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import useStore from '../../Store/store';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn} from '../../APIs/member';
import {postToken} from '../../APIs/token';
import {RegisterToken} from '../../types/types';
import {useKakaoLogin} from '../../Hooks/Auth/useKaKaoLogin';

import appleAuth from '@invertase/react-native-apple-authentication';
import {HyperLink} from '../../Components/HyperLink/HyperLinkText';
import {
  onPressPrivacyPolicy,
  onPressTermsOfService,
} from '../../Utils/hyperlink';

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
      // 회원가입 폼으로 이동
      store.setRegisterToken(userTokens.registerToken);
      navigation.navigate('NicknameForm');
    } else if (userTokens.accessToken && userTokens.refreshToken) {
      // 토큰을 사용하여 로그인
      AsyncStorage.setItem('accessToken', userTokens.accessToken);
      AsyncStorage.setItem('refreshToken', userTokens.refreshToken);
      const userInfo = await logIn();
      store.setUserInfo({
        nickname: userInfo.nickname,
        personalityIds: userInfo.personalityIds,
        topicIds: userInfo.topicIds,
        geolocationId: userInfo.geolocationId,
        parentGeolocationId: userInfo.parentGeolocationId,
        stampQuantity: userInfo.stampQuantity,
      });
      store.setIsLoggedIn(true);
    }
  };

  async function onPressSignUpWithApple() {
    try {
      if (appleAuth.isSupported) {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL],
        });

        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('애플 로그인 연동에 실패했습니다.');
        }

        const userTokens = await postToken({
          idToken: appleAuthRequestResponse.identityToken,
          providerType: 'APPLE',
        });

        await loginWithToken(userTokens);
      }
    } catch (error: any) {
      console.error(error.message);
      Alert.alert('error', error.message);
    } finally {
      setDisableSignUp(false);
    }
  }

  useEffect(() => {
    if (appleAuth.isSupported) {
      return appleAuth.onCredentialRevoked(async () => {
        console.warn(
          'If this function executes, User Credentials have been Revoked',
        );
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require('../../Assets/logo/logo_main.gif')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            disabled={disableSignUp}
            onPress={onPressSignUpWithKaKao}>
            <View style={[styles.loginButton, styles.kakaoLoginButton]}>
              <Image
                source={require('../../Assets/social/kakao.png')}
                style={styles.authIcon}
              />
              <Text style={[styles.loginText, styles.kakaoLoginText]}>
                카카오로 시작하기
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {Platform.OS === 'ios' && (
            <TouchableWithoutFeedback
              disabled={disableSignUp}
              onPress={onPressSignUpWithApple}>
              <View style={[styles.loginButton, styles.appleLoginButton]}>
                <Image
                  source={require('../../Assets/social/apple.png')}
                  style={styles.authIcon}
                />
                <Text style={[styles.loginText, styles.appleLoginText]}>
                  Apple로 시작하기
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <View style={styles.bottomWrap}>
          <Text style={styles.bottomText}>
            회원가입 시{' '}
            <HyperLink onPress={onPressPrivacyPolicy}>
              개인정보처리방침
            </HyperLink>
            을 읽었으며
          </Text>
          <Text style={styles.bottomText}>
            <HyperLink onPress={onPressTermsOfService}>
              서비스이용약관
            </HyperLink>
            에 동의하신 것으로 간주합니다
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0000CC'},
  logo: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {height: 220, width: 200},
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
    flexDirection: 'row',
    borderRadius: 10,
  },
  kakaoLoginButton: {backgroundColor: '#F9E54C'},
  appleLoginButton: {backgroundColor: 'black'},
  emailLoginButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#0000cc',
  },
  loginText: {
    fontFamily: 'Galmuri11',
    fontSize: 15,
  },
  kakaoLoginText: {color: 'black'},
  appleLoginText: {color: 'white'},
  emailLoginText: {color: '#0000cc'},
  bottomWrap: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  bottomText: {
    fontFamily: 'Galmuri11',
    fontSize: 12,
    color: 'white',
    lineHeight: 17,
  },
  authIcon: {height: 20, width: 20, marginRight: 8},
});
