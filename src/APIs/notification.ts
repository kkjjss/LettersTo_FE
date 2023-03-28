import {axiosInstance} from '@utils/http';

interface NotificationsRequestParams {
  read: boolean | undefined;
  cursor: number | undefined;
}

interface NotificationsResponse {
  content: any[];
  cursor: number;
}

export const getNotifications = async (data: NotificationsRequestParams) => {
  return await axiosInstance.get<NotificationsResponse>('/notifications', {
    params: data,
  });
};

export const setNotificationRead = async (id: number) => {
  return await axiosInstance.post(`/notifications/${id}/read`);
};
