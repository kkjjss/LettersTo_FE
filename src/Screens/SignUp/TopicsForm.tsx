import React, {useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Headers/Header';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {NextButton} from '../../Components/Button/Bottom/NextButton';
import {ResetButton} from '../../Components/ResetButton';
import {TopicList} from '../../Components/TopicList';
import {useTopic} from '../../Hooks/UserInfo/useTopic';
import {MAX_TOPIC_LIMIT} from '../../Constants/user';

type Props = NativeStackScreenProps<StackParamsList, 'TopicsForm'>;

export function TopicsForm({navigation}: Props) {
  const {topics, selectedTopicIds, selectTopic, alertOpacity, counter, reset} =
    useTopic();

  const disableNext = useMemo(
    () => selectedTopicIds.length === 0,
    [selectedTopicIds],
  );

  const goToPersonalityForm = () => {
    navigation.navigate('PersonalityForm');
  };

  return (
    <LinearGradient colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}>
      <SafeAreaView
        style={
          Platform.OS === 'android'
            ? styles.container_android
            : styles.container_ios
        }>
        <Header navigation={navigation} title={''} />
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
        <ScrollView alwaysBounceVertical={false} style={styles.topicBox}>
          <TopicList
            topics={topics}
            selectTopic={selectTopic}
            selectedTopicIds={selectedTopicIds}
          />
        </ScrollView>
        <View style={styles.alertBox}>
          <Animated.View style={{opacity: alertOpacity}}>
            <Text style={styles.alertText}>
              최대 {MAX_TOPIC_LIMIT}개까지만 선택 가능해요!
            </Text>
          </Animated.View>
        </View>
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
  titleWrap: {
    height: 100,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginTop: 8,
  },
  counterWrap: {alignItems: 'center', flexDirection: 'row'},
  counter: {
    width: 50,
    fontSize: 13,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginHorizontal: 8,
    textAlign: 'right',
  },
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
  alertBox: {
    marginHorizontal: 24,
    marginVertical: 10,
  },
  alertText: {
    fontFamily: 'Galmuri11',
    color: '#ff44cc',
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
