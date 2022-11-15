import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackParamsList} from '../../../types/stackParamList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StampSelector} from '../../../Components/LetterEditor/Cover/StampSelector';
import {LetterCoverPreview} from '../../../Components/LetterEditor/LetterCoverPreview';
import useStore, {useLetterEditorStore} from '../../../Store/store';
import {DeliveryLetterCoverPreview} from '../../../Components/LetterEditor/DeliveryLetterCoverPreview';
import {Header2} from '../../../Components/Headers/Header2';
import MaskedView from '@react-native-masked-view/masked-view';
import {LinearGradient} from 'expo-linear-gradient';

type Props = NativeStackScreenProps<StackParamsList, 'CoverExpressSelector'>;

export function CoverExpressSelector({navigation, route}: Props) {
  const [numberUserStamps, setNumberUserStamps] = useState<number>(5);

  const [deliveryType, setDeliveryType] = useState<
    'NONE' | 'NORMAL' | 'EXPRESS'
  >('NORMAL');

  const {setDeliveryLetterData} = useLetterEditorStore();

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  const disableNext = useMemo(() => {
    if (deliveryType === 'EXPRESS' && numberUserStamps < 5) {
      return true;
    } else if (deliveryType === 'NORMAL' && numberUserStamps < 1) {
      return true;
    } else {
      return false;
    }
  }, []);

  const goBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const goNext = useCallback(() => {
    navigation.navigate('CoverStampSelector', {reply: route.params?.reply});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

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
          title={'발송 방법 선택'}
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
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopColor: '#0000cc',
          borderTopWidth: 1,
        }}>
        <View style={styles.titleBox}>
          <View style={styles.titleWrap}>
            <Text style={styles.titleText}>발송 방법을</Text>
            <Text style={styles.titleText}>선택해주세요</Text>
          </View>
          <View style={styles.counterWrap}>
            <Text style={styles.counter}>보유 우표</Text>
            <Image
              source={require('../../../Assets/numberStamps.png')}
              style={{height: 24, width: 24}}
            />
            <Text style={styles.counter}>X {numberUserStamps}</Text>
          </View>
        </View>
        <View style={{flex: 1, padding: 24}}>
          <TouchableOpacity
            onPress={() => {
              setDeliveryType('NORMAL');
            }}
            style={[
              {
                width: '100%',
                height: undefined,
                aspectRatio: 327 / 132,
                marginBottom: 20,
                padding: 10,
              },
              deliveryType === 'NORMAL'
                ? {
                    borderWidth: 1,
                    borderColor: '#0000cc',
                    borderRadius: 10,
                  }
                : {
                    borderWidth: 1,
                    borderColor: '#7e7e7e',
                    borderRadius: 10,
                  },
            ]}>
            <View
              style={[
                {flex: 1, padding: 10},
                deliveryType === 'NORMAL' && {
                  backgroundColor: 'rgb(239,239,251)',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text
                  style={{
                    fontFamily: 'Galmuri11-Bold',
                    fontSize: 15,
                    color: '#0000cc',
                  }}>
                  Standard
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../../Assets/numberStamp.png')}
                    style={{height: 20, width: 20, marginRight: 5}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Galmuri11',
                      fontSize: 13,
                      color: '#0000cc',
                    }}>
                    X 1
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontFamily: 'Galmuri11',
                  fontSize: 15,
                  color: '#0000cc',
                }}>
                2일 18시간 40분 후에 도착해요
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDeliveryType('EXPRESS');
            }}
            style={[
              {
                width: '100%',
                height: undefined,
                aspectRatio: 327 / 132,
                padding: 10,
              },
              deliveryType === 'EXPRESS'
                ? {
                    borderWidth: 1,
                    borderColor: '#0000cc',
                    borderRadius: 10,
                  }
                : {
                    borderWidth: 1,
                    borderColor: '#cccccc',
                    borderRadius: 10,
                  },
            ]}>
            <View
              style={[
                {flex: 1, padding: 10},
                deliveryType === 'EXPRESS' && {
                  backgroundColor: 'rgb(239,239,251)',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <MaskedView
                  maskElement={
                    <Text
                      style={{
                        fontFamily: 'Galmuri11-Bold',
                        fontSize: 15,
                      }}>
                      Express
                    </Text>
                  }>
                  <LinearGradient
                    colors={[
                      'red',
                      'orange',
                      'yellow',
                      'green',
                      'blue',
                      'purple',
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}>
                    <Text
                      style={{
                        fontFamily: 'Galmuri11-Bold',
                        fontSize: 15,
                        color: '#0000cc',
                        opacity: 0,
                      }}>
                      Express
                    </Text>
                  </LinearGradient>
                </MaskedView>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../../Assets/numberStamp.png')}
                    style={{height: 20, width: 20, marginRight: 5}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Galmuri11',
                      fontSize: 13,
                      color: '#0000cc',
                    }}>
                    X 5
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontFamily: 'Galmuri11',
                  fontSize: 15,
                  color: '#0000cc',
                }}>
                바로 도착해요!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    backgroundColor: '#ffccee',
  },
  cover: {paddingTop: 12, paddingHorizontal: 40},
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
});
