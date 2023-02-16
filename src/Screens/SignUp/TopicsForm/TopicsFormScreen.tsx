import React, {useCallback, useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import type {StackParamsList} from '../../../types/stackParamList';
import {LinearGradient} from 'expo-linear-gradient';
import {SCREEN_HEIGHT} from '../../../Constants/screen';
import {NextButton} from '../../../Components/Button/Bottom/NextButton';
import {ResetButton} from '../../../Components/ResetButton';
import {TopicList} from '../../../Components/TopicList';
import {useTopic} from '../../../Hooks/UserInfo/useTopic';
import {MAX_TOPIC_LIMIT} from '../../../Constants/user';
import {Counter} from '../../../Components/UserInfo/Counter/Counter';
import {MaximumAlert} from '../../../Components/UserInfo/Alert/MaximumAlert';
import {UserInfoTitle as Title} from '../../../Components/UserInfo/Title/UserInfoTitle';
import {Header2} from '../../../Components/Headers/Header2';

type Props = NativeStackScreenProps<StackParamsList, 'TopicsForm'>;

export function TopicsForm({navigation}: Props) {
  const {topics, selectedTopicIds, selectTopic, alertOpacity, counter, reset} =
    useTopic();

  const disableNext = useMemo(
    () => selectedTopicIds.length === 0,
    [selectedTopicIds],
  );

  const goToPersonalityForm = useCallback(() => {
    navigation.navigate('PersonalityForm');
  }, [navigation]);

  const onPressBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <LinearGradient colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}>
      <SafeAreaView
        style={
          Platform.OS === 'android'
            ? styles.container_android
            : styles.container_ios
        }>
        <Header2 onPressBack={onPressBack} />
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
        <MaximumAlert alertOpacity={alertOpacity} max={MAX_TOPIC_LIMIT} />
        <NextButton disable={disableNext} onPress={goToPersonalityForm} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container_ios: {height: SCREEN_HEIGHT},
  container_android: {height: SCREEN_HEIGHT, paddingVertical: 15},
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  counterWrap: {alignItems: 'center', flexDirection: 'row'},
  topicBox: {
    flex: 1,
    marginHorizontal: 24,
  },
  topicWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  category: {
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginBottom: 10,
  },
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

  resetButton: {
    width: 74,
    height: 22,
    flexDirection: 'row',
    backgroundColor: '#ffffcc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    borderRadius: 11,
  },
  resetButtonText: {
    fontFamily: 'Galmuri11',
    fontSize: 12,
    color: '#0000cc',
  },
  resetButtonImage: {width: 20, height: 20},
});
