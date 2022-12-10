import styles from './home.module.scss';
import { Header } from '@ltpx-frontend-apps/shared-ui';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {

  const links = [
    { title: 'Home', url: '/'},
    { title: 'Courses', url: '/courses'},
    { title: 'Become a teacher', url: '/register'},
    { title: 'Login', url: '/login'}
  ];

  return (
    <div className={styles['container']}>
      <Header links={links}/>
      <h1>🚧 building app.....</h1>
    </div>
  );
}

export default Home;
