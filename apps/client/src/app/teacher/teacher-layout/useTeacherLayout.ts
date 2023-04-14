import { getChatStudents, UserModel } from "@ltpx-frontend-apps/api";
import { useAppStore, useUser, useUtil } from "@ltpx-frontend-apps/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionCable from 'actioncable';

export const useTeacherLayout = () => {
  const [openChat, setOpenChat] = useState(false);
  const [openNewChat, setOpenNewChat] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  const { feedbackAction } = useAppStore();
  const { clearMessageToast } = useUtil();
  const { user, logout } = useUser();
  const { teacher_account } = user;
  const { t } = useTranslation();
  const navigate = useNavigate();


  useEffect(() => {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    const notificationsChannel = cable.subscriptions.create({
      channel: 'NotificationsChannel',
      id: user.id
    }, {
      received(data: any) {
        console.log(data);
        setNotifications([...notifications, ...[data]])
      },
    });

    return () => {
      cable.subscriptions.remove(notificationsChannel);
    };
  }, []);

  async function logoutSession() {
    await logout();
    navigate('/');
    window.location.reload();
  };

  async function handleNewChat() {
    try {
      const data = await getChatStudents();
      setUsers(data);
      setOpenNewChat(true);
    } catch (error) {
      console.log(error);
    }
  }

  const headerLinks = [
    {
      title: t('dashboards.teacher.dashboard'),
      url: '/teacher/dashboard',
    },
    {
      title: t('dashboards.teacher.courses'),
      url: '/teacher/courses',
    },
    {
      title: t('dashboards.teacher.sessions'),
      url: '/teacher/sessions',
    },
    {
      title: t('dashboards.teacher.earnings'),
      url: '/teacher/earnings',
    },
  ];

  return {
    teacherAccount: teacher_account,
    currentUser: user,
    headerLinks,
    users,
    handleNewChat,
    logoutSession,
    openChat,
    setOpenChat,
    openNewChat,
    setOpenNewChat,
    feedbackAction,
    clearMessageToast,
    notifications
  };
};
