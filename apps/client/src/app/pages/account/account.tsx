import styles from './account.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, ColorsButton, Input, TypeButton } from '@ltpx-frontend-apps/shared-ui';

/* eslint-disable-next-line */
export interface AccountProps {}

export function Account(props: AccountProps) {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone:'',
      image: '',
      birth: '',
      country: '',
      city: '',
      address: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
                .required('First Name is required'),
      lastName: Yup.string()
                .required('Password is required')
    }),
    onSubmit: async data => {
      console.log(data);
      try{
        //TODO: integrate API
      }
      catch(error){
        console.log(error);
      }
    }
  });

  return (
    <div className={styles['container']}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label='First Name'
          name="firstName"
          placeholder="Carlos"
          onChange={(e: any) => { formik.handleChange(e); }}
          value={formik.values.firstName}
          onBlur={formik.handleBlur}
        />
        <Input
          label='Last Name'
          name="lastName"
          placeholder="Huerta"
          onChange={(e: any) => { formik.handleChange(e); }}
          value={formik.values.lastName}
          onBlur={formik.handleBlur}
        />
        <Input
          label='Username'
          name="username"
          placeholder="carl"
          onChange={(e: any) => { formik.handleChange(e); }}
          value={formik.values.username}
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
          label='Phone'
          name="phone"
          placeholder="099876543"
          onChange={(e: any) => { formik.handleChange(e); }}
          value={formik.values.phone}
          onBlur={formik.handleBlur}
        />
        <Button
          className={styles['btn-submit']}
          color={ColorsButton.primary}
          title="Sign In"
          type={TypeButton.submit}
        />
      </form>
    </div>
  );
}

export default Account;
