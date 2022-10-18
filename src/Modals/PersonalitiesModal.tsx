import React, {useEffect, useMemo, useRef, useState} from 'react';
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
import {SCREEN_HEIGHT} from '../constants';
import {UpdateButton} from '../Components/UpdateButton';
import {Personalities} from '../types/types';
import {getPersonalities} from '../APIs/personality';
import {PersonalityList} from '../Components/PersonalityList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PersonalitiesModal({isModalVisible, setModalVisible}: Props) {
  const [personalities, setPersonalities] = useState<Personalities>([]);
  const [selectedPersonalityIds, setSelectedPersonalityIds] = useState<
    number[]
  >([]);
  const [activateUpdate, setActivateUpdate] = useState(true);

  const store = useStore();

  const {bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

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

  const counter = useMemo(
    () => selectedPersonalityIds.length,
    [selectedPersonalityIds],
  );

  const selectPersonality = (personalityId: number) => {
    alert.reset();
    if (
      counter < 9 &&
      selectedPersonalityIds.includes(personalityId) === false
    ) {
      setSelectedPersonalityIds([...selectedPersonalityIds, personalityId]);
    } else if (selectedPersonalityIds.includes(personalityId) === true) {
      setSelectedPersonalityIds(
        [...selectedPersonalityIds].filter(e => e !== personalityId),
      );
    } else {
      alert.start();
    }
  };

  const hideModal = () => {
    alert.reset();
    setModalVisible(false);
  };

  const updatePersonalites = () => {
    hideModal();
  };

  const reset = () => {
    setSelectedPersonalityIds([]);
  };

  useEffect(() => {
    try {
      getPersonalities().then(personalityData => {
        setPersonalities(personalityData);
      });
    } catch (error: any) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      if (store.userInfo.personalityIds) {
        setSelectedPersonalityIds(store.userInfo.personalityIds);
      }
    }
  }, [isModalVisible, store.userInfo.personalityIds]);

  useEffect(() => {
    if (counter > 0) {
      setActivateUpdate(true);
    } else {
      setActivateUpdate(false);
    }
  }, [counter]);

  return (
    <Modal
      statusBarTranslucent={true} // android
      animationType="slide"
      transparent={true}
      onRequestClose={hideModal}
      visible={isModalVisible}>
      <View style={styles.container}>
        <View
          style={[
            styles.modalView,
            {
              paddingBottom: SAFE_AREA_BOTTOM,
            },
          ]}>
          <ModalHeader title={'성향 관리'} hideModal={hideModal} />

          <View style={styles.titleBox}>
            <View style={styles.titleWrap}>
              <Text style={styles.titleText}>나의 관심사를</Text>
              <Text style={styles.titleText}>모두 선택해주세요</Text>
            </View>
            <View style={styles.counterWrap}>
              <ResetButton reset={reset} />
              <Text style={styles.counter}>{counter} / 9</Text>
            </View>
          </View>

          <ScrollView style={styles.topicBox}>
            <PersonalityList
              personalities={personalities}
              selectPersonality={selectPersonality}
              selectedPersonalityIds={selectedPersonalityIds}
            />
          </ScrollView>
          <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
            <Text style={styles.alertText}>최대 9개까지만 선택 가능해요!</Text>
          </Animated.View>

          <UpdateButton
            activateUpdate={activateUpdate}
            onPress={updatePersonalites}
          />
        </View>
      </View>
    </Modal>
  );
}

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
