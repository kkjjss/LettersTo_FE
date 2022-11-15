import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BackButton} from './BackButton';
import {NextButton} from './NextButton';

type Props = {
  title?: string;
  color?: 'blue' | 'white';
  onPressBack?: () => void;
  onPressClose?: () => void;
  onPressNext?: () => void;
  disableNext?: boolean;
};

export const Header2 = React.memo(
  ({
    title,
    color = 'blue',
    onPressBack,
    onPressClose,
    onPressNext,
    disableNext = false,
  }: Props) => {
    return (
      <View style={styles.headerWrap}>
        {onPressBack ? (
          <BackButton color={color} onPress={onPressBack} />
        ) : onPressClose ? (
          <BackButton color={color} onPress={onPressClose} />
        ) : (
          <></>
        )}
        <View style={styles.titleWrap}>
          <Text
            style={[
              styles.title,
              {color: color === 'blue' ? '#0000cc' : 'white'},
            ]}>
            {title}
          </Text>
        </View>
        {onPressNext && disableNext !== undefined ? (
          <NextButton onPress={onPressNext} disable={disableNext} />
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
