import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TEXTICONS} from '../../Constants/letter';
import type {TexticonCategory} from '../../types/types';
import {TexticonItem} from './TexticonItem';

type Props = {
  selectedCategory: TexticonCategory;
  onInsertTexticon: (t: string) => void;
};

export const TexticonItemSelector = React.memo(
  ({selectedCategory, onInsertTexticon}: Props) => {
    return (
      <ScrollView>
        <View style={styles.texticonItemSelector}>
          {TEXTICONS[selectedCategory].list.map((texticon, index) => {
            return (
              <TexticonItem
                key={index}
                texticon={texticon}
                onInsertTexticon={onInsertTexticon}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  texticonItemSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
});
