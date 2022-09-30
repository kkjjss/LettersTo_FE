import {Dimensions, StatusBar} from 'react-native';

export const SCREEN_HEIGHT =
  Dimensions.get('window').height - (StatusBar.currentHeight || 0);
