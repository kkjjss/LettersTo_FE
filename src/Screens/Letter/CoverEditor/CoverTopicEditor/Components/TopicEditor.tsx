import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {MAX_TOPIC_LIMIT} from '../../../../../Constants/user';
import {Topics} from '../../../../../types/types';
import {ResetButton} from '../../../../../Components/ResetButton';
import {TopicList} from '../../../../../Components/TopicList';
import {Title} from '../../../../../Components/UserInfo/Title/Title';
import {Counter} from '../../../../../Components/UserInfo/Counter/Counter';

type Props = {
  topics: Topics;
  selectedTopicIds: number[];
  selectTopic: (topicId: number) => void;
  counter: number;
  reset: () => void;
};

export const TopicEditor = ({
  topics,
  selectedTopicIds,
  selectTopic,
  counter,
  reset,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Title title={'나의 관심사를\n모두 선택해주세요'} />
        <View style={styles.counterWrap}>
          <ResetButton reset={reset} />
          <Counter value={counter} max={MAX_TOPIC_LIMIT} />
        </View>
      </View>
      <ScrollView alwaysBounceVertical={false} style={styles.topicBox}>
        <TopicList
          topics={topics}
          selectTopic={selectTopic}
          selectedTopicIds={selectedTopicIds}
        />
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
