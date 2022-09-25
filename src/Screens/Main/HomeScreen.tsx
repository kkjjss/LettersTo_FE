import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Button, StyleSheet} from 'react-native';
import type {MainStackParamList} from '../../types';

type Props = NativeStackScreenProps<MainStackParamList, 'HomeScreen'>;

export function HomeScreen({navigation}: Props) {
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
