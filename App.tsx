// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/Navigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
