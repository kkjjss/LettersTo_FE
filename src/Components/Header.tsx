import * as React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../types/stackParamList';

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
      <Pressable style={styles.backButton} onPress={() => goback()}>
        <Image
          source={require('../Assets/back_blue.png')}
          style={{height: 28, width: 28}}
        />
      </Pressable>
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
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
