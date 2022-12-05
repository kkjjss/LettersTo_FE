// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/Navigator/Navigator';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
