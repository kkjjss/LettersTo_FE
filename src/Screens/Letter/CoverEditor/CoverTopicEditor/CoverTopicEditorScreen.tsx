import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackParamsList} from '../../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TopicEditor} from './Components/TopicEditor';
import {LetterCoverPreview} from '../../../../Components/LetterEditor/LetterCoverPreview';
import useStore from '../../../../Store/store';
import {StepIndicator} from '../../../../Components/StepIndicator';
import {PUBLIC_COVER_EDIT_STEPS} from '../../../../Constants/user';
import {Header2} from '../../../../Components/Headers/Header2';
import {useTopic} from '../../../../Hooks/UserInfo/useTopic';
import {useQuery} from 'react-query';
import {getUserInfo} from '../../../../APIs/member';

type Props = NativeStackScreenProps<StackParamsList, 'CoverTopicEditor'>;

export function CoverTopicEditor({navigation}: Props) {
  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const {setCoverTopicIds, setCoverPersonalityIds} = useStore();

  const goNext = () =>
    !disableNext && navigation.navigate('CoverPersonalityEditor');

  const goBack = () => {
    navigation.pop();
  };

  const {
    topics,
    selectedTopicIds,
    selectTopic,
    counter,
    reset,
    initUserTopicIds,
  } = useTopic();

  const {data: userInfo, isSuccess} = useQuery('userInfo', getUserInfo);

  const disableNext = useMemo(
    () => selectedTopicIds.length === 0,
    [selectedTopicIds],
  );

  useEffect(() => {
    setCoverTopicIds(selectedTopicIds);
  }, [selectedTopicIds, setCoverTopicIds]);

  useEffect(() => {
    if (userInfo) {
      setCoverPersonalityIds(userInfo.personalityIds);
      initUserTopicIds(userInfo.topicIds);
    }
  }, [initUserTopicIds, setCoverPersonalityIds, userInfo]);

  if (!isSuccess) {
    return <></>;
  }

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
          <LetterCoverPreview userInfo={userInfo} />
        </View>
        <StepIndicator
          current={PUBLIC_COVER_EDIT_STEPS.TOPIC}
          of={PUBLIC_COVER_EDIT_STEPS.total}
        />
      </View>
      <TopicEditor
        topics={topics}
        selectedTopicIds={selectedTopicIds}
        selectTopic={selectTopic}
        counter={counter}
        reset={reset}
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
