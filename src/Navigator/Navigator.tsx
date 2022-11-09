import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamsList} from '../types/stackParamList';
import useStore from '../Store/store';

// Splash
import {Splash} from '../Screens/Splash';

// 메인 서비스 스크린
import {Home} from '../Screens/Main/Home';

// 편지 관련 스크린
import {ReadLetter} from '../Screens/Letter/ReadLetter';

// 인증 관련 스크린
import {Auth} from '../Screens/Auth/Auth';
import {NicknameForm} from '../Screens/SignUp/NicknameForm';
import {TopicsForm} from '../Screens/SignUp/TopicsForm';
import {PersonalityForm} from '../Screens/SignUp/PersonalityForm';
import {LocationForm} from '../Screens/SignUp/LocationForm';
import {MyPage} from '../Screens/MyPage/MyPage';
import {AccountDelete} from '../Screens/MyPage/AccountDelete';

const Stack = createNativeStackNavigator<StackParamsList>();

export default function StackNavigator() {
  const {isLoggedIn, isLoading} = useStore();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      {isLoading ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : isLoggedIn ? (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ReadLetter" component={ReadLetter} />

          {/* 회원정보 수정 */}
          <Stack.Screen name="MyPage" component={MyPage} />
          <Stack.Screen name="AccountDelete" component={AccountDelete} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="NicknameForm" component={NicknameForm} />
          <Stack.Screen name="TopicsForm" component={TopicsForm} />
          <Stack.Screen name="PersonalityForm" component={PersonalityForm} />
          <Stack.Screen name="LocationForm" component={LocationForm} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
