import * as React from 'react';
import {BottomButton} from './BottomButton';

interface Props {
  disable: boolean;
  onPress: () => void;
}

export function SignUpButton({disable, onPress}: Props) {
  return (
    <BottomButton buttonText="가입 완료!" disable={disable} onPress={onPress} />
  );
}
