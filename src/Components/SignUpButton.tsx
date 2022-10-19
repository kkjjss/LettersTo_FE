import * as React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../types/stackParamList';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useState} from 'react';

type Props = {
  activateSignUp: boolean;
  onPress: () => void;
};

export function SignUpButton({activateSignUp, onPress}: Props) {
  const [disable, setDisable] = useState(false);

  const onSignUp = () => {};

  return (
    <TouchableWithoutFeedback
      disabled={!activateSignUp || disable}
      onPress={() => {
        setDisable(true);
        onPress();
      }}>
      <View
        style={[
          styles.signUpButton,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: activateSignUp ? '#ff6ece' : '#ffc7f0',
          },
        ]}>
        <Text style={styles.nextButtonText}>가입 완료!</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {fontFamily: 'Galmuri11', color: 'white'},
});
