import React from 'react';
import {Image, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useLetterEditorStore} from '../../Store/store';
import {GRADIENT_COLORS} from '../../Constants/letter';
import {SCREEN_WIDTH} from '../../Constants/screen';

export const DeliveryLetterCoverBackPreview = React.memo(() => {
  const {deliveryLetter} = useLetterEditorStore();

  console.log(deliveryLetter.deliveryType);

  return (
    <LinearGradient
      colors={[GRADIENT_COLORS[deliveryLetter?.paperColor ?? 'PINK'], 'white']}
      style={{
        width: SCREEN_WIDTH - 80,
        height: undefined,
        aspectRatio: 295 / 212,
        borderColor: '#0000cc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {deliveryLetter.deliveryType === 'STANDARD' ? (
          <>
            <Image
              source={require('../../Assets/StandardBox.png')}
              style={{width: 63, height: 21, margin: 10}}
            />
            <View
              style={{
                paddingVertical: 20,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0000cc13',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Galmuri11-Bold',
                    fontSize: 13,
                    color: '#0000cc',
                  }}>
                  Seoul
                </Text>
                <Image
                  source={require('../../Assets/>>>.png')}
                  style={{
                    width: 31,
                    resizeMode: 'contain',
                    marginHorizontal: 24,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Galmuri11-Bold',
                    fontSize: 13,
                    color: '#0000cc',
                  }}>
                  Jeju
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: 'Galmuri11',
                  fontSize: 13,
                  color: '#0000cc',
                  marginTop: 10,
                }}>
                1일 20시간 24분 후 도착
              </Text>
            </View>
          </>
        ) : (
          <>
            <Image
              source={require('../../Assets/ExpressBox.png')}
              style={{width: 63, height: 21, margin: 10}}
            />

            <LinearGradient
              colors={[
                '#FF47C119',
                '#FFFF0019',
                '#89F50019',
                '#44EFFF19',
                '#FF47C119',
              ]}
              style={{
                paddingVertical: 20,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Galmuri11-Bold',
                    fontSize: 13,
                    color: '#0000cc',
                  }}>
                  Seoul
                </Text>
                <Image
                  source={require('../../Assets/>>>.png')}
                  style={{
                    width: 31,
                    resizeMode: 'contain',
                    marginHorizontal: 24,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Galmuri11-Bold',
                    fontSize: 13,
                    color: '#0000cc',
                  }}>
                  Jeju
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: 'Galmuri11',
                  fontSize: 13,
                  color: '#0000cc',
                  marginTop: 10,
                }}>
                바로 도착해요!
              </Text>
            </LinearGradient>
          </>
        )}
      </View>
    </LinearGradient>
  );
});
