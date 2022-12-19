import {instanceWithAuth} from '../Utils/http';

export const getNotifications = async (data: {
  read?: boolean;
  cursor?: number;
}) => {
  return await instanceWithAuth.get('/notifications', data);
};

export const setNotificationRead = async (id: number) => {
  return await instanceWithAuth.post(`/notifications/${id}/read`);
};
