import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamsList} from '../../types/stackParamList';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header2} from '../../Components/Headers/Header2';

type Props = NativeStackScreenProps<StackParamsList, 'StampHistory'>;

export const StampHistory = ({navigation}: Props) => {
  const {top: SAFE_AREA_TOP, bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  const onPressBack = () => {
    navigation.pop();
  };

  return (
    <View style={[styles.container, {paddingTop: SAFE_AREA_TOP}]}>
      <Header2 title="우표 지급 내역" color="white" onPressBack={onPressBack} />

      <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={{paddingBottom: SAFE_AREA_BOTTOM}}>
          </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000CC',
  },
  contentContainer: {flex: 1, backgroundColor: 'white', marginTop: 5},
});