import styles from './home.module.scss';
import { Navbar } from '@ltpx-frontend-apps/shared-ui';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {

  const links = [
    { title: 'Home', url: '/'},
    { title: 'Courses', url: '/courses'},
    { title: 'Become a teacher', url: '/register'},
    { title: 'Login', url: '/login'}
  ]

  return (
    <div className={styles['container']}>
      <Navbar links={links}/>
    </div>
  );
}

export default Home;
