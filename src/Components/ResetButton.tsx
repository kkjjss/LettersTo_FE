import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export function ResetButton({reset}: {reset: () => void}) {
  return (
    <TouchableWithoutFeedback onPress={reset}>
      <View style={styles.resetButton}>
        <Text style={styles.resetButtonText}>초기화</Text>
        <Image
          style={styles.resetButtonImage}
          source={require('../Assets/reset.png')}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    width: 74,
    height: 22,
    flexDirection: 'row',
    backgroundColor: '#ffffcc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    borderRadius: 11,
  },
  resetButtonText: {
    fontFamily: 'Galmuri11',
    fontSize: 12,
    color: '#0000cc',
  },
  resetButtonImage: {width: 20, height: 20},
});
