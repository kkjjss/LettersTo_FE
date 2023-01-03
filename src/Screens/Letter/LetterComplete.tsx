import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  postDeliveryLetter,
  postPublicLetter,
  replyPublicLetter,
} from '../../APIs/letter';
import {Header} from '../../Components/Headers/Header';
import {DeliveryLetterCoverBackPreview} from '../../Components/LetterEditor/DeliveryLetterCoverBackPreview';
import {DeliveryLetterCoverPreview} from '../../Components/LetterEditor/DeliveryLetterCoverPreview';
import {LetterCoverPreview} from '../../Components/LetterEditor/LetterCoverPreview';
import {SendLetterButton} from '../../Components/LetterEditor/SendLetterButton';
import {SCREEN_WIDTH} from '../../Constants/screen';
import useStore, {useLetterEditorStore} from '../../Store/store';
import {StackParamsList} from '../../types/stackParamList';
import {
  DeliveryLetterWriteRequest,
  PublicLetterWriteRequest,
} from '../../types/types';
import {showToast} from '../../Components/Toast/toast';

type Props = NativeStackScreenProps<StackParamsList, 'LetterComplete'>;

export const LetterComplete = ({navigation, route}: Props) => {
  console.log(route.params);

  const {cover, letter} = useStore();
  const {deliveryLetter} = useLetterEditorStore();

  const sendPublicLetter = useCallback(async () => {
    if (cover.stamp && letter) {
      try {
        const letterData: PublicLetterWriteRequest = {
          title: letter.title,
          content: letter.text,
          paperType: letter.paperStyle,
          paperColor: letter.paperColor,
          alignType: letter.alignType,
          stampId: cover.stamp,
          topics: cover.topicIds,
          personalities: cover.personalityIds,
          files: letter.images,
        };

        await postPublicLetter(letterData);
        showToast('편지 작성이 완료되었습니다!');
        navigation.navigate('Main');
      } catch (error: any) {
        console.error(error.message);
        Alert.alert('error', error.message);
      }
    }
  }, [cover.personalityIds, cover.stamp, cover.topicIds, letter, navigation]);

  const sendDeliveryLetter = useCallback(async () => {
    try {
      const letterData: DeliveryLetterWriteRequest = {
        ...deliveryLetter,
      };

      if (route.params?.to === 'PUBLIC') {
        await replyPublicLetter(letterData);
      } else if (route.params?.to === 'DELIVERY') {
        await postDeliveryLetter(letterData);
      }
      showToast('편지 작성이 완료되었습니다!');
      navigation.navigate('Main');
    } catch (error: any) {
      console.error(error.message);
      Alert.alert('error', error.message);
    }
  }, [deliveryLetter, navigation, route.params?.to]);

  const sendLetter = useCallback(() => {
    if (route.params) {
      sendDeliveryLetter();
    } else {
      sendPublicLetter();
    }
  }, [route.params, sendDeliveryLetter, sendPublicLetter]);

  return (
    <View style={{backgroundColor: '#ffccee', flex: 1}}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title={'작성완료'} />
        <View style={styles.contentContainer}>
          <Text style={styles.completeText}>Complete!</Text>
          <Text style={styles.descText}>편지 작성을 완료했어요!</Text>
          {!route.params?.reply ? (
            <View style={styles.cover}>
              <LetterCoverPreview />
            </View>
          ) : (
            <View
              style={[
                styles.cover,
                {height: ((SCREEN_WIDTH - 80) * 230) / 295},
              ]}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={SCREEN_WIDTH - 60}
                snapToAlignment="start"
                decelerationRate="fast"
                contentContainerStyle={{paddingHorizontal: 40}}>
                <View style={{marginRight: 20}}>
                  <DeliveryLetterCoverPreview />
                </View>

                <DeliveryLetterCoverBackPreview />
              </ScrollView>
            </View>
          )}
        </View>

        <SendLetterButton reply={!!route.params?.reply} onPress={sendLetter} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  completeText: {
    fontFamily: 'Galmuri11-Bold',
    color: '#0000cc',
    fontSize: 18,
    marginBottom: 8,
  },
  descText: {
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    fontSize: 15,
    height: 25,
    marginBottom: 8,
  },
  cover: {paddingTop: 12},
});
