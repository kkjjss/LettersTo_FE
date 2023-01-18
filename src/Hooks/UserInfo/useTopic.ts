import {useEffect, useMemo, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {getTopics} from '../../APIs/topic';
import Toast from '../../Components/Toast/toast';
import {MAX_TOPIC_LIMIT} from '../../Constants/user';
import {Topics} from '../../types/types';

export const useTopic = () => {
  const [topics, setTopics] = useState<Topics>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);

  const counter = useMemo(() => selectedTopicIds.length, [selectedTopicIds]);

  const alertOpacity = useRef(new Animated.Value(0)).current;

  const alert = Animated.sequence([
    Animated.timing(alertOpacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }),
    Animated.timing(alertOpacity, {
      toValue: 0,
      delay: 2000,
      useNativeDriver: true,
    }),
  ]);

  const resetAlert = () => {
    alert.reset();
  };

  const selectTopic = (topicId: number) => {
    alert.reset();
    if (
      counter < MAX_TOPIC_LIMIT &&
      selectedTopicIds.includes(topicId) === false
    ) {
      setSelectedTopicIds([...selectedTopicIds, topicId]);
    } else if (selectedTopicIds.includes(topicId) === true) {
      setSelectedTopicIds([...selectedTopicIds].filter(e => e !== topicId));
    } else {
      alert.start();
    }
  };

  const reset = () => {
    setSelectedTopicIds([]);
  };

  useEffect(() => {
    try {
      getTopics().then(topicData => {
        setTopics([...topicData]);
      });
    } catch (error: any) {
      console.error(error.message);
      Toast.show('문제가 발생했습니다');
    }
  }, []);

  return {
    topics,
    selectedTopicIds,
    setSelectedTopicIds,
    selectTopic,
    alertOpacity,
    counter,
    reset,
    resetAlert,
  };
};
