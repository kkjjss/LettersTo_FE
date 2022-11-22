import React, {useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Headers/Header';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {NextButton} from '../../Components/NextButton';
import useStore from '../../Store/store';
import {ResetButton} from '../../Components/ResetButton';
import {PersonalityList} from '../../Components/PersonalityList';
import {usePersonality} from '../../Hooks/UserInfo/usePersonality';

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

  const store = useStore();

  const goToLocationForm = () => {
    store.setPersonalityIds(selectedPersonalityIds);
    navigation.navigate('LocationForm');
  };

  return (
    <LinearGradient colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}>
      <SafeAreaView
        style={
          Platform.OS === 'android'
            ? styles.container_android
            : styles.container_ios
        }>
        <Header navigation={navigation} title={''} />
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
        <ScrollView alwaysBounceVertical={false} style={styles.personalityBox}>
          <PersonalityList
            personalities={personalities}
            selectPersonality={selectPersonality}
            selectedPersonalityIds={selectedPersonalityIds}
          />
        </ScrollView>
        <View style={styles.alertBox}>
          <Animated.View style={{opacity: alertOpacity}}>
            <Text style={styles.alertText}>최대 9개까지만 선택 가능해요!</Text>
          </Animated.View>
        </View>
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
  titleText: {fontSize: 18, fontFamily: 'Galmuri11', color: '#0000cc'},
  counterWrap: {alignItems: 'center', flexDirection: 'row'},
  counter: {
    width: 35,
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
    marginBottom: 20,
  },
  alertText: {
    fontFamily: 'Galmuri11',
    color: '#ff44cc',
  },
});
