import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export const NextButton = () => {
  return (
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
  );
};
