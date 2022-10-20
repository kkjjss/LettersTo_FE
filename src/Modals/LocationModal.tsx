import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View, Modal, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getCities, getRegions} from '../APIs/geolocation';
import {patchUserInfo} from '../APIs/member';
import {ModalHeader} from '../Components/ModalHeader';
import {UpdateButton} from '../Components/UpdateButton';
import {SCREEN_HEIGHT} from '../constants';
import useStore from '../Store/store';
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

  const {userInfo} = useStore();

  const activateUpdate = useMemo(() => {
    if (selectedRegionId && selectedCityId) {
      if (selectedCityId !== userInfo?.geolocationId) {
        return true;
      }
    }
    return false;
  }, [selectedCityId, selectedRegionId, userInfo]);

  const {bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  const onRegionOpen = useCallback(() => {
    setOpenRegion(false);
  }, []);

  const onCityOpen = useCallback(() => {
    setOpenCity(false);
  }, []);

  const hideModal = () => {
    setModalVisible(false);
  };

  const updateLocation = async () => {
    try {
      if (userInfo && selectedCityId) {
        const newUserInfo = {
          geolocationId: selectedCityId,
        };
        await patchUserInfo(newUserInfo);
      }

      hideModal();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      if (userInfo) {
        setSelectedRegionId(userInfo.parentGeolocationId);
        setSelectedCityId(userInfo.geolocationId);
      }
    }
  }, [isModalVisible, userInfo]);

  useEffect(() => {
    const getRegionsList = async () => {
      const regionsList = (await getRegions()).map(({id, name}) => {
        return {value: id, label: name};
      });
      setRegions(regionsList);
    };

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
  }, [selectedRegionId]);

  return (
    <Modal
      statusBarTranslucent={true} // android
      animationType="slide"
      transparent={true}
      onRequestClose={hideModal}
      visible={isModalVisible}>
      <View style={styles.container}>
        <View
          style={[
            styles.modalView,
            {
              paddingBottom: SAFE_AREA_BOTTOM,
            },
          ]}>
          <ModalHeader title={'위치 정보 관리'} hideModal={hideModal} />

          <View style={styles.titleBox}>
            <View style={styles.titleWrap}>
              <Text style={styles.titleText}>편지를 받을 지역을</Text>
              <View style={styles.counterWrap}>
                <Text style={styles.titleText}>선택해주세요</Text>
              </View>
            </View>
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

          <UpdateButton
            activateUpdate={activateUpdate}
            onPress={updateLocation}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    marginVertical: 12,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {height: 28, width: 28},
  title: {
    fontFamily: 'Galmuri11',
    fontSize: 15,
    color: '#0000cc',
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  titleWrap: {
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
    height: SCREEN_HEIGHT * 0.65,
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
