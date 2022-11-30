import {useEffect, useMemo, useRef, useState} from 'react';
import {Alert, Animated} from 'react-native';
import {getPersonalities} from '../../APIs/personality';
import {Personalities} from '../../types/types';

export const usePersonality = () => {
  const [personalities, setPersonalities] = useState<Personalities>([]);
  const [selectedPersonalityIds, setSelectedPersonalityIds] = useState<
    number[]
  >([]);

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
      counter < 9 &&
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

  useEffect(() => {
    try {
      getPersonalities().then(personalityData => {
        setPersonalities(personalityData);
      });
    } catch (error: any) {
      console.error(error.message);
      Alert.alert('error', error.message);
    }
  }, []);

  return {
    personalities,
    selectedPersonalityIds,
    setSelectedPersonalityIds,
    selectPersonality,
    alertOpacity,
    counter,
    reset,
    resetAlert,
  };
};
