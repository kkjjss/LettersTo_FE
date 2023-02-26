import React, {useEffect, useMemo} from 'react';
import {View, Modal, StyleSheet, ScrollView} from 'react-native';
import {ResetButton} from '../../Components/ResetButton';
import {ModalHeader} from '../../Components/Headers/ModalHeader';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {TopicList} from '../../Components/TopicList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {patchUserInfo} from '../../APIs/member';
import {useTopic} from '../../Hooks/UserInfo/useTopic';
import Toast from '../../Components/Toast/toast';
import {useMutation, useQueryClient} from 'react-query';
import {UserInfoTitle as Title} from '../../Components/UserInfo/Title/UserInfoTitle';
import {Counter} from '../../Components/UserInfo/Counter/Counter';
import {MAX_TOPIC_LIMIT} from '../../Constants/user';
import {MaximumAlert} from '../../Components/UserInfo/Alert/MaximumAlert';
import {UpdateButton} from '../../Components/Button/Bottom/UpdateButton';
import _ from 'lodash';

type Props = {
  currentTopics: number[];
  isModalVisible: boolean;
  onPressClose: () => void;
};

export const TopicsModal = ({
  currentTopics,
  isModalVisible,
  onPressClose,
}: Props) => {
  const {
    topics,
    selectedTopicIds,
    selectTopic,
    alertOpacity,
    counter,
    reset,
    resetAlert,
  } = useTopic(currentTopics);

  const queryClient = useQueryClient();

  const {bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  const disableUpdate = useMemo(
    () =>
      selectedTopicIds.length === 0 ||
      _.isEqual(currentTopics, selectedTopicIds),
    [currentTopics, selectedTopicIds],
  );

  const hideModal = () => {
    resetAlert();
    onPressClose();
  };

  const {mutate: updateTopics} = useMutation(
    ['topics', selectedTopicIds],
    async () => await patchUserInfo({topicIds: selectedTopicIds}),
    {
      onSuccess: () => {
        Toast.show('성공적으로 변경되었어요!');
        queryClient.invalidateQueries('userInfo');
        hideModal();
      },
      onError: (error: any) => {
        console.error(error.message);
        Toast.show('문제가 발생했습니다');
      },
    },
  );

  useEffect(() => {
    if (isModalVisible) {
      reset();
    }
  }, [isModalVisible, reset]);

  return (
    <Modal
      statusBarTranslucent={true} // android
      animationType="slide"
      transparent={true}
      onRequestClose={hideModal}
      visible={isModalVisible}>
      <View style={styles.container}>
        <View style={[styles.modalView, {paddingBottom: SAFE_AREA_BOTTOM}]}>
          <ModalHeader title={'관심사 관리'} onPressClose={hideModal} />

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
          <UpdateButton disable={disableUpdate} onPressUpdate={updateTopics} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  titleWrap: {
    marginBottom: 30,
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
    width: 35,
    fontSize: 13,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginHorizontal: 8,
    textAlign: 'right',
  },
  topicBox: {
    marginHorizontal: 24,
    height: SCREEN_HEIGHT * 0.6,
  },
  alert: {
    marginHorizontal: 24,
    marginBottom: 10,
  },
  alertText: {
    fontFamily: 'Galmuri11',
    color: '#ff44cc',
  },
});
