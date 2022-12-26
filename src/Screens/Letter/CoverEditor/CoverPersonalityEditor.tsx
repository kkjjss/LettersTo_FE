import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackParamsList} from '../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PersonalityEditor} from '../../../Components/LetterEditor/Cover/PersonalityEditor';
import {LetterCoverPreview} from '../../../Components/LetterEditor/LetterCoverPreview';
import useStore from '../../../Store/store';
import {Header2} from '../../../Components/Headers/Header2';
import {StepIndicator} from '../../../Components/StepIndicator';
import {PUBLIC_COVER_EDIT_STEPS} from '../../../Constants/constants';

type Props = NativeStackScreenProps<StackParamsList, 'CoverPersonalityEditor'>;

export function CoverPersonalityEditor({navigation}: Props) {
  const [selectedPersonalityIds, setSelectedPersonalityIds] = useState<
    number[]
  >([]);

  const {
    setPersonalities,
    setCoverPersonalityIds,
    cover: {personalityIds},
  } = useStore();

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const goNext = () => {
    navigation.navigate('CoverStampSelector');
  };

  const goBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    if (personalityIds) {
      setSelectedPersonalityIds(personalityIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPersonalities]);

  useEffect(() => {
    setCoverPersonalityIds(selectedPersonalityIds);
  }, [selectedPersonalityIds, setCoverPersonalityIds]);

  return (
    <View style={{flex: 1}}>
      <View
        style={[
          styles.coverContainer,
          {
            height: 332 + SAFE_AREA_TOP,
            paddingTop: SAFE_AREA_TOP,
          },
        ]}>
        <Header2
          title={'성향 선택'}
          onPressBack={goBack}
          onPressNext={goNext}
        />
        <View style={styles.cover}>
          <LetterCoverPreview />
        </View>
        <StepIndicator
          current={PUBLIC_COVER_EDIT_STEPS.PERSONALITY}
          of={PUBLIC_COVER_EDIT_STEPS.total}
        />
      </View>
      <PersonalityEditor
        selectedPersonalityIds={selectedPersonalityIds}
        setSelectedPersonalityIds={setSelectedPersonalityIds}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    backgroundColor: '#ffccee',
  },
  cover: {paddingTop: 12, paddingHorizontal: 40},
});
