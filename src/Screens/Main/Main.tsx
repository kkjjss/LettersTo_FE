import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useQueryClient} from 'react-query';
import {getUserInfo} from '../../APIs/member';
import {BottomTab} from '../../Components/BottomTab/BottomTab';
import {StackParamsList} from '../../types/stackParamList';
import {LetterBoxList} from '../LetterBox/LetterBoxList';
import {Home} from './Home';

type Props = NativeStackScreenProps<StackParamsList, 'Main'>;

export const Main = ({navigation}: Props) => {
  const [selectedScreen, setSelectedScreen] = useState<'Home' | 'LetterBox'>(
    'Home',
  );

  const goToHome = () => {
    setSelectedScreen('Home');
  };

  const goToLetterBox = () => {
    setSelectedScreen('LetterBox');
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUserInfo = async () => {
      await queryClient.prefetchQuery('userInfo', getUserInfo);
    };

    fetchUserInfo();
  }, [queryClient]);

  return (
    <View style={{flex: 1}}>
      {selectedScreen === 'Home' && <Home navigation={navigation} />}
      {selectedScreen === 'LetterBox' && (
        <LetterBoxList navigation={navigation} onPressHome={goToHome} />
      )}
      <BottomTab
        currentScreen={selectedScreen}
        onPressHome={goToHome}
        onPressLetterBox={goToLetterBox}
      />
    </View>
  );
};
