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
import {
  NotificationMeta,
  NotificationModel,
} from '@ltpx-frontend-apps/api';
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
      fill_application: '/teacher/apply-teach',
      application_require_change: '/teacher/apply-teach',
      application_approved: '/teacher/dashboard',
      course_need_changes: '/teacher/courses/all',
      course_approved: '/teacher/courses/all',
      new_student: `/teacher/courses/${meta.entity_id}/students`,
      task_need_review: `/teacher/courses/${meta.entity_id}/students`,
      quiz_need_review: `/teacher/courses/${meta.entity_id}/students`,
      add_credit: '/teacher/earnings',
      withdrawal_completed: '/teacher/earnings',
      student_enrolled: '/student/dashboard',
      class_started: '/student/classes',
      task_reviewed: `/student/course/${meta.entity_meta.course_slug}`,
      quiz_reviewed: `/student/course/${meta.entity_meta.course_slug}`,
      achievement_reached: `/student/course/${meta.entity_meta.course_slug}`,
      course_completed: `/student/course/${meta.entity_meta.course_slug}`,
      chat_unread_messages: '/student/dashboard',
    };
    const linkToDetails = links[meta.action];
    return (
      <div className="text">
        {text} <NavLink to={linkToDetails}> Da clic aquí para revisar</NavLink>
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
