import * as React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

type Props = {
  disable: boolean;
  onPress: () => void;
};

export function NextButton({disable, onPress}: Props) {
  return (
    <TouchableWithoutFeedback disabled={disable} onPress={onPress}>
      <View
        style={[
          styles.nextButton,
          {
            backgroundColor: disable ? '#ffc7f0' : '#ff6ece',
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
