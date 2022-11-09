import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type { StackParamsList } from '../../types/stackParamList';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<StackParamsList, 'ReadLetter'>;

export function ReadLetter({navigation}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: 'red'}}>읽기</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {},
});