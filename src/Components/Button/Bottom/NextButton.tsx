import * as React from 'react';
import {BottomButton} from './BottomButton';

type Props = {
  disable: boolean;
  onPress: () => void;
};

export function NextButton({disable, onPress}: Props) {
  return <BottomButton buttonText="다음" disable={disable} onPress={onPress} />;
}
