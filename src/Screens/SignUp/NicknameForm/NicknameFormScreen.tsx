import React, {useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {NextButton} from '../../../Components/Button/Bottom/NextButton';
import {SCREEN_HEIGHT} from '../../../Constants/screen';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../../Components/Headers/Header';
import type {StackParamsList} from '../../../types/stackParamList';
import {useNickname} from '../../../Hooks/UserInfo/useNickname';
import {NicknameInput} from './Components/NicknameInput';
import {NicknameAvailableAlert} from './Components/NicknameAvailableAlert';

type Props = NativeStackScreenProps<StackParamsList, 'NicknameForm'>;

export function NicknameForm({navigation}: Props) {
  const {
    tempNickname,
    disable,
    alterOpacity,
    onChangeNickname,
    nicknameValidationResult,
  } = useNickname();

  const goToTopicForm = useCallback(() => {
    navigation.navigate('TopicsForm');
  }, [navigation]);

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
          <NicknameInput
            value={tempNickname}
            onChangeNickname={onChangeNickname}
          />
          <NicknameAvailableAlert
            alterOpacity={alterOpacity}
            nicknameValidation={nicknameValidationResult}
          />
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
  checkButton: {
    justifyContent: 'center',
  },
  buttonWrap: {
    flex: 2,
    justifyContent: 'center',
  },
});
