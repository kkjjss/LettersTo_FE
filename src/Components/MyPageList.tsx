import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

export function ListName({name}: {name: string}) {
  return (
    <View>
      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
}

export function ListItem({
  itmeName,
  openModal,
}: {
  itmeName: string;
  openModal: () => void;
}) {
  return (
    <TouchableWithoutFeedback onPress={openModal}>
      <View style={styles.itemWrap}>
        <Text style={styles.itemText}>{itmeName}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  nameText: {
    fontFamily: 'Galmuri11',
    fontSize: 12,
    color: '#0000cc',
    marginBottom: 14,
  },
  itemWrap: {height: 35, justifyContent: 'center'},
  itemText: {fontFamily: 'Galmuri11', fontSize: 15, color: '#0000cc'},
});
