import {
  Cart,
  Dropdown,
  NotificationItem,
  NotificationList,
  useMoment,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './notifications.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from '@ltpx-frontend-apps/store';
import { NotificationMeta, NotificationModel } from '@ltpx-frontend-apps/api';
import { messaging } from '../../../firebase';
import { getToken } from 'firebase/messaging';
import { NavLink } from 'react-router-dom';

export function Notifications() {
  const {
    _setTokenDevice,
    _getNotifications,
    _readNotifications,
    notifications,
    totalUnreadNotifications,
    clearUnreadNotification,
  } = useUser();
  const [notificationsItems, setNotificationsItems] = useState<
    NotificationItem[]
  >([]);
  const { fromNow } = useMoment();
  const icons = {
    task: 'task',
    quiz: 'quiz',
    system: 'cog',
    payment: 'bill',
    achievement: 'trophy',
  };

  const fetchNotifications = useCallback(async () => {
    await _getNotifications();
  }, []);

  async function fetchToken() {
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.NX_FIREBASE_VAPID_KEY,
      });
      if (token) {
        await _setTokenDevice(token);
      }
    } catch (error) {
      console.log('An error occurred while retrieving token. ', error);
    }
  }

  useEffect(() => {
    fetchNotifications();
    fetchToken();
  }, []);

  useEffect(() => {
    if (notifications.length) {
      const notificationsFormat = formatNotifications(notifications);
      setNotificationsItems(notificationsFormat);
    }
  }, [notifications]);

  function formatNotifications(notifications: NotificationModel[]) {
    return notifications.map((notification: NotificationModel) => {
      const icon = icons[notification.kind];
      return {
        kind: notification.kind,
        text: buildTextLink(notification.text, notification.meta),
        date: fromNow(notification.created_at),
        icon: icon,
      };
    });
  }

  function buildTextLink(text: string, meta: NotificationMeta) {
    const links = {
      fill_application: {
        url: '/teacher/apply-teach',
        params: ''
      },
      application_require_change: {
        url: '/teacher/apply-teach',
        params: ''
      },
      application_approved: {
        url: '/teacher/dashboard',
        params: ''
      },
      course_need_changes: {
        url: '/teacher/courses/all',
        params: ''
      },
      course_approved: {
        url: '/teacher/courses/all',
        params: ''
      },
      new_student: {
        url: `/teacher/courses/${meta.entity_id}/students`,
        params: ''
      },
      task_need_review: {
        url: `/teacher/courses/${meta.entity_id}/students`,
        params: '?tab=tasks'
      },
      quiz_need_review: {
        url: `/teacher/courses/${meta.entity_id}/students`,
        params: '?tab=quizzes'
      },
      add_credit: {
        url: '/teacher/earnings',
        params: ''
      },
      withdrawal_completed: {
        url: '/teacher/earnings',
        params: ''
      },
      student_enrolled: {
        url: '/student/dashboard',
        params: ''
      },
      class_started: {
        url: '/student/classes',
        params: ''
      },
      task_reviewed: {
        url: `/student/course/${meta.entity_meta?.course_slug}`,
        params: '?tab=tasks'
      },
      quiz_reviewed:  {
        url: `/student/course/${meta.entity_meta?.course_slug}`,
        params: '?tab=quizzes'
      },
      achievement_reached: {
        url: `/student/course/${meta.entity_meta?.course_slug}`,
        params: '?tab=achievements'
      },
      course_completed: {
        url: `/student/course/${meta.entity_meta?.course_slug}`,
        params: ''
      },
      chat_unread_messages: {
        url: '/student/dashboard',
        params: ''
      },
    };
    const linkToDetails = links[meta.action];
    return (
      <div className="text">
        {text}{' '}
        <NavLink
          to={{
            pathname: linkToDetails.url,
            search: linkToDetails.params,
          }}
        >
          Da clic aquí para revisar
        </NavLink>
      </div>
    );
  }

  async function clearNotifications() {
    const { success, error } = await _readNotifications();
    if (success) {
      clearUnreadNotification();
    } else {
      console.log(error);
    }
  }

  return (
    <Dropdown>
      <NotificationList notifications={notificationsItems} />
      <div className={styles['avatar']} onClick={clearNotifications}>
        <Cart amount={totalUnreadNotifications} />
      </div>
    </Dropdown>
  );
}

export default Notifications;
