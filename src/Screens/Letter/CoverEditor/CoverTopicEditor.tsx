import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../../Components/Headers/Header';
import {StackParamsList} from '../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TopicEditor} from '../../../Components/CoverEditor/TopicEditor';
import {LetterCoverPreview} from '../../../Components/LetterCoverPreview';
import useStore from '../../../Store/store';
import {getTopics} from '../../../APIs/topic';

type Props = NativeStackScreenProps<StackParamsList, 'CoverTopicEditor'>;

export function CoverTopicEditor({navigation}: Props) {
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const {setCoverTopicIds, setTopics} = useStore();

  const disableNext = useMemo(
    () => selectedTopicIds.length === 0,
    [selectedTopicIds],
  );

  useEffect(() => {
    const getTopicsList = () => {
      try {
        getTopics().then(topicData => {
          setTopics([...topicData]);
        });
      } catch (error: any) {
        console.error(error.message);
      }
    };

    getTopicsList();
  }, [setTopics]);

  useEffect(() => {
    setCoverTopicIds(selectedTopicIds);
  }, [selectedTopicIds, setCoverTopicIds]);

  return (
    <View style={{flex: 1}}>
      <View
        style={[
          styles.coverContainer,
          {
            height: 332 + SAFE_AREA_TOP,
            paddingTop: SAFE_AREA_TOP,
          },
        ]}>
        <Header
          navigation={navigation}
          title={'관심사 선택'}
          next={'CoverPersonalityEditor'}
          // onPressNext={onPressNext}
          disableNext={disableNext}
        />
        <View style={styles.cover}>
          <LetterCoverPreview />
        </View>
      </View>
      <TopicEditor
        selectedTopicIds={selectedTopicIds}
        setSelectedTopicIds={setSelectedTopicIds}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    backgroundColor: '#ffccee',
  },
  cover: {paddingTop: 12, paddingHorizontal: 40},
});
