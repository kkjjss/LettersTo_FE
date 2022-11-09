import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import useStore from '../Store/store';
import {TopicItem} from './TopicItem';
import {Topics} from '../types/types';
import {getTopics} from '../APIs/topic';

export const LetterCoverPreview = React.memo(() => {
  const [topics, setTopics] = useState<Topics>([]);
  const {userInfo, cover} = useStore();

  useEffect(() => {
    const getTopicsList = () => {
      try {
        getTopics().then(topicData => {
          setTopics([...topicData]);
        });
      } catch (error: any) {
        console.error(error.message);
      }
    };

    getTopicsList();
  }, [userInfo]);

  return (
    <LinearGradient
      colors={['#FFCCEE', 'white']}
      style={{
        width: '100%',
        height: undefined,
        aspectRatio: 295 / 212,
        borderColor: '#0000cc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{flex: 173, flexWrap: 'wrap', marginRight: 16}}>
          <Text
            style={{
              width: '100%',
              fontSize: 15,
              fontFamily: 'Galmuri11',
              color: '#0000CC',
              lineHeight: 30,
            }}>
            ⌜오늘 서울은 하루종일 맑고 청아함⌟︎︎
          </Text>
          <Image
            source={require('../Assets/From..png')}
            style={{height: 22, width: 48, resizeMode: 'contain'}}
          />
          <Text
            style={{
              marginLeft: 30,
              fontSize: 15,
              fontFamily: 'Galmuri11',
              color: '#0000CC',
              lineHeight: 30,
            }}>
            {userInfo?.nickname}
          </Text>
        </View>
        <View style={{flex: 74}}>
          <Image
            source={require('../Assets/stamp.png')}
            style={{
              width: 74,
              height: undefined,
              aspectRatio: 94 / 116,
            }}
          />
        </View>
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topics
            .filter(({id}) => cover.topicIds.includes(id))
            .map(topic => (
              <TopicItem topic={topic} parent="preview" />
            ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
});
