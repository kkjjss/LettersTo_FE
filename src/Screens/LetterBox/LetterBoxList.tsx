import React, {useState, useEffect} from 'react';
// import {TabActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {StackParamsList} from '../../types/stackParamList';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {LetterBoxes} from '../../types/types';
import {getLetterBoxes} from '../../APIs/letterBox';

type Props = {
  navigation: NativeStackNavigationProp<StackParamsList, 'Main', undefined>;
  onPressHome: () => void;
};

export function LetterBoxList({navigation, onPressHome}: Props) {
  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  // 내 사서함 목록
  const [letterBoxes, setLetterBoxes] = useState<LetterBoxes>([]);
  const getLetterBoxesInit = () => {
    try {
      getLetterBoxes().then(letterBoxesData => {
        setLetterBoxes(letterBoxesData);
      });
    } catch (error: any) {
      console.error(error.message);
      Alert.alert('error', error.message);
    }
  };
  useEffect(() => {
    console.log('LetterBox');
    // setLetterBoxes(letterBoxesData);
    getLetterBoxesInit();
  }, []);

  // 내 사서함 상세
  const goToDetail = (id: number, fromMemberId: number) => {
    navigation.push('LetterBoxDetail', {id, fromMemberId});
  };

  async function goToMyPage() {
    navigation.navigate('MyPage');
  }

  // cold case
  const Empty = () => (
    <View style={styles.emptyArea}>
      <Image
        source={require('../../Assets/no_data.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>
        아직 주고받은 편지가 없어요!{'\n'}답장할 편지를 찾아볼까요?
      </Text>
      <Pressable style={styles.emptyBtn} onPress={onPressHome}>
        <LinearGradient
          colors={['#FF6ECE', '#FF3DBD']}
          style={styles.emptyBtnBg}>
          <Text style={styles.emptyBtnText}>공개편지 보러가기</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );

  return (
    <LinearGradient
      locations={[0, 0.1, 0.8, 1]}
      colors={['#FFCCEE', 'white', 'white', '#FFFFCC']}
      style={styles.container}>
      {/* <SafeAreaView style={styles.container}> */}
      <View style={[styles.header, {marginTop: SAFE_AREA_TOP}]}>
        <View style={[styles.headerInner]}>
          <View style={{position: 'absolute', left: 16, flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={require('../../Assets/alert_off.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.pageTitle}>내 사서함</Text>
          <View style={{position: 'absolute', right: 16, flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={0.7} onPress={goToMyPage}>
              <Image
                source={require('../../Assets/menu.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.list}
        ListEmptyComponent={Empty}
        contentContainerStyle={{marginTop: SAFE_AREA_TOP}}
        data={letterBoxes}
        renderItem={({item, index}) => {
          const isFirst: boolean = index === 0;
          const isLast: boolean = index === letterBoxes.length - 1;
          const COLORS = [
            '#FFCCEE',
            '#FFDDCC',
            '#FFF7CC',
            '#EDFDCE',
            '#CCFFEE',
            '#CCF3FF',
            '#CCDDFF',
            '#E0CCFF',
            '#EECCFF',
          ];
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.listItem,
                isFirst && {marginTop: 50},
                isLast && {marginBottom: 100},
              ]}
              onPress={() => goToDetail(item.id, item.fromMemberId)}>
              <View
                style={[
                  styles.listItemIcon,
                  {backgroundColor: COLORS[index % 9]},
                ]}>
                <Text style={styles.listItemIconText}>
                  {item.fromMemberNickname.substring(0, 2)}
                </Text>
              </View>
              <Text style={styles.listItemTitle}>
                {item.fromMemberNickname}와(과)의 사서함
              </Text>
              <View style={styles.letterArea}>
                <Image
                  source={require('../../Assets/letter_blank.png')}
                  resizeMode="contain"
                  style={[styles.letterBlank]}
                />
                {item.new && (
                  <>
                    <View style={styles.dot} />
                    <Image
                      source={require('../../Assets/letter_new.png')}
                      resizeMode="contain"
                      style={[styles.letterNew]}
                    />
                  </>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  pageTitle: {fontFamily: 'Galmuri11', fontSize: 15, color: '#0000CC'},
  list: {},
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    paddingRight: 24,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0000CC',
  },
  listItemIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#0000CC',
    borderRadius: 18,
  },
  listItemIconText: {
    fontFamily: 'Galmuri11-Bold',
    fontSize: 13,
    color: '#0000CC',
  },
  listItemTitle: {fontFamily: 'Galmuri11', fontSize: 14, color: '#0000CC'},
  letterArea: {marginLeft: 'auto'},
  letterBlank: {width: 100, height: 10},
  letterNew: {position: 'absolute', top: 1, right: 8, width: 79, height: 16},
  dot: {
    position: 'absolute',
    top: -8,
    right: 0,
    width: 4,
    height: 4,
    backgroundColor: '#FF44CC',
    borderRadius: 2,
  },
  tabBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
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
    paddingRight: 10,
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
