import { useUser } from '@ltpx-frontend-apps/store';

export const useNotification = (messageListener: any) => {
  const { user, addNotification, notifications } = useUser();

  messageListener().then((payload: any) => {
    console.log('payload: ', payload);
    const { data }  = payload;
    const newNotification = {
      user_id: user.id,
      kind: data.type,
      text: data.text,
      meta: data.meta,
      created_at: data.created_at,
    }
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
