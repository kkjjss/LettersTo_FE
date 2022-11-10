import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StampsList} from '../Stamp/StampsList';
import useStore from '../../Store/store';

type Props = {
  selectedStampId: string;
  setSelectedStampId: React.Dispatch<React.SetStateAction<string>>;
};

export function StampSelector({selectedStampId, setSelectedStampId}: Props) {
  const [numberStamps, setNumberStamps] = useState<number>(5);

  const {stamps} = useStore();

  const {bottom} = useSafeAreaInsets();

  const selectStamp = useCallback(
    (id: string) => {
      if (selectedStampId !== id) {
        setSelectedStampId(id);
      } else {
        setSelectedStampId('');
      }
    },
    [setSelectedStampId, selectedStampId],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderTopColor: '#0000cc',
        borderTopWidth: 1,
      }}>
      <View style={styles.titleBox}>
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>우표를</Text>
          <Text style={styles.titleText}>선택해주세요</Text>
        </View>
        <View style={styles.counterWrap}>
          <Text style={styles.counter}>보유 우표</Text>
          <Image
            source={require('../../Assets/numberStamps.png')}
            style={{height: 24, width: 24}}
          />
          <Text style={styles.counter}>X {numberStamps}</Text>
        </View>
      </View>

      <ScrollView style={styles.personalityBox}>
        <View style={{paddingTop: 16, paddingBottom: bottom}}>
          <StampsList
            stamps={stamps}
            selectedStampId={selectedStampId}
            onPressStamp={selectStamp}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  titleWrap: {
    // marginBottom: 30,
    justifyContent: 'flex-end',
  },
  titleText: {fontSize: 18, fontFamily: 'Galmuri11', color: '#0000cc'},
  counterWrap: {alignItems: 'center', flexDirection: 'row'},
  counter: {
    fontSize: 13,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginHorizontal: 8,
    textAlign: 'right',
  },
  personalityBox: {
    paddingHorizontal: 14,
    height: SCREEN_HEIGHT * 0.6,
  },
});
