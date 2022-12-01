import React from 'react';
import {TouchableWithoutFeedback, View, Text} from 'react-native';
import {Notification} from '../../types/types';

type Props = {
  notification: Notification;
  onPress: (notification: Notification) => () => void;
};

export const NotificationItem = ({notification, onPress}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress(notification)}>
      <View
        style={{
          minHeight: 100,
          borderBottomColor: '#0000cc40',
          borderBottomWidth: 1,
          backgroundColor: notification.read ? 'white' : '#0000cc13',
          paddingHorizontal: 24,
          paddingVertical: 16,
          position: 'relative',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            position: 'absolute',
            top: 18,
            right: 24,
            fontFamily: 'Galmuri11',
            fontSize: 12,
            color: '#0000cc',
          }}>
          방금
        </Text>
        <View style={{height: 36, width: 36, backgroundColor: 'gray'}} />
        <View style={{marginLeft: 12, marginRight: 24}}>
          <View style={{height: 36, justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: 'Galmuri11',
                fontSize: 14,
                color: '#0000cc',
              }}>
              {notification.title.replace('님에게 ', '님에게\n')}
            </Text>
          </View>
          <View style={{minHeight: 30, justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: 'Galmuri11',
                fontSize: 12,
                color: '#0000cc',
              }}>
              {notification.content}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
