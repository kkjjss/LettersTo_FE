import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, Button} from 'react-native';
import type {StackParamsList} from '../../types';
import useStore from '../../Store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<StackParamsList, 'Home'>;

export function Home({}: Props) {
  const {setIsLoggedIn} = useStore();

  async function logout() {
    await AsyncStorage.removeItem('user_id');
    setIsLoggedIn(false);
  }

  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
      <Button title="로그아웃" onPress={logout} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
