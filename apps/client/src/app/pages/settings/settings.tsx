import styles from './settings.module.scss';

/* eslint-disable-next-line */
export interface SettingsProps {}

export function Settings(props: SettingsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Settings!</h1>
    </div>
  );
}

export default Settings;
