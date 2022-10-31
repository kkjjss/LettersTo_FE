import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LinearGradient} from 'expo-linear-gradient';
import React, {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from '../../Components/Header';

import {useKeyboard} from '../../Hooks/useKeyboard';

import {PAPER_COLORS, PAPER_STYLES} from '../../Constants/letter';

import type {StackParamsList} from '../../types/stackParamList';
import type {Selector, TexticonCategory} from '../../types/types';
import {PaperStyle} from '../../Components/paperStyles/PaperStyle';
import {PaperSelector} from '../../Components/paperStyles/PaperSelector';
import {TexticonSelector} from '../../Components/paperStyles/TexticonSelector';

const textAlignLeft = require('../../Assets/textAlignLeft.png');
const textAlignCenter = require('../../Assets/textAlignCenter.png');
const textAlignRight = require('../../Assets/textAlignRight.png');

type Props = NativeStackScreenProps<StackParamsList, 'LetterEditor'>;

export function LetterEditor({navigation}: Props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [paperColor, setPaperColor] = useState<string>(PAPER_COLORS[0]);
  const [paperStyle, setPaperStyle] = useState<typeof PAPER_STYLES[number]>(
    PAPER_STYLES[0],
  );
  const [texticonSelectorVisible, setTexticonSelectorVisible] = useState(false);
  const [paperSelectorVisible, setPaperSelectorVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<TexticonCategory>('happy');

  const [selection, setSelection] = useState<Selector>({
    start: 0,
    end: 0,
  });

  const [lastestFocus, setLastestFocus] = useState<
    {ref: MutableRefObject<any>; name: string} | undefined
  >();

  const {top: SAFE_AREA_TOP, bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  const titleRef = useRef(null);
  const textRef = useRef(null);

  const {keyboardVisible, dismissKeyboard} = useKeyboard();

  const gradientColor = useMemo(() => {
    return paperColor + '44'; // 투명도 44
  }, [paperColor]);

  const lineColor = useMemo(() => {
    return paperColor + '22'; // 투명도 22
  }, [paperColor]);

  const onFocusTitle = () => {
    setLastestFocus({name: 'title', ref: titleRef});
    setTitle(title.replace(/(⌜|⌟︎)/g, ''));
  };

  const onFocusOutTitle = () => {
    if (title) {
      setTitle('⌜' + title + '⌟︎');
    }
  };

  const onFocusText = () => {
    setLastestFocus({name: 'text', ref: textRef});
    setPaperSelectorVisible(false);
  };

  const onToggleTextAlign = () => {
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
  };

  const onShowTexticon = () => {
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
  };

  const onShowPaper = () => {
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
  };

  function setCurrentSelection(length: number) {
    setSelection({
      start: selection.start + length,
      end: selection.end + length,
    });
  }

  const onInsertTexticon = (texticon: string) => {
    if (lastestFocus) {
      if (lastestFocus.name === 'title') {
        const newTitle = [
          title.slice(0, selection.start),
          texticon,
          title.slice(selection.end),
        ].join();

        setTitle(newTitle);

        setCurrentSelection(texticon.length);
      } else if (lastestFocus.name === 'text') {
        const newText = [
          text.slice(0, selection.start),
          texticon,
          text.slice(selection.end),
        ].join('');

        setText(newText);

        setCurrentSelection(texticon.length);
      }
    }
  };

  const TextAlignButton = useCallback(() => {
    switch (align) {
      case 'left':
        return <Image source={textAlignLeft} style={{height: 24, width: 24}} />;
      case 'center':
        return (
          <Image source={textAlignCenter} style={{height: 24, width: 24}} />
        );
      case 'right':
        return (
          <Image source={textAlignRight} style={{height: 24, width: 24}} />
        );
      default:
        return <></>;
    }
  }, [align]);

  return (
    <LinearGradient
      colors={[gradientColor, 'white', 'white', 'white', gradientColor]}
      style={[styles.container, {paddingTop: SAFE_AREA_TOP}]}>
      <Header navigation={navigation} title={'편지 작성'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1, marginTop: 24}}>
        <View style={{flex: 1}}>
          <PaperStyle lineColor={lineColor} paperStyle={paperStyle} />

          <TextInput
            value={title}
            key="title"
            onChangeText={setTitle}
            placeholder={'⌜제목⌟︎'}
            onFocus={onFocusTitle}
            onBlur={onFocusOutTitle}
            autoCorrect={false}
            showSoftInputOnFocus={!texticonSelectorVisible}
            ref={titleRef}
            onSelectionChange={({
              nativeEvent: {selection: currentSelection},
            }) => {
              setSelection(currentSelection);
            }}
            style={[
              styles.titleInput,
              {
                textAlign: align,
              },
            ]}
          />

          <TextInput
            value={text}
            key="text"
            onChangeText={setText}
            multiline
            placeholder="내용"
            autoCorrect={false}
            ref={textRef}
            onSelectionChange={({
              nativeEvent: {selection: currentSelection},
            }) => {
              setSelection(currentSelection);
            }}
            showSoftInputOnFocus={!texticonSelectorVisible}
            onFocus={onFocusText}
            style={[
              styles.textInput,
              {
                textAlign: align,
              },
            ]}
          />
        </View>

        <View style={styles.bottom}>
          <View
            style={[
              styles.bottomBar,
              {
                paddingBottom:
                  !keyboardVisible &&
                  !paperSelectorVisible &&
                  !texticonSelectorVisible
                    ? SAFE_AREA_BOTTOM
                    : 0,
              },
            ]}>
            <View style={styles.bottomBarButtonWrap}>
              <Pressable onPress={onShowPaper} style={styles.bottomBarButton}>
                <Image
                  source={require('../../Assets/paper.png')}
                  style={{height: 24, width: 24}}
                />
              </Pressable>
              <Pressable
                onPress={onToggleTextAlign}
                style={styles.bottomBarButton}>
                <TextAlignButton />
              </Pressable>

              <Pressable
                onPress={onShowTexticon}
                style={styles.bottomBarButton}>
                <Image
                  source={require('../../Assets/texticon.png')}
                  style={{height: 24, width: 60}}
                />
              </Pressable>
            </View>
            {keyboardVisible && (
              <Pressable onPress={dismissKeyboard}>
                <Image
                  source={require('../../Assets/keyboardDismiss.png')}
                  style={{height: 24, width: 24}}
                />
              </Pressable>
            )}
          </View>

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
              onInsertTexticon={onInsertTexticon}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
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
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  bottomBarButtonWrap: {
    marginVertical: 14,
    flexDirection: 'row',
  },
  bottomBarButton: {marginRight: 16},
});
