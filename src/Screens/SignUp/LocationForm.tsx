import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import type {StackParamsList} from '../../types';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Header';
import {SCREEN_HEIGHT, CITY_LIST} from '../../constants';
import {SignUpButton} from '../../Components/SignUpButton';

type Props = NativeStackScreenProps<StackParamsList, 'LocationForm'>;

const CITIES = Object.keys(CITY_LIST).map(city => {
  return {label: city, value: city};
});

export function LocationForm({navigation}: Props) {
  const [openCity, setOpenCity] = useState(false);
  const [cities] = useState(CITIES);
  const [selectedCity, setSelectedCity] = useState<null | string>(null);

  const [openCounty, setOpenCounty] = useState(false);
  const [counties, setCounties] = useState([{label: '', value: ''}]);
  const [selectedCounty, setSelectedCounty] = useState(null);

  const [complete, setComplete] = useState(false);

  const onCityOpen = useCallback(() => {
    setOpenCounty(false);
  }, []);

  const onCountyOpen = useCallback(() => {
    setOpenCity(false);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const COUNTIES = CITY_LIST[selectedCity].map(county => {
        return {label: county, value: county};
      });
      setCounties(COUNTIES);
    }
    setSelectedCounty(null);
  }, [selectedCity]);

  useEffect(() => {
    console.log(selectedCity, selectedCounty);
    if (selectedCounty && selectedCity) {
      console.log(true);
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [selectedCity, selectedCounty]);

  return (
    <LinearGradient
      colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title={''} />
        <View style={styles.titleBox}>
          <View style={styles.titleWrap}>
            <Text style={styles.titleText}>편지를 받을 지역을</Text>
            <Text style={styles.titleText}>선택해주세요</Text>
          </View>
        </View>
        <View style={styles.locationWrap}>
          <View style={styles.cityBox}>
            <DropDownPicker
              open={openCity}
              value={selectedCity}
              items={cities}
              setOpen={setOpenCity}
              onOpen={onCityOpen}
              setValue={setSelectedCity}
              autoScroll={true}
              placeholder="시 · 도 선택"
              zIndex={2}
              style={{
                borderRadius: 10,
                borderColor: '#0000cc',
              }}
              textStyle={{
                fontFamily: 'Galmuri11',
                color: '#0000cc',
              }}
            />
          </View>
          <View>
            <DropDownPicker
              open={openCounty}
              value={selectedCounty}
              items={counties}
              setOpen={setOpenCounty}
              onOpen={onCountyOpen}
              setValue={setSelectedCounty}
              autoScroll={true}
              placeholder="군 · 구 선택"
              zIndex={1}
              style={{
                borderRadius: 10,
                borderColor: '#0000cc',
              }}
              textStyle={{
                fontFamily: 'Galmuri11',
                color: '#0000cc',
              }}
            />
          </View>
        </View>
        <SignUpButton navigation={navigation} complete={complete} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {height: SCREEN_HEIGHT},
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  titleWrap: {
    height: 100,
    marginBottom: 30,
    justifyContent: 'flex-end',
  },
  titleText: {fontSize: 18, fontFamily: 'Galmuri11', color: '#0000cc'},
  locationWrap: {
    flex: 1,
    marginHorizontal: 24,
  },
  cityBox: {
    marginBottom: 12,
  },
  countyBox: {},
});
