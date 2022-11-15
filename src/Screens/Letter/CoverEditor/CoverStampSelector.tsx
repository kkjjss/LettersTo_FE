import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackParamsList} from '../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StampSelector} from '../../../Components/LetterEditor/Cover/StampSelector';
import {LetterCoverPreview} from '../../../Components/LetterEditor/LetterCoverPreview';
import useStore, {useLetterEditorStore} from '../../../Store/store';
import {DeliveryLetterCoverPreview} from '../../../Components/LetterEditor/DeliveryLetterCoverPreview';
import {Header2} from '../../../Components/Headers/Header2';

type Props = NativeStackScreenProps<StackParamsList, 'CoverStampSelector'>;

export function CoverStampSelector({navigation, route}: Props) {
  const [selectedStampId, setSelectedStampId] = useState<number>();

  const {
    setCoverStampId,
    setStamps,
    cover: {stamp},
  } = useStore();

  const {setDeliveryLetterData} = useLetterEditorStore();

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const disableNext = useMemo(() => !selectedStampId, [selectedStampId]);

  const goBack = () => {
    navigation.pop();
  };

  const goNext = () => {
    if (route.params?.reply) {
      setDeliveryLetterData({stampId: selectedStampId});

      navigation.navigate('LetterComplete', {reply: route.params?.reply});
    } else {
      navigation.navigate('LetterComplete');
    }
  };

  useEffect(() => {
    const getStampList = () => {
      setStamps([
        {id: 1, image: require('../../../Assets/stamp_example.png')},
        {id: 2, image: require('../../../Assets/stamp_example2.jpg')},
      ]);
    };

    getStampList();

    if (stamp) {
      setSelectedStampId(stamp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStamps]);

  useEffect(() => {
    if (!route.params?.reply) {
      setCoverStampId(selectedStampId);
    } else {
      setDeliveryLetterData({stampId: selectedStampId});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDeliveryLetterData, selectedStampId, setCoverStampId]);

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
          title="우표 선택"
          onPressBack={goBack}
          onPressNext={goNext}
          disableNext={disableNext}
        />
        <View style={styles.cover}>
          {!route.params?.reply ? (
            <LetterCoverPreview />
          ) : (
            <DeliveryLetterCoverPreview />
          )}
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
