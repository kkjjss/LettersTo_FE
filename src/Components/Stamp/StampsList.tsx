import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StampButton} from './StampButton';
import type {Stamps} from '../../types/types';

type Props = {
  stamps: Stamps;
  selectedStampId: string;
  onPressStamp: (id: string) => void;
};

export function StampsList({stamps, onPressStamp: selectStamp}: Props) {
  return (
    <View style={styles.personalityWrap}>
      {stamps.map(stamp => (
        <StampButton key={stamp.id} stamp={stamp} onPress={selectStamp} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  personalityWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
