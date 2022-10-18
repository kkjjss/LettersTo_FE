import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import type {StackParamsList} from '../../types/stackParamList';
import {Header} from '../../Components/Header';
import {ListItem, ListName} from '../../Components/MyPageList';

import {NicknameModal} from '../../Modals/NicknameModal';
import {TopicsModal} from '../../Modals/TopicsModal';
import {PersonalitiesModal} from '../../Modals/PersonalitiesModal';

import useStore from '../../Store/store';
import {LocationModal} from '../../Modals/LocationModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<StackParamsList, 'MyPage'>;

export function MyPage({navigation}: Props) {
  const [isNicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [isTopicsModalVisible, setTopicsModalVisible] = useState(false);
  const [isPersonalitiesModalVisible, setPersonalitiesModalVisible] =
    useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);

  const store = useStore();

  function logout() {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    store.setIsLoggedIn(false);
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

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'MY'} />
      <View style={styles.nickname}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../Assets/userIcon.png')}
            style={{height: 20, width: 20, marginRight: 4}}
          />
          <Text style={styles.nicknameText}>{store.userInfo.nickname}</Text>
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
