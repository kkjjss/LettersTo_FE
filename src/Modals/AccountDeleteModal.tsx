import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import useStore from '../Store/store';
import {deleteAccount} from '../APIs/member';

type Props = {
  hideModal: () => void;
  isModalVisible: boolean;
};

export function AccountDeleteModal({hideModal, isModalVisible}: Props) {
  const {signOut} = useStore();
  const onPressDeleteAccount = async () => {
    try {
      await deleteAccount();

      await AsyncStorage.clear();

      signOut();
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <Modal
      statusBarTranslucent={true} // android
      transparent={true}
      onRequestClose={hideModal}
      visible={isModalVisible}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: 'white',
            height: 300,
            width: '80%',
            padding: 24,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Galmuri11',
                fontSize: 18,
                color: '#0000cc',
              }}>
              (´•̥ ᵔ •̥`)
            </Text>
            <Text
              style={{
                fontFamily: 'Galmuri11',
                fontSize: 18,
                color: '#0000cc',
                marginBottom: 12,
              }}>
              【정말 탈퇴하시겠어요?】
            </Text>
            <Text
              style={{
                fontFamily: 'Galmuri11',
                fontSize: 12,
                color: '#0000cc',
              }}>
              만족을 드리지 못해 죄송해요.
            </Text>
            <Text
              style={{
                fontFamily: 'Galmuri11',
                fontSize: 12,
                color: '#0000cc',
              }}>
              다시 만나뵙도록 노력할게요!
            </Text>
          </View>
          <View
            style={{
              height: 42,
              flexDirection: 'row',
            }}>
            <Pressable
              style={{
                flex: 1,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#0000cc',
                borderWidth: 1,
                marginRight: 12,
              }}
              onPress={onPressDeleteAccount}>
              <Text
                style={{
                  fontFamily: 'Galmuri11',
                  fontSize: 14,
                  color: '#0000cc',
                }}>
                탈퇴할께요
              </Text>
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                backgroundColor: '#0000cc',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#0000cc',
                borderWidth: 1,
              }}
              onPress={hideModal}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Galmuri11',
                    fontSize: 14,
                    color: 'white',
                  }}>
                  취소할께요
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
