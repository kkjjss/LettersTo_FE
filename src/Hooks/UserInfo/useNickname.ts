import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {existsNickname} from '../../APIs/member';

export const useNickname = (curruntNickname?: string) => {
  const [nickname, setNickname] = useState('');
  const [tempNickname, setTempNickname] = useState('');
  const [isFormCorrect, setIsFormCorrect] = useState(false);
  const [isExists, setIsExists] = useState(false);
  const [isAlreadyUsed, setIsAlreadyUsed] = useState(false);
  const [disable, setDisable] = useState(true);

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
      setNickname(tempNickname);
    }, 500);
    return () => clearTimeout(debounce);
  }, [tempNickname]);

  useEffect(() => {
    const checkNicknameAlreadyUsed = async () => {
      if (curruntNickname && nickname === curruntNickname) {
        setIsAlreadyUsed(true);
        alert.start();
      } else {
        setIsAlreadyUsed(false);
        checkNicknameFormCorrect();
      }
    };

    const checkNicknameFormCorrect = async () => {
      if (nickname) {
        if (/^[가-힣A-Za-z0-9]{3,10}$/.test(nickname)) {
          setIsFormCorrect(true);
          checkNicknameExistss();
        } else {
          setIsFormCorrect(false);
          alert.start();
        }
      }
    };

    const checkNicknameExistss = async () => {
      if (nickname) {
        try {
          const response = await existsNickname(nickname);
          setIsExists(response);
          if (response === false) {
            setDisable(false);
          }
          alert.start();
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };

    if (curruntNickname) {
      checkNicknameAlreadyUsed();
    } else {
      checkNicknameFormCorrect();
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
    isFormCorrect,
    isExists,
    disable,
    alterOpacity,
    isAlreadyUsed,
    onChangeNickname,
    initializeNicknameModal,
  };
};
