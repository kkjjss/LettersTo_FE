import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import type {StackParamsList} from '../../types';

const {height, width} = Dimensions.get('window');

const SCREEN_HEIGHT = height - (StatusBar.currentHeight || 0);

type Props = NativeStackScreenProps<StackParamsList, 'NicknameForm'>;

export function NicknameForm({}: Props) {
  const [nickname, setNickname] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [alertText, setAlertText] = useState('');

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

  const checkNicknameForDuplicates = async () => {
    if (nickname) {
      alert.reset();

      // api return

      let res: boolean;

      if (nickname === 'A') {
        res = true;
      } else {
        res = false;
      }

      if (res === true) {
        setIsDuplicate(false);
        setAlertText('닉네임 사용이 가능해요.');
      } else {
        setIsDuplicate(true);
        setAlertText('이미 사용 중인 닉네임이에요.');
      }
      alert.start();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>
            나의 <Text style={styles.bold}>닉네임</Text>을 입력해주세요
          </Text>
        </View>
        <View style={styles.nicknameWrapper}>
          <View style={styles.nicknameForm}>
            <TextInput
              style={styles.nicknameInput}
              value={nickname}
              onChangeText={setNickname}
            />
            <View style={styles.checkButton}>
              <Button title="중복확인" onPress={checkNicknameForDuplicates} />
            </View>
          </View>
        </View>
      </ScrollView>
      <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
        <Text>{alertText}</Text>
      </Animated.View>
      <View style={{marginBottom: 30, marginTop: 10}}>
        <Button
          title="다음"
          onPress={() => {
            if (nickname && !isDuplicate)
              console.log('navigation.navigate(성향)');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {height: SCREEN_HEIGHT, paddingLeft: 30, paddingRight: 30},
  titleWrap: {
    height: 180,
    justifyContent: 'center',
  },
  titleText: {fontSize: 25},
  nicknameWrapper: {
    height: 200,
  },
  nicknameForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nicknameInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    flex: 5,
    marginRight: 10,
  },
  checkButton: {
    justifyContent: 'center',
  },
  alert: {
    backgroundColor: '#939393',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrap: {
    flex: 2,
    justifyContent: 'center',
  },
  bold: {
    fontWeight: '900',
  },
});
