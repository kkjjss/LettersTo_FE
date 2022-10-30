import * as React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

type From = {
  nickname: string;
  city: string;
}
type Props = {
  title: string;
  stampId: number|null;
  from: From;
  topic: string[];
  personality: string[];
  color: string;
  style?: object;
};
export function Card({title, stampId, from, topic, personality, color, style}: Props) {
  const imagePath = {
    237: require('../Assets/237.jpg'),
    1003: require('../Assets/1003.jpg'),
    1056: require('../Assets/1056.jpg'),
    1062: require('../Assets/1062.jpg'),
  }

  return (
    <TouchableOpacity>
      <View style={[styles.cardItem, style]}>
        <LinearGradient locations={[0, 0.5]} colors={[color, 'white']} style={styles.linearGradient}>
          {/* 편지 제목 */}
          <Text style={styles.title}>⌜{title || '무제'}⌟︎︎</Text>
          {/* 보내는 이 */}
          {from.nickname &&
            <View style={styles.fromArea}>
              <Image style={styles.fromImg} source={require('../Assets/from.png')} />
              <Text style={styles.fromText}>{`${from.nickname}, ${from.city}`}</Text>
            </View>
          }
          {/* 우표 */}
          {stampId &&
            <ImageBackground source={require('../Assets/bg_stamp.png')} style={styles.stampArea}>
              <Image style={styles.stampImg} source={imagePath[stampId]} />
            </ImageBackground>
          }
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
            </View>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardItem: {position: 'relative', overflow: 'hidden', width: '78.7%', height: 212, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0000CC', borderRadius: 10},
  linearGradient: {flex: 1},
  title: {width: 173, marginTop: 16, marginLeft: 16, fontFamily: 'Galmuri11', fontSize: 13, lineHeight: 23, color: '#0000CC'},
  fromArea: {marginTop: 4, marginLeft: 16},
  fromImg: {width: 48, height: 22},
  fromText: {marginLeft: 16, fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC'},
  stampArea: {position: 'absolute', top: 16, right: 16, padding: 7},
  stampImg: {width:60, height:76},
  tagArea: {position: 'absolute', bottom: 16, left: 16},
  tagList: {flexDirection: 'row', marginTop: 8},
  tagItem: {height: 24, lineHeight: 24, paddingRight: 3, paddingLeft: 6, marginRight: 4, fontFamily: 'Galmuri11', fontSize: 12, color: '#0000CC', backgroundColor: 'rgba(0, 0, 204, 0.05)', borderWidth: 1, borderColor: '#0000CC'}
});