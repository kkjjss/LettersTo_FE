import React, {useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TEXTICONS} from '../../Constants/letter';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import type {TexticonCategory} from '../../types/types';

type Props = {
  setSelectedCategory: React.Dispatch<React.SetStateAction<TexticonCategory>>;
  selectedCategory: TexticonCategory;
  onInsertTexticon: (t: string) => void;
};

export const TexticonSelector = ({
  setSelectedCategory,
  selectedCategory,
  onInsertTexticon,
}: Props) => {
  const TexticonCategorySelector = () => {
    const TexticonCategoryButton = ({
      category,
    }: {
      category: TexticonCategory;
    }) => {
      const isSelectedCategory = useMemo(
        () => category === selectedCategory,
        [category],
      );

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setSelectedCategory(category);
          }}
          style={[
            styles.texticonCategoryButton,
            {
              backgroundColor: isSelectedCategory ? '#FF6ECE' : 'white',
            },
          ]}>
          <Text
            style={[
              styles.texticonCategory,
              {
                color: category === selectedCategory ? 'white' : '#0000cc',
              },
            ]}>
            {TEXTICONS[category].key}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.texticonCategorySelector}>
        {(Object.keys(TEXTICONS) as TexticonCategory[]).map(
          (category, index) => {
            return <TexticonCategoryButton key={index} category={category} />;
          },
        )}
      </ScrollView>
    );
  };

  const TexticonItemSelector = () => {
    const TexticonItem = ({texticon}: {texticon: string}) => {
      return (
        <TouchableOpacity onPress={() => onInsertTexticon(texticon)}>
          <Text style={styles.texticonItem}>{texticon}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <ScrollView>
        <View style={styles.texticonItemSelector}>
          {TEXTICONS[selectedCategory].list.map((texticon, index) => {
            return <TexticonItem key={index} texticon={texticon} />;
          })}
        </View>
      </ScrollView>
    );
  };

  return (
    <View
      style={{
        height: SCREEN_HEIGHT * 0.4,
      }}>
      <TexticonCategorySelector />
      <TexticonItemSelector />
    </View>
  );
};

const styles = StyleSheet.create({
  texticonCategorySelector: {height: 68, paddingTop: 16, marginHorizontal: 16},
  texticonCategoryButton: {
    marginRight: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texticonCategory: {
    fontFamily: 'Galmuri11',
    fontSize: 13,
  },
  texticonItemSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  texticonItem: {
    color: 'white',
    height: 40,
    minWidth: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
