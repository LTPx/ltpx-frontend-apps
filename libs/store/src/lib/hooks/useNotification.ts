import { useUser } from '@ltpx-frontend-apps/store';

export const useNotification = (messageListener: any) => {
  const { user, addNotification, notifications } = useUser();

  messageListener().then((payload: any) => {
    const { data }  = payload;
    const metaNotification = JSON.parse(data.meta);
    const newNotification = {
      user_id: user.id,
      kind: data.type,
      text: data.text,
      meta: metaNotification.data,
      created_at: data.created_at,
    }
    console.log('newNotification: ', newNotification);
    if (data.receiver_id == user.id) {
      addNotification(newNotification);
    }
  }).catch((err: any) => {
    console.log('failed: ', err)
  });

  return {
    notifications
  };
};
