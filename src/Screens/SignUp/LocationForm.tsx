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
import {SCREEN_HEIGHT} from '../../constants';
import {SignUpButton} from '../../Components/SignUpButton';
import useStore from '../../Store/store';

import {getRegions, getCities} from '../../APIs/geolocation';

// import {signUp} from '../../APIs/member';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<StackParamsList, 'LocationForm'>;

export function LocationForm({navigation}: Props) {
  const [openRegion, setOpenRegion] = useState(false);
  const [regions, setRegions] = useState([{label: '', value: 0}]);
  const [selectedRegionId, setSelectedRegionId] = useState<null | number>(null);

  const [openCity, setOpenCity] = useState(false);
  const [cities, setCities] = useState([{label: '', value: 0}]);
  const [selectedCityId, setSelectedCityId] = useState<null | number>(null);

  const [activateSignUp, setActivateSignUp] = useState(false);

  const store = useStore();

  function onPressSignUp() {
    if (selectedRegionId && selectedCityId) {
      console.log(selectedRegionId, selectedCityId);
      store.setAddress(selectedCityId);

      setTimeout(async () => {
        if (
          store.registerToken &&
          store.signUpInfo.nickname &&
          store.signUpInfo.topicIds &&
          store.signUpInfo.personalityIds
        ) {
          // const userInfo = {
          //   refreshToken: store.registerToken,
          //   nickname: store.signUpInfo.nickname,
          //   topickIds: store.signUpInfo.topicIds,
          //   personalityIds: store.signUpInfo.personalityIds,
          //   geolocationId: 1,
          // };
          try {
            // const {accessToken, refreshToken} = await signUp(userInfo);

            // test
            const {accessToken, refreshToken} = {
              accessToken: 'accessToken_test',
              refreshToken: 'refreshToken_test',
            };

            await Promise.all([
              AsyncStorage.setItem('accessToken', accessToken),
              AsyncStorage.setItem('refreshToken', refreshToken),
            ]);

            store.setIsLoading(true);
          } catch (error: any) {
            console.error(error.message);
          }
        }
      }, 100);
    }
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

  const onRegionOpen = useCallback(() => {
    setOpenRegion(false);
  }, []);

  const onCityOpen = useCallback(() => {
    setOpenCity(false);
  }, []);

  const onStartNotice = () => {
    alert.reset();
    alert.start();
  };

  const getRegionsList = async () => {
    const regionsList = (await getRegions()).map(({id, name}) => {
      return {value: id, label: name};
    });
    setRegions(regionsList);
    console.log(regionsList);
  };

  useEffect(() => {
    getRegionsList();
  }, []);

  useEffect(() => {
    const getCitiesList = async (regionId: number) => {
      const citiesList = (await getCities(regionId)).map(({id, name}) => {
        return {value: id, label: name};
      });
      setCities(citiesList);
    };

    if (selectedRegionId) {
      getCitiesList(selectedRegionId);
    } else {
      setCities([{label: '', value: 0}]);
    }

    setSelectedCityId(null);
  }, [selectedRegionId]);

  useEffect(() => {
    if (selectedCityId && selectedRegionId) {
      setActivateSignUp(true);
    } else {
      setActivateSignUp(false);
    }
  }, [selectedRegionId, selectedCityId]);

  return (
    <LinearGradient
      colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title={''} />
        <View style={styles.titleBox}>
          <View style={styles.titleWrap}>
            <Text style={styles.titleText}>편지를 받을 지역을</Text>
            <View style={styles.counterWrap}>
              <Text style={styles.titleText}>선택해주세요</Text>
              <TouchableWithoutFeedback onPress={onStartNotice}>
                <Image
                  style={styles.noticeButtonImage}
                  source={require('../../Assets/notice.png')}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <Animated.View
            style={[
              styles.notice,
              {
                opacity: fadeAnim,
              },
            ]}>
            <ImageBackground
              style={styles.noticeBGImage}
              source={require('../../Assets/noticeBalloon.png')}>
              <Text style={styles.noticeText}>
                편지를 배달하는 시간을 계산하기 위해 사용돼요!
              </Text>
            </ImageBackground>
          </Animated.View>
        </View>

        <View style={styles.locationWrap}>
          <View style={styles.regionBox}>
            <DropDownPicker
              open={openRegion}
              value={selectedRegionId}
              items={regions}
              setOpen={setOpenRegion}
              onOpen={onCityOpen}
              setValue={setSelectedRegionId}
              autoScroll={true}
              placeholder="시 · 도 선택"
              zIndex={2}
              style={styles.picker}
              textStyle={styles.pickerText}
            />
          </View>
          <View>
            <DropDownPicker
              open={openCity}
              value={selectedCityId}
              items={cities}
              setOpen={setOpenCity}
              onOpen={onRegionOpen}
              setValue={setSelectedCityId}
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
          activateSignUp={activateSignUp}
          onPress={onPressSignUp}
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
  counterWrap: {flexDirection: 'row', alignItems: 'center'},
  noticeButtonImage: {marginLeft: 3, height: 20, width: 20},
  notice: {
    position: 'absolute',
    top: 100,
    left: 27,
    width: 288,
    height: 35,
    zIndex: 1,
  },
  noticeBGImage: {
    width: 288,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeText: {
    fontFamily: 'Galmuri11',
    fontSize: 12,
    color: '#0000cc',
  },
  locationWrap: {
    flex: 1,
    marginHorizontal: 24,
    zIndex: 0,
  },
  regionBox: {
    marginBottom: 12,
    zIndex: 2,
  },
  cityBox: {},
  picker: {
    borderRadius: 10,
    borderColor: '#0000cc',
  },
  pickerText: {
    fontFamily: 'Galmuri11',
    color: '#0000cc',
  },
});
