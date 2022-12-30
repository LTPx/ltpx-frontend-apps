import type { ComponentMeta } from '@storybook/react';
import { NotificationList } from './notification-list';

const Story: ComponentMeta<typeof NotificationList> = {
  component: NotificationList,
  title: 'NotificationList',
};

export default Story;

const notifications = [
  {
    image:
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    text: 'Adrian Mohani Like Your Comment On Course Javascript Introduction',
    date: '17:50 Pm',
    read: true,
  },
  {
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    text: 'Stella Johnson Replay Your Comments in Programming for Games',
    date: '17:50 Pm',
    read: false,
  },
  {
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    text: 'Alex Dolgove Added New Review In Course Full Stack PHP Developer',
    date: '17:50 Pm',
    read: true,
  },
];

export const Default = () => {
  return (
    <div>
      <NotificationList
        notifications={notifications}
        countNewNotification={3}
      />
    </div>
  );
};

export const NotNotifications = () => {
  return (
    <div>
      <NotificationList notifications={[]} countNewNotification={0} />
    </div>
  );
};
