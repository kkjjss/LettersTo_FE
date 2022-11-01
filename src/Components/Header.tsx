import * as React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../types/stackParamList';
import {useCallback} from 'react';
import {LinearGradient} from 'expo-linear-gradient';

const back_blue = require('../Assets/back_blue.png');
const back_white = require('../Assets/back_white.png');

type Props = {
  navigation: NativeStackNavigationProp<StackParamsList, keyof StackParamsList>;
  title: string;
  color?: 'blue' | 'white';
  next?: keyof StackParamsList;
  onPressNext?: () => void;
};

const BackButtonImage = {
  blue: <Image source={back_blue} style={{height: 28, width: 28}} />,
  white: <Image source={back_white} style={{height: 28, width: 28}} />,
};

export function Header({
  navigation,
  title,
  color = 'blue',
  next,
  onPressNext,
}: Props) {
  function goBack() {
    navigation.pop();
  }

  const BackButton = useCallback(() => BackButtonImage[color], [color]);

  function goNext() {
    if (next) {
      navigation.navigate(next);
    }
  }

  return (
    <View style={styles.headerWrap}>
      <Pressable
        style={styles.backButton}
        onPress={() => {
          goBack();
        }}>
        <BackButton />
      </Pressable>
      <View style={styles.titleWrap}>
        <Text
          style={[
            styles.title,
            {color: color === 'blue' ? '#0000cc' : 'white'},
          ]}>
          {title}
        </Text>
      </View>
      {next ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (onPressNext) {
              onPressNext();
            }
            goNext();
          }}>
          <LinearGradient
            colors={['#FF6ECE', '#FF3DBD']}
            style={{
              width: 48,
              height: 26,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Galmuri11',
                color: 'white',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              다음
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View style={{width: 40}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 48,
  },
  backButtonText: {
    fontFamily: 'Galmuri11',
    fontSize: 35,
  },
  titleWrap: {justifyContent: 'center'},
  title: {fontFamily: 'Galmuri11', fontSize: 15},
});
