import * as React from 'react';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../types';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

type Props = {
  navigation: NativeStackNavigationProp<StackParamsList, keyof StackParamsList>;
  screen: keyof StackParamsList;
  activateNext: boolean;
};

export function NextButton({navigation, screen, activateNext}: Props) {
  function gonext() {
    navigation.navigate(screen);
  }

  return (
    <TouchableWithoutFeedback disabled={!activateNext} onPress={gonext}>
      <View
        style={[
          styles.nextButton,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: activateNext ? '#ff6ece' : '#ffc7f0',
          },
        ]}>
        <Text style={styles.nextButtonText}>다음</Text>
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
