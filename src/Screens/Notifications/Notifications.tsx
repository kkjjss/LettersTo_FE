import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getNotifications, setNotificationRead} from '../../APIs/notification';
import {Header2} from '../../Components/Headers/Header2';
import {NotificationItem} from '../../Components/Notification/NotificationItem';
import {NotificationSlideSwitch} from '../../Components/Notification/NotificationSlideSwitch';
import {StackParamsList} from '../../types/stackParamList';
import {Notification, NotificationList} from '../../types/types';

type Props = NativeStackScreenProps<StackParamsList, 'Notifications'>;

export const Notifications = ({navigation}: Props) => {
  const [excludeReadNotifications, setExcludeReadNotifications] =
    useState<boolean>(false);
  const [currentCursor, setCurrentCursor] = useState<number>();
  const [notifications, setNotifications] = useState<NotificationList>([]);

  const onPressBack = () => {
    navigation.pop();
  };

  const toggleNotificationType = () => {
    setExcludeReadNotifications(!excludeReadNotifications);
    setNotifications([]);
    setCurrentCursor(undefined);
  };

  const {top: SAFE_AREA_TOP, bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  // const data = [
  //   {
  //     id: 0,
  //     title: '【$닉네임$】님에게 두근두근 첫 답장이 왔어요!',
  //     content:
  //       'Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line...',
  //     type: 'STAMP',
  //     intent: 'string',
  //     read: true,
  //   },
  //   {
  //     id: 1,
  //     title: '앱스토어 리뷰 우표 5개 지급!',
  //     content: 'Sub Message : Line 1',
  //     type: 'STAMP',
  //     intent: 'string',
  //     read: false,
  //   },
  //   {
  //     id: 2,
  //     title: '【$닉네임$】님에게 두근두근 첫 답장이 왔어요!',
  //     content:
  //       'Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line...',
  //     type: 'STAMP',
  //     intent: 'string',
  //     read: true,
  //   },
  //   {
  //     id: 3,
  //     title: '앱스토어 리뷰 우표 5개 지급!',
  //     content: 'Sub Message : Line 1',
  //     type: 'STAMP',
  //     intent: 'string',
  //     read: true,
  //   },
  //   {
  //     id: 4,
  //     title: '【$닉네임$】님에게 두근두근 첫 답장이 왔어요!',
  //     content:
  //       'Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line...',
  //     type: 'STAMP',
  //     intent: 'string',
  //     read: true,
  //   },
  //   {
  //     id: 5,
  //     title: '앱스토어 리뷰 우표 5개 지급!',
  //     content: 'Sub Message : Line 1',
  //     type: 'STAMP',
  //     intent: 'string',
  //     read: true,
  //   },
  //   {
  //     id: 6,
  //     title: '【$닉네임$】님에게 두근두근 첫 답장이 왔어요!',
  //     content:
  //       'Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line 1 Sub Message : Line...',
  //     type: 'STAMP',
  //     intent: 'string',
  //     read: true,
  //   },
  //   {
  //     id: 7,
  //     title: '앱스토어 리뷰 우표 5개 지급!',
  //     content: 'Sub Message : Line 1',
  //     type: 'STAMP',
  //     intent: 'string',
  //     read: true,
  //   },
  // ];

  const onPressNotification = (notification: Notification) => async () => {
    console.log(notification.read);
    if (notification.read) {
      return;
    }

    try {
      await setNotificationRead(notification.id);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const notificationList = useMemo(() => {
    if (excludeReadNotifications === true) {
      return notifications.filter(e => e.read === false);
    } else {
      return notifications;
    }
  }, [excludeReadNotifications, notifications]);

  const getNotificationsWithParams = async (
    read?: boolean,
    cursor?: number,
  ) => {
    try {
      const {content, cursor: nextCursor} = await getNotifications(
        read,
        cursor,
      );

      setNotifications([...notifications, ...content]);
      setCurrentCursor(nextCursor);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getNotificationsWithParams(excludeReadNotifications, currentCursor);
  }, [excludeReadNotifications]);

  return (
    <View style={[styles.container, {paddingTop: SAFE_AREA_TOP}]}>
      <Header2 title={'알림'} color={'white'} onPressBack={onPressBack} />
      <View style={styles.contentContainer}>
        <NotificationSlideSwitch
          excludeReadNotifications={excludeReadNotifications}
          toggleNotificationType={toggleNotificationType}
        />
        {(excludeReadNotifications === true && notificationList.length > 0) ||
        (excludeReadNotifications === false && notificationList.length > 0) ? (
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
