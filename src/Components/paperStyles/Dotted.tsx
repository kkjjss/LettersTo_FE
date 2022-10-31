import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constants/screen';

export const Dotted = ({lineColor}: {lineColor: string}) => {
  const Dots = () => {
    const result = [];
    for (let i = 0; i < (SCREEN_HEIGHT / 24) * (SCREEN_WIDTH / 24); i++) {
      result.push(
        <View
          key={i}
          style={[
            styles.dot,
            {
              borderColor: lineColor,
            },
          ]}
        />,
      );
    }
    return <>{result}</>;
  };

  return (
    <View style={{position: 'absolute'}}>
      <View
        style={[
          styles.container,
          {
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
          },
        ]}>
        <Dots />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dot: {
    height: 1,
    width: 1,
    margin: 11.5,
    borderWidth: 1,
  },
});
