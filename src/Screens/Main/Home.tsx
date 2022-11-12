import React, { useRef, useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParamsList } from '../../types/stackParamList';
import useStore from '../../Store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, VirtualizedList, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getPublicLetters } from '../../APIs/public';
import { PublicLetters } from '../../types/types';
import { PublicLetterItem } from './PublicLetterItem';
import { EnvelopeModal } from '../../Modals/EnvelopeModal';

type Props = NativeStackScreenProps<StackParamsList, 'Home'>;

export function Home({navigation}: Props) {
  const {setIsLoggedIn} = useStore();

  type ColorType = {
    [key: string]: string;
  };
  const COLORS: ColorType = {
    PINK: 'rgba(255, 68, 204, 0.25)',
    ORANGE: 'rgba(255, 130, 68, 0.25)',
    YELLOW: 'rgba(255, 224, 68, 0.25)',
    LIGHTGREEN: 'rgba(174, 248, 26, 0.25)',
    TEAL: 'rgba(68, 255, 193, 0.25)',
    LIGHTBLUE: 'rgba(68, 210, 255, 0.25)',
    BLUE: 'rgba(68, 130, 255, 0.25)',
    PURPLE: 'rgba(170, 117, 255, 0.25)',
    LIGHTPURPLE: 'rgba(226, 168, 255, 0.25)',
  };
  
  type StampType = {
    [key: number]: any;
  }
  const STAMPS: StampType = {
    1: require('../../Assets/1062.jpg'),
    237: require('../../Assets/237.jpg'),
    1003: require('../../Assets/1003.jpg'),
    1056: require('../../Assets/1056.jpg'),
    1062: require('../../Assets/1062.jpg'),
  };

  // 공개 편지 목록
  const [publicLetters, setPublicLetters] = useState<PublicLetters | []>([]);
  const [cursor, setCursor] = useState<number>();
  useEffect(() => {
    try {
      getPublicLetters().then(publicLettersData => {
        const { content, cursor } = publicLettersData;
        setPublicLetters(content);
        setCursor(cursor);
      })
    } catch (error: any) {
      console.error(error.message);
    }
  }, []);

  // 스크롤 시 y 위치 저장
  const [positionY, setPositionY] = useState<Number>(0);
  const handleScroll = (event: any) => {
    const positionY = event.nativeEvent.contentOffset.y;
    setPositionY(positionY);
  }

  // 맨 상단으로 스크롤
  const publicLetterListRef = React.useRef<FlatList>(null);
  const scrollToTop = () => {
    publicLetterListRef.current?.scrollToIndex({ animated: true, index: 0 });
  }

  // 무한 스크롤
  const handleEndReached = () => {
    if (cursor) {
      try {
        getPublicLetters(cursor).then(publicLettersData => {
          const { content, cursor } = publicLettersData;
          const updatedArray = [...publicLetters].concat(content);
          setPublicLetters(updatedArray);
          setCursor(cursor);
        })
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }

  // 새로고침
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    try {
      getPublicLetters().then(publicLettersData => {
        const { content, cursor } = publicLettersData;
        setPublicLetters(content);
        setCursor(cursor);
        setRefreshing(false);
      })
    } catch (error: any) {
      console.error(error.message);
    }
  }

  // 봉투 열기
  const [selectedItem, setSelectedItem] = useState({});
  const [isEnvelopeModalVisible, setEnvelopeModalVisible] = useState(false);
  const onOpenPublicLetter = (item: any) => {
    setSelectedItem(item);
    setEnvelopeModalVisible(true);
  }

  // 편지 조회
  const goToReadLetter = () => {
    navigation.navigate('ReadLetter');
  }

  function logout() {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  }

  async function goToMyPage() {
    navigation.navigate('MyPage');
  }

  return (
    <LinearGradient locations={[0, 0.1, 0.8, 1]} colors={['#FFCCEE', '#FFFFFF', '#FFFFFF', '#FFFFCC']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* <Text>Home Screen</Text> */}
        {/* <Button title="로그아웃" onPress={logout} /> */}
        {/* <Button title="마이페이지" onPress={goToMyPage} /> */}

        <LinearGradient colors={['rgba(255, 204, 238, 1)', 'rgba(255, 255, 255, 0)']} style={styles.header}>
          <View style={styles.headerInner}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Image source={require('../../Assets/alert_off.png')} style={styles.icon} />
              </TouchableOpacity>
              <View style={{marginLeft: 12}}>
                <Image source={require('../../Assets/alert_on.png')} style={styles.icon} />
              </View>
            </View>
            <TouchableOpacity>
              <Image source={require('../../Assets/menu.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <FlatList
          ref={publicLetterListRef}
          onScroll={handleScroll}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          data={publicLetters}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => {
            const { id, title, fromNickname, fromAddress, topics, personalities, paperColor, stampId } = item;
            const isFirst: boolean = index === 0;
            const isLast: boolean = index === publicLetters.length - 1;
            const cardAngle = [-5, 5, 5, -5, 15, 5];
            return (
              <View style={[
                isFirst && {paddingTop: 116},
                isLast && {paddingBottom: 60},
              ]}>
                <PublicLetterItem
                  id={id}
                  title={title}
                  fromNickname={fromNickname}
                  fromAddress={fromAddress}
                  topics={topics}
                  personalities={personalities}
                  paperColor={COLORS[paperColor]}
                  stampSource={STAMPS[stampId]}
                  onOpenPublicLetter={() => onOpenPublicLetter({
                    ...item,
                    paperColor: COLORS[paperColor],
                    stampSource: STAMPS[stampId],
                  })}
                  style={[
                    index % 2 === 0 ? {left: '27.7%', marginTop: -36} : {left: '-6.4%', marginTop: -152},
                    {transform: [{ rotate: `${cardAngle[index % 6]}deg` }]}
                  ]}
                />
              </View>
            )
          }}
        />
        <View style={styles.tabBottom}>
          <View style={styles.tabArea}>
            <TouchableOpacity>
              <View style={styles.tabActive}>
                <Image source={require('../../Assets/triangle.png')} style={[styles.triangle, {right: '100%'}]} />
                <Text style={styles.tabActiveText}>편지탐색</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.tabInactive}>
                <Image source={require('../../Assets/triangle.png')} style={[styles.triangle, {left: 0, transform: [{scaleX: -1}]}]} />
                <Text style={styles.tabInactiveText}>내 사서함</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.floatArea}>
          {positionY > 0
            ? <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={scrollToTop}>
                <Image source={require('../../Assets/top.png')} style={styles.icon} />
              </TouchableOpacity>
            : <TouchableOpacity style={[styles.btn, styles.btnPrimary]}>
                <Image source={require('../../Assets/refresh.png')} style={styles.icon} />
              </TouchableOpacity>
          }
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]}>
            <Image source={require('../../Assets/write.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <EnvelopeModal
          letter={selectedItem}
          isModalVisible={isEnvelopeModalVisible}
          setModalVisible={setEnvelopeModalVisible}
          onOpenLetter={goToReadLetter}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {position: 'absolute', zIndex: 10, width: '100%'},
  headerInner: {height: 52, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16},
  tabBottom: {width: '100%', height: 37, backgroundColor: '#0000CC'},
  tabArea: {position: 'absolute', bottom: '100%', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'flex-end'},
  tabActive: {width: 164, height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0000CC', borderTopLeftRadius: 10, borderTopRightRadius: 10},
  tabInactive: {width: 164, height: 38, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderBottomWidth: 0, borderColor: '#0000CC', borderTopLeftRadius: 10, borderTopRightRadius: 10},
  tabActiveText: {fontFamily: 'Galmuri11', fontSize: 15, color:'#FFFFFF'},
  tabInactiveText: {fontFamily: 'Galmuri11', fontSize: 15, color:'#0000CC'},
  floatArea: {position: 'absolute', right: 24, bottom: 100},
  btn: {width: 48, height: 48, alignItems: 'center', justifyContent: 'center', marginTop: 8, borderRadius: 24},
  btnPrimary: {backgroundColor: '#0000CC'},
  btnSecondary: {backgroundColor: '#FFFFCC', borderWidth: 1, borderColor: '#0000CC'},
  triangle: {position: 'absolute', bottom: 0, width: 4, height: 5},
  icon: {width: 28, height: 28}
});
