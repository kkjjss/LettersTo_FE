import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {existsNickname, patchUserInfo} from '../APIs/member';
import {UpdateButton} from '../Components/UpdateButton';
import {useKeyboardHeight} from '../Hooks/useKeyboardHeight';
import useStore from '../Store/store';

type Props = {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NicknameModal = ({isModalVisible, setModalVisible}: Props) => {
  const [nickname, setNickname] = useState('');
  const [tempNickname, setTempNickname] = useState('');
  const [isFormCorrect, setIsFormCorrect] = useState(false);
  const [isExists, setIsExists] = useState(false);
  const [isAlreadyUsed, setIsAlreadyUsed] = useState(false);
  const [activateUpdate, setActivateUpdate] = useState(false);

  const {keyboardHeight, keyboardOn} = useKeyboardHeight();

  const {userInfo} = useStore();

  const {bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  const hideModal = () => {
    alert.reset();
    setNickname('');
    setTempNickname('');
    setIsFormCorrect(false);
    setIsExists(false);
    setActivateUpdate(false);
    setModalVisible(false);
  };

  const updateNickname = async () => {
    try {
      if (userInfo && nickname) {
        const newUserInfo = {
          nickname: nickname,
        };
        await patchUserInfo(newUserInfo);
      }

      hideModal();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const alert = Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 0,
    useNativeDriver: true,
  });

  const changeNickname = (v: string) => {
    alert.reset();
    setTempNickname(v);
    setActivateUpdate(false);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setNickname(tempNickname);
    }, 300);
    return () => clearTimeout(debounce);
  }, [tempNickname]);

  useEffect(() => {
    const checkNicknameAlreadyUsed = async () => {
      if (userInfo && nickname === userInfo.nickname) {
        setIsAlreadyUsed(true);
        alert.start();
      } else {
        setIsAlreadyUsed(false);
        checkNicknameFormCorrect();
      }
    };

    const checkNicknameFormCorrect = async () => {
      if (nickname) {
        if (/^[가-힣A-Za-z0-9]{3,10}$/.test(nickname)) {
          setIsFormCorrect(true);
          checkNicknameExists();
        } else {
          setIsFormCorrect(false);
          alert.start();
        }
      }
    };

    const checkNicknameExists = async () => {
      if (nickname) {
        try {
          const response = await existsNickname(nickname);
          setIsExists(response);
          if (response === false) {
            setActivateUpdate(true);
          }
          alert.start();
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };

    if (isModalVisible) {
      checkNicknameAlreadyUsed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname, userInfo, isModalVisible]);

  return (
    <Modal
      statusBarTranslucent={true} // android
      animationType="slide"
      transparent={true}
      onRequestClose={hideModal}
      visible={isModalVisible}>
      <View style={styles.container}>
        <View style={[styles.modalView, {paddingBottom: SAFE_AREA_BOTTOM}]}>
          <View style={styles.header}>
            <Pressable onPress={hideModal}>
              <Image
                source={require('../Assets/close.png')}
                style={styles.closeButton}
              />
            </Pressable>
            <Text style={styles.title}>별명 변경</Text>
            <View style={styles.headerBlank} />
          </View>
          <ScrollView
            style={[
              styles.nickname,
              {paddingBottom: (keyboardOn ? 30 : 100) + keyboardHeight},
            ]}>
            <TextInput
              style={styles.nicknameInput}
              value={tempNickname}
              onChangeText={changeNickname}
              placeholder="새로운 별명을 입력해주세요."
            />

            <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
              {!isAlreadyUsed ? (
                isFormCorrect ? (
                  !isExists ? (
                    <Text style={styles.alertSuccess}>
                      사용 가능한 별명이에요.
                    </Text>
                  ) : (
                    <Text style={styles.alertFail}>
                      이미 사용중인 별명이에요.
                    </Text>
                  )
                ) : (
                  <Text style={styles.alertFail}>
                    3-10자 이내의 별명을 입력해주세요.
                  </Text>
                )
              ) : (
                <Text style={styles.alertFail}>이미 사용중인 별명이에요.</Text>
              )}
            </Animated.View>
          </ScrollView>

          <UpdateButton
            activateUpdate={activateUpdate}
            onPress={updateNickname}
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
  header: {
    flexDirection: 'row',
    marginVertical: 12,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {height: 28, width: 28},
  title: {
    fontFamily: 'Galmuri11',
    fontSize: 15,
    color: '#0000cc',
  },
  headerBlank: {width: 28},
  nickname: {
    marginBottom: 10,
    marginHorizontal: 24,
  },
  nicknameInput: {
    padding: 17,
    height: 54,
    borderWidth: 1,
    borderColor: '#0000cc',
    borderRadius: 10,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
  },
  alert: {
    marginTop: 10,
  },
  alertSuccess: {
    fontFamily: 'Galmuri11',
    color: '#44ccff',
  },
  alertFail: {
    fontFamily: 'Galmuri11',
    color: '#ff44cc',
  },
  changeButton: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeButtonText: {fontFamily: 'Galmuri11', color: 'white'},
});
