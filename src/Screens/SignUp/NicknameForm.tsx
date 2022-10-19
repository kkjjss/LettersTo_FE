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
  Platform,
} from 'react-native';
import {NextButton} from '../../Components/NextButton';
import {SCREEN_HEIGHT} from '../../constants';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Header';
import type {StackParamsList} from '../../types/stackParamList';
import {existsNickname} from '../../APIs/member';

import useStore from '../../Store/store';

type Props = NativeStackScreenProps<StackParamsList, 'NicknameForm'>;

export function NicknameForm({navigation}: Props) {
  const [nickname, setNickname] = useState('');
  const [tempNickname, setTempNickname] = useState('');
  const [isFormCorrect, setIsFormCorrect] = useState(false);
  const [isExists, setIsExists] = useState(false);
  const [activateNext, setActivateNext] = useState(false);

  const store = useStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const alert = Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 0,
    useNativeDriver: true,
  });

  const onChangeNickname = (v: string) => {
    alert.reset();
    setTempNickname(v);
    setActivateNext(false);
  };

  const goToTopicForm = () => {
    store.setNickname(nickname);
    navigation.navigate('TopicsForm');
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setNickname(tempNickname);
    }, 500);
    return () => clearTimeout(debounce);
  }, [tempNickname]);

  useEffect(() => {
    const checkNicknameFormCorrect = async () => {
      if (nickname) {
        if (/^[가-힣A-Za-z0-9]{3,10}$/.test(nickname)) {
          setIsFormCorrect(true);
          checkNicknameExistss();
        } else {
          setIsFormCorrect(false);
          alert.start();
        }
      }
    };

    const checkNicknameExistss = async () => {
      if (nickname) {
        try {
          const response = await existsNickname(nickname);
          setIsExists(response);
          if (response === false) {
            setActivateNext(true);
          }
          alert.start();
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };

    checkNicknameFormCorrect();
  }, [nickname]);

  return (
    <LinearGradient colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}>
      <SafeAreaView
        style={
          Platform.OS === 'android'
            ? styles.container_android
            : styles.container_ios
        }>
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
                onChangeText={onChangeNickname}
              />
            </View>
          </View>
          <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
            {isFormCorrect ? (
              !isExists ? (
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
        <NextButton activateNext={activateNext} onPress={goToTopicForm} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container_ios: {height: SCREEN_HEIGHT},
  container_android: {height: SCREEN_HEIGHT, paddingVertical: 15},
  textWrap: {
    height: 100,
    marginHorizontal: 24,
    justifyContent: 'center',
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
    borderRadius: 5,
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
