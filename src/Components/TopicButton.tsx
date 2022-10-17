import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

export function TopicButton({topic, selectTopic, selectedTopicIds}) {
  return (
    <TouchableHighlight
      key={topic.id}
      style={styles.underlayer}
      underlayColor={'#0000cc'}
      activeOpacity={0.7}
      onPress={() => selectTopic(topic.id)}>
      <View
        style={[
          styles.topic,
          selectedTopicIds.includes(topic.id)
            ? styles.selectedTopic
            : styles.notSelectedTopic,
        ]}>
        <Text style={styles.topicText}>{topic.name}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  underlayer: {
    marginBottom: 12,
    marginRight: 12,
  },
  topic: {
    height: 35,
    borderColor: '#0000cc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTopic: {
    height: 35,
    backgroundColor: '#ccccff',
  },
  notSelectedTopic: {backgroundColor: 'white'},
  topicText: {
    marginHorizontal: 13,
    fontFamily: 'Galmuri11',
    fontSize: 14,
    color: '#0000cc',
  },
});
