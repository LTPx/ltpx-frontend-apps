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
      received(data: {text: string}) {
        const notification = {
          text: data.text,
          date: 'Today',
          read: false
        }
        console.log('newNotification: ', notification);
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
