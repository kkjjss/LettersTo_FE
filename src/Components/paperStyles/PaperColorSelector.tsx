import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {PAPER_COLORS} from '../../Constants/letter';
import {PaperColorButton} from './PaperColorButton';

type Props = {
  setPaperColor: React.Dispatch<React.SetStateAction<string>>;
  paperColor: string;
};

export const PaperColorSelector = React.memo(
  ({paperColor, setPaperColor}: Props) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.paperColorSelector}>
        {PAPER_COLORS.map((color, index) => (
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
