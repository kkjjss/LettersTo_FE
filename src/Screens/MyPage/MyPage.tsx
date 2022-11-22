import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import {Header} from '../../Components/Headers/Header';
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

type Props = NativeStackScreenProps<StackParamsList, 'MyPage'>;

export function MyPage({navigation}: Props) {
  const [isNicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [isTopicsModalVisible, setTopicsModalVisible] = useState(false);
  const [isPersonalitiesModalVisible, setPersonalitiesModalVisible] =
    useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);

  const {setUserInfo, setIsLoggedIn, userInfo} = useStore();

  function logout() {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  }

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
          stampQuantity: userData.stampQuantity,
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
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'MY'} color="white" />
      <View style={styles.nickname}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../Assets/userIcon.png')}
            style={{height: 20, width: 20, marginRight: 4}}
          />
          <Text style={styles.nicknameText}>{userInfo?.nickname}</Text>
        </View>
        <Pressable onPress={openNicknameModal}>
          <View style={styles.nicknameButton}>
            <Text style={styles.changeNicknameButton}>별명 바꾸기</Text>
          </View>
        </Pressable>
      </View>

      <View style={{flex: 1, position: 'relative', paddingHorizontal: 24}}>
        <View style={{marginBottom: 24}}>
          <ListName name="내 정보" />
          <ListItem itmeName="관심사 관리" openModal={openTopicsModal} />
          <ListItem itmeName="성향 관리" openModal={openPersonalitiesModal} />
          <ListItem itmeName="위치 정보 관리" openModal={openLocationModal} />
        </View>

        <View style={{marginBottom: 24}}>
          <ListName name="이용 정보" />
          <ListItem
            itmeName="이용 약관"
            openModal={() => {
              return;
            }}
          />
          <ListItem
            itmeName="개인정보처리방침"
            openModal={() => {
              return;
            }}
          />
        </View>

        <View style={{marginBottom: 24}}>
          <ListName name="계정 관리" />
          <ListItem
            itmeName="회원 탈퇴"
            openModal={() => {
              navigation.navigate('AccountDelete');
            }}
          />
        </View>

        <Pressable
          onPress={logout}
          style={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{fontFamily: 'Galmuri11', color: 'white', marginRight: 4}}>
            로그아웃
          </Text>
          <Image
            source={require('../../Assets/logout.png')}
            style={{height: 24, width: 24}}
          />
        </Pressable>
      </View>

      {(isLocationModalVisible ||
        isNicknameModalVisible ||
        isPersonalitiesModalVisible ||
        isTopicsModalVisible) && <ModalBlur />}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0000cc'},
  nickname: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 24,
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
  changeNicknameButton: {
    fontFamily: 'Galmuri11',
    fontSize: 13,
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
});
