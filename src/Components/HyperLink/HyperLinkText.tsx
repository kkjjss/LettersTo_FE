import React from 'react';
import {Text} from 'react-native';

export const HyperLink = ({children, onPress}) => {
  return (
    <Text style={{textDecorationLine: 'underline'}} onPress={onPress}>
      {children}
    </Text>
  );
};
