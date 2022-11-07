import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../../types/stackParamList';
import {BackButton} from './BackButton';
import {NextButton} from './NextButton';
import {useCallback} from 'react';

type Props = {
  navigation: NativeStackNavigationProp<StackParamsList, keyof StackParamsList>;
  title: string;
  color?: 'blue' | 'white';
  next?: {name: keyof StackParamsList; params?: any};
  onPressNext?: () => void;
  disableNext?: boolean;
};

export const Header = React.memo(
  ({
    navigation,
    title,
    color = 'blue',
    next,
    onPressNext: processBeforeNext,
    disableNext,
  }: Props) => {
    console.log('Header');

    function goBack() {
      navigation.pop();
    }

    const goNext = useCallback(() => {
      if (next) {
        navigation.navigate(next.name, next.params);
      }
    }, [navigation, next]);

    const processAndNext = useCallback(() => {
      if (processBeforeNext) {
        processBeforeNext();
      }
      goNext();
    }, [goNext, processBeforeNext]);

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
        {next && disableNext !== undefined ? (
          <NextButton onPress={processAndNext} disable={disableNext} />
        ) : (
          <View style={{width: 50}} />
        )}
      </View>
    );
  },
);

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
