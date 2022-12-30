import React, {useCallback, useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackParamsList} from '../../types/stackParamList';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Alert,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {
  getDeliveryLetterContent,
  getPublicLetterContent,
} from '../../APIs/letter';
import {DeliveryLetterContent, PublicLetterContent} from '../../types/types';
import {PaperBackgroud} from '../../Components/Letter/PaperBackground/PaperBackgroud';
import {BottomButton} from '../../Components/BottomButton';
import {dateFormatter} from '../../Utils/dateFormatter';
import {ImagePicker} from '../../Components/LetterEditor/ImagePicker';
import {ImageModal} from '../../Modals/ImageModal';
import {ModalBlur} from '../../Modals/ModalBlur';
import {Header2} from '../../Components/Headers/Header2';
import {useLetterEditorStore} from '../../Store/store';
import {ReportModal} from '../../Modals/ReportModal';

type Props = NativeStackScreenProps<StackParamsList, 'ReadLetter'>;

export function ReadLetter({route, navigation}: Props) {
  const [letterContent, setLetterContent] = useState<
    PublicLetterContent | DeliveryLetterContent
  >();
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isReportModalVisible, setReportModalVisible] = useState(false);

  const {setDeliverLetterTo} = useLetterEditorStore();

  const paperColor = useMemo(
    () => letterContent?.paperColor ?? 'PINK',
    [letterContent],
  );

  const paperStyle = useMemo(() => {
    if (letterContent && letterContent.paperType !== 'LINE') {
      return letterContent.paperType;
    } else {
      return 'PLAIN';
    }
  }, [letterContent]);

  const headerTitle = useMemo(
    () => letterContent && letterContent.fromNickname + '의 편지',
    [letterContent],
  );

  const fromText = useMemo(() => {
    if (letterContent) {
      const fromDate = dateFormatter('yyyy.mm.dd', letterContent.createdDate);
      const fromNickname = letterContent.fromNickname;

      return '\n' + fromDate + ' ' + fromNickname;
    } else {
      return null;
    }
  }, [letterContent]);

  const attachedImages = letterContent?.files ?? [];

  useEffect(() => {
    const getPublicLetter = async (id: number) => {
      try {
        const data = await getPublicLetterContent(id);
        console.log('PublicLetterContent:', data);
        setLetterContent(data);
      } catch (error: any) {
        console.error(error.message);
        Alert.alert('error', error.message);
      }
    };

    const getDeliveryLetter = async (id: number) => {
      try {
        const data = await getDeliveryLetterContent(id);
        console.log('DeliveryLetterContent:', data);
        setLetterContent(data);
      } catch (error: any) {
        console.error(error.message);
        Alert.alert('error', error.message);
      }
    };

    if (route.params.to === 'PUBLIC') {
      getPublicLetter(route.params.id);
    } else if (route.params.to === 'DELIVERY') {
      getDeliveryLetter(route.params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShowImageModal = useCallback(() => {
    setImageModalVisible(true);
  }, [setImageModalVisible]);

  const goBack = useCallback(() => navigation.pop(), [navigation]);

  const onPressReply = useCallback(() => {
    if (letterContent) {
      if (letterContent.replied === true || letterContent.canReply === false) {
        return Alert.alert('이미 답장하거나 답장할 수 없는 편지입니다.');
      }

      setDeliverLetterTo({
        toNickname: letterContent.fromNickname,
        toAddress: letterContent.fromAddress,
      });
      navigation.navigate('LetterEditor', {
        reply: route.params.id,
        to: route.params.to,
      });
    }
  }, [letterContent, navigation, route.params, setDeliverLetterTo]);

  return (
    <PaperBackgroud paperColor={paperColor} paperStyle={paperStyle}>
      <>
        <StatusBar barStyle={'dark-content'} />
        <SafeAreaView style={styles.container}>
          <Header2
            title={headerTitle}
            onPressBack={goBack}
            onPressReport={() => {
              setReportModalVisible(true);
            }}
          />
          <ScrollView
            alwaysBounceVertical={false}
            style={{
              paddingHorizontal: 24,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                lineHeight: 40,
                fontSize: 14,
                fontFamily: 'Galmuri11',
                color: '#0000cc',
                paddingTop: 30,
              }}>
              ⌜{letterContent?.title}⌟︎
            </Text>
            <Text
              style={{
                flex: 1,
                lineHeight: 40,
                fontSize: 14,
                fontFamily: 'Galmuri11',
                color: '#0000cc',
              }}>
              {letterContent?.content}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                fontSize: 14,
                fontFamily: 'Galmuri11',
                color: '#0000cc',
                marginBottom: 30,
              }}>
              {fromText}
            </Text>
          </ScrollView>
          {attachedImages.length > 0 && (
            <View style={{position: 'relative', paddingBottom: 10}}>
              <ImagePicker
                images={attachedImages}
                loading={false}
                onShowImageModal={onShowImageModal}
              />
            </View>
          )}
          <BottomButton
            disable={false}
            buttonText={'답장하기'}
            onPress={onPressReply}
          />
        </SafeAreaView>
        {(isImageModalVisible || isReportModalVisible) && <ModalBlur />}
        <ImageModal
          isImageModalVisible={isImageModalVisible}
          setImageModalVisible={setImageModalVisible}
          images={attachedImages}
        />
        <ReportModal
          letterId={route.params.id}
          isModalVisible={isReportModalVisible}
          setModalVisible={setReportModalVisible}
        />
      </>
    </PaperBackgroud>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
