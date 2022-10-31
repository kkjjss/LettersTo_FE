import {Dimensions, StatusBar} from 'react-native';

export const SCREEN_HEIGHT =
  Dimensions.get('window').height - (StatusBar.currentHeight || 0);

export const SCREEN_WIDTH = Dimensions.get('window').width;
