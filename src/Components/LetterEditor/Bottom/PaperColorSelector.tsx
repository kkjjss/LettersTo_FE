import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {PAPER_COLORS} from '../../../Constants/letter';
import {PaperColor} from '../../../types/types';
import {PaperColorButton} from './PaperColorButton';

type Props = {
  setPaperColor: React.Dispatch<React.SetStateAction<PaperColor>>;
  paperColor: PaperColor;
};

export const PaperColorSelector = React.memo(
  ({paperColor, setPaperColor}: Props) => {
    return (
      <ScrollView
        horizontal
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        style={styles.paperColorSelector}>
        {(Object.keys(PAPER_COLORS) as PaperColor[]).map((color, index) => (
          <PaperColorButton
            key={index}
            color={color}
            paperColor={paperColor}
            setPaperColor={setPaperColor}
          />
        ))}
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  paperColorSelector: {paddingVertical: 16, marginHorizontal: 16},
});
