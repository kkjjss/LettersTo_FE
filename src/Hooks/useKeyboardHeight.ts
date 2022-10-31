import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export function useKeyboardHeight(): {
  keyboardHeight: number;
  keyboardVisible: boolean;
} {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [keyboardVisible, setKeyboardOn] = useState<boolean>(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardOn(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardOn(false);
      setKeyboardHeight(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setKeyboardHeight, setKeyboardOn]);

  return {keyboardHeight, keyboardVisible};
}
