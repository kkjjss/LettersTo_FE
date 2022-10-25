import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, Button} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import useStore from '../../Store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<StackParamsList, 'Home'>;

export function Home({navigation}: Props) {
  const {setIsLoggedIn} = useStore();

  function logout() {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  }

  async function goToMyPage() {
    navigation.navigate('MyPage');
  }

  function goToLetterEditor() {
    navigation.navigate('LetterEditor');
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="로그아웃" onPress={logout} />
      <Button title="마이페이지" onPress={goToMyPage} />
      <Button title="편지작성" onPress={goToLetterEditor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
