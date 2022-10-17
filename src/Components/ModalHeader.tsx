import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  hideModal: () => void;
  title: string;
};

export function ModalHeader({hideModal, title}: Props) {
  return (
    <View style={styles.header}>
      <Pressable onPress={hideModal}>
        <Image
          source={require('../Assets/close.png')}
          style={styles.closeButton}
        />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.headerBlank} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: 12,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {height: 28, width: 28},
  title: {
    fontFamily: 'Galmuri11',
    fontSize: 15,
    color: '#0000cc',
  },
  headerBlank: {width: 28},
});
