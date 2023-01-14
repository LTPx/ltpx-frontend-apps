import { Classroom } from '@ltpx-frontend-apps/api';
import { useFormik } from 'formik';
import Button, { TypeButton } from '../button/button';
import SelectDates from '../select-dates/select-dates';
import Select from '../select/select';
import styles from './classroom-form.module.scss';

/* eslint-disable-next-line */
export interface ClassroomFormProps {
  onSubmit?: (data: Omit<Classroom, "condition">) => void;
  children?: any;
}

export function ClassroomForm(props: ClassroomFormProps) {
  const { onSubmit, children } = props;

  const formik = useFormik({
    initialValues: {
      min: '1',
      max: '2',
      hour: '0',
      minutes: '30',
      dates: [],
    },
    onSubmit: (data) => {
      const formData = {
        min: parseInt(data.min),
        max: parseInt(data.max),
        call_time_min: parseInt(data.minutes) + parseInt(data.hour),
        meetings: data.dates
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

  const numbers = [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '3', text: '3' },
    { value: '4', text: '4' },
    { value: '5', text: '5' },
    { value: '6', text: '6' },
    { value: '7', text: '7' },
    { value: '8', text: '8' },
    { value: '9', text: '9' },
    { value: '10', text: '10' },
  ];

  return (
    <form className={styles['form']}>
      <div className={styles['field-form']}>
        <label>Tamaño de la clase</label>
        <div className={styles['range']}>
          De <Select options={numbers} onChange={(e)=>{formik.setFieldValue('min', e.value)}}/> a
          <Select options={numbers} onChange={(e)=>{formik.setFieldValue('max', e.value)}}/> Estudiantes
        </div>
      </div>
      <div className={styles['field-form']}>
        <label>Duración de la clases</label>
        <div className={styles['range']}>
          Cada clase durara  <Select options={hours} onChange={(e)=>{formik.setFieldValue('hour', e.value)}}/>  hora(s), con
          <Select options={minutes} onChange={(e)=>{formik.setFieldValue('minutes', e.value)}}/> minutos
        </div>
      </div>
      <div className={styles['field-form']}>
        <label>Las clases serán en estas fechas</label>
        <SelectDates onChange={(dates)=>{formik.setFieldValue('dates', dates)}}/>
      </div>
      <div className={styles['buttons']}>
        {children}
        <Button title='Guardar clases' type={TypeButton.submit} onClick={formik.handleSubmit}/>
      </div>
    </form>
  )
}

export default ClassroomForm;
