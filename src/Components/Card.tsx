import * as React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Letter } from '../types/types';

interface Props extends Letter {
  stampSrc?: any;
  color: string;
  style?: object;
  onPress: () => void;
};
export function Card({title, stampSrc, fromInfo, topic, personality, color, style, onPress}: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.cardItem, style]}>
        <LinearGradient locations={[0, 0.5]} colors={[color, 'white']} style={styles.linearGradient}>
          {/* 편지 제목 */}
          <Text style={styles.title}>⌜{title || '무제'}⌟︎︎</Text>
          {/* 보내는 이 */}
          <View style={styles.fromArea}>
            <Image style={styles.fromImg} source={require('../Assets/from.png')} />
            <Text style={styles.fromText}>{`${fromInfo?.nickname}, ${fromInfo?.city}`}</Text>
          </View>
          {/* 우표 */}
          <ImageBackground source={require('../Assets/bg_stamp.png')} style={styles.stampArea}>
            <Image style={styles.stampImg} source={stampSrc} />
          </ImageBackground>
          {/* 관심사, 성향 */}
          <View style={styles.tagArea}>
            <View style={styles.tagList}>
              {topic.filter((el, idx) => idx < 4).map((item, idx) => (
                <Text key={idx} style={styles.tagItem}>{item}</Text>
              ))}
              {topic.length > 4 && <Text style={styles.tagItem}>{`+${topic.length - 4}`}</Text>}
            </View>
            <View style={styles.tagList}>
              {personality.filter((el, idx) => idx < 4).map((item, idx) => (
                <Text key={idx} style={styles.tagItem}>{item}</Text>
              ))}
              {personality.length > 4 && <Text style={styles.tagItem}>{`+${personality.length - 4}`}</Text>}
            </View>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cardItem: {position: 'relative', overflow: 'hidden', width: '78.7%', height: 212, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0000CC', borderRadius: 10},
  linearGradient: {flex: 1},
  title: {width: 173, marginTop: 16, marginLeft: 16, fontFamily: 'Galmuri11', fontSize: 13, lineHeight: 23, color: '#0000CC'},
  fromArea: {position: 'absolute', bottom: 106, left: 16},
  fromImg: {width: 48, height: 22},
  fromText: {marginLeft: 16, fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC'},
  stampArea: {position: 'absolute', top: 16, right: 16, padding: 7},
  stampImg: {width:60, height:76},
  tagArea: {position: 'absolute', bottom: 16, right: 16, left: 16},
  tagList: {flexDirection: 'row', marginTop: 8},
  tagItem: {height: 24, lineHeight: 24, paddingRight: 3, paddingLeft: 6, marginRight: 4, fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC', backgroundColor: 'rgba(0, 0, 204, 0.05)', borderWidth: 1, borderColor: '#0000CC'}
});