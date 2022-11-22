import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Modal,
  Image,
  ImageBackground,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useGesture} from '../Hooks/Hardware/useGesture';

interface EnvelopeModalProps {
  letter: any;
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenLetter: (id: number) => void;
}

export const EnvelopeModal = ({
  letter,
  isModalVisible,
  setModalVisible,
  onOpenLetter,
}: EnvelopeModalProps) => {
  const {
    id,
    title,
    fromAddress,
    fromNickname,
    topics,
    personalities,
    paperColor,
    stampSource,
  } = letter;

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  // 애니메이션
  const moveAnim = useRef(new Animated.ValueXY()).current;
  const moveUp = Animated.timing(moveAnim, {
    toValue: {x: 0, y: -9},
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.elastic(2),
  });

  // 뜯어서 편지 열어보기
  const openLetter = () => {
    moveUp.start(() => {
      onOpenLetter(id);
      setTimeout(hideModal, 0);
    });
  };

  const {onSwipeXStart, onSwipteXEnd} = useGesture();

  // 모달 닫기
  const hideModal = () => {
    setModalVisible(false);
    moveUp.reset();
  };

  useEffect(() => {
    moveUp.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={hideModal}>
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(0, 0, 204, 0)', 'rgba(0, 0, 204, 0.5)']}
          style={styles.modalBg}>
          {/* 모달 닫기 버튼 */}
          <Pressable
            style={[styles.closeButton, {marginTop: SAFE_AREA_TOP}]}
            onPress={hideModal}>
            <Image
              source={require('../Assets/close_white.png')}
              style={styles.closeIcon}
            />
          </Pressable>
          {/* 뜯어서 편지 열어보기 */}
          <Pressable style={styles.openArea} onPress={openLetter}>
            <Text style={styles.openText}>뜯어서 편지 열어보기</Text>
            <Image
              source={require('../Assets/arrow_long.png')}
              style={styles.openArrow}
              resizeMode="contain"
            />
          </Pressable>
          <View style={styles.envelope}>
            <Animated.View
              style={[styles.cardTop, {transform: [{translateY: moveAnim.y}]}]}>
              <View style={{flex: 1, backgroundColor: paperColor}} />
              <View style={styles.dash_bottom} />
            </Animated.View>
            <View style={[styles.cardItem]}>
              <View style={[styles.dash_top]} />
              <LinearGradient
                onStartShouldSetResponder={() => true}
                onResponderStart={event => {
                  onSwipeXStart(
                    event.nativeEvent.locationX,
                    event.nativeEvent.timestamp,
                  );
                }}
                onResponderEnd={event => {
                  onSwipteXEnd(
                    event.nativeEvent.locationX,
                    event.nativeEvent.timestamp,
                    150,
                    1000,
                    openLetter,
                  );
                }}
                locations={[0, 0.5]}
                colors={[paperColor, 'white']}
                style={{flex: 1}}>
                <Text style={styles.title}>⌜{title || '무제'}⌟︎︎</Text>
                <View style={styles.fromArea}>
                  <Image
                    style={styles.fromImg}
                    source={require('../Assets/from.png')}
                  />
                  <Text
                    style={
                      styles.fromText
                    }>{`${fromNickname}, ${fromAddress}`}</Text>
                </View>
                <ImageBackground
                  source={require('../Assets/bg_stamp.png')}
                  style={styles.stampArea}>
                  <Image style={styles.stampImg} source={stampSource} />
                </ImageBackground>
                <View style={styles.tagArea}>
                  <ScrollView
                    horizontal
                    alwaysBounceHorizontal={false}
                    style={styles.tagList}>
                    {topics?.map((item: string, idx: number) => (
                      <Text key={idx} style={styles.tagItem}>
                        {item}
                      </Text>
                    ))}
                  </ScrollView>
                  <ScrollView
                    horizontal
                    alwaysBounceHorizontal={false}
                    style={styles.tagList}>
                    {personalities?.map((item: string, idx: number) => (
                      <Text key={idx} style={styles.tagItem}>
                        {item}
                      </Text>
                    ))}
                  </ScrollView>
                </View>
              </LinearGradient>
            </View>
          </View>
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
  openArea: {position: 'absolute', top: '35%', alignItems: 'center'},
  openText: {fontFamily: 'Galmuri11', fontSize: 15, color: 'white'},
  openArrow: {width: 144, height: 10, marginTop: 16},
  envelope: {position: 'absolute', bottom: '30%', width: '78.7%'},
  dash_bottom: {
    position: 'absolute',
    bottom: -1,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#0000CC',
  },
  dash_top: {
    position: 'absolute',
    top: -1,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#0000CC',
  },
  cardTop: {
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    height: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#0000CC',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardItem: {
    position: 'relative',
    overflow: 'hidden',
    height: 206,
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#0000CC',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    width: 173,
    marginTop: 10,
    marginLeft: 16,
    fontFamily: 'Galmuri11',
    fontSize: 13,
    lineHeight: 23,
    color: '#0000CC',
  },
  fromArea: {position: 'absolute', bottom: 106, left: 16},
  fromImg: {width: 48, height: 22},
  fromText: {
    marginLeft: 16,
    fontFamily: 'Galmuri11',
    fontSize: 12,
    color: '#0000CC',
  },
  stampArea: {position: 'absolute', top: 16, right: 16, padding: 7},
  stampImg: {width: 60, height: 76},
  tagArea: {position: 'absolute', bottom: 16, right: 16, left: 16},
  tagList: {flexDirection: 'row', marginTop: 8},
  tagItem: {
    height: 24,
    lineHeight: 24,
    paddingRight: 3,
    paddingLeft: 6,
    marginRight: 4,
    fontFamily: 'Galmuri11',
    fontSize: 12,
    color: '#0000CC',
    backgroundColor: 'rgba(0, 0, 204, 0.05)',
    borderWidth: 1,
    borderColor: '#0000CC',
  },
});
