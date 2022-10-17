import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
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
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isAlreadyUsed, setIsAlreadyUsed] = useState(false);
  const [activateNext, setActivateNext] = useState(false);

  const {keyboardHeight, keyboardOn} = useKeyboardHeight();

  const store = useStore();

  const hideModal = () => {
    setModalVisible(false);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const alert = Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 0,
    useNativeDriver: true,
  });

  const checkNicknameAlreadyUsed = async () => {
    if (nickname === 'Aaa') {
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
        checkNicknameDuplicates();
      } else {
        setIsFormCorrect(false);
        alert.start();
      }
    }
  };

  const checkNicknameDuplicates = async () => {
    if (nickname) {
      // api request
      let response: boolean;
      if (nickname !== 'Sss') {
        response = true;
      } else {
        response = false;
      }

      if (response === true) {
        setIsDuplicate(false);
        setActivateNext(true);
      } else {
        setIsDuplicate(true);
      }
      alert.start();
    }
  };

  const changeNickname = (v: string) => {
    alert.reset();
    setTempNickname(v);
    setActivateNext(false);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setNickname(tempNickname);
    }, 300);
    return () => clearTimeout(debounce);
  }, [tempNickname]);

  useEffect(() => {
    checkNicknameAlreadyUsed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname]);

  return (
    <Modal
      statusBarTranslucent={true} // android
      animationType="slide"
      transparent={true}
      visible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.modalView}>
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
                  !isDuplicate ? (
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

          <Pressable disabled={!activateNext} onPress={hideModal}>
            <View
              style={[
                styles.changeButton,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor: activateNext ? '#ff6ece' : '#ffc7f0',
                },
              ]}>
              <Text style={styles.changeButtonText}>변경하기</Text>
            </View>
          </Pressable>
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
