import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../../Components/Headers/Header';
import {StackParamsList} from '../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StampSelector} from '../../../Components/CoverEditor/StampSelector';
import {LetterCoverPreview} from '../../../Components/LetterCoverPreview';
import useStore from '../../../Store/store';

type Props = NativeStackScreenProps<StackParamsList, 'CoverStampSelector'>;

export function CoverStampSelector({navigation}: Props) {
  const [selectedStampId, setSelectedStampId] = useState<string>('');

  const {
    setCoverStampId,
    setStamps,
    cover: {stamp},
  } = useStore();

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const disableNext = useMemo(() => !!selectedStampId, [selectedStampId]);

  useEffect(() => {
    const getStampList = () => {
      setStamps([
        {id: '1', image: require('../../../Assets/stamp_example.png')},
        {id: '2', image: require('../../../Assets/stamp_example2.jpg')},
      ]);
    };

    getStampList();

    if (stamp) {
      setSelectedStampId(stamp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStamps]);

  useEffect(() => {
    setCoverStampId(selectedStampId);
  }, [selectedStampId, setCoverStampId]);

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
          title={'우표 선택'}
          // next={'CoverPersonalityEditor'}
          // onPressNext={onPressNext}
          disableNext={disableNext}
        />
        <View style={styles.cover}>
          <LetterCoverPreview />
        </View>
      </View>
      <StampSelector
        selectedStampId={selectedStampId}
        setSelectedStampId={setSelectedStampId}
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
