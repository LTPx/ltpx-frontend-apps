import Drawer from '../drawer/drawer';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Button, { ColorsButton, TypeButton } from '../button/button';
import SelectDates from '../select-dates/select-dates';
import Select from '../select/select';
import styles from './session-form.module.scss';
import Input from '../input/input';

/* eslint-disable-next-line */
export interface SessionFormProps {
  open?: boolean;
  onClose?: () => void;
}

export function SessionForm(props: SessionFormProps) {
  const { open, onClose } = props;
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      students: '',
      hour: '0',
      minutes: '30',
      dates: [],
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });
  const hours = [
    { value: '0', text: '0' },
    { value: '60', text: '1' },
    { value: '120', text: '2' },
    { value: '180', text: '3' },
    { value: '240', text: '4' },
  ];

  const minutes = [
    { value: '00', text: '00' },
    { value: '15', text: '15' },
    { value: '30', text: '30' },
    { value: '45', text: '45' },
  ];

  return (
    <Drawer
      open={open}
      onClose={() => {
        onClose && onClose();
      }}
    >
      <form className={styles['form']}>
        <section>
          <h2>Configurar Sesiones</h2>
          <div className={styles['field-form']}>
            <Input
              label="Numero máximo de estudiantes en este curso"
              type="number"
              name="students"
              placeholder="numero de estudiantes"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.students}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className={styles['field-form']}>
            <label>{t('classroomForm.durationClasses')}</label>
            <div className={styles['range']}>
              Cada clase durara{' '}
              <Select
                options={hours}
                onChange={(e) => {
                  formik.setFieldValue('hour', e.value);
                }}
              />{' '}
              hora(s), con
              <Select
                options={minutes}
                onChange={(e) => {
                  formik.setFieldValue('minutes', e.value);
                }}
              />{' '}
              minutos
            </div>
          </div>
          <div className={styles['field-form']}>
            <label>{t('classroomForm.dateClasses')}</label>
            <SelectDates
              onChange={(dates) => {
                formik.setFieldValue('dates', dates);
              }}
            />
          </div>
        </section>
        <div className={styles['buttons']}>
          <Button
            color={ColorsButton.white}
            title="Cancelar"
            onClick={() => {
              onClose && onClose();
            }}
          />
          <Button
            color={ColorsButton.primary}
            title="Guardar"
            type={TypeButton.submit}
            onClick={formik.handleSubmit}
          />
        </div>
      </form>
    </Drawer>
  );
}

export default SessionForm;
