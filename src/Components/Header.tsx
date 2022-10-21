import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../types/stackParamList';

type Props = {
  navigation: NativeStackNavigationProp<StackParamsList, keyof StackParamsList>;
  title: string;
  color?: 'blue' | 'white';
};

export function Header({navigation, title, color = 'blue'}: Props) {
  function goback() {
    navigation.pop();
  }

  const backButtonImage = () => {
    if (color === 'blue') {
      return (
        <Image
          source={require('../Assets/back_blue.png')}
          style={{height: 28, width: 28}}
        />
      );
    } else {
      return (
        <Image
          source={require('../Assets/back_white.png')}
          style={{height: 28, width: 28}}
        />
      );
    }
  };

  return (
    <View style={styles.headerWrap}>
      <Pressable style={styles.backButton} onPress={() => goback()}>
        {backButtonImage}
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
      <View style={{width: 52}} />
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
    paddingLeft: 16,
  },
  backButton: {
    width: 40,
  },
  backButtonText: {
    fontFamily: 'Galmuri11',
    fontSize: 35,
  },
  titleWrap: {justifyContent: 'center'},
  title: {fontFamily: 'Galmuri11', fontSize: 15},
});
