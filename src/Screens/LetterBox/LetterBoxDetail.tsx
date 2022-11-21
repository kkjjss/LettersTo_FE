import React, {useRef, useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackParamsList} from '../../types/stackParamList';
import {StyleSheet, View, Text, Image, Pressable, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constants/screen';
import {LetterBoxInfo} from '../../types/types';
import {getLetterBoxInfo} from '../../APIs/letterBox';
import {Header} from '../../Components/Headers/Header';

type Props = NativeStackScreenProps<StackParamsList, 'LetterBoxDetail'>;

export function LetterBoxDetail({route, navigation}: Props) {

  const { id } = route.params;

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  // 메인 (편지탐색)
  const goHome = () => {
    navigation.push('Home');
    // navigation.dispatch(jumpToAction);
  };

  const [info, setInfo] = useState<LetterBoxInfo>({
    fromNickname: 'da99ydo99y',
    fromAddress: '부산, 북구',
    startDate: "2022-11-21T14:35:59.395Z",
    topics: ['음악', '여행', '자기계발', '커리어', '독서'],
    personalities: ['신중한', '세심한', '수줍은', '어쩌구한', '저쩌구한', '저절씨구한'],
  });

  useEffect(() => {
    console.log('route');
    try {
      getLetterBoxInfo(id).then(info => {
        setInfo(info);
      })
    } catch (error: any) {
      console.error(error.message);
    }
  }, [route]);

  useEffect(() => {
    console.log('navigation');
  }, [navigation]);

  useEffect(() => {
    // console.log('startDate', info.startDate, typeof info.startDate);
    console.log('init');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title={`${info.fromNickname}와의 사서함`}
        color="white"
        style={{backgroundColor: '#0000CC', paddingTop: 0}}
      />
      <View style={styles.infoArea}>
        <Text style={styles.fromNickname}>{info.fromNickname}</Text>
        <Text style={styles.fromAddress}>{info.fromAddress}</Text>
        <Text style={styles.startDate}>{info.startDate}일째 인연</Text>
      </View>
      <View style={styles.tabBottom}>
        <View style={styles.tabArea}>
          <Pressable onPress={goHome}>
            <View style={styles.tabInactive}>
              <Text style={styles.tabInactiveText}>편지탐색</Text>
              <Image
                source={require('../../Assets/triangle.png')}
                style={[styles.triangle, {right: 0}]}
              />
            </View>
          </Pressable>
          <Pressable disabled>
            <View style={styles.tabActive}>
              <Image
                source={require('../../Assets/triangle.png')}
                style={[styles.triangle, {left: '100%', transform: [{scaleX: -1}]}]}
              />
              <Text style={styles.tabActiveText}>내 사서함</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  infoArea: {},
  fromNickname: {fontFamily: 'Galmuri11-Bold', fontSize: 14, color: '#0000CC'},
  fromAddress: {fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC'},
  startDate: {fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC'},
  tabBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 37,
    backgroundColor: '#0000CC'
  },
  tabArea: {
    position: 'absolute',
    left: 0,
    bottom: '100%',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tabActive: {
    position: 'relative',
    right: 1,
    width: 164,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000CC',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabInactive: {
    width: 164,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#0000CC',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabActiveText: {fontFamily: 'Galmuri11', fontSize: 15, color: 'white'},
  tabInactiveText: {fontFamily: 'Galmuri11', fontSize: 15, color: '#0000CC'},
  triangle: {position: 'absolute', bottom: 0, width: 4, height: 5},
});