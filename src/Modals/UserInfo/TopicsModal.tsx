import React, {useEffect, useMemo} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';
import {ResetButton} from '../../Components/ResetButton';
import useStore from '../../Store/store';
import {ModalHeader} from '../../Components/ModalHeader';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {TopicList} from '../../Components/TopicList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {patchUserInfo} from '../../APIs/member';
import {useTopic} from '../../Hooks/UserInfo/useTopic';
import {BottomButton} from '../../Components/Button/Bottom/BottomButton';

type Props = {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TopicsModal = ({isModalVisible, setModalVisible}: Props) => {
  const {
    topics,
    selectedTopicIds,
    setSelectedTopicIds,
    selectTopic,
    alertOpacity,
    counter,
    reset,
    resetAlert,
  } = useTopic();

  const {userInfo} = useStore();

  const {bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  const disableUpdate = useMemo(
    () => selectedTopicIds.length === 0,
    [selectedTopicIds],
  );

  const hideModal = () => {
    resetAlert();
    setModalVisible(false);
  };

  const updateTopics = async () => {
    try {
      if (userInfo && selectedTopicIds) {
        const newUserInfo = {
          topicIds: selectedTopicIds,
        };
        await patchUserInfo(newUserInfo);
      }

      hideModal();
    } catch (error: any) {
      console.error(error.message);
      Alert.alert('error', error.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setSelectedTopicIds(userInfo.topicIds);
    }
  }, [setSelectedTopicIds, userInfo]);

  return (
    <Modal
      statusBarTranslucent={true} // android
      animationType="slide"
      transparent={true}
      onRequestClose={hideModal}
      visible={isModalVisible}>
      <View style={styles.container}>
        <View style={[styles.modalView, {paddingBottom: SAFE_AREA_BOTTOM}]}>
          <ModalHeader title={'관심사 관리'} hideModal={hideModal} />

          <View style={styles.titleBox}>
            <View style={styles.titleWrap}>
              <Text style={styles.titleText}>나의 관심사를</Text>
              <Text style={styles.titleText}>모두 선택해주세요</Text>
            </View>
            <View style={styles.counterWrap}>
              <ResetButton reset={reset} />
              <Text style={styles.counter}>{counter} / 7</Text>
            </View>
          </View>
          <ScrollView
            alwaysBounceVertical={false}
            style={[
              styles.topicBox,
              {
                height: SCREEN_HEIGHT * 0.6,
              },
            ]}>
            <TopicList
              topics={topics}
              selectTopic={selectTopic}
              selectedTopicIds={selectedTopicIds}
            />
          </ScrollView>
          <Animated.View style={[styles.alert, {opacity: alertOpacity}]}>
            <Text style={styles.alertText}>최대 7개까지만 선택 가능해요!</Text>
          </Animated.View>

          <BottomButton
            disable={disableUpdate}
            buttonText="변경하기"
            onPress={updateTopics}
          />
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
