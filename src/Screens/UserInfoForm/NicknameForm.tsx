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
  SafeAreaView,
} from 'react-native';
import {SCREEN_HEIGHT} from '../../constants';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Header';
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
    <LinearGradient
      colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Header navigation={navigation} title={''} />
          <View style={styles.titleWrap}>
            <Text style={styles.titleText}>별명을</Text>
            <Text style={styles.titleText}>입력해주세요</Text>
          </View>
          <View style={styles.nicknameWrapper}>
            <View style={styles.nicknameForm}>
              <TextInput
                style={styles.nicknameInput}
                value={nickname}
                onChangeText={changeNickname}
              />
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
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {height: SCREEN_HEIGHT},
  titleWrap: {
    height: 100,
    marginBottom: 30,
    marginHorizontal: 24,
    justifyContent: 'flex-end',
  },
  titleText: {fontSize: 18, fontFamily: 'Galmuri11', color: '#0000cc'},
  nicknameWrapper: {
    height: 200,
    marginHorizontal: 24,
  },
  nicknameForm: {},
  nicknameInput: {
    padding: 17,
    height: 54,
    borderWidth: 1,
    borderColor: '#0000cc',
    borderRadius: 10,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
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
