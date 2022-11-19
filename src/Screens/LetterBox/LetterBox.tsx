import React, {useRef, useState, useEffect} from 'react';
// import {TabActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackParamsList} from '../../types/stackParamList';
import {StyleSheet, View, Text, Image, Pressable, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Constants/screen';
import {LetterBoxes} from '../../types/types';
import {getLetterBoxes} from '../../APIs/letterBox';

type Props = NativeStackScreenProps<StackParamsList, 'LetterBox'>;

export function LetterBox({navigation}: Props) {

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const letterBoxesData = [
    {fromMemberId: 0, fromMemberNickname: 'Minju', new: true},
    {fromMemberId: 1, fromMemberNickname: 'Yuri', new: false},
    {fromMemberId: 2, fromMemberNickname: 'Cherry', new: true},
  ];

  // 내 사서함 목록
  const [letterBoxes, setLetterBoxes] = useState<LetterBoxes>([]);
  const getLetterBoxesInit = () => {
    try {
      getLetterBoxes().then(letterBoxesData => {
        setLetterBoxes(letterBoxesData);
      })
    } catch (error: any) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    console.log('LetterBox');

    getLetterBoxesInit();
    // setLetterBoxes(letterBoxesData);
  }, []);

  // const jumpToAction = TabActions.jumpTo('Home');

  // 메인 (편지탐색)
  const goHome = () => {
    navigation.push('Home');
    // navigation.dispatch(jumpToAction);
  };

  // cold case
  const Empty = () => (
    <View style={styles.emptyArea}>
      <Image
        source={require('../../Assets/no_data.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>아직 주고받은 편지가 없어요!{"\n"}답장할 편지를 찾아볼까요?</Text>
      <Pressable style={styles.emptyBtn} onPress={goHome}>
        <LinearGradient colors={['#FF6ECE', '#FF3DBD']} style={styles.emptyBtnBg}>
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
            <TouchableOpacity activeOpacity={0.7}>
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
            <View style={[
              styles.listItem,
              isFirst && {marginTop: 50},
              isLast && {marginBottom: 100}
            ]}>
              <View style={[styles.listItemIcon, {backgroundColor: COLORS[index % 9]}]}>
                <Text style={styles.listItemIconText}>{item.fromMemberNickname.substring(0, 2)}</Text>
              </View>
              <Text style={styles.listItemTitle}>{item.fromMemberNickname}와(과)의 사서함</Text>
              <View style={styles.letterArea}>
                <Image
                  source={require('../../Assets/letter_blank.png')}
                  resizeMode="contain"
                  style={[styles.letterBlank]}
                />
                {item.new &&
                  <>
                    <View style={styles.dot} />
                    <Image
                      source={require('../../Assets/letter_new.png')}
                      resizeMode="contain"
                      style={[styles.letterNew]}
                    />
                  </>
                }
              </View>
            </View>
          );
        }}
      />
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
      {/* </SafeAreaView> */}
    </LinearGradient>
  )
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
  listItemIconText: {fontWeight: '700', fontFamily: 'Galmuri11', fontSize: 13, color: '#0000CC'},
  listItemTitle: {fontFamily: 'Galmuri11', fontSize: 14, color: '#0000CC'},
  letterArea: {marginLeft: 'auto'},
  letterBlank: {width: 100, height: 10},
  letterNew: {position: 'absolute', right: 8, width: 79, height: 16},
  dot: {position: 'absolute', top: -8, right: 0, width: 4, height: 4, backgroundColor: '#FF44CC', borderRadius: 2},
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
  icon: {width: 28, height: 28},
  emptyArea: {height: SCREEN_HEIGHT, alignItems: 'center', justifyContent: 'center'},
  emptyImage: {width: 100, height: 100},
  emptyText: {marginTop: 8, textAlign: 'center', fontFamily: 'Galmuri11', fontSize: 14, lineHeight: 25, color: '#0000CC'},
  emptyBtn: {overflow: 'hidden', height: 28, marginTop: 24, borderWidth: 1, borderColor: '#FF44CC', borderRadius: 10},
  emptyBtnBg: {flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 10, paddingLeft: 12},
  emptyBtnText: {fontFamily: 'Galmuri11', fontSize: 13, color: 'white', marginBottom: 2},
  emptyBtnIcon: {width: 20, height: 20, marginLeft: 2},
});