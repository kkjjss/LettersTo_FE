import * as React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../types';

type Props = {
  navigation: NativeStackNavigationProp<StackParamsList, keyof StackParamsList>;
  title: string;
};

export function Header({navigation, title}: Props) {
  function goback() {
    navigation.pop();
  }

  return (
    <View
      style={{
        height: 52,
        justifyContent: 'center',
      }}>
      <TouchableWithoutFeedback onPress={() => goback()}>
        <View
          style={{
            position: 'absolute',
            top: 12,
            left: 10,
            width: 40,
          }}>
          <Text
            style={{
              fontFamily: 'Galmuri11',
              fontSize: 35,
            }}>
            {' < '}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Text>{title}</Text>
    </View>
  );
}
