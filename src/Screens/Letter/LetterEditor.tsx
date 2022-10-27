import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LinearGradient} from 'expo-linear-gradient';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
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

const paperGrid = require('../../Assets/paper/paper_grid.png');
const paperDotted = require('../../Assets/paper/paper_dotted.png');
const paperPlain = require('../../Assets/paper/paper_plane.png');

type Props = NativeStackScreenProps<StackParamsList, 'LetterEditor'>;

const paperColors = [
  '#fd40c1',
  '#fe7542',
  '#ffd94d',
  '#bbfd50',
  '#44febc',
  '#41edfd',
  '#3b7bfa',
  '#806ef9',
  '#dda0fb',
];

const paperStyles = ['grid', 'dotted', 'plain'];

const Grid = ({lineColor}: {lineColor: string}) => {
  const Horizontal = () => {
    const result = [];
    for (let i = 0; i * 24 < SCREEN_HEIGHT; i++) {
      result.push(
        <View
          key={i}
          style={{
            height: 24,
            width: SCREEN_WIDTH,
            borderTopWidth: 1,
            borderColor: lineColor,
          }}
        />,
      );
    }
    return <>{result}</>;
  };

  const Vertical = () => {
    const result = [];
    for (let i = 0; i * 24 < SCREEN_HEIGHT; i++) {
      result.push(
        <View
          key={i}
          style={{
            height: SCREEN_HEIGHT,
            width: 24,
            borderRightWidth: 1,
            borderColor: lineColor,
          }}
        />,
      );
    }
    return <>{result}</>;
  };

  return (
    <>
      <View style={{position: 'absolute'}}>
        <Horizontal />
      </View>
      <View style={{position: 'absolute', flexDirection: 'row'}}>
        <Vertical />
      </View>
    </>
  );
};

const Dotted = ({lineColor}: {lineColor: string}) => {
  const Dots = () => {
    const result = [];
    for (let i = 0; i < (SCREEN_HEIGHT / 24) * (SCREEN_WIDTH / 24); i++) {
      result.push(
        <View
          key={i}
          style={{
            height: 1,
            width: 1,
            margin: 11.5,
            borderColor: lineColor,
            borderWidth: 1,
          }}
        />,
      );
    }
    return <>{result}</>;
  };

  return (
    <View style={{position: 'absolute'}}>
      <View
        style={{
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <Dots />
      </View>
    </View>
  );
};

export function LetterEditor({navigation}: Props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [paperColor, setPaperColor] = useState<string>(paperColors[0]);
  const [paperStyle, setPaperStyle] = useState<string>(paperStyles[0]);
  const [texticonSelectorVisible, setTexticonSelectorVisible] = useState(false);
  const [paperSelectorVisible, setPaperSelectorVisible] = useState(false);

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

  const gradientColor = useMemo(() => {
    return paperColor + '44';
  }, [paperColor]);

  const lineColor = useMemo(() => {
    return paperColor + '22';
  }, [paperColor]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onFocusTitle = () => {
    setLastestFocus(titleRef);
    setTitle(title.replace(/(⌜|⌟︎)/g, ''));
    if (texticonSelectorVisible === true) {
      setTexticonSelectorVisible(false);
    }
    if (paperSelectorVisible === true) {
      setPaperSelectorVisible(false);
    }
  };

  const onFocusOutTitle = () => {
    if (title) {
      setTitle('⌜' + title + '⌟︎');
    }
  };

  const onFocusText = () => {
    setLastestFocus(textRef);
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
      if (paperSelectorVisible) {
        setPaperSelectorVisible(false);
      }
      setTimeout(() => {
        setTexticonSelectorVisible(true);
      }, 300);
      setTimeout(() => {
        lastestFocus?.current.focus();
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
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title={'편지 작성'} />

        <View style={{flex: 1, position: 'relative', marginTop: 24}}>
          {paperStyle === 'grid' && <Grid lineColor={lineColor} />}
          {paperStyle === 'dotted' && <Dotted lineColor={lineColor} />}
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
            // scrollEnabled={false}
            ref={textRef}
            onSelectionChange={({nativeEvent: {selection}}) => {
              setSelectionText(selection);
            }}
            showSoftInputOnFocus={!texticonSelectorVisible}
            onFocus={onFocusText}
            style={{
              lineHeight: 30,
              fontSize: 14,
              fontFamily: 'Galmuri11',
              paddingHorizontal: 24,
              paddingBottom: 40,
              color: '#0000cc',
              textAlign: align,
            }}
          />
          {/* </ScrollView> */}
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
            <Pressable onPress={onShowPaper} style={{marginRight: 16}}>
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

        {paperSelectorVisible && (
          <View
            style={{
              height: SCREEN_HEIGHT * 0.4,
              backgroundColor: '#0000cc',
            }}>
            <ScrollView
              horizontal
              style={{paddingVertical: 16, marginHorizontal: 16}}>
              {paperColors.map((color, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setPaperColor(color);
                    }}
                    key={index}
                    activeOpacity={0.7}
                    style={{marginRight: 12}}>
                    <View
                      style={{
                        height: 32,
                        width: 32,
                        borderRadius: 16,
                        backgroundColor: color,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {color === paperColor && (
                        <Image
                          style={{height: 16, width: 16}}
                          source={require('../../Assets/check.png')}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <ScrollView horizontal style={{marginHorizontal: 16}}>
              {paperStyles.map((style, index) => {
                let source: any;
                let name: string = '';
                switch (style) {
                  case 'grid':
                    source = paperGrid;
                    name = '모눈노트';
                    break;
                  case 'dotted':
                    source = paperDotted;
                    name = '도트노트';
                    break;
                  case 'plain':
                    source = paperPlain;
                    name = '플레인노트';
                    break;
                }

                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginRight: 16, position: 'relative'}}
                    onPress={() => {
                      setPaperStyle(style);
                    }}
                    key={index}>
                    <Image
                      source={source}
                      style={{
                        height: 160,
                        width: 118,
                      }}
                    />
                    {style === paperStyle ? (
                      <View
                        style={{
                          backgroundColor: '#ff6ece',
                          position: 'absolute',
                          right: 5,
                          top: 5,
                          height: 22,
                          width: 22,
                          borderRadius: 11,
                          borderWidth: 2,
                          borderColor: '#fff',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../Assets/check.png')}
                          style={{height: 15, width: 15}}
                        />
                      </View>
                    ) : (
                      <View
                        style={{
                          backgroundColor: '#ffc7f0',
                          position: 'absolute',
                          right: 5,
                          top: 5,
                          height: 22,
                          width: 22,
                          borderRadius: 11,
                          borderWidth: 2,
                          borderColor: '#fff',
                        }}
                      />
                    )}
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Galmuri11',
                        fontSize: 14,
                        color: 'white',
                      }}>
                      {name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

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
