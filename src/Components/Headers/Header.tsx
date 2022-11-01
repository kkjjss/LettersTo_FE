import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../../types/stackParamList';
import {LinearGradient} from 'expo-linear-gradient';
import {BackButton} from './BackButton';

type Props = {
  navigation: NativeStackNavigationProp<StackParamsList, keyof StackParamsList>;
  title: string;
  color?: 'blue' | 'white';
  next?: keyof StackParamsList;
  onPressNext?: () => void;
  disableNext?: boolean;
};

export function Header({
  navigation,
  title,
  color = 'blue',
  next,
  onPressNext,
  disableNext,
}: Props) {
  function goBack() {
    navigation.pop();
  }

  function goNext() {
    if (next) {
      navigation.navigate(next);
    }
  }

  return (
    <View style={styles.headerWrap}>
      <BackButton color={color} onPress={goBack} />
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
  backButtonText: {
    fontFamily: 'Galmuri11',
    fontSize: 35,
  },
  titleWrap: {justifyContent: 'center'},
  title: {fontFamily: 'Galmuri11', fontSize: 15},
});
