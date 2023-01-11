import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {Topics} from '../types/types';
import {TopicButton} from './TopicButton';

import {TOPIC_CATEGORY} from '../Constants/user';

type Props = {
  topics: Topics;
  selectTopic: (topicId: number) => void;
  selectedTopicIds: number[];
};

export function TopicList({topics, selectTopic, selectedTopicIds}: Props) {
  return (
    <>
      {TOPIC_CATEGORY.map(({text, key}, idx) => (
        <View key={idx}>
          <Text style={styles.category}>{text}</Text>
          <View style={styles.topicWrap}>
            {topics
              .filter(topic => topic.group === key)
              .map(topic => {
                return (
                  <TopicButton
                    key={topic.id}
                    topic={topic}
                    selectTopic={selectTopic}
                    selectedTopicIds={selectedTopicIds}
                  />
                );
              })}
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  topicWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  category: {
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginBottom: 10,
  },
});
