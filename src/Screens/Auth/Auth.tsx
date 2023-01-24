import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {verifyProviderToken} from '../../APIs/token';
import {
  KakaoOAuthToken,
  login as loginWithKakaoOAuth,
} from '@react-native-seoul/kakao-login';
import appleAuth from '@invertase/react-native-apple-authentication';
import {HyperLink} from '../../Components/HyperLink/HyperLinkText';
import {
  onPressPrivacyPolicy,
  onPressTermsOfService,
} from '../../Utils/hyperlink';

import Toast from '../../Components/Toast/toast';
import {ProviderToken} from '../../types/auth';
import useAuthStore from '../../Store/auth';
import {AuthButton} from '../../Components/Button/Auth/AuthButton';

const kakaoLogo = require('../../Assets/social/kakao.png');
const appleLogo = require('../../Assets/social/apple.png');

type Props = NativeStackScreenProps<StackParamsList, 'Auth'>;

const isKakaoOAuthTokenType = (arg: any): arg is KakaoOAuthToken => {
  return arg.idToken !== undefined;
};

export function Auth({navigation}: Props) {
  const authAction = useAuthStore(state => state.action);

  const [disableSignUp, setDisableSignUp] = useState(false);

  const onPressSignUpWithKaKao = async () => {
    setDisableSignUp(true);
    try {
      const kakaoOAuthToken = await loginWithKakaoOAuth();
      if (!isKakaoOAuthTokenType(kakaoOAuthToken)) {
        throw new Error('KakaoOAuthToken 형식이 아님');
      }

      const providerToken: ProviderToken = {
        idToken: kakaoOAuthToken.idToken,
        providerType: 'KAKAO',
      };

      await loginWithProvider(providerToken);
    } catch (error: any) {
      console.error(error.message);
      Toast.show('문제가 발생했습니다.');
    } finally {
      setDisableSignUp(false);
    }
  };

  const onPressSignUpWithApple = async () => {
    setDisableSignUp(true);
    try {
      if (!appleAuth.isSupported) {
        throw new Error('애플 로그인을 지원하지 않는 기기입니다.');
      }

      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('애플 로그인 연동에 실패했습니다.');
      }

      const providerToken: ProviderToken = {
        idToken: appleAuthRequestResponse.identityToken,
        providerType: 'APPLE',
      };

      await loginWithProvider(providerToken);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setDisableSignUp(false);
    }
  };

  const loginWithProvider = async (providerToken: ProviderToken) => {
    const authTokens = await verifyProviderToken(providerToken);

    if (authTokens.verified === false && authTokens.registerToken) {
      // 회원가입 폼으로 이동
      authAction.initRegisterInfo(authTokens.registerToken);
      navigation.navigate('NicknameForm');
    } else if (authTokens.accessToken && authTokens.refreshToken) {
      // 토큰을 사용하여 로그인
      await Promise.all([
        AsyncStorage.setItem('accessToken', authTokens.accessToken),
        AsyncStorage.setItem('refreshToken', authTokens.refreshToken),
      ]);
      authAction.loginWithExistTokens();
    }
  };

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
          <AuthButton
            providerName={'카카오'}
            providerLogo={kakaoLogo}
            disable={disableSignUp}
            onPress={onPressSignUpWithKaKao}
            buttonStyle={styles.kakaoLoginButton}
            textStyle={styles.kakaoLoginText}
          />
          {Platform.OS === 'ios' && (
            <AuthButton
              providerName={'Apple'}
              providerLogo={appleLogo}
              disable={disableSignUp}
              onPress={onPressSignUpWithApple}
              buttonStyle={styles.appleLoginButton}
              textStyle={styles.appleLoginText}
            />
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
