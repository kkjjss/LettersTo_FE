import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export const SendLetterButton = ({onPress}: {onPress: () => Promise<void>}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        colors={['#ff6ece', '#ff3dbd']}
        style={{
          marginHorizontal: 16,
          borderRadius: 10,
          height: 52,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontFamily: 'Galmuri11', color: 'white'}}>
          공개편지 올리기
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
