import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  Animated,
  ScrollView,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Letter} from '../types/types';

type Props = {
  data: any;
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EnvelopeModal = ({data, isModalVisible, setModalVisible}: Props) => {  

  /* useEffect(() => {
    console.log('EnvelopeModal !!!!!!!!', data);
  }, [data]); */
  
  const { title, stampSrc, fromInfo, topic, personality, color } = data;

  const hideModal = () => {
    setModalVisible(false);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
      <View style={styles.container}>
        <LinearGradient colors={['rgba(0, 0, 204, 0)', 'rgba(0, 0, 204, 0.5)']} style={styles.modalBg}>
          <Pressable onPress={hideModal} style={styles.closeButton}>
            <Image
              source={require('../Assets/close_white.png')}
              style={styles.closeIcon}
            />
          </Pressable>
          <View style={styles.cardTop}>
            <View style={{flex: 1, backgroundColor: color}} />
          </View>
          <View style={styles.cardItem}>
            <LinearGradient locations={[0, 0.5]} colors={[color, 'white']} style={{flex: 1}}>
              {/* 편지 제목 */}
              <Text style={styles.title}>⌜{title || '무제'}⌟︎︎</Text>
              {/* 보내는 이 */}
              <View style={styles.fromArea}>
                <Image style={styles.fromImg} source={require('../Assets/from.png')} />
                <Text style={styles.fromText}>{`${fromInfo?.nickname}, ${fromInfo?.city}`}</Text>
              </View>
              {/* 우표 */}
              <ImageBackground source={require('../Assets/bg_stamp.png')} style={styles.stampArea}>
                <Image style={styles.stampImg} source={stampSrc} />
              </ImageBackground>
              {/* 관심사, 성향 */}
              <View style={styles.tagArea}>
                <ScrollView horizontal style={styles.tagList}>
                  {topic?.map((item:string, idx:number) => (
                    <Text key={idx} style={styles.tagItem}>{item}</Text>
                  ))}
                </ScrollView>
                <ScrollView horizontal style={styles.tagList}>
                  {personality?.map((item:string, idx:number) => (
                    <Text key={idx} style={styles.tagItem}>{item}</Text>
                  ))}
                </ScrollView>
              </View>
            </LinearGradient>
          </View>
          <Pressable style={styles.openButton}>
            <LinearGradient colors={['rgba(255, 110, 206, 1)', 'rgba(255, 61, 189, 1)']} style={{flex: 1}}>
              <Text style={styles.openText}>열어보기</Text>
            </LinearGradient>
          </Pressable>
        </LinearGradient>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'rgba(0, 0, 204, 0.7)'},
  modalBg: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  closeButton: {position: 'absolute', top: 12, left: 16},
  closeIcon: {width: 28, height: 28},
  cardTop: {width: '78.7%', height: 8, marginBottom: -1, backgroundColor: 'white', borderWidth: 1, borderBottomWidth: 0, borderColor: '#0000CC', borderTopRightRadius: 10, borderTopLeftRadius: 10},
  cardItem: {overflow: 'hidden', width: '78.7%', height: 206, backgroundColor: 'white', borderWidth: 1, borderTopWidth: 0, borderColor: '#0000CC', borderBottomRightRadius: 10, borderBottomLeftRadius: 10},
  title: {width: 173, marginTop: 10, marginLeft: 16, fontFamily: 'Galmuri11', fontSize: 13, lineHeight: 23, color: '#0000CC'},
  fromArea: {position: 'absolute', bottom: 106, right: 106},
  fromImg: {width: 48, height: 22},
  fromText: {marginLeft: 16, fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC'},
  stampArea: {position: 'absolute', top: 16, right: 16, padding: 7},
  stampImg: {width:60, height:76},
  tagArea: {position: 'absolute', bottom: 16, right: 16, left: 16},
  tagList: {flexDirection: 'row', marginTop: 8},
  tagItem: {height: 24, lineHeight: 24, paddingRight: 3, paddingLeft: 6, marginRight: 4, fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC', backgroundColor: 'rgba(0, 0, 204, 0.05)', borderWidth: 1, borderColor: '#0000CC'},
  openButton: {overflow: 'hidden', width: '78.7%', height: 52, marginTop: 16, borderWidth: 1, borderColor: '#FF6ECE', borderRadius: 10},
  openText: {fontFamily: 'Galmuri11', lineHeight: 48, textAlign: 'center'}
});