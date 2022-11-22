import React, {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackParamsList} from '../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {getPublicLetters} from '../../APIs/letter';
import {PublicLetters} from '../../types/types';
import {PublicLetterItem} from './PublicLetterItem';
import {EnvelopeModal} from '../../Modals/EnvelopeModal';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import useStore from '../../Store/store';

// const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

type Props = NativeStackScreenProps<StackParamsList, 'Home'>;

export function Home({navigation}: Props) {
  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const {setIsLoggedIn, userInfo} = useStore();

  type ColorType = {
    [key: string]: string;
  };
  const COLORS: ColorType = {
    PINK: 'rgba(255, 68, 204, 0.25)', // #FFCCEE
    ORANGE: 'rgba(255, 130, 68, 0.25)', // #FFDDCC
    YELLOW: 'rgba(255, 224, 68, 0.25)', // #FFF7CC
    LIGHTGREEN: 'rgba(174, 248, 26, 0.25)', // #EDFDCE
    TEAL: 'rgba(68, 255, 193, 0.25)', // #CCFFEE
    LIGHTBLUE: 'rgba(68, 210, 255, 0.25)', // #CCF3FF
    BLUE: 'rgba(68, 130, 255, 0.25)', // #CCDDFF
    PURPLE: 'rgba(170, 117, 255, 0.25)', // #E0CCFF
    LIGHTPURPLE: 'rgba(226, 168, 255, 0.25)', // #EECCFF
  };

  type StampType = {
    [key: number]: any;
  };
  const STAMPS: StampType = {
    1: require('../../Assets/1062.jpg'),
    237: require('../../Assets/237.jpg'),
    1003: require('../../Assets/1003.jpg'),
    1056: require('../../Assets/1056.jpg'),
    1062: require('../../Assets/1062.jpg'),
  };

  // 공개 편지 목록
  const [publicLetters, setPublicLetters] = useState<PublicLetters | []>([]);
  const [currentCursor, setCurrentCursor] = useState<number>();
  const getPublicLettersInit = () => {
    try {
      getPublicLetters().then(publicLettersData => {
        const {content, cursor} = publicLettersData;
        setPublicLetters(content);
        setCurrentCursor(cursor);
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getPublicLettersInit();
  }, []);

  // 우표 개수
  const [stampQuantity, setStampQuantity] = useState<number>();
  useEffect(() => {
    setStampQuantity(userInfo?.stampQuantity);
  }, [userInfo]);

  // 스크롤 시 y 위치 저장
  const [currentPositionY, setCurrentPositionY] = useState<Number>(0);
  const handleScroll = (event: any) => {
    const positionY = event.nativeEvent.contentOffset.y;
    setCurrentPositionY(positionY);
  };

  // 맨 상단으로 스크롤
  const publicLetterListRef = React.useRef<FlatList>(null);
  const scrollToTop = () => {
    publicLetterListRef.current?.scrollToIndex({animated: true, index: 0});
  };

  // 무한 스크롤
  const handleEndReached = () => {
    if (currentCursor) {
      try {
        getPublicLetters(currentCursor).then(publicLettersData => {
          const {content, cursor} = publicLettersData;
          const updatedArray = [...publicLetters].concat(content);
          setPublicLetters(updatedArray);
          setCurrentCursor(cursor);
        });
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  // 새로고침
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    try {
      getPublicLetters().then(publicLettersData => {
        const {content, cursor} = publicLettersData;
        setPublicLetters(content);
        setCurrentCursor(cursor);
        setRefreshing(false);
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // 봉투 열기
  const [selectedItem, setSelectedItem] = useState({});
  const [isEnvelopeModalVisible, setEnvelopeModalVisible] = useState(false);
  const onOpenPublicLetter = (item: any) => {
    setSelectedItem(item);
    setEnvelopeModalVisible(true);
  };

  // 편지 조회
  const goToReadLetter = (id: number) => {
    navigation.navigate('ReadLetter', {id});
  };

  // 내 사서함
  const goToLetterBox = () => {
    navigation.push('LetterBoxList');
  };

  async function goToMyPage() {
    navigation.navigate('MyPage');
  }

  function goToLetterEditor() {
    navigation.navigate('LetterEditor');
  }

  // cold case
  const Empty = () => (
    <View style={styles.emptyArea}>
      <Image
        source={require('../../Assets/no_data.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>
        잘못된 접근/네트워크연결확인{'\n'}잠시 후 다시 시도해주세요.
      </Text>
      <Pressable style={styles.emptyBtn} onPress={handleRefresh}>
        <LinearGradient
          colors={['#FF6ECE', '#FF3DBD']}
          style={styles.emptyBtnBg}>
          <Text style={styles.emptyBtnText}>다시 시도</Text>
          <Image
            source={require('../../Assets/refresh.png')}
            style={styles.emptyBtnIcon}
          />
        </LinearGradient>
      </Pressable>
    </View>
  );

  return (
    <LinearGradient
      colors={['white', '#FFFFCC']}
      locations={[0.8, 1]}
      style={styles.container}>
      {/* <SafeAreaView style={styles.container}> */}
      <LinearGradient
        colors={['#FFCCEE', 'rgba(255, 255, 255, 0)']}
        locations={[0.1, 1]}
        style={[styles.header, {paddingVertical: SAFE_AREA_TOP}]}>
        <View style={styles.headerInner}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={0.7} style={[styles.headerButton]}>
              <Image
                source={require('../../Assets/alert_off.png')}
                style={[styles.icon, {width: 28, height: 28}]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.headerButton, {marginLeft: 12}]}>
              <Image
                source={require('../../Assets/numberStamps.png')}
                style={[styles.icon, {width: 24, height: 24, marginLeft: -3}]}
              />
              <View style={styles.stampArea}>
                <Text
                  style={styles.stampText}
                  numberOfLines={1}
                  ellipsizeMode="clip">
                  22
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={goToMyPage}>
            <Image
              source={require('../../Assets/menu.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <FlatList
        ref={publicLetterListRef}
        style={styles.list}
        ListEmptyComponent={Empty}
        onScroll={handleScroll}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={publicLetters}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          const {
            id,
            title,
            fromNickname,
            fromAddress,
            topics,
            personalities,
            paperColor,
            stampId,
          } = item;
          const isFirst: boolean = index === 0;
          const isLast: boolean = index === publicLetters.length - 1;
          const cardAngle = [-5, 5, 5, -5, 15, 5];
          return (
            <View
              style={[
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
                onOpenPublicLetter={() =>
                  onOpenPublicLetter({
                    ...item,
                    paperColor: COLORS[paperColor],
                    stampSource: STAMPS[stampId],
                  })
                }
                style={[
                  index % 2 === 0
                    ? {left: '27.7%', marginTop: -36}
                    : {left: '-6.4%', marginTop: -152},
                  {transform: [{rotate: `${cardAngle[index % 6]}deg`}]},
                ]}
                alignType={'LEFT'}
              />
            </View>
          );
        }}
      />
      <View style={styles.tabBottom}>
        <View style={styles.tabArea}>
          <Pressable disabled>
            <View style={styles.tabActive}>
              <Image
                source={require('../../Assets/triangle.png')}
                style={[styles.triangle, {right: '100%'}]}
              />
              <Text style={styles.tabActiveText}>편지탐색</Text>
            </View>
          </Pressable>
          <Pressable onPress={goToLetterBox}>
            <View style={styles.tabInactive}>
              <Image
                source={require('../../Assets/triangle.png')}
                style={[styles.triangle, {left: 0, transform: [{scaleX: -1}]}]}
              />
              <Text style={styles.tabInactiveText}>내 사서함</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.floatArea}>
        {currentPositionY > 0 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.btn, styles.btnPrimary]}
            onPress={scrollToTop}>
            <Image
              source={require('../../Assets/top.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.btn, styles.btnPrimary]}
            onPress={handleRefresh}>
            <Image
              source={require('../../Assets/refresh.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.btn, styles.btnSecondary]}
          onPress={goToLetterEditor}>
          <Image
            source={require('../../Assets/write.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <EnvelopeModal
        letter={selectedItem}
        isModalVisible={isEnvelopeModalVisible}
        setModalVisible={setEnvelopeModalVisible}
        onOpenLetter={goToReadLetter}
      />
      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator> */}
      {/* </SafeAreaView> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {position: 'absolute', zIndex: 10, top: 0, left: 0, width: '100%'},
  headerInner: {
    position: 'relative',
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerButton: {
    position: 'relative',
    width: 28,
    height: 28,
    justifyContent: 'center',
  },
  stampArea: {
    position: 'absolute',
    left: 9,
    bottom: -2,
    height: 16,
    backgroundColor: '#0000CC',
    borderRadius: 8,
  },
  stampText: {
    fontFamily: 'Galmuri11-Bold',
    fontSize: 10,
    color: 'white',
    lineHeight: 15,
    paddingHorizontal: 4,
  },
  list: {marginTop: 30},
  tabBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 37,
    backgroundColor: '#0000CC',
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
    left: 1,
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
  floatArea: {position: 'absolute', right: 24, bottom: 100},
  btn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderRadius: 24,
  },
  btnPrimary: {backgroundColor: '#0000CC'},
  btnSecondary: {
    backgroundColor: '#FFFFCC',
    borderWidth: 1,
    borderColor: '#0000CC',
  },
  triangle: {position: 'absolute', bottom: 0, width: 4, height: 5},
  icon: {width: 28, height: 28},
  emptyArea: {
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {width: 100, height: 100},
  emptyText: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Galmuri11',
    fontSize: 14,
    lineHeight: 25,
    color: '#0000CC',
  },
  emptyBtn: {
    overflow: 'hidden',
    height: 28,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#FF44CC',
    borderRadius: 10,
  },
  emptyBtnBg: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 6,
    paddingLeft: 12,
  },
  emptyBtnText: {
    fontFamily: 'Galmuri11',
    fontSize: 13,
    color: 'white',
    marginBottom: 2,
  },
  emptyBtnIcon: {width: 20, height: 20, marginLeft: 2},
});
