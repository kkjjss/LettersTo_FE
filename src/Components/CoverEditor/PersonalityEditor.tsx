import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {ResetButton} from '../../Components/ResetButton';
import useStore from '../../Store/store';
import {SCREEN_HEIGHT} from '../../Constants/screen';
import {Personalities} from '../../types/types';
import {getPersonalities} from '../../APIs/personality';
import {PersonalityList} from '../../Components/PersonalityList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  selectedPersonalityIds: number[];
  setSelectedPersonalityIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export function PersonalityEditor({
  selectedPersonalityIds,
  setSelectedPersonalityIds,
}: Props) {
  const [personalities, setPersonalities] = useState<Personalities>([]);

  const {userInfo} = useStore();

  const {bottom} = useSafeAreaInsets();

  const counter = useMemo(
    () => selectedPersonalityIds.length,
    [selectedPersonalityIds],
  );

  const selectPersonality = useCallback(
    (personalityId: number) => {
      // alert.reset();
      if (
        counter < 10 &&
        selectedPersonalityIds.includes(personalityId) === false
      ) {
        setSelectedPersonalityIds([...selectedPersonalityIds, personalityId]);
      } else if (selectedPersonalityIds.includes(personalityId) === true) {
        setSelectedPersonalityIds(
          [...selectedPersonalityIds].filter(e => e !== personalityId),
        );
      } else {
        // alert.start();
      }
    },
    [counter, selectedPersonalityIds, setSelectedPersonalityIds],
  );

  const reset = () => {
    if (userInfo) {
      setSelectedPersonalityIds([...userInfo.personalityIds]);
    }
  };

  useEffect(() => {
    const getPersonalityList = () => {
      try {
        getPersonalities().then(personalityData => {
          setPersonalities(personalityData);
        });
      } catch (error: any) {
        console.error(error.message);
      }
    };

    const getUserPersonalities = () => {
      if (userInfo) {
        setSelectedPersonalityIds([...userInfo.personalityIds]);
      }
    };

    getPersonalityList();
    getUserPersonalities();
  }, [setSelectedPersonalityIds, userInfo]);

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
          <Text style={styles.titleText}>나의 성향을</Text>
          <Text style={styles.titleText}>모두 선택해주세요</Text>
        </View>
        <View style={styles.counterWrap}>
          <ResetButton reset={reset} />
          <Text style={styles.counter}>{counter} / 10</Text>
        </View>
      </View>

      <ScrollView style={styles.personalityBox}>
        <View style={{paddingTop: 16, paddingBottom: bottom}}>
          <PersonalityList
            personalities={personalities}
            selectPersonality={selectPersonality}
            selectedPersonalityIds={selectedPersonalityIds}
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
    width: 48,
    fontSize: 13,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginHorizontal: 8,
    textAlign: 'right',
  },
  personalityBox: {
    marginHorizontal: 24,
    height: SCREEN_HEIGHT * 0.6,
  },
});
