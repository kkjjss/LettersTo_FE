// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './src/Screens/Auth';
import MainStack from './src/Screens/Main';
import SplashScreen from './src/SplashScreen';
import {RootStackParamList} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        {/* Auth Navigator: Include Login and Signup */}
        <RootStack.Screen name="AuthStack" component={AuthStack} />
        {/* Navigation Drawer as a landing page */}
        <RootStack.Screen name="MainStack" component={MainStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
