import React, {useState, useEffect} from 'react';
import useStore from '../../Store/store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {getPublicLetters} from '../../APIs/letter';
import {PublicLetter, PublicLetters} from '../../types/types';
import {PublicLetterItem} from '../../Components/PublicLetterItem';
import {EnvelopeModal} from '../../Modals/EnvelopeModal';
import {SCREEN_HEIGHT} from '../../Constants/screen';

type Props = {
  navigation: NativeStackNavigationProp<StackParamsList, 'Main', undefined>;
};

export function Home({navigation}: Props) {
  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();
  const {userInfo} = useStore();

  // 공개 편지 목록
  const [publicLetters, setPublicLetters] = useState<PublicLetters | []>([]);
  const [currentCursor, setCurrentCursor] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  const getPublicLettersInit = () => {
    try {
      getPublicLetters().then(data => {
        const {content, cursor} = data;
        setPublicLetters(content);
        setCurrentCursor(cursor);
        setLoading(false);
      });
    } catch (error: any) {
      console.error(error.message);
      Alert.alert('error', error.message);
    }
  };

  useEffect(() => {
    getPublicLettersInit();
  }, []);

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
        getPublicLetters(currentCursor).then(data => {
          const {content, cursor} = data;
          const updatedArray = [...publicLetters].concat(content);
          setPublicLetters(updatedArray);
          setCurrentCursor(cursor);
        });
      } catch (error: any) {
        console.error(error.message);
        Alert.alert('error', error.message);
      }
    }
  };

  // 새로고침
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    try {
      getPublicLetters().then(data => {
        const {content, cursor} = data;
        setPublicLetters(content);
        setCurrentCursor(cursor);
        setRefreshing(false);
      });
    } catch (error: any) {
      console.error(error.message);
      Alert.alert('error', error.message);
    }
  };

  // 봉투 열기
  const [selectedItem, setSelectedItem] = useState<PublicLetter>();
  const [isEnvelopeModalVisible, setEnvelopeModalVisible] = useState(false);
  const onOpenEnvelopeModal = (item: PublicLetter) => {
    setSelectedItem(item);
    setEnvelopeModalVisible(true);
  };

  // 편지 조회
  const goToReadLetter = (id: number) => {
    navigation.navigate('ReadLetter', {id, to: 'PUBLIC'});
  };

  const goToMyPage = () => {
    navigation.navigate('MyPage');
  };

  const goToLetterEditor = () => {
    navigation.navigate('LetterEditor');
  };

  const goToNotification = () => {
    navigation.navigate('Notifications');
  };

  const goToStampHistory = () => {
    navigation.navigate('StampHistory');
  };

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

  const Loading = () => (
    <View
      style={{
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );

  return (
    <LinearGradient
      colors={['white', '#FFFFCC']}
      locations={[0.8, 1]}
      style={styles.container}>
      {/* <SafeAreaView style={styles.container}> */}
      <StatusBar barStyle={'dark-content'} />
      <LinearGradient
        colors={['#FFCCEE', 'rgba(255, 255, 255, 0)']}
        locations={[0, 1]}
        style={[styles.header, {paddingVertical: SAFE_AREA_TOP}]}>
        <View style={styles.headerInner}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={0.7} onPress={goToNotification}>
              <Image
                source={require('../../Assets/alert_off.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={goToStampHistory}
              style={[styles.headerButton, {marginLeft: 12, width: 40}]}>
              <Image
                source={require('../../Assets/numberStamps.png')}
                style={{width: 24, height: 24, marginLeft: -3}}
              />
              <View style={styles.stampArea}>
                <Text
                  style={styles.stampText}
                  numberOfLines={1}
                  ellipsizeMode="clip">
                  {userInfo && userInfo.stampQuantity > 999
                    ? '999+'
                    : userInfo?.stampQuantity}
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
        ListEmptyComponent={loading ? Loading : Empty}
        onScroll={handleScroll}
        onEndReached={handleEndReached}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={publicLetters}
        contentContainerStyle={{paddingVertical: SAFE_AREA_TOP}}
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
                isFirst && {paddingTop: 110},
                isLast && {paddingBottom: 60},
              ]}>
              <PublicLetterItem
                id={id}
                title={`${title}`}
                fromNickname={fromNickname}
                fromAddress={fromAddress}
                topics={topics}
                personalities={personalities}
                paperColor={paperColor}
                stampId={stampId}
                alignType={'LEFT'}
                onOpenLetter={() => onOpenEnvelopeModal(item)}
                style={[
                  index % 2 === 0
                    ? {left: '26%', marginTop: -36}
                    : {left: '-6%', marginTop: -152},
                  {
                    transform: [
                      {
                        rotate: `${cardAngle[index % 6]}deg`,
                      },
                    ],
                  },
                ]}
              />
            </View>
          );
        }}
      />
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
      {selectedItem && (
        <EnvelopeModal
          type="PUBLIC"
          data={selectedItem}
          isModalVisible={isEnvelopeModalVisible}
          setModalVisible={setEnvelopeModalVisible}
          onOpenLetter={() => goToReadLetter(selectedItem.id)}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    width: '100%',
    height: 160,
  },
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
    paddingHorizontal: 4,
    backgroundColor: '#0000CC',
    borderRadius: 8,
  },
  stampText: {
    fontFamily: 'Galmuri11-Bold',
    fontSize: 10,
    color: 'white',
    lineHeight: 15,
  },
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
