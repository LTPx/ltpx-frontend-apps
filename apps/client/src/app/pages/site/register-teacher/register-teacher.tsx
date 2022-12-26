import { Button, ColorsButton, Input, TypeButton } from '@ltpx-frontend-apps/shared-ui';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../store/context/user/user-context';
import styles from './register-teacher.module.scss';
import * as Yup from 'yup';
import { UserRoles } from '../../../store/interfaces/user';

/* eslint-disable-next-line */
export interface RegisterTeacherProps {}

export function RegisterTeacher(props: RegisterTeacherProps) {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
                .required('Name is required'),
      email: Yup.string()
                .email()
                .required('Email is required'),
      password: Yup.string()
                    .required('Password is required')
    }),
    onSubmit: async data => {
      const user = {
        email: data.email,
        name: data.name,
        role: UserRoles.teacher
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('isAuthenticated', 'true');

      try{
        navigate('/student/dashboard');
        setUser(user);
        //TODO: integrate API
      }
      catch(error){
        console.log(error);
      }
    }
  });

  return (
    <div className="main-container">
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h1>Become a E-Teacher</h1>
          <span>
            Discover a supportive community of online instructors.
            Get instant access to all creation courses resources
          </span>
          <form onSubmit={formik.handleSubmit}>
            <Input
              label='Name'
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={(e: any) => { formik.handleChange(e); }}
              value={formik.values.name}
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
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterTeacher;
