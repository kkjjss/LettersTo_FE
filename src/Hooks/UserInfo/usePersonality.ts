import {useMemo, useRef} from 'react';
import {Animated} from 'react-native';
import {useQuery} from 'react-query';
import {getPersonalities} from '../../APIs/personality';
import Toast from '../../Components/Toast/toast';
import {MAX_PERSONALITY_LIMIT} from '../../Constants/user';
import {useAuthStore} from '../../Store/auth';

export const usePersonality = () => {
  const [selectedPersonalityIds, setSelectedPersonalityIds] = useAuthStore(
    state => [
      state.registerInfo.personalityIds,
      state.action.setPersonalityIdsInRegisterInfo,
    ],
  );

  const counter = useMemo(
    () => selectedPersonalityIds.length,
    [selectedPersonalityIds],
  );

  const alertOpacity = useRef(new Animated.Value(0)).current;

  const alert = Animated.sequence([
    Animated.timing(alertOpacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }),
    Animated.timing(alertOpacity, {
      toValue: 0,
      delay: 2000,
      useNativeDriver: true,
    }),
  ]);

  const resetAlert = () => {
    alert.reset();
  };

  const selectPersonality = (personalityId: number) => {
    alert.reset();
    if (
      counter < MAX_PERSONALITY_LIMIT &&
      selectedPersonalityIds.includes(personalityId) === false
    ) {
      setSelectedPersonalityIds([...selectedPersonalityIds, personalityId]);
    } else if (selectedPersonalityIds.includes(personalityId) === true) {
      setSelectedPersonalityIds(
        [...selectedPersonalityIds].filter(e => e !== personalityId),
      );
    } else {
      alert.start();
    }
  };

  const reset = () => {
    setSelectedPersonalityIds([]);
  };

  const {data: personalities} = useQuery('personalities', getPersonalities, {
    onError: (error: any) => {
      console.error(error.message);
      Toast.show('문제가 발생했습니다');
    },
  });

  return {
    personalities: personalities || [],
    selectedPersonalityIds,
    setSelectedPersonalityIds,
    selectPersonality,
    alertOpacity,
    counter,
    reset,
    resetAlert,
  };
};
