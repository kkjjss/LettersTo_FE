import React from 'react';
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
  const { data, style } = props;
  const { paperColor, stampId, read, me, title } = data;

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

  return (
    <View style={[
        me ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'},
        {marginHorizontal: 16, justifyContent: 'space-between'},
        style,
      ]}>
      <View style={[
        {justifyContent: 'space-between', alignItems: 'center'},
        me ? {marginLeft: 12} : {marginRight: 12},
      ]}>
        <Text style={[
          {width: 36, height: 36, borderWidth: 1, borderColor: '#0000CC', borderRadius: 18, textAlign: 'center', lineHeight: 36, fontFamily: 'Galmuri11-Bold', fontSize: 13, color: '#0000CC', backgroundColor: me ? '#CCCCFF' : '#FFFFCC'},
        ]}>{me ? 'ME' : 'YOU'}</Text>
        <View>
          <Text style={{fontFamily: 'Galmuri11', fontSize: 11, color: '#0000CC'}}>{read ? '읽음' : '안읽음'}</Text>
          {!read && <View style={{position: 'absolute', top: 3, right: -2, width: 2, height: 2, backgroundColor: '#FF44CC'}} />}
        </View>
      </View>
      <Pressable style={[styles.letterItem]}>
        <LinearGradient
          locations={[0, 0.5]}
          colors={[GRADIENT_COLORS[paperColor], 'white']}
          style={styles.background}
        >
          <ImageBackground
            source={require('../../Assets/bg_stamp.png')}
            style={styles.stampArea}>
            <Image style={styles.stampImg} source={STAMPS[stampId]} />
          </ImageBackground>
          <Text style={styles.title}>⌜{title || '무제'}⌟︎︎</Text>
        </LinearGradient>
      </Pressable>
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
    width: 173,
    marginTop: 16,
    marginLeft: 16,
    fontFamily: 'Galmuri11',
    fontSize: 13,
    lineHeight: 23,
    color: '#0000CC',
  },
  stampArea: {position: 'absolute', top: 16, right: 16, padding: 7},
  stampImg: {width: 60, height: 76},
});