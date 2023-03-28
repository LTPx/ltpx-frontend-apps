import Drawer from '../drawer/drawer';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Button, { ColorsButton, TypeButton } from '../button/button';
import SelectDates from '../select-dates/select-dates';
import Select from '../select/select';
import styles from './session-form.module.scss';
import Input from '../input/input';
import {
  CourseSession,
  SessionParams,
  TeacherClassType,
} from '@ltpx-frontend-apps/api';
import { useUser } from '@ltpx-frontend-apps/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { MeetingModel } from 'libs/api/src/lib/interfaces/meeting-interface';

/* eslint-disable-next-line */
export interface SessionFormProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: SessionParams) => void;
  session?: CourseSession;
}

export function SessionForm(props: SessionFormProps) {
  const { open, onClose, onSubmit, session } = props;
  const { user } = useUser();

  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      max_participants: '',
      hour: '0',
      minutes: '30',
      dates: [],
    },
    onSubmit: (data) => {
      const formData = {
        private_sessions: false,
        max_participants: parseInt(data.max_participants),
        call_time_min: parseInt(data.minutes) + parseInt(data.hour),
        meetings_attributes: data.dates.map((date) => {
          return { start_date: date, host_user_id: user.id };
        }),
      };
      onSubmit && onSubmit(formData);
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
        <section className={styles['section']}>
          <h2>Configurar Sesiones</h2>
          <div className={styles['field-form']}>
            <Input
              label="Numero de estudiantes"
              description="El numero máximo de personas que pueden tomaran este curso"
              type="number"
              name="max_participants"
              placeholder="12 estudiantes recomendado"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.max_participants}
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
              meetingDates={session?.meetings.map((meeting)=>{
                return meeting.start_date;
              })}
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
