import Button, { ColorsButton, TypeButton } from '../button/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../input/input';
import styles from './review-course-form.module.scss';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import GroupSelectOption, {
  OptionSelectGroup,
} from '../group-select-option/group-select-option';

/* eslint-disable-next-line */
export interface CourseReview {
  describeCourse: string;
  rateCourse: string;
  rateTeacher: string;
}

export interface ReviewCourseFormProps {
  rateCourse: Array<OptionSelectGroup>;
  rateTeacher: Array<OptionSelectGroup>;
  onSubmit: (data: CourseReview) => void;
}

export function ReviewCourseForm(props: ReviewCourseFormProps) {
  const { onSubmit, rateCourse, rateTeacher } = props;

  const formik = useFormik({
    initialValues: {
      describeCourse: '',
      rateCourse: '',
      rateTeacher: '',
    },
    validationSchema: Yup.object({
      describeCourse: Yup.string().required('La descripción es obligatoria'),
      rateCourse: Yup.string().required('se debe elegir una opción'),
      rateTeacher: Yup.string().required('se debe elegir una opción'),
    }),
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  return (
    <div className={styles['container']}>
      <form>
        <div className={styles['title']}>
          <h3>Tus opiniones sobre este curso</h3>
          <h4>
            El nombre del usuario se registrará y se mostrará con las respuestas
          </h4>
        </div>
        <div className={styles['general-grid']}>
          <div className={styles['form-field']}>
            <h4 className={styles['question']}>¿Cómo calificas este curso?</h4>
            <div>
              <GroupSelectOption
                className={styles['options']}
                options={rateCourse}
                onChange={(op) => {
                  formik.setFieldValue('rateCourse', op.text);
                }}
              />
              {formik.touched.rateCourse && formik.errors.rateCourse ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.rateCourse}
                />
              ) : null}
            </div>
          </div>
          <div className={styles['form-field']}>
            <h4 className={styles['question']}>
              En una palabra, ¿cómo describiría el curso a otros estudiantes?
            </h4>
            <div>
              <Input
                className={styles['input']}
                name="describeCourse"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.describeCourse}
                onBlur={formik.handleBlur}
              />
              {formik.touched.describeCourse && formik.errors.describeCourse ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.describeCourse}
                />
              ) : null}
            </div>
          </div>
          <div className={styles['form-field']}>
            <h4>¿Cómo calificas a tu profesor?</h4>
            <div>
              <GroupSelectOption
                className={styles['options']}
                options={rateTeacher}
                onChange={(op) => {
                  formik.setFieldValue('rateTeacher', op.text);
                }}
              />
              {formik.touched.rateTeacher && formik.errors.rateTeacher ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.rateTeacher}
                />
              ) : null}
            </div>
          </div>
          <div className={styles['form-submit']}>
            <Button
              color={ColorsButton.primary}
              title="Enviar respuestas"
              type={TypeButton.submit}
              onClick={formik.handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewCourseForm;
