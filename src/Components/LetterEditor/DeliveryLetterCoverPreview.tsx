import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import useStore, {useLetterEditorStore} from '../../Store/store';
import {GRADIENT_COLORS} from '../../Constants/letter';
import {getCities, getRegions} from '../../APIs/geolocation';

const SelectedStampImage = ({stampId}: {stampId: number | undefined}) => {
  const {stamps} = useStore();
  return (
    <>
      {stampId ? (
        <Image
          style={{
            width: '85%',
            height: undefined,
            aspectRatio: 94 / 116,
            backgroundColor: '#0000cc13',
          }}
          source={stamps.find(stamp => stamp.id === stampId)?.image}
        />
      ) : (
        <View
          style={{
            width: '85%',
            height: undefined,
            aspectRatio: 94 / 116,
            backgroundColor: '#0000cc13',
            borderColor: '#0000cc',
            borderStyle: 'dashed',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 18, width: 18}}
            source={require('../../Assets/photo_blue.png')}
          />
        </View>
      )}
    </>
  );
};

export const DeliveryLetterCoverPreview = React.memo(() => {
  const {userInfo} = useStore();
  const {deliveryLetter, deliveryLetterTo} = useLetterEditorStore();

  const [fromText, setFromText] = useState('');

  const getFromAddress = useCallback(async () => {
    if (userInfo?.parentGeolocationId && userInfo.geolocationId) {
      const userRegion = (await getRegions()).find(
        region => region.id === userInfo.parentGeolocationId,
      );
      const userCity = (await getCities(userInfo.parentGeolocationId)).find(
        city => city.id === userInfo.geolocationId,
      );

      setFromText(
        [userInfo?.nickname, ', ', userRegion?.name, ' ', userCity?.name].join(
          '',
        ),
      );
    } else {
      return '1';
    }
  }, [userInfo]);

  const toText = useMemo(
    () => [deliveryLetterTo?.toNickname, deliveryLetterTo?.toAddress].join(' '),
    [deliveryLetterTo],
  );

  useEffect(() => {
    getFromAddress();
  }, [getFromAddress]);

  return (
    <LinearGradient
      colors={[GRADIENT_COLORS[deliveryLetter?.paperColor ?? 'PINK'], 'white']}
      style={{
        width: '100%',
        height: undefined,
        aspectRatio: 295 / 212,
        borderColor: '#0000cc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 173,
            flexWrap: 'wrap',
            marginRight: 16,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              width: '100%',
              fontSize: 15,
              fontFamily: 'Galmuri11',
              color: '#0000CC',
              lineHeight: 30,
            }}>
            ⌜{deliveryLetter?.title}⌟︎︎
          </Text>
        </View>
        <View style={{flex: 74}}>
          <ImageBackground
            source={require('../../Assets/stamp.png')}
            style={{
              width: 74,
              height: undefined,
              aspectRatio: 94 / 116,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SelectedStampImage stampId={deliveryLetter.stampId} />
          </ImageBackground>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Image
          source={require('../../Assets/From..png')}
          style={{height: 22, width: 48, resizeMode: 'contain'}}
        />
        <Text
          style={{
            marginLeft: 30,
            fontSize: 15,
            fontFamily: 'Galmuri11',
            color: '#0000CC',
            lineHeight: 30,
          }}>
          {toText}
        </Text>
        <Image
          source={require('../../Assets/From..png')}
          style={{height: 22, width: 48, resizeMode: 'contain'}}
        />
        <Text
          style={{
            marginLeft: 30,
            fontSize: 15,
            fontFamily: 'Galmuri11',
            color: '#0000CC',
            lineHeight: 30,
          }}>
          {fromText}
        </Text>
      </View>
    </LinearGradient>
  );
});
