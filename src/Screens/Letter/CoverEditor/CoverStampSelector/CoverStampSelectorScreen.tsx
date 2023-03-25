import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackParamsList} from '../../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StampSelector} from './Components/StampSelector';
import {LetterCoverPreview} from '../../../../Components/LetterEditor/LetterCoverPreview';
import useStore, {useLetterEditorStore} from '../../../../Store/store';
import {DeliveryLetterCoverPreview} from '../../../../Components/LetterEditor/DeliveryLetterCoverPreview';
import {Header2} from '../../../../Components/Headers/Header2';
import {StepIndicator} from '../../../../Components/StepIndicator';
import {useQuery} from 'react-query';
import {getUserInfo} from '../../../../APIs/member';

type Props = NativeStackScreenProps<StackParamsList, 'CoverStampSelector'>;

export function CoverStampSelector({navigation, route}: Props) {
  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const [selectedStampId, setSelectedStampId] = useState<number>();

  const {
    setCoverStampId,
    cover: {stamp},
  } = useStore();

  const {setDeliveryLetterData} = useLetterEditorStore();

  const goNext = () => {
    if (disableNext) return;

    if (route.params) {
      setDeliveryLetterData({stampId: selectedStampId});

      navigation.navigate('LetterComplete', {
        reply: route.params.reply,
        to: route.params.to,
      });
    } else {
      navigation.navigate('LetterComplete');
    }
  };

  const goBack = () => {
    navigation.pop();
  };

  const {data: userInfo, isSuccess} = useQuery(['userInfo'], getUserInfo);

  const disableNext = useMemo(() => !selectedStampId, [selectedStampId]);

  useEffect(() => {
    if (stamp) {
      setSelectedStampId(stamp);
    }
  }, [stamp]);

  useEffect(() => {
    if (!route.params?.reply) {
      setCoverStampId(selectedStampId);
    } else {
      setDeliveryLetterData({stampId: selectedStampId});
    }
  }, [setDeliveryLetterData, selectedStampId, setCoverStampId, route.params]);

  const step = useMemo(
    () => (!route.params?.reply ? 3 : 2),
    [route.params?.reply],
  );

  if (!isSuccess) {
    return <></>;
  }

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
            <LetterCoverPreview userInfo={userInfo} />
          ) : (
            <DeliveryLetterCoverPreview />
          )}
        </View>
        <StepIndicator current={step} of={step} />
      </View>
      <StampSelector
        stampQuantity={userInfo.stampQuantity}
        selectedStampId={selectedStampId}
        selectStamp={setSelectedStampId}
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
