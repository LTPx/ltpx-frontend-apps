import SelectedItems from '../selected-items/selected-items';
import styles from './achievement-by-quizzes--form.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectImage from '../select-image/select-image';
import Input from '../input/input';
import Button, { TypeButton } from '../button/button';
import { EntityAchievement, RuleAchievement } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface AchievementByQuizzesFormProps {
  singleSelection?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
}
const quizzes = [
  { text: 'Test: La Tierra y el Universo', id: 1 },
  { text: 'Test: Via Láctea', id: 2 },
  { text: 'Test: Las estrellas', id: 3 },
];
export function AchievementByQuizzesForm(props: AchievementByQuizzesFormProps) {
  const { onSubmit, onCancel, singleSelection } = props;
  const formik = useFormik({
    initialValues: {
      title: '',
      image: '',
      settings: [{
        text: '',
        id: 0,
        score: 0
      }],
      rule: singleSelection ? RuleAchievement.single : RuleAchievement.multiple,
    },
    onSubmit: (data) => {
      const settings = data.settings.map((setting) => {
        return {
          entity: EntityAchievement.quiz,
          score: 100,
          entity_id: setting.id,
        }
      })
      const elements = {
        ...data,
        settings
      };
      console.log(elements);
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

  return (
    <div className={styles['container']}>
      <form>
        <div className={styles['achievement-form']}>
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
          {singleSelection === true ? (
            <>
              <label>Elige un test</label>
              <SelectedItems
                onChange={(items) => {
                  formik.setFieldValue('settings', items);
                  console.log(items);
                }}
                items={quizzes}
                onlyOneSelection={true}
              />
            </>
          ) : (
            <>
              <label>Elige los test</label>
              <SelectedItems
                onChange={(items) => {
                  formik.setFieldValue('settings', items);
                  console.log(items);
                }}
                items={quizzes}
                onlyOneSelection={false}
              />
            </>
          )}
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

export default AchievementByQuizzesForm;
