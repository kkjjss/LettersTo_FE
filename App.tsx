// In App.js in a new project

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/Navigator/Navigator';
import SplashScreen from 'react-native-splash-screen';

export default function App() {

  useEffect(() => {
    // SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
