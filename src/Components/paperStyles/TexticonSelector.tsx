import React from 'react';
import {View} from 'react-native';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import type {TexticonCategory} from '../../types/types';
import {TexticonCategorySelector} from './TexticonCategorySelector';
import {TexticonItemSelector} from './TexticonItemSelector';

type Props = {
  setSelectedCategory: React.Dispatch<React.SetStateAction<TexticonCategory>>;
  selectedCategory: TexticonCategory;
  onInsertTexticon: (t: string) => void;
};

export const TexticonSelector = React.memo(
  ({setSelectedCategory, selectedCategory, onInsertTexticon}: Props) => {
    return (
      <View
        style={{
          height: SCREEN_HEIGHT * 0.4,
        }}>
        <TexticonCategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <TexticonItemSelector
          selectedCategory={selectedCategory}
          onInsertTexticon={onInsertTexticon}
        />
      </View>
    );
  },
);
