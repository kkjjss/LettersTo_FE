import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NicknameModal = ({isModalVisible, setModalVisible}: Props) => {
  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onSwipeComplete={hideModal}
      swipeDirection={['down']}
      onBackdropPress={hideModal}
      style={{margin: 0, justifyContent: 'flex-end'}}>
      <View
        style={{
          backgroundColor: 'white',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderColor: '#0000cc',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 12,
            marginHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Pressable onPress={hideModal}>
            <Image
              source={require('../assets/close.png')}
              style={{height: 28, width: 28}}
            />
          </Pressable>
          <Text
            style={{fontFamily: 'Galmuri11', fontSize: 15, color: '#0000cc'}}>
            별명 변경
          </Text>
          <View style={{width: 28}} />
        </View>
        <Text>I am the modal content!</Text>
      </View>
    </Modal>
  );
};
