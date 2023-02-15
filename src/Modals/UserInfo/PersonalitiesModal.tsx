import React, {useEffect, useMemo} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import {ResetButton} from '../../Components/ResetButton';
import useStore from '../../Store/store';
import {ModalHeader} from '../../Components/ModalHeader';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {PersonalityList} from '../../Components/PersonalityList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {patchUserInfo} from '../../APIs/member';
import {usePersonality} from '../../Hooks/UserInfo/usePersonality';
import {BottomButton} from '../../Components/Button/Bottom/BottomButton';
import Toast from '../../Components/Toast/toast';

type Props = {
  isModalVisible: boolean;
  onPressClose: () => void;
};

export function PersonalitiesModal({isModalVisible, onPressClose}: Props) {
  const {
    personalities,
    selectedPersonalityIds,
    setSelectedPersonalityIds,
    selectPersonality,
    alertOpacity,
    counter,
    reset,
    resetAlert,
  } = usePersonality();

  const {userInfo} = useStore();

  const {bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  const disableUpdate = useMemo(
    () => selectedPersonalityIds.length === 0,
    [selectedPersonalityIds],
  );

  const hideModal = () => {
    resetAlert();
    onPressClose();
  };

  const updatePersonalites = async () => {
    try {
      if (userInfo && selectedPersonalityIds) {
        const newUserInfo = {
          personalityIds: selectedPersonalityIds,
        };
        await patchUserInfo(newUserInfo);
      }

      hideModal();
    } catch (error: any) {
      console.error(error.message);
      Toast.show('문제가 발생했습니다');
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.personalityIds) {
      setSelectedPersonalityIds(userInfo.personalityIds);
    }
  }, [setSelectedPersonalityIds, userInfo]);

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
              <Text style={styles.titleText}>나의 성향을</Text>
              <Text style={styles.titleText}>모두 선택해주세요</Text>
            </View>
            <View style={styles.counterWrap}>
              <ResetButton reset={reset} />
              <Text style={styles.counter}>{counter} / 9</Text>
            </View>
          </View>

          <ScrollView alwaysBounceVertical={false} style={styles.topicBox}>
            <PersonalityList
              personalities={personalities}
              selectPersonality={selectPersonality}
              selectedPersonalityIds={selectedPersonalityIds}
            />
          </ScrollView>
          <Animated.View style={[styles.alert, {opacity: alertOpacity}]}>
            <Text style={styles.alertText}>최대 9개까지만 선택 가능해요!</Text>
          </Animated.View>

          <BottomButton
            disable={disableUpdate}
            buttonText="변경하기"
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
