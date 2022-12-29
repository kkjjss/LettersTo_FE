import React, {useCallback, useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MAX_TOPIC_LIMIT} from '../../../Constants/constants';
import useStore from '../../../Store/store';
import {ResetButton} from '../../ResetButton';
import {TopicList} from '../../TopicList';

type Props = {
  selectedTopicIds: number[];
  setSelectedTopicIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const TopicEditor = ({selectedTopicIds, setSelectedTopicIds}: Props) => {
  const {userInfo, topics} = useStore();

  const {bottom} = useSafeAreaInsets();

  const counter = useMemo(() => selectedTopicIds.length, [selectedTopicIds]);

  const selectTopic = useCallback(
    (topicId: number) => {
      // alert.reset();
      if (
        counter < MAX_TOPIC_LIMIT &&
        selectedTopicIds.includes(topicId) === false
      ) {
        setSelectedTopicIds([...selectedTopicIds, topicId]);
      } else if (selectedTopicIds.includes(topicId) === true) {
        setSelectedTopicIds([...selectedTopicIds].filter(e => e !== topicId));
      } else {
        // alert.start();
      }
    },
    [counter, selectedTopicIds, setSelectedTopicIds],
  );

  const reset = () => {
    if (userInfo) {
      setSelectedTopicIds(userInfo.topicIds);
    }
  };

  useEffect(() => {
    const getUserTopics = () => {
      if (userInfo) {
        setSelectedTopicIds([...userInfo.topicIds]);
      }
    };

    getUserTopics();
  }, [setSelectedTopicIds, userInfo]);

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>나의 관심사를</Text>
          <Text style={styles.titleText}>모두 선택해주세요</Text>
        </View>
        <View style={styles.counterWrap}>
          <ResetButton reset={reset} />
          <Text style={styles.counter}>
            {counter} / {MAX_TOPIC_LIMIT}
          </Text>
        </View>
      </View>
      <ScrollView alwaysBounceVertical={false} style={[styles.topicBox]}>
        <View style={{paddingTop: 16, paddingBottom: bottom}}>
          <TopicList
            topics={topics}
            selectTopic={selectTopic}
            selectedTopicIds={selectedTopicIds}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopColor: '#0000cc',
    borderTopWidth: 1,
  },
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
  titleText: {
    fontSize: 18,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginTop: 8,
  },
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
