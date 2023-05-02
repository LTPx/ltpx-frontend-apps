import { ColorsTag, SnackbarType } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useEditCourse = () => {
  const { t } = useTranslation();

  const statusColors = {
    published: ColorsTag.green,
    review: ColorsTag.blue,
    draft: ColorsTag.gray,
    rejected: ColorsTag.orange
  }

  const statusIcons = {
    published: 'globe',
    review: 'eye',
    draft: 'edit',
    rejected: 'pencil'
  }

  const [notification, setNotification] = useState({
    show: false,
    kind: SnackbarType.success,
    text: '',
  });

  const tabs = [
    { selected: true, text: t('teacherEditCourse.linksEditCourse.details') },
    { selected: false, text: t('teacherEditCourse.linksEditCourse.contents') },
    { selected: false, text: t('teacherEditCourse.linksEditCourse.quiz') },
    { selected: false, text: t('teacherEditCourse.linksEditCourse.task') },
    {
      selected: false,
      text: t('teacherEditCourse.linksEditCourse.achievement'),
    },
    { selected: false, text: t('teacherEditCourse.linksEditCourse.sessions') },
  ];

  return {
    tabs,
    notification,
    setNotification,
    statusColors,
    statusIcons
  };
};
