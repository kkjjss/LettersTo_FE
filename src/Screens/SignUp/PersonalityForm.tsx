import React, {useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Header';
import {SCREEN_HEIGHT} from '../../constants';
import {NextButton} from '../../Components/NextButton';
import useStore from '../../Store/store';
import {ResetButton} from '../../Components/ResetButton';
import {getPersonalities} from '../../APIs/personality';
import {Personalities} from '../../types/types';
import {PersonalityList} from '../../Components/PersonalityList';

type Props = NativeStackScreenProps<StackParamsList, 'PersonalityForm'>;

export function PersonalityForm({navigation}: Props) {
  const store = useStore();
  const [personalities, setPersonalities] = useState<Personalities>([]);
  const [selectedPersonalityIds, setSelectedPersonalityIds] = useState<
    number[]
  >([]);
  const [activateNext, setActivateNext] = useState<boolean>(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const alert = Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 0,
      delay: 2000,
      useNativeDriver: true,
    }),
  ]);

  const counter = useMemo(
    () => selectedPersonalityIds.length,
    [selectedPersonalityIds],
  );

  const selectPersonality = (personalityId: number) => {
    alert.reset();
    if (
      counter < 9 &&
      selectedPersonalityIds.includes(personalityId) === false
    ) {
      setSelectedPersonalityIds([...selectedPersonalityIds, personalityId]);
    } else if (selectedPersonalityIds.includes(personalityId) === true) {
      setSelectedPersonalityIds(
        [...selectedPersonalityIds].filter(e => e !== personalityId),
      );
    } else {
      alert.start();
    }
  };

  const goToLocationForm = () => {
    store.setPersonalityIds(selectedPersonalityIds);
    navigation.navigate('LocationForm');
  };

  const reset = () => {
    setSelectedPersonalityIds([]);
  };

  useEffect(() => {
    try {
      getPersonalities().then(personalityData => {
        setPersonalities(personalityData);
      });
    } catch (error: any) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    if (counter > 0) {
      setActivateNext(true);
    } else {
      setActivateNext(false);
    }
  }, [counter]);

  return (
    <LinearGradient
      colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
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
        <ScrollView style={styles.personalityBox}>
          <PersonalityList
            personalities={personalities}
            selectPersonality={selectPersonality}
            selectedPersonalityIds={selectedPersonalityIds}
          />
        </ScrollView>
        <View style={styles.alertBox}>
          <Animated.View style={{opacity: fadeAnim}}>
            <Text style={styles.alertText}>최대 9개까지만 선택 가능해요!</Text>
          </Animated.View>
        </View>
        <NextButton activateNext={activateNext} onPress={goToLocationForm} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {height: SCREEN_HEIGHT},
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  titleWrap: {
    height: 100,
    marginBottom: 30,
    justifyContent: 'flex-end',
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
