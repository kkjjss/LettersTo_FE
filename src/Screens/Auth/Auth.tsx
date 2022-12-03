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
} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import {LinearGradient} from 'expo-linear-gradient';
import useStore from '../../Store/store';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn} from '../../APIs/member';
import {RegisterToken} from '../../types/types';
import {useKakaoLogin} from '../../Hooks/Auth/useKaKaoLogin';

import appleAuth from '@invertase/react-native-apple-authentication';
import jwtDecode from 'jwt-decode';
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
      Alert.alert('error', error.message);
      Alert.alert('error', error.message);
    } finally {
      setDisableSignUp(false);
    }
  };

  const loginWithToken = async (userTokens: RegisterToken) => {
    if (userTokens.verified === false) {
      store.setRegisterToken(userTokens.registerToken);
      navigation.navigate('NicknameForm');
    }
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
  };

  async function onPressSignUpWithApple() {
    try {
      if (appleAuth.isSupported) {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
        });

        console.log('appleAuthRequestResponse: ', appleAuthRequestResponse);

        appleAuthRequestResponse.identityToken &&
          console.log(
            'IDENTITY_TOKEN JWT DECODE RESULT : ',
            jwtDecode(appleAuthRequestResponse.identityToken),
          );

        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user,
        );

        if (credentialState === appleAuth.State.AUTHORIZED) {
          Alert.alert('애플 로그인 성공', '아직 개발중입니다');
        }
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []);

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
          <TouchableWithoutFeedback>
            <View style={[styles.loginButton, styles.emailLoginButton]}>
              <Image
                source={require('../../Assets/social/email.png')}
                style={styles.authIcon}
              />
              <Text style={[styles.loginText, styles.emailLoginText]}>
                이메일로 시작하기
              </Text>
            </View>
          </TouchableWithoutFeedback>
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
    color: '#0000cc',
    lineHeight: 17,
  },
  authIcon: {height: 20, width: 20, marginRight: 8},
});
