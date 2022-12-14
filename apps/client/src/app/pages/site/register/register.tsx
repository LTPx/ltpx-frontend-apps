import styles from './register.module.scss';
import { Button, ColorsButton, Input, TypeButton } from '@ltpx-frontend-apps/shared-ui';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useUser } from '../../../store';
import * as Yup from 'yup';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  const { register } = useUser();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
                .required('Nombre es obligatorio'),
      email: Yup.string()
                .email()
                .required('Email es obligatorio'),
      password: Yup.string()
                    .required('Password es obligatorio')
    }),
    onSubmit: async formData => {
      const { isLogin, data } = await register(formData);
      if (isLogin) {
        navigate('/student/dashboard');
        window.location.reload();
      } else {
        // setError(true);
      }
    }
  });

  return (
    <div className="main-container">
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h1>Register</h1>
          <span>
            Access a supportive community of online instructors.
            Get instant access to all creation courses resources
          </span>
          <form>
            <Input
              label='Name'
              type="text"
              name="fullname"
              placeholder="John Doe"
              onChange={(e: any) => { formik.handleChange(e); }}
              value={formik.values.fullname}
              onBlur={formik.handleBlur}
            />
            <Input
              label='Email'
              type="email"
              name="email"
              placeholder="myemail@example.com"
              onChange={(e: any) => { formik.handleChange(e); }}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <Input
              label='Password'
              type="password"
              name="password"
              placeholder='********'
              onChange={(e: any) => { formik.handleChange(e); }}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            <Button
              className={styles['btn-submit']}
              color={ColorsButton.primary}
              title="Sign In"
              full={true}
              type={TypeButton.submit}
              onClick={formik.handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
