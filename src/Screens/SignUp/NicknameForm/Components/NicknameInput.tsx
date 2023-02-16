import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type Props = {
  value: string;
  onChangeNickname: (name: string) => void;
};

export const NicknameInput = React.memo(
  ({value: nickname, onChangeNickname}: Props) => (
    <View style={styles.nicknameWrap}>
      <View style={styles.nicknameForm}>
        <TextInput
          style={styles.nicknameInput}
          value={nickname}
          onChangeText={onChangeNickname}
        />
      </View>
    </View>
  ),
);

const styles = StyleSheet.create({
  nicknameWrap: {
    marginBottom: 10,
    marginHorizontal: 24,
  },
  nicknameForm: {},
  nicknameInput: {
    padding: 17,
    height: 54,
    borderWidth: 1,
    borderColor: '#0000cc',
    borderRadius: 5,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
  },
});
