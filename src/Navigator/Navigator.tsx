import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamsList} from '../types/stackParamList';

// Splash
import {Splash} from '../Screens/Splash';

// 메인 서비스 스크린
import {Main} from '../Screens/Main/Main';

// 편지 관련 스크린
import {ReadLetter} from '../Screens/Letter/ReadLetter';
import {LetterBoxDetail} from '../Screens/LetterBox/LetterBoxDetail';

// 인증 관련 스크린
import {Auth} from '../Screens/Auth/AuthScreen';
import {NicknameForm} from '../Screens/SignUp/NicknameForm';
import {TopicsForm} from '../Screens/SignUp/TopicsForm';
import {PersonalityForm} from '../Screens/SignUp/PersonalityForm';
import {LocationForm} from '../Screens/SignUp/LocationForm';
import {MyPage} from '../Screens/MyPage/MyPage';
import {AccountDelete} from '../Screens/MyPage/AccountDelete';

// 편지 작성
import {LetterEditor} from '../Screens/Letter/LetterEditor';
import {CoverDeliverySelector} from '../Screens/Letter/CoverEditor/CoverDeliverySelector';
import {CoverTopicEditor} from '../Screens/Letter/CoverEditor/CoverTopicEditor';
import {CoverPersonalityEditor} from '../Screens/Letter/CoverEditor/CoverPersonalityEditor';
import {CoverStampSelector} from '../Screens/Letter/CoverEditor/CoverStampSelector';
import {LetterComplete} from '../Screens/Letter/LetterComplete';

// 알림
import {Notifications} from '../Screens/Notifications/Notifications';

// 우표
import {StampHistory} from '../Screens/Stamp/StampHistory';
import {useAuthStore} from '../Store/auth';

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
