import styles from './avatar.module.scss';

/* eslint-disable-next-line */
export interface AvatarProps {
  image?: string;
}

export function Avatar(props: AvatarProps) {
  const { image } = props;
  return (
    <div className={styles['container']}>
      <img src={image} alt="user" />
    </div>
  );
}

export default Avatar;
