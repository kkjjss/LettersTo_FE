import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import {ListItem, ListName} from '../../Components/MyPageList';

import {NicknameModal} from '../../Modals/UserInfo/NicknameModal';
import {TopicsModal} from '../../Modals/UserInfo/TopicsModal';
import {PersonalitiesModal} from '../../Modals/UserInfo/PersonalitiesModal';

import useStore from '../../Store/store';
import {LocationModal} from '../../Modals/UserInfo/LocationModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn as getUserInfo} from '../../APIs/member';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constants/screen';
import {ModalBlur} from '../../Modals/ModalBlur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header2} from '../../Components/Headers/Header2';
import {BottomButton} from '../../Components/BottomButton';
import {AlertModal} from '../../Modals/AlertModal';
import {
  onPressPrivacyPolicy,
  onPressTermsOfService,
} from '../../Utils/hyperlink';
import {Avatar} from '../../Components/Avatar/Avatar';

type Props = NativeStackScreenProps<StackParamsList, 'MyPage'>;

export function MyPage({navigation}: Props) {
  const [isNicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [isTopicsModalVisible, setTopicsModalVisible] = useState(false);
  const [isPersonalitiesModalVisible, setPersonalitiesModalVisible] =
    useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);

  const [isAlertVisible, setAlertVisible] = useState(false);

  const {setUserInfo, setIsLoggedIn, userInfo} = useStore();

  const {top: SAFE_AREA_TOP, bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  function logout() {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  }

  const toggleAlertModal = () => {
    setAlertVisible(!isAlertVisible);
  };

  const openNicknameModal = () => {
    setNicknameModalVisible(true);
  };

  const openTopicsModal = () => {
    setTopicsModalVisible(true);
  };

  const openPersonalitiesModal = () => {
    setPersonalitiesModalVisible(true);
  };

  const openLocationModal = () => {
    setLocationModalVisible(true);
  };

  const goBack = () => {
    navigation.pop();
  };

  const goToStampHistory = () => {
    navigation.navigate('StampHistory');
  };

  useEffect(() => {
    const getNewestUserInfo = async () => {
      if (
        !isLocationModalVisible &&
        !isNicknameModalVisible &&
        !isPersonalitiesModalVisible &&
        !isTopicsModalVisible
      ) {
        const userData = await getUserInfo();
        setUserInfo({
          nickname: userData.nickname,
          personalityIds: userData.personalityIds,
          topicIds: userData.topicIds,
          geolocationId: userData.geolocationId,
          stampQuantity: userData.stampQuantity,
          parentGeolocationId: userData.parentGeolocationId,
        });
      }
    };
    getNewestUserInfo();
  }, [
    isLocationModalVisible,
    isNicknameModalVisible,
    isPersonalitiesModalVisible,
    isTopicsModalVisible,
    setUserInfo,
  ]);

  return (
    <View style={[styles.container, {paddingTop: SAFE_AREA_TOP}]}>
      <StatusBar barStyle={'light-content'} />
      <Header2 title="MY" color="white" onPressBack={goBack} />
      <View style={styles.nickname}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar nickname={userInfo?.nickname} />
          <Text style={styles.nicknameText}>{userInfo?.nickname}</Text>
        </View>
        <Pressable onPress={openNicknameModal}>
          <Image
            source={require('../../Assets/write_white.png')}
            style={{height: 24, width: 24, marginLeft: 4}}
          />
        </Pressable>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btnStamp}
        onPress={goToStampHistory}>
        <Image
          source={require('../../Assets/numberStamps.png')}
          style={{height: 24, width: 24, marginRight: 8}}
        />
        <Text style={{fontFamily: 'Galmuri11', fontSize: 14, color: '#0000CC'}}>
          나의 보유 우표
        </Text>
        <Image
          source={require('../../Assets/next_blue.png')}
          style={{height: 20, width: 20, marginLeft: 2}}
        />
        <Text
          style={{
            fontFamily: 'Galmuri11',
            fontSize: 14,
            color: '#0000CC',
            marginLeft: 'auto',
          }}>
          {userInfo?.stampQuantity.toLocaleString()}
        </Text>
        <Text
          style={{
            fontFamily: 'Galmuri11',
            fontSize: 14,
            color: '#0000CC',
            marginLeft: 2,
          }}>
          개
        </Text>
      </TouchableOpacity>

      <View style={{height: 54, flexDirection: 'row'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Pressable onPress={openTopicsModal}>
            <Text
              style={{fontFamily: 'Galmuri11', color: 'white', fontSize: 13}}>
              관심사 관리
            </Text>
          </Pressable>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Pressable onPress={openPersonalitiesModal}>
            <Text
              style={{fontFamily: 'Galmuri11', color: 'white', fontSize: 13}}>
              성향 관리
            </Text>
          </Pressable>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Pressable onPress={openLocationModal}>
            <Text
              style={{fontFamily: 'Galmuri11', color: 'white', fontSize: 13}}>
              위치 정보 관리
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingBottom: SAFE_AREA_BOTTOM,
        }}>
        <View style={{flex: 1, paddingTop: 24, paddingHorizontal: 24}}>
          <View style={{marginBottom: 34}}>
            <ListName name="약관 정보" />
            <ListItem
              itmeName="서비스이용약관"
              onPress={onPressTermsOfService}
            />
            <ListItem
              itmeName="개인정보처리방침"
              onPress={onPressPrivacyPolicy}
            />
          </View>

          <View style={{marginBottom: 34}}>
            <ListName name="계정 관리" />
            <ListItem
              itmeName="회원 탈퇴"
              onPress={() => {
                navigation.navigate('AccountDelete');
              }}
            />
          </View>
        </View>

        <BottomButton buttonText="로그아웃" onPress={toggleAlertModal} white />
      </View>

      {(isLocationModalVisible ||
        isNicknameModalVisible ||
        isPersonalitiesModalVisible ||
        isTopicsModalVisible ||
        isAlertVisible) && <ModalBlur />}
      <NicknameModal
        isModalVisible={isNicknameModalVisible}
        setModalVisible={setNicknameModalVisible}
      />
      <TopicsModal
        isModalVisible={isTopicsModalVisible}
        setModalVisible={setTopicsModalVisible}
      />
      <PersonalitiesModal
        isModalVisible={isPersonalitiesModalVisible}
        setModalVisible={setPersonalitiesModalVisible}
      />
      <LocationModal
        isModalVisible={isLocationModalVisible}
        setModalVisible={setLocationModalVisible}
      />
      <AlertModal
        visible={isAlertVisible}
        hideModal={toggleAlertModal}
        text="로그아웃하시겠어요?">
        <BottomButton buttonText="네, 로그아웃할께요." onPress={logout} />
      </AlertModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0000cc'},
  nickname: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  nicknameText: {fontFamily: 'Galmuri11', fontSize: 16, color: 'white'},
  nicknameButton: {
    height: 28,
    width: 82,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nicknameButtonText: {
    fontFamily: 'Galmuri11',
    fontSize: 11,
    color: '#0000cc',
  },
  modalBlur: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#000000a0',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  modal: {
    margin: 0,
    backgroundColor: 'white',
    height: 300,
    flex: 1,
    bottom: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    position: 'absolute',
    width: '100%',
  },
  avatar: {
    overflow: 'hidden',
    width: 36,
    height: 36,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFCC',
    borderRadius: 18,
  },
  avatarText: {fontFamily: 'Galmuri11-Bold', fontSize: 13, color: '#0000CC'},
  btnStamp: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    marginHorizontal: 24,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
