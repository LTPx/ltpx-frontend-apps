import styles from './settings-app-page.module.scss';

/* eslint-disable-next-line */
export interface SettingsAppPageProps {}

export function SettingsAppPage(props: SettingsAppPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SettingsAppPage!</h1>
    </div>
  );
}

export default SettingsAppPage;
