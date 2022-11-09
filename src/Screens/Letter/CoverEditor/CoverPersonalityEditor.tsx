import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../../Components/Headers/Header';
import {StackParamsList} from '../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PersonalityEditor} from '../../../Components/CoverEditor/PersonalityEditor';

type Props = NativeStackScreenProps<StackParamsList, 'CoverPersonalityEditor'>;

export function CoverPersonalityEditor({navigation}: Props) {
  const [selectedPersonalityIds, setSelectedPersonalityIds] = useState<
    number[]
  >([]);

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const disableNext = useMemo(
    () => selectedPersonalityIds.length === 0,
    [selectedPersonalityIds],
  );

  const LetterCover = () => {
    // 나중에 구현
    return <View style={{backgroundColor: 'white', height: 212}} />;
  };

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
        <Header
          navigation={navigation}
          title={'성향 선택'}
          // next={'CoverPersonalityEditor'}
          // onPressNext={onPressNext}
          disableNext={disableNext}
        />
        <View style={styles.cover}>
          <LetterCover />
        </View>
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
