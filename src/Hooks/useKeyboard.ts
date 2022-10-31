import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export function useKeyboard(): {
  keyboardHeight: number;
  keyboardVisible: boolean;
  dismissKeyboard: () => void;
} {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [keyboardVisible, setKeyboardOn] = useState<boolean>(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardOn(true);
      setKeyboardHeight(e.endCoordinates.height);
    });

    const showAndroidSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOn(true);
      },
    );

    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardOn(false);
      setKeyboardHeight(0);
    });

    const hideAndroidSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOn(false);
      },
    );
    return () => {
      showSubscription.remove();
      showAndroidSubscription.remove();
      hideSubscription.remove();
      hideAndroidSubscription.remove();
    };
  }, [setKeyboardHeight, setKeyboardOn]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return {keyboardHeight, keyboardVisible, dismissKeyboard};
}
