import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../Components/Headers/Header';
import {LetterCoverPreview} from '../../Components/LetterEditor/LetterCoverPreview';
import {SendLetterButton} from '../../Components/LetterEditor/SendLetterButton';
import {StackParamsList} from '../../types/stackParamList';

type Props = NativeStackScreenProps<StackParamsList, 'LetterComplete'>;

export const LetterComplete = ({navigation}: Props) => {
  return (
    <View style={{backgroundColor: '#ffccee', flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <Header navigation={navigation} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 100,
          }}>
          <Text
            style={{
              fontFamily: 'Galmuri11-Bold',
              color: '#0000cc',
              fontSize: 18,
              marginBottom: 8,
            }}>
            Complete!
          </Text>
          <Text
            style={{
              fontFamily: 'Galmuri11',
              color: '#0000cc',
              fontSize: 15,
              height: 25,
              marginBottom: 8,
            }}>
            편지 작성을 완료했어요!
          </Text>
          <View style={styles.cover}>
            <LetterCoverPreview />
          </View>
        </View>
        <SendLetterButton />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  coverContainer: {
    backgroundColor: '#ffccee',
  },
  cover: {paddingTop: 12, paddingHorizontal: 40},
});
