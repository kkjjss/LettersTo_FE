import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Header} from '../../Components/Headers/Header';
import useStore from '../../Store/store';
import {StackParamsList} from '../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ResetButton} from '../../Components/ResetButton';
import {TopicList} from '../../Components/TopicList';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {Topics} from '../../types/types';
import {getTopics} from '../../APIs/topic';
import {TopicEditor} from '../../Components/CoverEditor/TopicEditor';

type Props = NativeStackScreenProps<StackParamsList, 'CoverEditor'>;

type coverProperty = 'topic' | 'personality' | 'stamp';

const COVER_PROPERTY: {[key in coverProperty]: string} = {
  topic: '관심사 선택',
  personality: '성향 선택',
  stamp: '우표 선택',
};

export function CoverEditor({
  navigation,
  route: {
    params: {property},
  },
}: Props) {
  console.log('CoverEditor');

  const {top} = useSafeAreaInsets();

  const LetterCover = () => {
    return <View style={{backgroundColor: 'white', height: 212}} />;
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 332 + top,
          backgroundColor: '#ffccee',
          paddingTop: top,
        }}>
        <Header navigation={navigation} title={COVER_PROPERTY[property]} />
        <View style={{paddingTop: 12, paddingHorizontal: 40}}>
          <LetterCover />
        </View>
      </View>
      <TopicEditor />
    </View>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  titleWrap: {
    // marginBottom: 30,
    justifyContent: 'flex-end',
  },
  titleText: {fontSize: 18, fontFamily: 'Galmuri11', color: '#0000cc'},
  counterWrap: {alignItems: 'center', flexDirection: 'row'},
  counter: {
    width: 48,
    fontSize: 13,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginHorizontal: 8,
    textAlign: 'right',
  },
  topicBox: {
    marginHorizontal: 24,
  },
});
