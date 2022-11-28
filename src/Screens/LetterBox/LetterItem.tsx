import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {DeliveryLetter} from '../../types/types';
import {LinearGradient} from 'expo-linear-gradient';
import {GRADIENT_COLORS} from '../../Constants/letter';

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
    toAddress,
    fromAddress,
  } = data;

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

  useEffect(() => {
    console.log('data', data);
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
    <Pressable style={[styles.letterItem]}>
      <LinearGradient
        locations={[0, 0.5]}
        colors={[GRADIENT_COLORS[paperColor], 'white']}
        style={[styles.background]}>
        <ImageBackground
          source={require('../../Assets/bg_stamp.png')}
          style={styles.stampArea}>
          <Image style={styles.stampImg} source={STAMPS[stampId]} />
          {deliveryType === 'STANDARD' ? (
            <Image
              source={require('../../Assets/StandardBox.png')}
              style={{
                width: 46,
                height: 17,
                position: 'absolute',
                top: 7,
                left: 7,
              }}
            />
          ) : deliveryType === 'EXPRESS' ? (
            <Image
              source={require('../../Assets/ExpressBox.png')}
              style={{
                width: 46,
                height: 17,
                position: 'absolute',
                top: 7,
                left: 7,
              }}
            />
          ) : null}
        </ImageBackground>
        <Text style={styles.title}>⌜{title || '무제'}⌟︎︎</Text>
      </LinearGradient>
    </Pressable>
  );
  const PendingLetter = () => (
    <Pressable style={[styles.letterItem]}>
      <LinearGradient
        locations={[0, 0.5]}
        colors={[GRADIENT_COLORS[paperColor], 'white']}
        style={[styles.background, {alignItems: 'center'}]}>
        <View style={styles.tooltipArea}>
          <Text style={styles.tooltipText}>
            {me
              ? `${toAddress}으로 편지가 가고 있어요!`
              : `${fromAddress}에서 편지가 오고 있어요!`}
          </Text>
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
    </Pressable>
  );

  return (
    <View
      style={[
        me ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'},
        {marginHorizontal: 16, justifyContent: 'space-between'},
        style,
      ]}>
      <View
        style={[
          {justifyContent: 'space-between', alignItems: 'center'},
          me ? {marginLeft: 12} : {marginRight: 12},
        ]}>
        <Text
          style={[
            {
              width: 36,
              height: 36,
              borderWidth: 1,
              borderColor: '#0000CC',
              borderRadius: 18,
              textAlign: 'center',
              lineHeight: 36,
              fontFamily: 'Galmuri11-Bold',
              fontSize: 13,
              color: '#0000CC',
              backgroundColor: me ? '#CCCCFF' : '#FFFFCC',
            },
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
    </View>
  );
}

const styles = StyleSheet.create({
  letterItem: {
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    height: 212,
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
  background: {flex: 1},
  title: {
    width: '60%',
    marginTop: 16,
    marginLeft: 16,
    fontFamily: 'Galmuri11',
    fontSize: 13,
    lineHeight: 24,
    color: '#0000CC',
  },
  stampArea: {position: 'absolute', top: 16, right: 16, padding: 7},
  stampImg: {width: 60, height: 76},
  tooltipArea: {
    height: 32,
    marginTop: 47,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFCC',
    borderWidth: 1,
    borderColor: '#0000CC',
    borderRadius: 5,
  },
  tooltipText: {
    fontFamily: 'Galmuri11',
    fontSize: 12,
    color: '#0000CC',
    lineHeight: 28,
  },
  tooltipTail: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    width: 5,
    height: 4,
    marginLeft: -25,
  },
});
