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

type Props = NativeStackScreenProps<StackParamsList, 'PersonalityForm'>;

const PERSONALITY_LIST = [
  '열정적인',
  '신중한',
  '솔직한',
  '대담한',
  '결단력있는',
  '도전적인',
  '치밀한',
  '다정한',
  '사교적인',
  '조심성있는',
  '독창정인',
  '겸손한',
  '세심한',
  '참을성있는',
  '수줍어하는',
  '조급한',
  '내성적인',
  '외향적인',
];

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
      setAlertText('성향은 최대 9개까지 가능합니다.');
      alert.start();
    }
  };

  const onPressNext = () => {
    if (counter === 0) {
      alert.reset();
      setAlertText('성향을 선택해 주세요.');
      alert.start();
    } else {
      console.log('next');
    }
  };

  useEffect(() => {
    let count = 0;
    for (let i in PERSONALITY_LIST) {
      if (personalities[PERSONALITY_LIST[i]].selected) {
        count++;
      }
    }
    setCounter(count);
  }, [personalities]);

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>
            나의 <Text style={styles.bold}>성향</Text>을{'\n'}
            모두 선택해 주세요
          </Text>
        </View>
        <View style={styles.counterWrap}>
          <Text style={styles.counter}>{counter}/9</Text>
        </View>
      </View>
      <View style={styles.personalityList}>
        {PERSONALITY_LIST.map(personality => {
          return (
            <TouchableHighlight
              key={personality}
              style={styles.underlayer}
              activeOpacity={0.8}
              onPress={() => selectPersonality(personality)}>
              <View
                style={
                  personalities[personality].selected
                    ? styles.selectedPersonality
                    : styles.personality
                }>
                <Text style={styles.bold}>{personality}</Text>
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
  personalityList: {
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
  personality: {
    height: 35,
    backgroundColor: 'white',
    borderColor: '#dddddd',
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPersonality: {
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
