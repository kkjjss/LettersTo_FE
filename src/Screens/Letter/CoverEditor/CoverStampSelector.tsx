import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../../Components/Headers/Header';
import {StackParamsList} from '../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StampSelector} from '../../../Components/CoverEditor/StampSelector';
import {LetterCoverPreview} from '../../../Components/LetterCoverPreview';

type Props = NativeStackScreenProps<StackParamsList, 'CoverStampSelector'>;

type Stamp = {
  id: string;
  image: any;
};

export function CoverStampSelector({navigation}: Props) {
  const [selectedStampId, setSelectedStampId] = useState<string>('');
  const [stamps, setStamps] = useState<Stamp[]>([
    {id: '1', image: require('../../../Assets/stamp_example.png')},
    {id: '2', image: require('../../../Assets/stamp_example2.jpg')},
  ]);

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  // const disableNext = useMemo(
  //   () => selectedTopicIds.length === 0,
  //   [selectedTopicIds],
  // );

  useEffect(() => {
    console.log(selectedStampId);
  }, [selectedStampId]);

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
          // disableNext={disableNext}
        />
        <View style={styles.cover}>
          <LetterCoverPreview />
        </View>
      </View>
      <StampSelector
        stamps={stamps}
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
