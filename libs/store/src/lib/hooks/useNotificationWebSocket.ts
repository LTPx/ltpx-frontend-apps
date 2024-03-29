import { useEffect } from 'react';
import { useUser } from '@ltpx-frontend-apps/store';
import { NotificationWebHook } from '@ltpx-frontend-apps/api';

export const useNotificationWebSocket = (wsUrl: string) => {
  const { user, addNotification, notifications } = useUser();

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier:  JSON.stringify({
            channel: 'NotificationsChannel',
            id: user.id
          })
        })
      )
    }
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if(data.type === "ping") return;
      if(data.type === "welcome") return;
      if(data.type === "confirm_subscription") return;

      const { message } = data;
      if (message) {
        const notification: NotificationWebHook = message;
        const newNotification = {
          user_id: user.id,
          kind: notification.type,
          text: notification.text,
          meta: notification.meta.data,
          created_at: notification.created_at
        }
        addNotification(newNotification);
      }
    }
    return () => {
    };
  }, []);

  return {
    notifications
  };
};
