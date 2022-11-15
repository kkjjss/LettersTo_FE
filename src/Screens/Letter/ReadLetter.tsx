import React, {useCallback, useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackParamsList} from '../../types/stackParamList';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {getPublicLetterContent} from '../../APIs/publicLetter';
import {PublicLetterContent} from '../../types/types';
import {PaperBackgroud} from '../../Components/Letter/PaperBackground/PaperBackgroud';
import {BottomButton} from '../../Components/BottomButton';
import {dateFormatter} from '../../Utils/dateFormatter';
import {ImagePicker} from '../../Components/LetterEditor/ImagePicker';
import {ImageModal} from '../../Modals/ImageModal';
import {ModalBlur} from '../../Modals/ModalBlur';
import {Header2} from '../../Components/Headers/Header2';
import {useLetterEditorStore} from '../../Store/store';

type Props = NativeStackScreenProps<StackParamsList, 'ReadLetter'>;

export function ReadLetter({route, navigation}: Props) {
  const [letterContent, setLetterContent] = useState<PublicLetterContent>();
  const [isImageModalVisible, setImageModalVisible] = useState(false);

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
    const getLetterContent = async () => {
      const data = await getPublicLetterContent(route.params.id);
      setLetterContent(data);
    };

    getLetterContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShowImageModal = useCallback(() => {
    setImageModalVisible(true);
  }, [setImageModalVisible]);

  const goBack = useCallback(() => navigation.navigate('Home'), [navigation]);

  const onPressReply = useCallback(() => {
    const goToLetterEditor = () => {
      navigation.navigate('LetterEditor', {reply: route.params.id});
    };

    if (letterContent) {
      setDeliverLetterTo({
        toNickname: letterContent.fromNickname,
        toAddress: letterContent.fromAddress,
      });
    }

    goToLetterEditor();
  }, [letterContent, navigation, route.params.id, setDeliverLetterTo]);

  return (
    <PaperBackgroud paperColor={paperColor} paperStyle={paperStyle}>
      <>
        <SafeAreaView style={styles.container}>
          <Header2 title={headerTitle} onPressBack={goBack} />
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
        {isImageModalVisible && <ModalBlur />}
        <ImageModal
          isImageModalVisible={isImageModalVisible}
          setImageModalVisible={setImageModalVisible}
          images={attachedImages}
        />
      </>
    </PaperBackgroud>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
