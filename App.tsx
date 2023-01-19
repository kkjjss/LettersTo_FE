// In App.js in a new project

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/Navigator/Navigator';
import SplashScreen from 'react-native-splash-screen';
import {RootSiblingParent} from 'react-native-root-siblings';

export default function App() {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1500);
  }, []);

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </RootSiblingParent>
  );
}
