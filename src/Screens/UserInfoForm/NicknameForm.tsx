import React, {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import {SCREEN_HEIGHT} from '../../constants';
import type {StackParamsList} from '../../types';

type Props = NativeStackScreenProps<StackParamsList, 'NicknameForm'>;

export function NicknameForm({navigation}: Props) {
  const [nickname, setNickname] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [activateNext, setActivateNext] = useState(false);

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

      // api request
      let response: boolean;
      if (nickname === 'A') {
        response = true;
      } else {
        response = false;
      }

      if (response === true) {
        setIsDuplicate(false);
      } else {
        setIsDuplicate(true);
      }
      setActivateNext(true);
      alert.start();
    }
  };

  const changeNickname = (v: string) => {
    setNickname(v);
    setActivateNext(false);
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
              onChangeText={changeNickname}
            />
            <View style={styles.checkButton}>
              <Button
                title="중복확인"
                disabled={!nickname}
                onPress={checkNicknameForDuplicates}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Animated.View style={[styles.alert, {opacity: fadeAnim}]}>
        {!isDuplicate ? (
          <Text>닉네임 사용이 가능해요.</Text>
        ) : (
          <Text>이미 사용중인 닉네임이에요.</Text>
        )}
      </Animated.View>
      <View style={{marginBottom: 30, marginTop: 10}}>
        <Button
          title="다음"
          disabled={!(nickname && !isDuplicate && activateNext)}
          onPress={() => {
            if (nickname && !isDuplicate) {
              navigation.navigate('InterestsForm');
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {height: SCREEN_HEIGHT, paddingLeft: 30, paddingRight: 30},
  titleWrap: {
    height: 100,
    marginBottom: 80,
    justifyContent: 'flex-end',
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
    borderRadius: 100,
  },
  buttonWrap: {
    flex: 2,
    justifyContent: 'center',
  },
  bold: {
    fontWeight: '900',
  },
});
