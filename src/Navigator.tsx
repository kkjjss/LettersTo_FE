import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {StackParamsList} from '@type/stackParamList';

// Splash
import {Splash} from '@screens/SplashScreen';

// 메인 서비스 스크린
import {Main} from '@screens/Main/MainScreen';

// 편지 관련 스크린
import {ReadLetter} from '@screens/Letter/ReadLetter';
import {LetterBoxDetail} from '@screens/LetterBox/LetterBoxDetail';

// 인증 관련 스크린
import {Auth} from '@screens/Auth/AuthScreen';
import {NicknameForm} from '@screens/SignUp/NicknameFormScreen';
import {TopicsForm} from '@screens/SignUp/TopicsFormScreen';
import {PersonalityForm} from '@screens/SignUp/PersonalityFormScreen';
import {LocationForm} from '@screens/SignUp/LocationFormScreen';
import {MyPage} from '@screens/MyPage/MyPageScreen';
import {AccountDelete} from '@screens/MyPage/AccountDeleteScreen';

// 편지 작성
import {LetterEditor} from '@screens/Letter/LetterEditor';
import {CoverDeliverySelector} from '@screens/Letter/CoverEditor/CoverDeliverySelector/CoverDeliverySelectorScreen';
import {CoverTopicEditor} from '@screens/Letter/CoverEditor/CoverTopicEditor/CoverTopicEditorScreen';
import {CoverPersonalityEditor} from '@screens/Letter/CoverEditor/CoverPersonalityEditor/CoverPersonalityEditorScreen';
import {CoverStampSelector} from '@screens/Letter/CoverEditor/CoverStampSelector/CoverStampSelectorScreen';
import {LetterComplete} from '@screens/Letter/LetterComplete';

// 알림
import {Notifications} from '@screens/Notifications/Notifications';

// 우표
import {StampHistory} from '@screens/Stamp/StampHistory';

import {useAuthStore} from '@stores/auth';

const Stack = createNativeStackNavigator<StackParamsList>();

export default function StackNavigator() {
  const {isLoggedIn, isLoading} = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    isLoading: state.isLoading,
  }));

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      {isLoading ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : isLoggedIn ? (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="ReadLetter" component={ReadLetter} />
          <Stack.Screen name="LetterBoxDetail" component={LetterBoxDetail} />

          {/* 회원정보 수정 */}
          <Stack.Screen name="MyPage" component={MyPage} />
          <Stack.Screen name="AccountDelete" component={AccountDelete} />

          {/* 편지 작성 */}
          <Stack.Screen name="LetterEditor" component={LetterEditor} />
          <Stack.Screen
            name="CoverDeliverySelector"
            component={CoverDeliverySelector}
          />
          <Stack.Screen name="CoverTopicEditor" component={CoverTopicEditor} />
          <Stack.Screen
            name="CoverPersonalityEditor"
            component={CoverPersonalityEditor}
          />
          <Stack.Screen
            name="CoverStampSelector"
            component={CoverStampSelector}
          />
          <Stack.Screen name="LetterComplete" component={LetterComplete} />

          {/* 알림 */}
          <Stack.Screen name="Notifications" component={Notifications} />

          {/* 우표 */}
          <Stack.Screen name="StampHistory" component={StampHistory} />
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
