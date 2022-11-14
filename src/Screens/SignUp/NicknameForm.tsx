import React from 'react';
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
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Headers/Header';
import type {StackParamsList} from '../../types/stackParamList';
import {useNickname} from '../../Hooks/UserInfo/useNickname';

import useStore from '../../Store/store';

type Props = NativeStackScreenProps<StackParamsList, 'NicknameForm'>;

export function NicknameForm({navigation}: Props) {
  const {
    nickname,
    tempNickname,
    isFormCorrect,
    isExists,
    disable,
    alterOpacity,
    onChangeNickname,
  } = useNickname();

  const store = useStore();

  const goToTopicForm = () => {
    store.setNickname(nickname);
    navigation.navigate('TopicsForm');
  };

  return (
    <LinearGradient colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}>
      <SafeAreaView
        style={
          Platform.OS === 'android'
            ? styles.container_android
            : styles.container_ios
        }>
        <ScrollView alwaysBounceVertical={false}>
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
          <Animated.View style={[styles.alert, {opacity: alterOpacity}]}>
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
        <NextButton disable={disable} onPress={goToTopicForm} />
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
