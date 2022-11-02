import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PAPER_STYLES} from '../../Constants/letter';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {PaperColorSelector} from './PaperColorSelector';
import {PaperStyleSelector} from './PaperStyleSelector';

type Props = {
  setPaperColor: React.Dispatch<React.SetStateAction<string>>;
  paperColor: string;
  setPaperStyle: React.Dispatch<
    React.SetStateAction<typeof PAPER_STYLES[number]>
  >;
  paperStyle: typeof PAPER_STYLES[number];
};

export const PaperSelector = React.memo(
  ({setPaperColor, paperColor, setPaperStyle, paperStyle}: Props) => {
    return (
      <View style={styles.paperSelector}>
        <PaperColorSelector
          paperColor={paperColor}
          setPaperColor={setPaperColor}
        />
        <PaperStyleSelector
          paperStyle={paperStyle}
          setPaperStyle={setPaperStyle}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  paperSelector: {
    height: SCREEN_HEIGHT * 0.4,
  },
});
