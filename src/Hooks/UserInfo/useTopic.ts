import {useCallback, useMemo, useRef} from 'react';
import {Animated} from 'react-native';
import Toast from '../../Components/Toast/toast';
import {useQuery} from 'react-query';
import {getTopics} from '../../APIs/topic';
import {MAX_TOPIC_LIMIT} from '../../Constants/user';
import {useAuthStore} from '../../Store/auth';

export const useTopic = () => {
  const [selectedTopicIds, setSelectedTopicIds] = useAuthStore(state => [
    state.registerInfo.topicIds,
    state.action.setTopicIdsInRegisterInfo,
  ]);

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

  const resetAlert = useCallback(() => {
    alert.reset();
  }, [alert]);

  const selectTopic = useCallback(
    (topicId: number) => {
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
    },
    [alert, counter, selectedTopicIds, setSelectedTopicIds],
  );

  const reset = useCallback(() => {
    setSelectedTopicIds([]);
  }, [setSelectedTopicIds]);

  const {data: topics} = useQuery('topics', getTopics, {
    onError: (error: any) => {
      console.error(error.message);
      Toast.show('문제가 발생했습니다');
    },
  });

  return {
    topics: topics || [],
    selectedTopicIds,
    setSelectedTopicIds,
    selectTopic,
    alertOpacity,
    counter,
    reset,
    resetAlert,
  };
};
