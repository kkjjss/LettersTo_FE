import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import * as imagePicker from 'expo-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Header} from '../../Components/Headers/Header';
import useStore from '../../Store/store';
import {useKeyboard} from '../../Hooks/Hardware/useKeyboard';
import {BottomBar} from '../../Components/LetterEditor/Bottom/BottomBar';
import {PaperSelector} from '../../Components/LetterEditor/Bottom/PaperSelector';
import {TexticonSelector} from '../../Components/LetterEditor/Bottom/TexticonSelector';
import {ImagePicker} from '../../Components/LetterEditor/ImagePicker';

import type {StackParamsList} from '../../types/stackParamList';
import type {
  PaperColor,
  PaperStyle as _PaperStyle,
  Selector,
  TexticonCategory,
} from '../../types/types';
import {getImageUploadUrl} from '../../APIs/file';
import {ImageModal} from '../../Modals/ImageModal';
import {ModalBlur} from '../../Modals/ModalBlur';
import {PaperBackgroud} from '../../Components/Letter/PaperBackground/PaperBackgroud';

type Props = NativeStackScreenProps<StackParamsList, 'LetterEditor'>;

export function LetterEditor({navigation, route}: Props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [texticonSelectorVisible, setTexticonSelectorVisible] = useState(false);
  const [paperSelectorVisible, setPaperSelectorVisible] = useState(false);
  const [paperColor, setPaperColor] = useState<PaperColor>('PINK');
  const [paperStyle, setPaperStyle] = useState<_PaperStyle>('GRID');
  const [selectedCategory, setSelectedCategory] =
    useState<TexticonCategory>('happy');
  const [selectedTexticon, setSelectedTexticon] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoadingImage, setLoadingImage] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  const selection = useRef<Selector>({start: 0, end: 0});
  // const align = useRef<'left' | 'center' | 'right'>('left');

  const titleRef = useRef(null);
  const textRef = useRef(null);

  const [lastestFocus, setLastestFocus] = useState<{
    ref: MutableRefObject<any>;
    name: 'title' | 'text';
  }>({name: 'title', ref: titleRef});

  const {setLetter, setInitialCoverData} = useStore();

  const disableNext = useMemo(() => title === '' || text === '', [title, text]);

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const {keyboardVisible, dismissKeyboard} = useKeyboard();

  const setLetterData = useCallback(() => {
    setLetter({
      title: title.replace(/(⌜|⌟︎)/g, ''),
      text,
      paperColor,
      paperStyle,
      align,
      images,
    });
    setInitialCoverData();
  }, [
    setLetter,
    title,
    text,
    paperColor,
    paperStyle,
    align,
    images,
    setInitialCoverData,
  ]);

  const onFocusTitle = () => {
    setLastestFocus({name: 'title', ref: titleRef});

    setTitle(title.replace(/(⌜|⌟︎)/g, ''));

    if (paperSelectorVisible) {
      setPaperSelectorVisible(false);
    }
  };

  const onFocusText = () => {
    setLastestFocus({name: 'text', ref: textRef});

    if (paperSelectorVisible) {
      setPaperSelectorVisible(false);
    }
  };

  const onFocusOutTitle = () => {
    if (title) {
      setTitle('⌜' + title.slice(0, 30) + '⌟︎');
    }
  };

  const onChangeSelection = ({
    nativeEvent: {selection: currentSelection},
  }: {
    nativeEvent: {selection: Selector};
  }) => {
    selection.current = currentSelection;
  };

  const onShowPaper = useCallback(() => {
    if (paperSelectorVisible) {
      setPaperSelectorVisible(false);
    } else {
      dismissKeyboard();
      if (texticonSelectorVisible) {
        setTexticonSelectorVisible(false);
      }
      setTimeout(() => {
        setPaperSelectorVisible(true);
      }, 300);
    }
  }, [dismissKeyboard, paperSelectorVisible, texticonSelectorVisible]);

  const onToggleTextAlign = useCallback(() => {
    switch (align) {
      case 'left':
        setAlign('center');
        break;
      case 'center':
        setAlign('right');
        break;
      case 'right':
        setAlign('left');
        break;
    }
  }, [align]);

  const onShowTexticon = useCallback(() => {
    if (texticonSelectorVisible) {
      setTexticonSelectorVisible(false);
      if (lastestFocus) {
        lastestFocus.ref.current.blur();
        setTimeout(() => {
          lastestFocus.ref.current.focus();
        }, 1);
      }
    } else {
      dismissKeyboard();
      if (paperSelectorVisible) {
        setPaperSelectorVisible(false);
      }
      setTimeout(() => {
        setTexticonSelectorVisible(true);
      }, 300);
      setTimeout(() => {
        lastestFocus?.ref.current.focus();
      }, 600);
    }
  }, [
    dismissKeyboard,
    lastestFocus,
    paperSelectorVisible,
    texticonSelectorVisible,
  ]);

  const onSelectTexticon = useCallback(
    (texticon: string) => {
      setSelectedTexticon(texticon);
    },
    [setSelectedTexticon],
  );

  const paddingOn = useMemo(
    () => !keyboardVisible && !paperSelectorVisible && !texticonSelectorVisible,
    [keyboardVisible, paperSelectorVisible, texticonSelectorVisible],
  );

  const setCurrentSelection = useCallback((length: number) => {
    selection.current = {
      start: selection.current.start + length,
      end: selection.current.end + length,
    };
  }, []);

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await imagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setLoadingImage(true);
      handleImagePicked(result.selected.slice(0, 5));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImagePicked = async (pickerResult: imagePicker.ImageInfo[]) => {
    try {
      const ids = await Promise.all(
        pickerResult.map(async localImg => {
          const img = await fetchImageFromUri(localImg.uri);
          return await uploadImage(img, localImg.fileName);
        }),
      );
      setImages(ids);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoadingImage(false);
    }
  };

  const fetchImageFromUri = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadImage = async (
    img: Blob,
    filename?: string | null,
  ): Promise<string> => {
    const presignUrl = await getImageUploadUrl(filename ?? 'UNKNOWN_FILENAME');

    console.log(presignUrl);

    await fetch(presignUrl.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/*',
      },
      body: img,
    });

    console.log('Image Upload Success');

    return presignUrl.id;
  };

  const deleteImage = useCallback(
    async (id: string) => {
      setImages([...images].filter(img => img !== id));
    },
    [images],
  );

  const onShowImageModal = useCallback(() => {
    setImageModalVisible(true);
  }, [setImageModalVisible]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const tempText = text;
      setText('');
      lastestFocus.ref.current.blur();
      setTimeout(() => {
        setText(tempText);
      }, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [align]);

  useEffect(() => {
    if (selectedTexticon) {
      if (lastestFocus.name === 'title') {
        const newTitle = [
          title.slice(0, selection.current.start),
          selectedTexticon,
          title.slice(selection.current.end),
        ].join('');

        setTitle(newTitle);

        setCurrentSelection(selectedTexticon.length);
      } else if (lastestFocus.name === 'text') {
        const newText = [
          text.slice(0, selection.current.start),
          selectedTexticon,
          text.slice(selection.current.end),
        ].join('');

        setText(newText);

        setCurrentSelection(selectedTexticon.length);
      }
    }
    setSelectedTexticon('');
  }, [
    lastestFocus,
    selectedTexticon,
    selection,
    setCurrentSelection,
    text,
    title,
  ]);

  return (
    <PaperBackgroud paperColor={paperColor} paperStyle={paperStyle}>
      <View style={[styles.container, {paddingTop: SAFE_AREA_TOP}]}>
        <Header
          navigation={navigation}
          title={'편지 작성'}
          next={route.params?.reply ? 'CoverStampSelector' : 'CoverTopicEditor'}
          onPressNext={setLetterData}
          disableNext={disableNext}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1, marginTop: 24}}>
          <View style={{flex: 1}}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder={'⌜제목⌟︎'}
              onFocus={onFocusTitle}
              onBlur={onFocusOutTitle}
              autoCorrect={false}
              showSoftInputOnFocus={!texticonSelectorVisible}
              ref={titleRef}
              onSelectionChange={onChangeSelection}
              placeholderTextColor="#00000066"
              style={[
                styles.titleInput,
                {
                  textAlign: align,
                  // textAlign: align.current,
                },
              ]}
            />

            <TextInput
              value={text}
              key="text"
              onChangeText={setText}
              multiline
              placeholder="내용"
              onFocus={onFocusText}
              autoCorrect={false}
              ref={textRef}
              onSelectionChange={onChangeSelection}
              showSoftInputOnFocus={!texticonSelectorVisible}
              placeholderTextColor="#00000066"
              style={[
                styles.textInput,
                {
                  textAlign: align,
                },
              ]}
            />
          </View>

          <View style={styles.bottom}>
            <ImagePicker
              images={images}
              loading={isLoadingImage}
              deleteImage={deleteImage}
              onShowImageModal={onShowImageModal}
            />
            <BottomBar
              paddingOn={paddingOn}
              align={align}
              onToggleTextAlign={onToggleTextAlign}
              onShowPaper={onShowPaper}
              onShowTexticon={onShowTexticon}
              pickImage={pickImage}
            />
            {paperSelectorVisible && (
              <PaperSelector
                setPaperColor={setPaperColor}
                paperColor={paperColor}
                setPaperStyle={setPaperStyle}
                paperStyle={paperStyle}
              />
            )}
            {texticonSelectorVisible && (
              <TexticonSelector
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                onSelectTexticon={onSelectTexticon}
              />
            )}
          </View>
        </KeyboardAvoidingView>

        {isImageModalVisible && <ModalBlur />}
        <ImageModal
          isImageModalVisible={isImageModalVisible}
          setImageModalVisible={setImageModalVisible}
          images={images}
        />
      </View>
    </PaperBackgroud>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  titleInput: {
    padding: 0,
    height: 40,
    fontSize: 14,
    fontFamily: 'Galmuri11',
    marginHorizontal: 24,
    color: '#0000cc',
  },
  textInput: {
    lineHeight: 30,
    fontSize: 14,
    fontFamily: 'Galmuri11',
    paddingHorizontal: 24,
    paddingBottom: 40,
    color: '#0000cc',
  },
  bottom: {
    backgroundColor: '#0000cc',
    position: 'relative',
  },
});
