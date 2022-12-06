import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useRef} from 'react';

export const NotificationSlideSwitch = ({
  excludeReadNotifications,
  toggleNotificationType,
}: {
  excludeReadNotifications: boolean;
  toggleNotificationType: () => void;
}) => {
  const [disableSwith, setDisableSwitch] = useState(false);
  const sliderPosition = useRef(new Animated.Value(0)).current;

  const slideLeft = Animated.timing(sliderPosition, {
    toValue: 0,
    duration: 200,
    useNativeDriver: false,
  });

  const slideRight = Animated.timing(sliderPosition, {
    toValue: 68,
    duration: 200,
    useNativeDriver: false,
  });

  const onPressToggleSwitch = () => {
    toggleNotificationType();
    setDisableSwitch(true);
    if (excludeReadNotifications === false) {
      slideRight.start(() => setDisableSwitch(false));
    } else {
      slideLeft.start(() => setDisableSwitch(false));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={onPressToggleSwitch}
        disabled={disableSwith}>
        <View style={styles.switch}>
          <Animated.View style={[styles.slider, {left: sliderPosition}]} />
          <View style={styles.notificationType}>
            <Text
              style={[
                styles.notificationTypeText,
                {
                  color:
                    excludeReadNotifications === false ? '#fff' : '#0000cc',
                },
              ]}>
              전체
            </Text>
          </View>
          <View style={styles.notificationType}>
            <Text
              style={[
                styles.notificationTypeText,
                {
                  color: excludeReadNotifications === true ? '#fff' : '#0000cc',
                },
              ]}>
              안읽음
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    height: 38,
    width: 138,
    borderColor: '#0000cc',
    borderWidth: 1,
    borderRadius: 19,
    flexDirection: 'row',
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    borderRadius: 18,
    backgroundColor: '#0000cc',
    height: 32,
    width: 64,
    margin: 2,
  },
  notificationType: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  notificationTypeText: {fontFamily: 'Galmuri11'},
});
