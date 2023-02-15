import React, {useCallback, useMemo, useState} from 'react';
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

import {LocationModal} from '../../Modals/UserInfo/LocationModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfo} from '../../APIs/member';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constants/screen';
import {ModalBlur} from '../../Modals/ModalBlur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header2} from '../../Components/Headers/Header2';
import {BottomButton} from '../../Components/Button/Bottom/BottomButton';
import {
  onPressPrivacyPolicy,
  onPressTermsOfService,
} from '../../Utils/hyperlink';
import {Avatar} from '../../Components/Avatar/Avatar';
import {useAuthAction} from '../../Store/auth';
import {useQuery} from 'react-query';
import Toast from '../../Components/Toast/toast';
import {LogoutModal} from '../../Modals/Logout/LogoutModal';

const pencilImg = require('../../Assets/write_white.png');
const stampImg = require('../../Assets/numberStamps.png');
const nextImg_blue = require('../../Assets/next_blue.png');

type Props = NativeStackScreenProps<StackParamsList, 'MyPage'>;

export const MyPage = ({navigation}: Props) => {
  const [isNicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [isTopicsModalVisible, setTopicsModalVisible] = useState(false);
  const [isPersonalitiesModalVisible, setPersonalitiesModalVisible] =
    useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const isModalVisible = useMemo(
    () =>
      isLocationModalVisible ||
      isNicknameModalVisible ||
      isPersonalitiesModalVisible ||
      isTopicsModalVisible ||
      isLogoutModalVisible,
    [
      isLocationModalVisible,
      isLogoutModalVisible,
      isNicknameModalVisible,
      isPersonalitiesModalVisible,
      isTopicsModalVisible,
    ],
  );

  const {logout} = useAuthAction();

  const {top: SAFE_AREA_TOP, bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  const onPressLogout = useCallback(() => {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    logout();
  }, [logout]);

  const toggleLogoutModal = useCallback(() => {
    setLogoutModalVisible(!isLogoutModalVisible);
  }, [isLogoutModalVisible]);

  const toggleNicknameModal = useCallback(() => {
    setNicknameModalVisible(!isNicknameModalVisible);
  }, [isNicknameModalVisible]);

  const toggleTopicsModal = useCallback(() => {
    setTopicsModalVisible(!isTopicsModalVisible);
  }, [isTopicsModalVisible]);

  const togglePersonalitiesModal = useCallback(() => {
    setPersonalitiesModalVisible(!isPersonalitiesModalVisible);
  }, [isPersonalitiesModalVisible]);

  const toggleLocationModal = useCallback(() => {
    setLocationModalVisible(!isLocationModalVisible);
  }, [isLocationModalVisible]);

  const goBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const goToStampHistory = useCallback(() => {
    navigation.navigate('StampHistory');
  }, [navigation]);

  const {data: userInfo, isSuccess} = useQuery(['userInfo'], getUserInfo, {
    onError: (error: any) => {
      console.error(error.message);
      Toast.show('문제가 발생했습니다');
    },
  });

  if (!isSuccess) {
    return <></>;
  }

  return (
    <View style={[styles.container, {paddingTop: SAFE_AREA_TOP}]}>
      <StatusBar barStyle={'light-content'} />
      <Header2 title={'MY'} color={'white'} onPressBack={goBack} />
      <View style={styles.nicknameWrap}>
        <View style={styles.nickname}>
          <Avatar nickname={userInfo.nickname} />
          <Text style={styles.nicknameText}>{userInfo.nickname}</Text>
        </View>
        <Pressable onPress={toggleNicknameModal}>
          <Image source={pencilImg} style={styles.pencilImg} />
        </Pressable>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btnStamp}
        onPress={goToStampHistory}>
        <Image source={stampImg} style={styles.stampImg} />
        <Text style={styles.stampTitle}>나의 보유 우표</Text>
        <Image source={nextImg_blue} style={styles.nextImg} />
        <Text style={styles.stampQuantity}>{userInfo.stampQuantity} 개</Text>
      </TouchableOpacity>

      <View style={styles.userInfoWrapper}>
        <View style={styles.userInfoBtn}>
          <Pressable onPress={toggleTopicsModal}>
            <Text style={styles.userInfoBtnText}>관심사 관리</Text>
          </Pressable>
        </View>
        <View style={styles.userInfoBtn}>
          <Pressable onPress={togglePersonalitiesModal}>
            <Text style={styles.userInfoBtnText}>성향 관리</Text>
          </Pressable>
        </View>
        <View style={styles.userInfoBtn}>
          <Pressable onPress={toggleLocationModal}>
            <Text style={styles.userInfoBtnText}>위치 정보 관리</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.menuWrapper,
          {
            paddingBottom: SAFE_AREA_BOTTOM,
          },
        ]}>
        <View style={styles.menuList}>
          <View style={styles.menu}>
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

          <View style={styles.menu}>
            <ListName name="계정 관리" />
            <ListItem
              itmeName="회원 탈퇴"
              onPress={() => navigation.navigate('AccountDelete')}
            />
          </View>
        </View>

        <BottomButton buttonText="로그아웃" onPress={toggleLogoutModal} white />
      </View>

      {isModalVisible && <ModalBlur />}
      <NicknameModal
        currentNickname={userInfo.nickname}
        isModalVisible={isNicknameModalVisible}
        onPressClose={toggleNicknameModal}
      />
      <TopicsModal
        isModalVisible={isTopicsModalVisible}
        onPressClose={toggleTopicsModal}
      />
      <PersonalitiesModal
        isModalVisible={isPersonalitiesModalVisible}
        onPressClose={togglePersonalitiesModal}
      />
      <LocationModal
        isModalVisible={isLocationModalVisible}
        onPressClose={toggleLocationModal}
      />
      <LogoutModal
        isVisible={isLogoutModalVisible}
        onPressClose={toggleLogoutModal}
        onPressLogout={onPressLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0000cc'},
  nicknameWrap: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  nickname: {flexDirection: 'row', alignItems: 'center'},
  nicknameText: {fontFamily: 'Galmuri11', fontSize: 16, color: 'white'},
  pencilImg: {height: 24, width: 24, marginLeft: 4},
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
  stampImg: {height: 24, width: 24, marginRight: 8},
  stampTitle: {fontFamily: 'Galmuri11', fontSize: 14, color: '#0000CC'},
  stampQuantity: {
    fontFamily: 'Galmuri11',
    fontSize: 14,
    color: '#0000CC',
    marginLeft: 'auto',
  },
  nextImg: {height: 20, width: 20, marginLeft: 2},
  userInfoWrapper: {height: 54, flexDirection: 'row'},
  userInfoBtn: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  userInfoBtnText: {fontFamily: 'Galmuri11', color: 'white', fontSize: 13},
  modalBlur: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#000000a0',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  menuWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuList: {flex: 1, paddingTop: 24, paddingHorizontal: 24},
  menu: {marginBottom: 34},
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
