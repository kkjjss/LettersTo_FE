import React from 'react';
import {View} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constants/screen';

export const Grid = ({lineColor}: {lineColor: string}) => {
  const Horizontal = () => {
    const result = [];
    for (let i = 0; i * 24 < SCREEN_HEIGHT; i++) {
      result.push(
        <View
          key={i}
          style={{
            height: 24,
            width: SCREEN_WIDTH,
            borderTopWidth: 1,
            borderColor: lineColor,
          }}
        />,
      );
    }
    return <>{result}</>;
  };

  const Vertical = () => {
    const result = [];
    for (let i = 0; i * 24 < SCREEN_HEIGHT; i++) {
      result.push(
        <View
          key={i}
          style={{
            height: SCREEN_HEIGHT,
            width: 24,
            borderRightWidth: 1,
            borderColor: lineColor,
          }}
        />,
      );
    }
    return <>{result}</>;
  };

  return (
    <>
      <View style={{position: 'absolute'}}>
        <Horizontal />
      </View>
      <View style={{position: 'absolute', flexDirection: 'row'}}>
        <Vertical />
      </View>
    </>
  );
};
