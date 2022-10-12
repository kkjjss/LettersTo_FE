import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import useStore from '../Store/store';

type Props = {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NicknameModal = ({isModalVisible, setModalVisible}: Props) => {
  const hideModal = () => {
    setModalVisible(false);
  };

  const [nickname, setNickname] = useState('');
  const [tempNickname, setTempNickname] = useState('');
  const [isFormCorrect, setIsFormCorrect] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isAlreadyUsed, setIsAlreadyUsed] = useState(false);
  const [activateNext, setActivateNext] = useState(false);

  const store = useStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const alert = Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 0,
    useNativeDriver: true,
  });

  const checkNicknameAlreadyUsed = async () => {
    if (nickname === store.nickname) {
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
      isVisible={isModalVisible}
      onSwipeComplete={hideModal}
      swipeDirection={['down']}
      onBackdropPress={hideModal}
      propagateSwipe={true}
      style={{margin: 0, justifyContent: 'flex-end'}}>
      <View
        style={{
          backgroundColor: 'white',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderColor: '#0000cc',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 12,
            marginHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Pressable onPress={hideModal}>
            <Image
              source={require('../assets/close.png')}
              style={{height: 28, width: 28}}
            />
          </Pressable>
          <Text
            style={{fontFamily: 'Galmuri11', fontSize: 15, color: '#0000cc'}}>
            별명 변경
          </Text>
          <View style={{width: 28}} />
        </View>
        <ScrollView>
          <View style={styles.nicknameWrap}>
            <View style={styles.nicknameForm}>
              <TextInput
                style={styles.nicknameInput}
                value={tempNickname}
                onChangeText={changeNickname}
                placeholder="새로운 별명을 입력해주세요."
              />
            </View>
          </View>
          <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
            {isAlreadyUsed ? (
              <Text style={styles.alertSuccess}>이미 사용중인 별명이에요.</Text>
            ) : isFormCorrect ? (
              !isDuplicate ? (
                <Text style={styles.alertSuccess}>사용 가능한 별명이에요.</Text>
              ) : (
                <Text style={styles.alertFail}>이미 사용중인 별명이에요.</Text>
              )
            ) : (
              <Text style={styles.alertFail}>
                3-10자 이내의 별명을 입력해주세요.
              </Text>
            )}
          </Animated.View>
        </ScrollView>
        <Pressable disabled={!activateNext} onPress={hideModal}>
          <View
            style={[
              styles.completeButton,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor: activateNext ? '#ff6ece' : '#ffc7f0',
              },
            ]}>
            <Text style={styles.completeButtonText}>변경하기</Text>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  nicknameWrap: {
    marginBottom: 10,
    marginHorizontal: 24,
  },
  nicknameForm: {},
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
    marginHorizontal: 24,
    marginBottom: 100,
  },
  alertSuccess: {
    fontFamily: 'Galmuri11',
    color: '#44ccff',
  },
  alertFail: {
    fontFamily: 'Galmuri11',
    color: '#ff44cc',
  },
  completeButton: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {fontFamily: 'Galmuri11', color: 'white'},
});
