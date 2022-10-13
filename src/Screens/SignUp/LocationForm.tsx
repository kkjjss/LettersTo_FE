import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Animated,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import type {StackParamsList} from '../../types/stackParamList';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from '../../Components/Header';
import {SCREEN_HEIGHT, CITY_LIST} from '../../constants';
import {SignUpButton} from '../../Components/SignUpButton';
import useStore from '../../Store/store';

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

  const store = useStore();

  function signUp() {
    store.setIsLoading(true);
    store.setIsLoggedIn(true);
  }

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const alert = Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 0,
      delay: 2000,
      useNativeDriver: true,
    }),
  ]);

  const onCityOpen = useCallback(() => {
    setOpenCounty(false);
  }, []);

  const onCountyOpen = useCallback(() => {
    setOpenCity(false);
  }, []);

  const onStartNotice = () => {
    alert.reset();
    alert.start();
  };

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
    if (selectedCounty && selectedCity) {
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.titleText}>선택해주세요</Text>
              <TouchableWithoutFeedback onPress={onStartNotice}>
                <Image
                  style={{marginLeft: 3, height: 20, width: 20}}
                  source={require('../../Assets/notice.png')}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <Animated.View
            style={{
              position: 'absolute',
              top: 100,
              left: 17,
              width: 288,
              height: 35,
              zIndex: 2,
              opacity: fadeAnim,
            }}>
            <ImageBackground
              style={{
                width: 288,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../../Assets/noticeBalloon.png')}>
              <Text
                style={{
                  fontFamily: 'Galmuri11',
                  fontSize: 12,
                  color: '#0000cc',
                }}>
                편지를 배달하는 시간을 계산하기 위해 사용돼요!
              </Text>
            </ImageBackground>
          </Animated.View>
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
              style={styles.picker}
              textStyle={styles.pickerText}
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
              style={styles.picker}
              textStyle={styles.pickerText}
            />
          </View>
        </View>
        <SignUpButton
          navigation={navigation}
          complete={complete}
          onPress={signUp}
        />
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
    zIndex: 1,
  },
  cityBox: {
    marginBottom: 12,
  },
  countyBox: {},
  picker: {
    borderRadius: 10,
    borderColor: '#0000cc',
  },
  pickerText: {
    fontFamily: 'Galmuri11',
    color: '#0000cc',
  },
});
