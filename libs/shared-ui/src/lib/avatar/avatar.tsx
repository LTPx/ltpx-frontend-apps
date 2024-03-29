import styles from './avatar.module.scss';

/* eslint-disable-next-line */

export enum AvatarSize {
  tiny = 'tiny',
  small = 'small',
  medium = 'medium',
  medium_x = 'medium_x',
  large = 'large',
}

export interface AvatarProps {
  image: string;
  size?: AvatarSize;
  outline?: boolean;
}

export function Avatar(props: AvatarProps) {
  const { image, size, outline } = props;
  const sizeAvatar = size || AvatarSize.small;
  const outlineClass = outline ? styles['outline'] : '';

  return (
    <div className={`${styles['container']}`}>
      <img
        loading="lazy"
        src={image}
        alt="user"
        className={`${styles['img-avatar']} ${styles[sizeAvatar]} ${outlineClass}`}
      />
    </div>
  );
}

export default Avatar;
