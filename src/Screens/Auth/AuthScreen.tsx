import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, Button} from 'react-native';
import type {AuthStackParamList} from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'AuthScreen'>;

export function AuthScreen({navigation}: Props) {
  return (
    <View style={style.container}>
      <Text>Auth</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
