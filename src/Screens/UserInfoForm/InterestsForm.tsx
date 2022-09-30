import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  TouchableHighlight,
} from 'react-native';
import type {StackParamsList} from '../../types';

type Props = NativeStackScreenProps<StackParamsList, 'InterestsForm'>;

const INTERESTS_LIST = [
  '운동',
  '음악',
  '여행',
  '사진',
  '맛집',
  '게임',
  '영화',
  '만화',
  '일상',
  '독서',
  '연애',
  '스포츠',
  '연예인',
  '자기개발',
  '인관관계',
];

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
  const [alertText, setAlertText] = useState<string>('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const alert = Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 0,
      delay: 1000,
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
      setAlertText('관심사는 최대 7개까지 가능합니다.');
      alert.start();
    }
  };

  const onPressNext = () => {
    if (counter === 0) {
      alert.reset();
      setAlertText('관심사를 선택해 주세요.');
      alert.start();
    } else {
      console.log('next');
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
  }, [interests]);

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>
            나의 <Text style={styles.bold}>관심사</Text>를{'\n'}
            모두 선택해 주세요
          </Text>
        </View>
        <View style={styles.counterWrap}>
          <Text style={styles.counter}>{counter}/7</Text>
        </View>
      </View>
      <View style={styles.interestList}>
        {INTERESTS_LIST.map(interest => {
          return (
            <TouchableHighlight
              style={styles.underlayer}
              activeOpacity={0.8}
              onPress={() => selectInterest(interest)}>
              <View
                style={
                  interests[interest].selected
                    ? styles.selectedInterest
                    : styles.interest
                }>
                <Text style={styles.bold}>{interest}</Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
      <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
        <Text>{alertText}</Text>
      </Animated.View>
      <View style={{marginBottom: 30, marginTop: 10}}>
        <Button title="다음" onPress={onPressNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingLeft: 30, paddingRight: 30},
  titleBox: {
    height: 125,
    marginBottom: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleWrap: {
    justifyContent: 'flex-end',
  },
  titleText: {fontSize: 25},
  counterWrap: {justifyContent: 'flex-end'},
  counter: {fontSize: 20},
  interestList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  underlayer: {
    minWidth: 90,
    borderRadius: 10,
    marginBottom: 10,
  },
  interest: {
    height: 35,
    backgroundColor: 'white',
    borderColor: '#dddddd',
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedInterest: {
    height: 35,
    backgroundColor: '#dddddd',
    borderColor: '#dddddd',
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: '#939393',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  bold: {fontWeight: '900'},
});
