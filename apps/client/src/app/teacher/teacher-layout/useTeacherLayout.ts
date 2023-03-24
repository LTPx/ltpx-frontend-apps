import { getChatStudents, UserModel } from "@ltpx-frontend-apps/api";
import { useAppStore, useUser, useUtil } from "@ltpx-frontend-apps/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export const useTeacherLayout = () => {
  const [openChat, setOpenChat] = useState(false);
  const [openNewChat, setOpenNewChat] = useState(false);
  const [users, setUsers] = useState<UserModel[]>([]);
  const { user, logout } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { teacher_account } = user;
  const { feedbackAction } = useAppStore();
  const { cleanMessageToast } = useUtil();

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
      url: 'dashboard',
    },
    {
      title: t('dashboards.teacher.courses'),
      url: 'courses',
    },
    {
      title: t('dashboards.teacher.sessions'),
      url: 'sessions',
    },
    {
      title: t('dashboards.teacher.earnings'),
      url: 'earnings',
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
    cleanMessageToast,
  };
};
