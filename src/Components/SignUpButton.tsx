import * as React from 'react';
import useStore from '../Store/store';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../types';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

type Props = {
  navigation: NativeStackNavigationProp<StackParamsList, keyof StackParamsList>;
  complete: boolean;
};

export function SignUpButton({complete}: Props) {
  const {setIsLoggedIn} = useStore();

  function signUp() {
    setIsLoggedIn(true);
  }

  return (
    <TouchableWithoutFeedback disabled={!complete} onPress={signUp}>
      <View
        style={[
          styles.nextButton,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: complete ? '#ff6ece' : '#ffc7f0',
          },
        ]}>
        <Text style={styles.nextButtonText}>가입 완료!</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {fontFamily: 'Galmuri11', color: 'white'},
});
