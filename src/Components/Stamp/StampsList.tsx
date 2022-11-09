import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Stamp} from './Stamp';

type Stamp = {
  id: string;
  image: any;
};

export function StampsList({
  stamps,
  onPressStamp: selectStamp,
}: {
  stamps: Stamp[];
  onPressStamp: (id: string) => void;
}) {
  return (
    <View style={styles.personalityWrap}>
      {stamps.map(stamp => (
        <Stamp key={stamp.id} stamp={stamp} onPress={selectStamp} />
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
