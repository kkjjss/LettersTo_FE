import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

type Props = {
  activateNext: boolean;
  onPress: () => void;
};

export function NextButton({activateNext, onPress}: Props) {
  return (
    <TouchableWithoutFeedback disabled={!activateNext} onPress={onPress}>
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
    borderRadius: 5,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {fontFamily: 'Galmuri11', color: 'white'},
});
