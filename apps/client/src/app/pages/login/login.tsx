import styles from './login.module.scss';
import { Button, ColorsButton, Input, Header, TypeButton } from '@ltpx-frontend-apps/shared-ui';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/* eslint-disable-next-line */
export interface LoginProps {}

const links = [
  { title: 'Home', url: '/'},
  { title: 'Courses', url: '/courses'},
  { title: 'Become a teacher', url: '/register'},
  { title: 'Login', url: '/login'}
];

export function Login(props: LoginProps) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
                .email()
                .required('Email is required'),
      password: Yup.string()
                    .required('Password is required')
    }),
    onSubmit: async data => {
      console.log(data);
      try{
        navigate('/user/dashboard');
        //TODO: integrate API
      }
      catch(error){
        console.log(error);
      }
    }
  });

  return (
    <div className="main-container">
      <Header links={links}/>
      <div className={styles['container']}>
        <div className={styles['illustration']}></div>
        <div className={styles['content']}>
          <h1>Log in</h1>
          <span>
            Access a supportive community of online instructors.
            Get instant access to all creation courses resources
          </span>
          <form onSubmit={formik.handleSubmit}>
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

export default Login;
