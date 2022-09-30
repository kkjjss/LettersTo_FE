import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Button, Dimensions, StyleSheet} from 'react-native';
import type {StackParamsList} from '../../types';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import useStore from '../../Store/store';

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

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>
          로그인 및 회원가입 1초 만에 시작하기
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.loginButton}>
          <Button title="카카오로 시작하기" />
        </View>
        <View style={styles.loginButton}>
          <Button title="네이버로 시작하기" />
        </View>
        <View style={styles.loginButton}>
          <Button
            title="Google로 시작하기"
            onPress={() => signInWithSocialService('google')}
          />
        </View>
      </View>
      <View style={styles.bottomWrapper}>
        <Text>회원가입 시 개인정보처리방침을 읽었으며</Text>
        <Text>이용약관에 동의하신 것으로 간주합니다</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  titleWrapper: {flex: 3, justifyContent: 'center', alignItems: 'center'},
  titleText: {},
  buttonWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {margin: 5, width: windowWidth * 0.8},
  bottomWrapper: {flex: 1, alignItems: 'center'},
});
