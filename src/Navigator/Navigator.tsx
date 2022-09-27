import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamsList} from '../types';
import useStore from '../Store/store';

// Splash
import {Splash} from '../Screens/Splash';

// 메인 서비스 스크린
import {Home} from '../Screens/Main/Home';

// 인증 관련 스크린
import {Auth} from '../Screens/Auth/Auth';

const Stack = createNativeStackNavigator<StackParamsList>();

export default function StackNavigator() {
  const {isLoggedIn, isLoading} = useStore();

  return (
    <Stack.Navigator initialRouteName="Splash">
      {isLoading ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
