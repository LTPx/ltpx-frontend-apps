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
        <div className={styles['general']}>
          <label >General</label>
          <div className={styles['general-grid']}>
            <div className={styles['fields']}>
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
            </div>
            <div className={styles['upload-image']}>
              <div className={styles['profile-image']}>
                <img src="https://images.unsplash.com/photo-1669563306078-4c107b67d125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80" alt="profile" />
              </div>
              <Button
                color={ColorsButton.primary}
                title="Upload Image"
                outline={true}
              />
            </div>
          </div>
        </div>
        <div className={styles['general']}>
          <label>Other Information</label>
          <div className={styles['general-grid']}>
            <div className={styles['fields']}>
              <Input
                label='Country'
                name="country"
                placeholder="Ecuador"
                onChange={(e: any) => { formik.handleChange(e); }}
                value={formik.values.country}
                onBlur={formik.handleBlur}
              />
              <Input
                label='City'
                name="city"
                placeholder="Guayaquil"
                onChange={(e: any) => { formik.handleChange(e); }}
                value={formik.values.city}
                onBlur={formik.handleBlur}
              />
              <Input
                label='Address'
                name="address"
                placeholder="Av Millares 29-12"
                onChange={(e: any) => { formik.handleChange(e); }}
                value={formik.values.address}
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
            </div>
          </div>
        </div>
        <div className={styles['form-submit']}>
          <Button
            color={ColorsButton.primary}
            title="Update Profile"
            type={TypeButton.submit}
          />
        </div>
      </form>
    </div>
  );
}

export default Account;
