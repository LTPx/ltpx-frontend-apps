import { useFormik } from 'formik';
import Button, { TypeButton } from '../button/button';
import Input from '../input/input';
import SelectImage from '../select-image/select-image';
import SelectedItems from '../selected-items/selected-items';
import styles from './achievement-by-score-form.module.scss';

/* eslint-disable-next-line */
export interface AchievementByScoreFormProps {
  singleSelection?: boolean;
}

export function AchievementByScoreForm(props: AchievementByScoreFormProps) {
  const { singleSelection } = props;
  const formik = useFormik({
    initialValues: {
      title: '',
      test: [],
      score: '',
      image: '',
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const images = [
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIIL-TvTwFYcMpJ5OnfGFgW6P3oUcO6XEKAA&usqp=CAU',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIIL-TvTwFYcMpJ5OnfGFgW6P3oUcO6XEKAA&usqp=CAU',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIIL-TvTwFYcMpJ5OnfGFgW6P3oUcO6XEKAA&usqp=CAU',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIIL-TvTwFYcMpJ5OnfGFgW6P3oUcO6XEKAA&usqp=CAU',
    },
  ];
  const quizzes = [
    { text: 'Test: La Tierra y el Universo', id: 1 },
    { text: 'Test: Via Láctea', id: 2 },
    { text: 'Test: Las estrellas', id: 3 },
  ];
  return (
    <div className={styles['container']}>
      <form>
        <div className={styles['score-form']}>
          <Input
            placeholder="Asigna un nombre interesante"
            label="Titulo del logro"
            value={formik.values.title}
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="title"
          />
          {singleSelection === true && (
            <>
              <label className={styles['title-test']}>Elige un test</label>
              <SelectedItems
                onChange={(items) => {
                  formik.setFieldValue('test', items);
                  console.log(items);
                }}
                items={quizzes}
                onlyOneSelection={true}
              />
            </>
          )}
          <label>Asignar score al test seleccionado</label>
          <Input 
            className={styles['input']} 
            type="number" min={1} 
            max={100}
            value={formik.values.score}
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="score"
          />
          <SelectImage
            onChange={(img) => {
              formik.setFieldValue('image', img);
            }}
            images={images}
          />
        </div>
        <div className={styles['footer']}>
          <Button
            type={TypeButton.submit}
            onClick={formik.submitForm}
            title="Guardar"
          />
        </div>
      </form>
    </div>
  );
}

export default AchievementByScoreForm;
