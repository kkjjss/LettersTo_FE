import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import type {StackParamsList} from '../../types';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Header';
import {SCREEN_HEIGHT} from '../../constants';
import {NextButton} from '../../Components/NextButton';
import {INTERESTS_LIST} from '../../constants';

type Props = NativeStackScreenProps<StackParamsList, 'InterestsForm'>;

type InterestsType = {
  [index: string]: {selected: boolean};
};

let initialInterests: InterestsType = {};

INTERESTS_LIST.map(interest => {
  initialInterests = {
    ...initialInterests,
    [interest]: {selected: false},
  };
});

export function InterestsForm({navigation}: Props) {
  const [counter, setCounter] = useState(0);
  const [interests, setInterests] = useState<InterestsType>(initialInterests);
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

  const selectInterest = (interest: string) => {
    alert.reset();
    if (counter < 7 && interests[interest].selected === false) {
      setInterests({
        ...interests,
        [interest]: {selected: true},
      });
    } else if (interests[interest].selected === true) {
      setInterests({
        ...interests,
        [interest]: {selected: false},
      });
    } else {
      alert.start();
    }
  };

  useEffect(() => {
    let count = 0;
    for (let i in INTERESTS_LIST) {
      if (interests[INTERESTS_LIST[i]].selected) {
        count++;
      }
    }
    setCounter(count);
    if (count > 0) {
      setActivateNext(true);
    } else {
      setActivateNext(false);
    }
  }, [interests]);

  return (
    <LinearGradient
      colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title={''} />
        <View style={styles.titleBox}>
          <View style={styles.titleWrap}>
            <Text style={styles.titleText}>나의 관심사를</Text>
            <Text style={styles.titleText}>모두 선택해주세요</Text>
          </View>
          <View style={styles.counterWrap}>
            <Text style={styles.counter}>{counter}/7</Text>
          </View>
        </View>
        <View style={styles.interestBox}>
          <View style={styles.interestWrap}>
            {INTERESTS_LIST.map(interest => {
              return (
                <TouchableHighlight
                  key={interest}
                  style={styles.underlayer}
                  underlayColor={'#0000cc'}
                  activeOpacity={0.7}
                  onPress={() => selectInterest(interest)}>
                  <View
                    style={[
                      styles.interest,
                      interests[interest].selected
                        ? styles.selectedInterest
                        : styles.notSelectedInterest,
                    ]}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
          <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
            <Text style={styles.alertText}>최대 7개까지만 선택 가능해요!</Text>
          </Animated.View>
        </View>
        <NextButton
          navigation={navigation}
          to={'PersonalityForm'}
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
  counterWrap: {justifyContent: 'center'},
  counter: {fontSize: 13, fontFamily: 'Galmuri11', color: '#0000cc'},
  interestBox: {
    flex: 1,
    marginHorizontal: 24,
  },
  interestWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  underlayer: {
    marginBottom: 12,
    marginRight: 12,
  },
  interest: {
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
  interestText: {
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
});
