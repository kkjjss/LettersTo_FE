import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {existsNickname} from '../../APIs/member';
import {useAuthAction, useAuthStore} from '../../Store/auth';

type NicknameValidationKey =
  | 'CURRENT_NICKNAME'
  | 'ALREADY_USED'
  | 'FORM_INCORRECT'
  | 'PASS';

type NicknameValidationResult = {
  valid: boolean;
  message: string;
};

type NicknameValidationResultMap = {
  [key in NicknameValidationKey]: NicknameValidationResult;
};

const NICKNAME_VALIDATION_RESULT_MAP: NicknameValidationResultMap = {
  CURRENT_NICKNAME: {
    valid: false,
    message: '이미 사용중인 별명이에요.',
  },
  ALREADY_USED: {
    valid: false,
    message: '이미 사용중인 별명이에요.',
  },
  FORM_INCORRECT: {
    valid: false,
    message: '3-10자 이내의 별명을 입력해주세요.',
  },
  PASS: {
    valid: true,
    message: '사용 가능한 별명이에요.',
  },
};

export const useNickname = (curruntNickname?: string) => {
  const [tempNickname, setTempNickname] = useState('');
  const [disable, setDisable] = useState(true);

  const nickname = useAuthStore(state => state.registerInfo.nickname);
  const {setNicknameInRegisterInfo} = useAuthAction();

  const [nicknameValidationResult, setNicknameValidationResult] = useState<
    NicknameValidationResult | undefined
  >();

  const alterOpacity = useRef(new Animated.Value(0)).current;

  const alert = Animated.timing(alterOpacity, {
    toValue: 1,
    duration: 0,
    useNativeDriver: true,
  });

  const onChangeNickname = (name: string) => {
    alert.reset();
    setTempNickname(name);
    setDisable(true);
  };

  useEffect(() => {
    if (!tempNickname) {
      setDisable(true);
    }
    const debounce = setTimeout(() => {
      setNicknameInRegisterInfo(tempNickname);
    }, 500);
    return () => clearTimeout(debounce);
  }, [setNicknameInRegisterInfo, tempNickname]);

  useEffect(() => {
    const checkNicknameAvailable = async () => {
      if (curruntNickname && nickname === curruntNickname) {
        setNicknameValidationResult(
          NICKNAME_VALIDATION_RESULT_MAP.CURRENT_NICKNAME,
        );
      } else if (!/^[가-힣A-Za-z0-9]{3,10}$/.test(nickname)) {
        setNicknameValidationResult(
          NICKNAME_VALIDATION_RESULT_MAP.FORM_INCORRECT,
        );
      } else if (await existsNickname(nickname)) {
        setNicknameValidationResult(
          NICKNAME_VALIDATION_RESULT_MAP.ALREADY_USED,
        );
      } else {
        setNicknameValidationResult(NICKNAME_VALIDATION_RESULT_MAP.PASS);
        setDisable(false);
      }
      alert.start();
    };

    if (nickname) {
      checkNicknameAvailable();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname]);

  const initializeNicknameModal = () => {
    setTempNickname('');
    alert.reset();
  };

  return {
    nickname,
    tempNickname,
    disable,
    alterOpacity,
    nicknameValidationResult,
    onChangeNickname,
    initializeNicknameModal,
  };
};
