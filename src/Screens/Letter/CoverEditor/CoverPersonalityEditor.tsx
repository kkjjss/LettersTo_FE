import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../../Components/Headers/Header';
import {StackParamsList} from '../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PersonalityEditor} from '../../../Components/LetterEditor/Cover/PersonalityEditor';
import {LetterCoverPreview} from '../../../Components/LetterEditor/LetterCoverPreview';
import useStore from '../../../Store/store';
import {Header2} from '../../../Components/Headers/Header2';

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

    const disableNext = useMemo(
        () => selectedPersonalityIds.length === 0,
        [selectedPersonalityIds],
    );

    const goNext = () => {
        navigation.navigate('CoverStampSelector');
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
                <Header
                    navigation={navigation}
                    title={'성향 선택'}
                    next={'CoverStampSelector'}
                    // onPressNext={onPressNext}
                    disableNext={disableNext}
                />
                <Header2 title={'성향 선택'} onPressNext={goNext} />
                <View style={styles.cover}>
                    <LetterCoverPreview />
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
