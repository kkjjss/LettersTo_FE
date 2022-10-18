import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ModalHeader} from '../Components/ModalHeader';
import {ResetButton} from '../Components/ResetButton';
import { SignUpButton } from '../Components/SignUpButton';
type Props = {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LocationModal({isModalVisible, setModalVisible}: Props) {
  const [openRegion, setOpenRegion] = useState(false);
  const [regions, setRegions] = useState([{label: '', value: 0}]);
  const [selectedRegionId, setSelectedRegionId] = useState<null | number>(null);

  const [openCity, setOpenCity] = useState(false);
  const [cities, setCities] = useState([{label: '', value: 0}]);
  const [selectedCityId, setSelectedCityId] = useState<null | number>(null);

  const [activateUpdate, setActivateUpdate] = useState(true);

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

  return (
    <Modal
      statusBarTranslucent={true} // android
      animationType="slide"
      transparent={true}
      onRequestClose={hideModal}
      visible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <ModalHeader title={'위치 정보 관리'} hideModal={hideModal} />

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
                  zIndex: 1,
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
        </View>
      </View>
    </Modal>
  );
}
