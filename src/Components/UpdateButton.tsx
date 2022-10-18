import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  activateUpdate: boolean;
  onPress: () => void;
};

export function UpdateButton({activateUpdate, onPress}: Props) {
  const [disable, setDisable] = useState(false);
  return (
    <Pressable
      disabled={!activateUpdate || disable}
      onPress={() => {
        setDisable(!disable);
        onPress();
      }}>
      <View
        style={[
          styles.updateButton,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: activateUpdate ? '#ff6ece' : '#ffc7f0',
          },
        ]}>
        <Text style={styles.updateButtonText}>변경하기</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  updateButton: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {fontFamily: 'Galmuri11', color: 'white'},
});
