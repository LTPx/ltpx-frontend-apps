import { useFormik } from 'formik';
import Drawer from '../drawer/drawer';
import styles from './reschedule-meeting-form.module.scss';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Icon from '../icon/icon';

/* eslint-disable-next-line */
export interface RescheduleMeetingFormProps {
  open?: boolean;
  onClose?: () => void;
  titleClass?: string;
  date?: string;
  time?: string;
}

export function RescheduleMeetingForm(props: RescheduleMeetingFormProps) {
  const { open, onClose, titleClass, date, time } = props;
  const formik = useFormik({
    initialValues: {
      date_time: '',
      reason: '',
      comment: '',
    },
    validationSchema: Yup.object({
      date_time: Yup.string().required('fecha y hora es obligatorio'),
      reason: Yup.string().required('Razón es obligatorio'),
    }),
    onSubmit: (data) => {
      console.log(data);
    },
  });
  return (
    <Drawer
      open={open}
      onClose={() => {
        onClose && onClose();
      }}
    >
      <div className={styles['content']}>
        <form className={styles['form']}>
          <h1>Reagendar Clase</h1>
          <div className={styles['head']}>
            <h4>{titleClass}</h4>
            <div className={styles['class-information']}>
              <div className={styles['item']}>
                <Icon icon={'calendar'} size={20} />
                <h4>{date}</h4>
              </div>
              <div className={styles['item']}>
                <Icon icon={'clock'} size={20} />
                <h4>{time}</h4>
              </div>
            </div>
          </div>
          <Input
            label="Elegir fecha y hora"
            type="datetime-local"
            name="date_time"
            value={formik.values.date_time}
            onBlur={formik.handleBlur}
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            errorMessage={formik.errors.date_time}
          />
          <Input
            label="Razón"
            type="text"
            name="reason"
            placeholder="Especifica tu razón para reagendar"
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            value={formik.values.reason}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.reason}
          />
          <Input
            label="Comentario"
            type="text"
            name="comment"
            placeholder="Deja un comentario"
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            value={formik.values.comment}
            onBlur={formik.handleBlur}
          />
        </form>
        <div className={styles['btn-submit']}>
          <Button
            color={ColorsButton.white}
            title="Cancelar"
            onClick={() => {
              onClose && onClose();
            }}
          />
          <Button
            color={ColorsButton.primary}
            title="Reagendar"
            type={TypeButton.submit}
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
    </Drawer>
  );
}

export default RescheduleMeetingForm;
