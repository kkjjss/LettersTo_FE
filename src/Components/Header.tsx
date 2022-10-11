import * as React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../types';

type Props = {
  navigation: NativeStackNavigationProp<StackParamsList, keyof StackParamsList>;
  title: string;
};

export function Header({navigation, title}: Props) {
  function goback() {
    navigation.pop();
  }

  return (
    <View style={styles.headerWrap}>
      <TouchableWithoutFeedback onPress={() => goback()}>
        <View style={styles.backButton}>
          <Text
            style={[
              styles.backButtonText,
              title === 'MY' ? {color: 'white'} : {color: '#0000cc'},
            ]}>
            {' < '}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={{justifyContent: 'center'}}>
        <Text style={{color: '#ffffff', fontFamily: 'Galmuri11', fontSize: 15}}>
          {title}
        </Text>
      </View>
      <View style={{width: 40}} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    marginLeft: 10,
    width: 40,
  },
  backButtonText: {
    fontFamily: 'Galmuri11',
    fontSize: 35,
  },
});
