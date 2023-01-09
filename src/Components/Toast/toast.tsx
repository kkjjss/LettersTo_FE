import Toast from 'react-native-root-toast';

export const showToast = (
  text: string,
  duration = 2000,
  position = -100,
  shadow = true,
  animation = true,
  hideOnPress = true,
  delay = 0,
) => {
  return Toast.show(text, {
    duration,
    position,
    shadow,
    animation,
    hideOnPress,
    delay,
    textStyle: {
      fontFamily: 'Galmuri11',
    },
  });
};
