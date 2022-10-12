import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import type {StackParamsList} from '../../types';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Header';
import {SCREEN_HEIGHT} from '../../constants';
import {NextButton} from '../../Components/NextButton';
import {PERSONALITY_LIST} from '../../constants';

type Props = NativeStackScreenProps<StackParamsList, 'PersonalityForm'>;

type PersonalityType = {
  [index: string]: {selected: boolean};
};

let initialPersonality: PersonalityType = {};

PERSONALITY_LIST.map(personality => {
  initialPersonality = {
    ...initialPersonality,
    [personality]: {selected: false},
  };
});

export function PersonalityForm({navigation}: Props) {
  const [counter, setCounter] = useState(0);
  const [personalities, setPersonalities] =
    useState<PersonalityType>(initialPersonality);
  const [activateNext, setActivateNext] = useState(false);

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

  const selectPersonality = (personality: string) => {
    alert.reset();
    if (counter < 9 && personalities[personality].selected === false) {
      setPersonalities({
        ...personalities,
        [personality]: {selected: true},
      });
    } else if (personalities[personality].selected === true) {
      setPersonalities({
        ...personalities,
        [personality]: {selected: false},
      });
    } else {
      alert.start();
    }
  };

  const reset = () => {
    setPersonalities(initialPersonality);
  };

  useEffect(() => {
    let count = 0;
    for (let i in PERSONALITY_LIST) {
      if (personalities[PERSONALITY_LIST[i]].selected) {
        count++;
      }
    }
    setCounter(count);
    if (count > 0 && count <= 9) {
      setActivateNext(true);
    } else {
      setActivateNext(false);
    }
  }, [personalities]);

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
            <TouchableWithoutFeedback onPress={reset}>
              <View style={styles.resetButton}>
                <Text style={styles.resetButtonText}>초기화</Text>
                <Image
                  style={styles.resetButtonImage}
                  source={require('../../assets/reset.png')}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.counter}>{counter} / 9</Text>
          </View>
        </View>
        <View style={styles.personalityBox}>
          <View style={styles.personalityWrap}>
            {PERSONALITY_LIST.map(personality => {
              return (
                <TouchableHighlight
                  key={personality}
                  style={styles.underlayer}
                  underlayColor={'#0000cc'}
                  activeOpacity={0.7}
                  onPress={() => selectPersonality(personality)}>
                  <View
                    style={[
                      styles.personality,
                      personalities[personality].selected
                        ? styles.selectedInterest
                        : styles.notSelectedInterest,
                    ]}>
                    <Text style={styles.personalityText}>{personality}</Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
          <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
            <Text style={styles.alertText}>최대 9개까지만 선택 가능해요!</Text>
          </Animated.View>
        </View>
        <NextButton
          navigation={navigation}
          to={'LocationForm'}
          activateNext={activateNext}
        />
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
    flex: 1,
    marginHorizontal: 24,
  },
  personalityWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  underlayer: {
    marginBottom: 12,
    marginRight: 12,
  },
  personality: {
    height: 35,
    borderColor: '#0000cc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedInterest: {
    height: 35,
    backgroundColor: '#ccccff',
  },
  notSelectedInterest: {backgroundColor: 'white'},
  personalityText: {
    marginHorizontal: 13,
    fontFamily: 'Galmuri11',
    fontSize: 14,
    color: '#0000cc',
  },
  alert: {},
  alertText: {
    fontFamily: 'Galmuri11',
    color: '#ff44cc',
  },
  resetButton: {
    width: 74,
    height: 22,
    flexDirection: 'row',
    backgroundColor: '#ffffcc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    borderRadius: 11,
  },
  resetButtonText: {
    fontFamily: 'Galmuri11',
    fontSize: 12,
    color: '#0000cc',
  },
  resetButtonImage: {width: 20, height: 20},
});
