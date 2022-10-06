import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import type {StackParamsList} from '../../types';
import {LinearGradient} from 'expo-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import useStore from '../../Store/store';

import {
  login,
  logout,
  getProfile as getKakaoProfile,
  unlink,
} from '@react-native-seoul/kakao-login';

type Props = NativeStackScreenProps<StackParamsList, 'Auth'>;

const windowWidth = Dimensions.get('window').width;

export function Auth({navigation}: Props) {
  // const {setIsLoggedIn} = useStore();

  // async function logIn() {
  //   await AsyncStorage.setItem('user_id', 'aa').then(() => {
  //     setIsLoggedIn(true);
  //   });
  // }

  function signInWithSocialService(socialService: string) {
    switch (socialService) {
      case 'google':
        navigation.navigate('NicknameForm');
        break;

      default:
        break;
    }
  }

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      console.log(token);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('login err', err);
    }
  };

  return (
    <LinearGradient
      colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>
            로그인 및 회원가입 1초 만에 시작하기
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableWithoutFeedback>
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
            onPress={() => signInWithSocialService('google')}>
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
        <View style={styles.bottomWrapper}>
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
  titleWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  titleText: {fontFamily: 'Galmuri11'},
  buttonWrapper: {
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
  bottomWrapper: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  bottomText: {fontFamily: 'Galmuri11', fontSize: 12, color: '#0000cc'},
});
