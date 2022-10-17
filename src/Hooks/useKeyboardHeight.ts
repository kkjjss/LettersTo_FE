import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export function useKeyboardHeight(): {
  keyboardHeight: number;
  keyboardOn: boolean;
} {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [keyboardOn, setKeyboardOn] = useState<boolean>(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardOn(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOn(false);
      setKeyboardHeight(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setKeyboardHeight, setKeyboardOn]);

  return {keyboardHeight, keyboardOn};
}
