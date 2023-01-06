import styles from './app-layout.module.scss';

/* eslint-disable-next-line */
export interface AppLayoutProps {}

export function AppLayout(props: AppLayoutProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AppLayout!</h1>
    </div>
  );
}

export default AppLayout;
