import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LinearGradient} from 'expo-linear-gradient';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../Components/Header';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import {StackParamsList} from '../../types/stackParamList';
import {useKeyboardHeight} from '../../Hooks/useKeyboardHeight';

const textAlignLeft = require('../../Assets/textAlignLeft.png');
const textAlignCenter = require('../../Assets/textAlignCenter.png');
const textAlignRight = require('../../Assets/textAlignRight.png');

type Props = NativeStackScreenProps<StackParamsList, 'LetterEditor'>;

function Grid() {
  const renderHorizontal = () => {
    const result = [];
    for (let i = 0; i * 24 < SCREEN_HEIGHT; i++) {
      result.push(
        <View
          style={{
            height: 24,
            width: SCREEN_WIDTH,
            borderTopWidth: 1,
            borderColor: '#ff44cc0f',
          }}
        />,
      );
    }
    return result;
  };

  const renderVertical = () => {
    const result = [];
    for (let i = 0; i * 24 < SCREEN_HEIGHT; i++) {
      result.push(
        <View
          style={{
            height: SCREEN_HEIGHT,
            width: 24,
            borderRightWidth: 1,
            borderColor: '#ff44cc0f',
          }}
        />,
      );
    }
    return result;
  };

  return (
    <>
      <View style={{position: 'absolute'}}>
        <>{renderHorizontal()}</>
      </View>
      <View style={{position: 'absolute', flexDirection: 'row'}}>
        <>{renderVertical()}</>
      </View>
    </>
  );
}

export function LetterEditor({navigation}: Props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [texticonSelectorVisible, setTexticonSelectorVisible] = useState(false);

  const [selectionText, setSelectionText] = useState<{
    start: number;
    end: number;
  }>({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    console.log(selectionText);
  }, [selectionText]);

  const [lastestFocus, setLastestFocus] = useState<
    MutableRefObject<any> | undefined
  >();

  const titleRef = useRef(null);
  const textRef = useRef(null);

  const {keyboardOn} = useKeyboardHeight();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onFocusTitle = () => {
    setLastestFocus(titleRef);
    setTitle(title.replace(/(⌜|⌟︎)/g, ''));
    setTexticonSelectorVisible(false);
  };

  const onFocusOutTitle = () => {
    if (title) {
      setTitle('⌜' + title + '⌟︎');
    }
  };

  const onFocusText = () => {
    setLastestFocus(textRef);
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
      default:
        break;
    }
  };

  const onShowTexticon = () => {
    if (texticonSelectorVisible) {
      setTexticonSelectorVisible(false);
      if (lastestFocus) {
        lastestFocus.current.blur();
        setTimeout(() => {
          lastestFocus.current.focus();
        }, 1);
      }
    } else {
      dismissKeyboard();
      setTimeout(() => {
        setTexticonSelectorVisible(true);
      }, 300);
      setTimeout(() => {
        lastestFocus?.current.focus();
      }, 600);
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
      colors={['#ffccee', 'white', 'white', 'white', '#ffffcc']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title={'편지 작성'} />

        <View style={{flex: 1, position: 'relative'}}>
          <Grid />
          <ScrollView>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder={'⌜제목⌟︎'}
              onFocus={onFocusTitle}
              onBlur={onFocusOutTitle}
              ref={titleRef}
              style={{
                padding: 0,
                height: 40,
                fontSize: 14,
                fontFamily: 'Galmuri11',
                marginHorizontal: 24,
                color: '#0000cc',
                textAlign: align,
              }}
            />

            <TextInput
              value={text}
              onChangeText={setText}
              multiline
              placeholder="내용"
              scrollEnabled={false}
              ref={textRef}
              onSelectionChange={({nativeEvent: {selection}}) => {
                setSelectionText(selection);
              }}
              showSoftInputOnFocus={!texticonSelectorVisible}
              onFocus={onFocusText}
              style={{
                lineHeight: 40,
                fontSize: 14,
                fontFamily: 'Galmuri11',
                paddingHorizontal: 24,
                color: '#0000cc',
                textAlign: align,
              }}
            />
          </ScrollView>
        </View>

        <View
          style={{
            height: 50,
            backgroundColor: '#0000cc',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Pressable style={{marginRight: 16}}>
              <Image
                source={require('../../Assets/paper.png')}
                style={{height: 24, width: 24}}
              />
            </Pressable>
            <Pressable onPress={onToggleTextAlign} style={{marginRight: 16}}>
              <TextAlignButton />
            </Pressable>

            <Pressable onPress={onShowTexticon} style={{marginRight: 16}}>
              <Image
                source={require('../../Assets/texticon.png')}
                style={{height: 24, width: 60}}
              />
            </Pressable>
          </View>
          {keyboardOn && (
            <Pressable onPress={dismissKeyboard}>
              <Image
                source={require('../../Assets/keyboardDismiss.png')}
                style={{height: 24, width: 24}}
              />
            </Pressable>
          )}
        </View>

        {texticonSelectorVisible && (
          <View
            style={{
              height: SCREEN_HEIGHT * 0.4,
              backgroundColor: '#0000cc',
            }}>
            <TouchableOpacity
              onPress={() => {
                const newText = [
                  text.slice(0, selectionText.start),
                  '✧･ﾟ: *✧･ﾟ:* 　　 *:･ﾟ✧*:･ﾟ✧',
                  text.slice(selectionText.end),
                ].join('');
                setText(newText);
              }}>
              <Text style={{color: 'white'}}>✧･ﾟ: *✧･ﾟ:* 　　 *:･ﾟ✧*:･ﾟ✧</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
