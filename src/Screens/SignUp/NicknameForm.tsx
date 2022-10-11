import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
  SafeAreaView,
} from 'react-native';
import {NextButton} from '../../Components/NextButton';
import {SCREEN_HEIGHT} from '../../constants';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Header';
import type {StackParamsList} from '../../types';

type Props = NativeStackScreenProps<StackParamsList, 'NicknameForm'>;

export function NicknameForm({navigation}: Props) {
  const [nickname, setNickname] = useState('');
  const [tempNickname, setTempNickname] = useState('');
  const [isFormCorrect, setIsFormCorrect] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [activateNext, setActivateNext] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const alert = Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 0,
    useNativeDriver: true,
  });

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
      if (nickname === 'Aaa') {
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
    checkNicknameFormCorrect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname]);

  return (
    <LinearGradient
      colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Header navigation={navigation} title={''} />
          <View style={styles.textWrap}>
            <Text style={styles.text}>별명을</Text>
            <Text style={styles.text}>입력해주세요</Text>
          </View>
          <View style={styles.nicknameWrap}>
            <View style={styles.nicknameForm}>
              <TextInput
                style={styles.nicknameInput}
                value={tempNickname}
                onChangeText={changeNickname}
              />
            </View>
          </View>
          <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
            {isFormCorrect ? (
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
        <NextButton
          navigation={navigation}
          to={'InterestsForm'}
          activateNext={activateNext}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {height: SCREEN_HEIGHT},
  textWrap: {
    height: 100,
    marginBottom: 30,
    marginHorizontal: 24,
    justifyContent: 'flex-end',
  },
  text: {fontSize: 18, fontFamily: 'Galmuri11', color: '#0000cc'},
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
  },
  alertSuccess: {
    fontFamily: 'Galmuri11',
    color: '#44ccff',
  },
  alertFail: {
    fontFamily: 'Galmuri11',
    color: '#ff44cc',
  },
  checkButton: {
    justifyContent: 'center',
  },
  buttonWrap: {
    flex: 2,
    justifyContent: 'center',
  },
});
