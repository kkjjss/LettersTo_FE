import React, {useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {NextButton} from '../../../Components/Button/Bottom/NextButton';
import {SCREEN_HEIGHT} from '../../../Constants/screen';
import {LinearGradient} from 'expo-linear-gradient';
import type {StackParamsList} from '../../../types/stackParamList';
import {useNickname} from '../../../Hooks/UserInfo/useNickname';
import {NicknameInput} from './Components/NicknameInput';
import {NicknameAvailableAlert} from '../../../Components/UserInfo/Alert/NicknameAvailableAlert';
import {Header2} from '../../../Components/Headers/Header2';
import {UserInfoTitle as Title} from '../../../Components/UserInfo/Title/UserInfoTitle';

type Props = NativeStackScreenProps<StackParamsList, 'NicknameForm'>;

export const NicknameForm = ({navigation}: Props) => {
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

  const onPressBack = useCallback(() => {
    navigation.pop();
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
          <Header2 onPressBack={onPressBack} />
          <View style={styles.titleBox}>
            <Title title={'별명을\n입력해주세요'} />
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
};

const styles = StyleSheet.create({
  container_ios: {height: SCREEN_HEIGHT},
  container_android: {height: SCREEN_HEIGHT, paddingVertical: 15},
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
});
