import { ContentCourse } from '@ltpx-frontend-apps/api';
import { useFormik } from 'formik';
import { Dialog } from 'evergreen-ui';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Input from '../input/input';
import TextArea from '../text-area/text-area';
import styles from './course-content-form.module.scss';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface CourseContentFormProps {
  content?: ContentCourse;
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: ContentCourse) => void;
}

export function CourseContentForm(props: CourseContentFormProps) {
  const { open, onClose, onSubmit, content } = props;
  const { t } = useTranslation();
  const initialValues = {
    title: content?.title || '',
    description: content?.description || '',
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (data) => {
      onSubmit && onSubmit(data);
      closeReset();
    },
  });

  const closeReset = () => {
    formik.resetForm();
    onClose && onClose();
  };

  return (
    <div className={styles['container']}>
      <Dialog
        isShown={open}
        title={t('courseContentForm.title')}
        onCloseComplete={() => {
          closeReset();
        }}
        hasFooter={false}
        width={'50vw'}
      >
        <div className={styles['content']}>
          <div className={styles['form-content']}>
            <Input
              placeholder="Ejm: Introducción"
              label={t('courseContentForm.subtitle') || ''}
              value={formik.values.title}
              onChange={formik.handleChange}
              name="title"
            />
            <TextArea
              placeholder="Agrega el contenido necesario"
              label={t('courseContentForm.description') || ''}
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
              rows={8}
            />
          </div>
          <div className={styles['footer']}>
            <Button
              color={ColorsButton.white}
              onClick={() => {
                closeReset();
              }}
              title={t('buttons.cancel')}
            />
            <Button
              type={TypeButton.submit}
              onClick={formik.submitForm}
              title={t('buttons.saveContent')}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CourseContentForm;
