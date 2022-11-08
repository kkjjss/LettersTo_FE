import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../../Components/Headers/Header';
import {StackParamsList} from '../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TopicEditor} from '../../../Components/CoverEditor/TopicEditor';

type Props = NativeStackScreenProps<StackParamsList, 'CoverTopicEditor'>;

export function CoverTopicEditor({navigation}: Props) {
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const disableNext = useMemo(
    () => selectedTopicIds.length === 0,
    [selectedTopicIds],
  );

  const LetterCover = () => {
    // 나중에 구현
    return <View style={{backgroundColor: 'white', height: 212}} />;
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 332 + SAFE_AREA_TOP,
          backgroundColor: '#ffccee',
          paddingTop: SAFE_AREA_TOP,
        }}>
        <Header
          navigation={navigation}
          title={'관심사 선택'}
          next={'CoverPersonalityEditor'}
          // onPressNext={onPressNext}
          disableNext={disableNext}
        />
        <View style={{paddingTop: 12, paddingHorizontal: 40}}>
          <LetterCover />
        </View>
      </View>
      <TopicEditor
        selectedTopicIds={selectedTopicIds}
        setSelectedTopicIds={setSelectedTopicIds}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
