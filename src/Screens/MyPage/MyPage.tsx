import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import type {StackParamsList} from '../../types';
import {Header} from '../../Components/Header';

type Props = NativeStackScreenProps<StackParamsList, 'MyPage'>;

export function MyPage({navigation}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'MY'} />
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          borderBottomColor: 'white',
          borderBottomWidth: 1,
        }}>
        <View>
          <Text style={{fontFamily: 'Galmuri11', fontSize: 16, color: 'white'}}>
            ☺ 즐거운 블루치즈 123
          </Text>
        </View>
        <View>
          <Text style={{fontFamily: 'Galmuri11', fontSize: 13, color: 'white'}}>
            별명 바꾸기
          </Text>
        </View>
      </View>

      <View style={{margin: 24}}>
        <View>
          <Text
            style={{
              fontFamily: 'Galmuri11',
              fontSize: 12,
              color: '#ffffff7f',
              marginBottom: 14,
            }}>
            내 정보
          </Text>
        </View>
        <TouchableWithoutFeedback>
          <View style={{height: 35, justifyContent: 'center'}}>
            <Text
              style={{fontFamily: 'Galmuri11', fontSize: 15, color: 'white'}}>
              관심사 관리
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={{height: 35, justifyContent: 'center'}}>
            <Text
              style={{fontFamily: 'Galmuri11', fontSize: 15, color: 'white'}}>
              성향 관리
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={{height: 35, justifyContent: 'center'}}>
            <Text
              style={{fontFamily: 'Galmuri11', fontSize: 15, color: 'white'}}>
              위치 정보 관리
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0000cc'},
});
