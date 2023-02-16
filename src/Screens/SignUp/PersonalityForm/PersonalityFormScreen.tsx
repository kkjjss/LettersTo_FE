import React, {useCallback, useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import type {StackParamsList} from '../../../types/stackParamList';
import {LinearGradient} from 'expo-linear-gradient';
import {SCREEN_HEIGHT} from '../../../Constants/screen';
import {NextButton} from '../../../Components/Button/Bottom/NextButton';
import {ResetButton} from '../../../Components/ResetButton';
import {PersonalityList} from '../../../Components/PersonalityList';
import {usePersonality} from '../../../Hooks/UserInfo/usePersonality';
import {MAX_PERSONALITY_LIMIT} from '../../../Constants/user';
import {Header2} from '../../../Components/Headers/Header2';
import {UserInfoTitle as Title} from '../../../Components/UserInfo/Title/UserInfoTitle';
import {Counter} from '../../../Components/UserInfo/Counter/Counter';
import {MaximumAlert} from '../../../Components/UserInfo/Alert/MaximumAlert';

type Props = NativeStackScreenProps<StackParamsList, 'PersonalityForm'>;

export function PersonalityForm({navigation}: Props) {
  const {
    personalities,
    selectedPersonalityIds,
    selectPersonality,
    alertOpacity,
    counter,
    reset,
  } = usePersonality();

  const disableNext = useMemo(
    () => selectedPersonalityIds.length === 0,
    [selectedPersonalityIds],
  );

  const goToLocationForm = useCallback(() => {
    navigation.navigate('LocationForm');
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
        <Header2 onPressBack={onPressBack} />
        <View style={styles.titleBox}>
          <Title title={'나의 성향을\n모두 선택해주세요'} />
          <View style={styles.counterWrap}>
            <ResetButton reset={reset} />
            <Counter value={counter} max={MAX_PERSONALITY_LIMIT} />
          </View>
        </View>
        <ScrollView alwaysBounceVertical={false} style={styles.personalityBox}>
          <PersonalityList
            personalities={personalities}
            selectPersonality={selectPersonality}
            selectedPersonalityIds={selectedPersonalityIds}
          />
        </ScrollView>
        <MaximumAlert alertOpacity={alertOpacity} max={MAX_PERSONALITY_LIMIT} />
        <NextButton disable={disableNext} onPress={goToLocationForm} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container_ios: {height: SCREEN_HEIGHT},
  container_android: {height: SCREEN_HEIGHT, paddingVertical: 15},
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  titleWrap: {
    height: 100,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginTop: 8,
  },
  counterWrap: {alignItems: 'center', flexDirection: 'row'},
  counter: {
    width: 50,
    fontSize: 13,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginHorizontal: 8,
    textAlign: 'right',
  },
  personalityBox: {
    paddingHorizontal: 24,
  },
  alertBox: {
    marginHorizontal: 24,
    marginVertical: 10,
  },
  alertText: {
    fontFamily: 'Galmuri11',
    color: '#ff44cc',
  },
});
