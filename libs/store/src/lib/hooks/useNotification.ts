import { useEffect } from 'react';
import { useUser } from '@ltpx-frontend-apps/store';
import ActionCable from 'actioncable';
import { NotificationModel, NotificationWebHook } from '@ltpx-frontend-apps/api';
import { useMoment } from '@ltpx-frontend-apps/shared-ui';

export const useNotification = () => {
  const { user, addNotification, notifications } = useUser();

  useEffect(() => {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    const notificationsChannel = cable.subscriptions.create({
      channel: 'NotificationsChannel',
      id: user.id
    }, {
      received(notification: NotificationWebHook) {
        console.log('newNotification: ', notification);
        const newNotification = {
          user_id: user.id,
          kind: notification.type,
          text: notification.text,
          meta: notification.meta.data,
          created_at: notification.created_at
        }
        addNotification(newNotification);
      },
    });

    return () => {
      cable.subscriptions.remove(notificationsChannel);
    };
  }, []);

  return {
    notifications
  };
};
