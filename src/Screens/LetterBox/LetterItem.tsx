import React, {useEffect, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';
import {DeliveryLetter} from '../../types/types';
import {LinearGradient} from 'expo-linear-gradient';
import {GRADIENT_COLORS} from '../../Constants/letter';
import {dateFormatter} from '../../Utils/dateFormatter';

interface LetterItemProps {
  data: DeliveryLetter;
  style?: object;
}

export function LetterItem(props: LetterItemProps) {
  const {data, style} = props;
  const {
    paperColor,
    stampId,
    read,
    me,
    title,
    deliveryType,
    deliveryDate,
    toNickname,
    toAddress,
    fromNickname,
    fromAddress,
  } = data;

  type StampType = {
    [key: number]: any;
  };
  const STAMPS: StampType = {
    1: require('../../Assets/stamp_sample/1.jpg'),
    2: require('../../Assets/stamp_sample/2.jpg'),
    3: require('../../Assets/stamp_sample/3.jpg'),
    4: require('../../Assets/stamp_sample/4.jpg'),
    5: require('../../Assets/stamp_sample/5.jpg'),
    6: require('../../Assets/stamp_sample/6.jpg'),
  };

  // 애니메이션
  const moveAnim = useRef(new Animated.ValueXY()).current;
  const moveUp = Animated.timing(moveAnim, {
    toValue: {x: 0, y: 0},
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.elastic(2),
  });

  useEffect(() => {
    // console.log('data', data);
    // moveUp.start();
  }, [data]);

  const IsArrived = useMemo(() => {
    const arrivalDate = new Date(deliveryDate);
    const today = new Date();
    const result: boolean = today.getTime() > arrivalDate.getTime();
    return result;
  }, [deliveryDate]);

  const DdayText = useMemo(() => {
    const arrivalDate = new Date(deliveryDate);
    const today = new Date();
    const distance = arrivalDate.getTime() - today.getTime();
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let result = '';
    if (days) {
      result += `${days}일 `;
    }
    if (days > 0 || hours > 0) {
      result += `${hours < 10 ? `0${hours}` : hours}시간 `;
    }
    result += `${minutes < 10 ? `0${minutes}` : minutes}분 후 도착`;
    return result;
  }, [deliveryDate]);

  const ArrivedLetter = () => (
    <Pressable style={[styles.letterItem]} onPress={() => {}}>
      <LinearGradient
        locations={[0, 0.5]}
        colors={[GRADIENT_COLORS[paperColor], 'white']}
        style={[styles.background, read && {borderTopRightRadius: 0, borderTopLeftRadius: 0}]}>
        {/* 우표 */}
        {deliveryType === 'STANDARD' ? (
          <View style={styles.stampArea}>
            <ImageBackground
              source={require('../../Assets/bg_stamp.png')}
              style={styles.stampBg}
            >
              <Image style={styles.stampImg} source={STAMPS[stampId]} />
              <Image
                source={require('../../Assets/stamp_standard.png')}
                style={{width: 46, height: 17, position: 'absolute', top: 7, left: 7}}
              />
            </ImageBackground>
          </View>
        ) : deliveryType === 'EXPRESS' ? (
          <View style={styles.stampArea}>
            <ImageBackground
              source={require('../../Assets/bg_stamp.png')}
              style={[styles.stampBg, {position: 'absolute', transform: [{rotate: '10deg'}]}]} />
            <ImageBackground
              source={require('../../Assets/bg_stamp.png')}
              style={[styles.stampBg, {position: 'absolute', transform: [{rotate: '-5deg'}]}]} />
            <ImageBackground
              source={require('../../Assets/bg_stamp.png')}
              style={styles.stampBg}
            >
              <Image style={styles.stampImg} source={STAMPS[stampId]} />
              <Image
                source={require('../../Assets/stamp_express.png')}
                style={{width: 46, height: 17, position: 'absolute', top: 7, left: 7}}
              />
            </ImageBackground>
          </View>
        ) : (
          <View style={styles.stampArea}>
            <ImageBackground
              source={require('../../Assets/bg_stamp.png')}
              style={styles.stampBg}
            >
              <Image style={styles.stampImg} source={STAMPS[stampId]} />
            </ImageBackground>
          </View>
        )
        }
        <Text style={styles.title}>⌜{title || '무제'}⌟︎︎</Text>
        <View style={styles.fromArea}>
          {
            me ? (
              <>
                <Image
                  style={[styles.fromImg, {width: 25}]}
                  source={require('../../Assets/to.png')}
                />
                <Text style={styles.fromText}>{`${toNickname}, ${toAddress}`}</Text>
              </>
            ) : (
              <>
                <Image
                  style={[styles.fromImg, {width: 48}]}
                  source={require('../../Assets/from.png')}
                />
                <Text style={styles.fromText}>{`${fromNickname}, ${fromAddress}`}</Text>
              </>
            )
          }
        </View>
        <View style={{position: 'absolute', right: 16, bottom: 16, left: 16, height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 204, 0.05)'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC'}}>{fromAddress}</Text>
            <Image
              style={{width: 31, height: 7, marginHorizontal: 8, marginTop: 2}}
              resizeMode="contain"
              source={require('../../Assets/arrow.png')}
            />
            <Text style={{fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC'}}>{toAddress}</Text>
          </View>
          <Text style={{fontFamily: 'Galmuri11', fontSize: 11, color: '#0000CC', marginTop: 3}}>{dateFormatter('yyyy.mm.dd', deliveryDate)}</Text>
        </View>
      </LinearGradient>
      {read && <Image source={require('../../Assets/read.png')} style={styles.read} />}
    </Pressable>
  );
  const PendingLetter = () => (
    <View style={[styles.letterItem]}>
      <LinearGradient
        locations={[0, 0.5]}
        colors={[GRADIENT_COLORS[paperColor], 'white']}
        style={[styles.background, {alignItems: 'center'}]}>
        <View style={styles.tooltipArea}>
          <Text style={styles.tooltipText}>{me ? `${toAddress}(으)로 편지가 가고 있어요!` : `${fromAddress}에서 편지가 오고 있어요!`}</Text>
          <Image
            style={styles.tooltipTail}
            source={require('../../Assets/tooltip.png')}
          />
        </View>
        <Image
          style={{width: 118, height: 24, marginTop: 16}}
          source={require('../../Assets/pending.png')}
        />
        <Text
          style={{
            marginTop: 8,
            fontFamily: 'Galmuri11',
            fontSize: 11,
            color: '#0000CC',
          }}>
          {DdayText}
        </Text>
      </LinearGradient>
    </View>
  );

  return (
    <Animated.View
      style={[
        me ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'},
        {marginHorizontal: 16, justifyContent: 'space-between'},
        style,
        // !read && {transform: [{translateX: -40}]},
        !read && {transform: [{translateX: moveAnim.x}]},
      ]}>
      <View style={[
        {justifyContent: 'space-between', alignItems: 'center'},
        me ? {marginLeft: 12} : {marginRight: 12},
      ]}>
        <Text style={[
          {overflow: 'hidden', width: 36, height: 36, borderWidth: 1, borderColor: '#0000CC', borderRadius: 18, textAlign: 'center', lineHeight: 36, fontFamily: 'Galmuri11-Bold', fontSize: 13, color: '#0000CC', backgroundColor: me ? '#CCCCFF' : '#FFFFCC'},
        ]}>
          {me ? 'ME' : 'YOU'}
        </Text>
        <View>
          <Text
            style={{fontFamily: 'Galmuri11', fontSize: 11, color: '#0000CC'}}>
            {read ? '읽음' : '안읽음'}
          </Text>
          {!read && (
            <View
              style={{
                position: 'absolute',
                top: 3,
                right: -2,
                width: 2,
                height: 2,
                backgroundColor: '#FF44CC',
              }}
            />
          )}
        </View>
      </View>
      {IsArrived ? <ArrivedLetter /> : <PendingLetter />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  letterItem: {
    flex: 1,
    height: 212,
  },
  read: {position: 'absolute', top: 0, left: 0, width: '100%', height: 7},
  background: {
    overflow: 'hidden',
    flex: 1,
    borderWidth: 1,
    borderColor: '#0000CC',
    borderRadius: 10,
    shadowColor: '#FF6ECE',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 5,
  },
  title: {
    width: '60%',
    marginTop: 16,
    marginLeft: 16,
    fontFamily: 'Galmuri11',
    fontSize: 13,
    lineHeight: 24,
    color: '#0000CC',
  },
  stampArea: {position: 'absolute', top: 16, right: 16},
  stampBg: {width: 74, height: 90, padding: 7},
  stampImg: {width: 60, height: 76},
  tooltipArea: {height: 32, marginTop: 47, paddingHorizontal: 10, backgroundColor: '#FFFFCC', borderWidth: 1, borderColor: '#0000CC', borderRadius: 5},
  tooltipText: {fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC', lineHeight: 28},
  tooltipTail: {position: 'absolute', top: '100%', left: '50%', width: 5, height: 4, marginLeft: -25},
  fromArea: {position: 'absolute', bottom: 106, left: 16},
  fromImg: {height: 22},
  fromText: {
    marginLeft: 16,
    fontFamily: 'Galmuri11',
    fontSize: 12,
    color: '#0000CC',
  },
});
