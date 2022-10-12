import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import type {StackParamsList} from '../../types';
import {Header} from '../../Components/Header';
import {ListItem, ListName} from '../../Components/MyPageList';

import {NicknameModal} from '../../Modals/NicknameModal';

type Props = NativeStackScreenProps<StackParamsList, 'MyPage'>;

export function MyPage({navigation}: Props) {
  const [isNicknameModalVisible, setNicknameModalVisible] =
    React.useState(false);

  const openNicknameModal = () => {
    setNicknameModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'MY'} />
      <View style={styles.nickname}>
        <View>
          <Text style={styles.nicknameText}>☺ 즐거운 블루치즈 123</Text>
        </View>
        <Pressable onPress={openNicknameModal}>
          <View style={styles.nicknameButton}>
            <Text style={styles.changeNicknameButton}>별명 바꾸기</Text>
          </View>
        </Pressable>
      </View>

      <View style={{margin: 24}}>
        <ListName name="내 정보" />
        <ListItem itmeName="관심사 관리" openModal={openNicknameModal} />
        <ListItem itmeName="성향 관리" openModal={openNicknameModal} />
        <ListItem itmeName="위치 정보 관리" openModal={openNicknameModal} />
      </View>

      <NicknameModal
        isModalVisible={isNicknameModalVisible}
        setModalVisible={setNicknameModalVisible}
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
