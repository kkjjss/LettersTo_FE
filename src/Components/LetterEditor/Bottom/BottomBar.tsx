import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useKeyboard} from '../../../Hooks/useKeyboard';

const paperButton = require('../../../Assets/paper.png');
const texticonButton = require('../../../Assets/texticon.png');
const keyboardButton = require('../../../Assets/keyboardDismiss.png');

const textAlign = {
  left: require('../../../Assets/textAlignLeft.png'),
  center: require('../../../Assets/textAlignCenter.png'),
  right: require('../../../Assets/textAlignRight.png'),
};

type Props = {
  paddingOn: boolean;
  align: 'left' | 'center' | 'right';
  onToggleTextAlign: () => void;
  onShowPaper: () => void;
  onShowTexticon: () => void;
};

export const BottomBar = React.memo(
  ({
    paddingOn,
    align,
    onToggleTextAlign,
    onShowPaper,
    onShowTexticon,
  }: Props) => {
    console.log('BottomBar');

    const {bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

    const {keyboardVisible, dismissKeyboard} = useKeyboard();

    return (
      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: paddingOn ? SAFE_AREA_BOTTOM : 0,
          },
        ]}>
        <View style={styles.bottomBarButtonWrap}>
          <Pressable onPress={onShowPaper} style={styles.bottomBarButton}>
            <Image source={paperButton} style={styles.buttonImage} />
          </Pressable>

          <Pressable onPress={onToggleTextAlign} style={styles.bottomBarButton}>
            <Image source={textAlign[align]} style={styles.buttonImage} />
          </Pressable>

          <Pressable onPress={onShowTexticon} style={styles.bottomBarButton}>
            <Image source={texticonButton} style={styles.texticonButtonImage} />
          </Pressable>
        </View>
        {keyboardVisible && (
          <Pressable onPress={dismissKeyboard}>
            <Image source={keyboardButton} style={styles.buttonImage} />
          </Pressable>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
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
  buttonImage: {height: 24, width: 24},
  texticonButtonImage: {height: 24, width: 60},
});
