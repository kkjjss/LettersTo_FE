import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  texticon: string;
  onSelectTexticon: (t: string) => void;
};

export const TexticonItem = React.memo(
  ({texticon, onSelectTexticon}: Props) => {
    console.log(texticon);
    return (
      <TouchableOpacity onPress={() => onSelectTexticon(texticon)}>
        <Text style={styles.texticonItem}>{texticon}</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  texticonItem: {
    color: 'white',
    height: 40,
    minWidth: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
