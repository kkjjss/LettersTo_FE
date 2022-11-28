import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header2} from '../../Components/Headers/Header2';
import {NotificationItem} from '../../Components/Notification/NotificationItem';
import {NotificationSlideSwitch} from '../../Components/Notification/NotificationSlideSwitch';
import {StackParamsList} from '../../types/stackParamList';
import {Notification, NotificationList} from '../../types/types';

type Props = NativeStackScreenProps<StackParamsList, 'Notifications'>;

export const Notifications = ({navigation}: Props) => {
  const [currentNotificationType, setCurrentNotificationType] = useState<
    'all' | 'notRead'
  >('all');

  const onPressBack = () => {
    navigation.pop();
  };

  const toggleNotificationType = () => {
    if (currentNotificationType === 'all') {
      setCurrentNotificationType('notRead');
    } else {
      setCurrentNotificationType('all');
    }
  };

  const {top: SAFE_AREA_TOP, bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  const data = [
    {
      id: 0,
      title: '【$닉네임$】님에게 두근두근 첫 답장이 왔어요!',
      content:
        'Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line...',
      type: 'STAMP',
      intent: 'string',
      read: true,
    },
    {
      id: 1,
      title: '앱스토어 리뷰 우표 5개 지급!',
      content: 'Sub Message : Line 1',
      type: 'STAMP',
      intent: 'string',
      read: false,
    },
    {
      id: 2,
      title: '【$닉네임$】님에게 두근두근 첫 답장이 왔어요!',
      content:
        'Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line...',
      type: 'STAMP',
      intent: 'string',
      read: true,
    },
    {
      id: 3,
      title: '앱스토어 리뷰 우표 5개 지급!',
      content: 'Sub Message : Line 1',
      type: 'STAMP',
      intent: 'string',
      read: true,
    },
    {
      id: 4,
      title: '【$닉네임$】님에게 두근두근 첫 답장이 왔어요!',
      content:
        'Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line...',
      type: 'STAMP',
      intent: 'string',
      read: true,
    },
    {
      id: 5,
      title: '앱스토어 리뷰 우표 5개 지급!',
      content: 'Sub Message : Line 1',
      type: 'STAMP',
      intent: 'string',
      read: true,
    },
    {
      id: 6,
      title: '【$닉네임$】님에게 두근두근 첫 답장이 왔어요!',
      content:
        'Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line...',
      type: 'STAMP',
      intent: 'string',
      read: true,
    },
    {
      id: 7,
      title: '앱스토어 리뷰 우표 5개 지급!',
      content: 'Sub Message : Line 1',
      type: 'STAMP',
      intent: 'string',
      read: true,
    },
  ];

  const [notifications, setNotifications] = useState<NotificationList>(data);

  const onPressNotification = (notification: Notification) => () => {
    if (notification.read === false) {
      const read = [...notifications];
      read[notification.id].read = true;
      setNotifications(read);
    }
  };

  const notificationList = useMemo(
    () =>
      currentNotificationType === 'notRead'
        ? notifications.filter(e => e.read === false)
        : notifications,
    [currentNotificationType, notifications],
  );

  return (
    <View style={[styles.container, {paddingTop: SAFE_AREA_TOP}]}>
      <Header2 title={'알림'} color={'white'} onPressBack={onPressBack} />
      <View style={styles.contentContainer}>
        <NotificationSlideSwitch
          currentNotificationType={currentNotificationType}
          toggleNotificationType={toggleNotificationType}
        />
        {(currentNotificationType === 'notRead' &&
          notificationList.length > 0) ||
        currentNotificationType === 'all' ? (
          <ScrollView contentContainerStyle={{paddingBottom: SAFE_AREA_BOTTOM}}>
            <View style={styles.hr} />
            {notificationList.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onPress={onPressNotification}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noUnreadNotification}>
            <Text style={styles.noUnreadNotificationText}>
              모든 알림을 확인했어요!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000cc',
  },
  contentContainer: {flex: 1, backgroundColor: 'white', marginTop: 5},
  hr: {
    borderTopColor: '#0000cc40',
    borderTopWidth: 1,
  },
  noUnreadNotification: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  noUnreadNotificationText: {
    fontFamily: 'Galmuri11',
    fontSize: 16,
    color: '#0000cc',
  },
});
