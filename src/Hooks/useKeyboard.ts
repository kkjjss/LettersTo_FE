import {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export function useKeyboard(): {
  keyboardHeight: number;
  keyboardVisible: boolean;
  dismissKeyboard: () => void;
} {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', e => {
      if (keyboardHeight === 0) {
        setKeyboardHeight(e.endCoordinates.height);
      }
      if (keyboardVisible === false) {
        setKeyboardVisible(true);
      }
    });

    const showAndroidSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (keyboardVisible === false) {
          setKeyboardVisible(true);
        }
      },
    );

    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      if (keyboardHeight !== 0) {
        setKeyboardHeight(0);
      }
      if (keyboardVisible === true) {
        setKeyboardVisible(false);
      }
    });

    const hideAndroidSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (keyboardVisible === true) {
          setKeyboardVisible(false);
        }
      },
    );
    return () => {
      showSubscription.remove();
      showAndroidSubscription.remove();
      hideSubscription.remove();
      hideAndroidSubscription.remove();
    };
  }, [keyboardHeight, keyboardVisible, setKeyboardHeight]);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return {
    keyboardHeight,
    keyboardVisible,
    dismissKeyboard,
  };
}
