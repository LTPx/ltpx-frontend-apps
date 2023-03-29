import Drawer from '../drawer/drawer';
import { FieldArray, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Select from '../select/select';
import styles from './session-form.module.scss';
import Input from '../input/input';
import {
  CourseSession,
  SessionParams,
} from '@ltpx-frontend-apps/api';
import { useUser } from '@ltpx-frontend-apps/store';
import * as Yup from 'yup';
import moment from 'moment';
import Icon from '../icon/icon';

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
  const currentDate = new Date();
  const today = currentDate.toISOString().split('T')[0] + 'T06:30';

  const getFormatDates = () => {
    if (session && session.meetings) {
      return session.meetings.map((meeting) => {
        return {
          id: meeting.id,
          date: meeting.start_date,
        };
      });
    } else {
      return [{ id: null, date: today }];
    }
  };

  const initialValues = {
    max_participants: session?.max_participants || 1,
    hour: 0,
    minutes: session?.call_time_min || 30,
    dates: getFormatDates(),
  };

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
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          max_participants:Yup.number()
          .required('Se debe agregar un numero de estudiantes')
          .min(1, "Se debe asignar al menos un estudiantes")
          .max(15, "El numero Máximo de estudiantes es de 15")
          .positive('Debe ser un numero mayor a 0'),
        })}
        onSubmit={(values) => {
          const formData = {
            private_sessions: false,
            max_participants: values.max_participants,
            call_time_min: values.minutes + values.hour,
            meetings_attributes: values.dates.map((item) => {
              if (item.id) {
                return {
                  start_date: item.date,
                  host_user_id: user.id,
                  id: item.id,
                };
              } else {
                return {
                  start_date: item.date,
                  host_user_id: user.id,
                };
              }
            }),
          };
          onSubmit && onSubmit(formData);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          submitForm,
          errors,
        }) => (
          <Form className={styles['form-quiz-options']}>
            <div className={styles['fields']}>
              <section className={styles['section']}>
                <h2>Configurar Sesiones</h2>
                <div className={styles['field-form']}>
                  <Input
                    label="Numero de estudiantes"
                    description="El numero máximo de personas que pueden tomaran este curso"
                    type="number"
                    name="max_participants"
                    placeholder="12 estudiantes recomendado"
                    onChange={handleChange}
                    value={values.max_participants}
                    onBlur={handleBlur}
                    errorMessage={errors.max_participants}
                  />
                </div>
                <div className={styles['field-form']}>
                  <label>{t('classroomForm.durationClasses')}</label>
                  <div className={styles['range']}>
                    Cada clase durara{' '}
                    <Select
                      options={hours}
                      onChange={(e) => {
                        setFieldValue('hour', e.value);
                      }}
                      errorMessage={errors.hour}
                    />{' '}
                    hora(s), con
                    <Select
                      options={minutes}
                      onChange={(e) => {
                        setFieldValue('minutes', e.value);
                      }}
                    />{' '}
                    minutos
                  </div>
                </div>
                {/* <InputTextStatus status={StatusInputText.error} text={ errors.hour} /> */}
                <br />
                <label>{t('classroomForm.dateClasses')}</label>
                <FieldArray
                  name="dates"
                  render={(arrayHelpers) => (
                    <div>
                      {values.dates.map((item, index) => (
                        <div className={styles['date-item']} key={index}>
                          <Input
                            type="datetime-local"
                            name={`dates[${index}].date`}
                            value={moment(item.date).format('YYYY-MM-DDTHH:mm')}
                            onChange={handleChange}
                          />
                          <div className={styles['actions']}>
                            <div
                              className={styles['remove']}
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <Icon icon="trash" size={15} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div
                        className={styles['add-date']}
                        onClick={() => arrayHelpers.push({ date: today })}
                      >
                        + Nueva Fecha
                      </div>
                    </div>
                  )}
                />
              </section>
            </div>
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
                onClick={submitForm}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
}

export default SessionForm;
