import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamsList} from '../../types/stackParamList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../Components/Headers/Header';
import {ModalBlur} from '../../Modals/ModalBlur';
import {AccountDeleteModal} from '../../Modals/AccountDeleteModal';

type Props = NativeStackScreenProps<StackParamsList, 'AccountDelete'>;

export function AccountDelete({navigation}: Props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    return setModalVisible(true);
  };

  const hideModal = () => {
    return setModalVisible(false);
  };

  const goback = () => {
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'탈퇴하기'} />
      <View style={styles.warning}>
        <Image
          source={require('../../Assets/warning.png')}
          style={styles.warningImage}
        />
        <Text style={styles.warningText}>정말 탈퇴하시려면 아래 내용을</Text>
        <Text style={styles.warningText}>한번 더 확인해주세요.</Text>
      </View>
      <View style={styles.notice1}>
        <Text style={styles.notice}>【탈퇴 시 계정이 사라져요】</Text>
        <Text style={styles.noticeDesc}>
          탈퇴 후 동일 소셜 로그인으로 가입해도 이전 편지내역
        </Text>
        <Text style={styles.noticeDesc}>및 연결은 불가능해요.</Text>
      </View>
      <View style={styles.notice2}>
        <Text style={styles.notice}>【탈퇴 전 확인하세요】</Text>
        <Text style={styles.noticeDesc}>
          탈퇴 시 지급 및 구입한 우표는 모두 사라져요.
        </Text>
        <Text style={styles.noticeDesc}>
          탈퇴 시 개인정보가 삭제되어 본인 확인이 어려워 작성
        </Text>
        <Text style={styles.noticeDesc}>
          한 편지는 편집 및 삭제가 불가능해요.
        </Text>
      </View>
      <View style={styles.buttonWrap}>
        <Pressable style={styles.buttonYes} onPress={openModal}>
          <Text
            style={{fontFamily: 'Galmuri11', fontSize: 14, color: '#0000cc'}}>
            상관없어요
          </Text>
        </Pressable>
        <Pressable style={styles.buttonNo} onPress={goback}>
          <View>
            <Text
              style={{fontFamily: 'Galmuri11', fontSize: 14, color: 'white'}}>
              한번 더 생각해볼게요
            </Text>
          </View>
        </Pressable>
      </View>

      {isModalVisible && <ModalBlur />}
      <AccountDeleteModal
        hideModal={hideModal}
        isModalVisible={isModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  warning: {flex: 1.5, justifyContent: 'center', alignItems: 'center'},
  warningImage: {height: 24, width: 24},
  warningText: {
    fontFamily: 'Galmuri11',
    color: '#E10000',
    textAlign: 'center',
    fontSize: 12,
  },
  notice1: {flex: 1, paddingHorizontal: 36},
  notice2: {flex: 2, paddingHorizontal: 36},
  notice: {
    fontFamily: 'Galmuri11',
    fontSize: 18,
    color: '#0000cc',
    marginBottom: 12,
  },
  noticeDesc: {fontFamily: 'Galmuri11', fontSize: 12, color: '#0000cc'},
  buttonWrap: {
    height: 62,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  buttonYes: {
    flex: 120,
    borderColor: '#0000cc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNo: {
    flex: 195,
    backgroundColor: '#0000cc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
