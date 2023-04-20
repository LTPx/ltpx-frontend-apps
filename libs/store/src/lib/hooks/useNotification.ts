import { useEffect } from 'react';
import { useUser } from '@ltpx-frontend-apps/store';
import ActionCable from 'actioncable';

export const useNotification = () => {
  const { user, addNotification, notifications } = useUser();

  useEffect(() => {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    const notificationsChannel = cable.subscriptions.create({
      channel: 'NotificationsChannel',
      id: user.id
    }, {
      received(data: any) {
        const notification = {
          text: data.text,
          date: 'Today',
          kind: data.kind,
          meta: data.meta,
        };
        console.log('newNotification: ', data);
        addNotification(notification);
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
