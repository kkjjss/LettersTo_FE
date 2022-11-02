import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

type Props = {
  onPress: () => void;
  disable: boolean;
};

export const NextButton = React.memo(
  ({onPress: processAndNext, disable}: Props) => {
    console.log(disable);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={processAndNext}
        disabled={disable}>
        {disable ? (
          <View
            style={{
              width: 50,
              height: 28,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFCCEE',
            }}>
            <Text
              style={{
                fontFamily: 'Galmuri11',
                color: 'white',
              }}>
              다음
            </Text>
          </View>
        ) : (
          <LinearGradient
            colors={['#FF6ECE', '#FF3DBD']}
            style={{
              width: 50,
              height: 28,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Galmuri11',
                color: 'white',
              }}>
              다음
            </Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    );
  },
);
