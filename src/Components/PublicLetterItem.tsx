import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {PublicLetter} from '../types/types';
import {LinearGradient} from 'expo-linear-gradient';
import {GRADIENT_COLORS} from '../Constants/letter';

interface PublicLetterItemProps extends PublicLetter {
  style?: object;
  onOpenLetter: () => void;
}

export function PublicLetterItem(props: PublicLetterItemProps) {
  const {
    title,
    fromNickname,
    fromAddress,
    topics,
    personalities,
    paperColor,
    stampId,
    style,
    onOpenLetter,
  } = props;

  type StampType = {
    [key: number]: any;
  };
  const STAMPS: StampType = {
    1: require('../Assets/stamp_sample/1.jpg'),
    2: require('../Assets/stamp_sample/2.jpg'),
    3: require('../Assets/stamp_sample/3.jpg'),
    4: require('../Assets/stamp_sample/4.jpg'),
    5: require('../Assets/stamp_sample/5.jpg'),
    6: require('../Assets/stamp_sample/6.jpg'),
  };

  return (
    <Pressable
      style={[styles.publicLetterItem, style]}
      onPress={onOpenLetter}>
      <LinearGradient
        locations={[0, 0.5]}
        colors={[GRADIENT_COLORS[paperColor], 'white']}
        style={styles.background}>
        <Text style={styles.title}>⌜{title || '무제'}⌟︎︎</Text>
        <View style={styles.fromArea}>
          <Image
            style={styles.fromImg}
            source={require('../Assets/from.png')}
          />
          <Text style={styles.fromText}>{`${fromNickname}, ${fromAddress}`}</Text>
        </View>
        <ImageBackground
          source={require('../Assets/bg_stamp.png')}
          style={styles.stampArea}>
          <Image style={styles.stampImg} source={STAMPS[stampId]} />
        </ImageBackground>
        <View style={styles.tagArea}>
          <View style={styles.tagList}>
            {topics
              ?.filter((el: string, idx: number) => idx < 4)
              .map((item, idx) => (
                <Text key={idx} style={styles.tagItem}>
                  {item}
                </Text>
              ))}
            {topics?.length > 4 && (
              <Text style={styles.tagItem}>{`+${topics.length - 4}`}</Text>
            )}
          </View>
          <View style={styles.tagList}>
            {personalities
              ?.filter((el: string, idx: number) => idx < 4)
              .map((item, idx) => (
                <Text key={idx} style={styles.tagItem}>
                  {item}
                </Text>
              ))}
            {personalities?.length > 4 && (
              <Text style={styles.tagItem}>{`+${
                personalities.length - 4
              }`}</Text>
            )}
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  publicLetterItem: {
    position: 'relative',
    overflow: 'hidden',
    width: '78.7%',
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
