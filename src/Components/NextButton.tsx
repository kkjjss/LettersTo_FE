import * as React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

type Props = {
  activateNext: boolean;
  onPress: () => void;
};

export function NextButton({activateNext, onPress}: Props) {
  const [disable, setDisable] = React.useState(false);
  return (
    <TouchableWithoutFeedback
      disabled={!activateNext || disable}
      onPress={() => {
        setDisable(true);
        onPress();
      }}>
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
