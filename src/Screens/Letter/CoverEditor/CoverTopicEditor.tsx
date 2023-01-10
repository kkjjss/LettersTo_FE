import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {StackParamsList} from '../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TopicEditor} from '../../../Components/LetterEditor/Cover/TopicEditor';
import {LetterCoverPreview} from '../../../Components/LetterEditor/LetterCoverPreview';
import useStore from '../../../Store/store';
import {getTopics} from '../../../APIs/topic';
import {getPersonalities} from '../../../APIs/personality';
import {StepIndicator} from '../../../Components/StepIndicator';
import {PUBLIC_COVER_EDIT_STEPS} from '../../../Constants/constants';
import {Header2} from '../../../Components/Headers/Header2';

type Props = NativeStackScreenProps<StackParamsList, 'CoverTopicEditor'>;

export function CoverTopicEditor({navigation}: Props) {
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const {setCoverTopicIds, setTopics, setPersonalities} = useStore();

  const disableNext = useMemo(
    () => selectedTopicIds.length === 0,
    [selectedTopicIds],
  );

  const goNext = () =>
    !disableNext && navigation.navigate('CoverPersonalityEditor');

  const goBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    const getTopicsList = () => {
      try {
        getTopics().then(topicData => {
          setTopics([...topicData]);
        });
      } catch (error: any) {
        console.error(error.message);
        Alert.alert('error', error.message);
      }
    };

    const getPersonalitiesList = () => {
      try {
        getPersonalities().then(personalityData => {
          setPersonalities(personalityData);
        });
      } catch (error: any) {
        console.error(error.message);
        Alert.alert('error', error.message);
      }
    };

    getPersonalitiesList();

    getTopicsList();
  }, [setPersonalities, setTopics]);

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
        <Header2
          title={'관심사 선택'}
          onPressNext={goNext}
          onPressBack={goBack}
          disableNext={disableNext}
        />
        <View style={styles.cover}>
          <LetterCoverPreview />
        </View>
        <StepIndicator
          current={PUBLIC_COVER_EDIT_STEPS.TOPIC}
          of={PUBLIC_COVER_EDIT_STEPS.total}
        />
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
