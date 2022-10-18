import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import {ResetButton} from '../Components/ResetButton';
import useStore from '../Store/store';
import {ModalHeader} from '../Components/ModalHeader';
import {Topics} from '../types/types';
import {getTopics} from '../APIs/topic';
import {SCREEN_HEIGHT} from '../constants';
import {TopicList} from '../Components/TopicList';
import {UpdateButton} from '../Components/UpdateButton';

type Props = {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TopicsModal = ({isModalVisible, setModalVisible}: Props) => {
  const [counter, setCounter] = useState(0);
  const [topics, setTopics] = useState<Topics>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);
  const [activateUpdate, setActivateUpdate] = useState(true);

  const store = useStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const alert = Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 0,
      delay: 2000,
      useNativeDriver: true,
    }),
  ]);

  const selectTopic = (topicId: number) => {
    alert.reset();
    if (counter < 7 && selectedTopicIds.includes(topicId) === false) {
      setSelectedTopicIds([...selectedTopicIds, topicId]);
    } else if (selectedTopicIds.includes(topicId) === true) {
      setSelectedTopicIds([...selectedTopicIds].filter(e => e !== topicId));
    } else {
      alert.start();
    }
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const updateTopics = () => {
    hideModal();
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
    }
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      if (store.userInfo.topicIds) {
        setSelectedTopicIds(store.userInfo.topicIds);
      }
    }
  }, [isModalVisible]);

  useEffect(() => {
    let count = selectedTopicIds.length;
    setCounter(count);
    if (count > 0) {
      setActivateUpdate(true);
    } else {
      setActivateUpdate(false);
    }
  }, [selectedTopicIds]);

  return (
    <Modal
      statusBarTranslucent={true} // android
      animationType="slide"
      transparent={true}
      visible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.modalView}>
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
          <ScrollView style={styles.topicBox}>
            <TopicList
              topics={topics}
              selectTopic={selectTopic}
              selectedTopicIds={selectedTopicIds}
            />
          </ScrollView>
          <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
            <Text style={styles.alertText}>최대 7개까지만 선택 가능해요!</Text>
          </Animated.View>

          <UpdateButton
            activateUpdate={activateUpdate}
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
  titleText: {fontSize: 18, fontFamily: 'Galmuri11', color: '#0000cc'},
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
    height: SCREEN_HEIGHT - 250,
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
  alert: {
    marginHorizontal: 24,
    marginBottom: 10,
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

  changeButton: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeButtonText: {fontFamily: 'Galmuri11', color: 'white'},
});
