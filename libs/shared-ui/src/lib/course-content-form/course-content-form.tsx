import { ContentCourse } from '@ltpx-frontend-apps/api';
import { useFormik } from 'formik';
import { useState } from 'react';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Drawer from '../drawer/drawer';
import Input from '../input/input';
import TextArea from '../text-area/text-area';
import styles from './course-content-form.module.scss';

/* eslint-disable-next-line */
export interface CourseContentFormProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: ContentCourse) => void;
}

export function CourseContentForm(props: CourseContentFormProps) {
  const { open, onClose, onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: (data) => {
      onSubmit && onSubmit(data);
      onClose && onClose();
    },
  });

  return (
    <div className={styles['container']}>
      <Drawer
        open={open}
        onClose={() => {
          onClose && onClose();
        }}
      >
        <div className={styles['content']}>
          <h2>Agregar Contenido </h2>
          <div className={styles['form-content']}>
            <Input
              placeholder="Ejm: Introducción"
              label="Titulo de esta sección"
              value={formik.values.title}
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              name="title"
            />
            <TextArea
              placeholder="Descripción de este contenido"
              label="Descripción de esta sección"
              value={formik.values.description}
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              name="description"
              rows={8}
            />
          </div>
          <div className={styles['footer']}>
            <Button
              color={ColorsButton.white}
              onClick={() => {
                onClose && onClose();
              }}
              title="Cancelar"
            />
            <Button
              type={TypeButton.submit}
              onClick={formik.submitForm}
              title="Guardar"
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default CourseContentForm;
