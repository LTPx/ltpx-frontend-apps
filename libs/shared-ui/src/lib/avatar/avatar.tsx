import styles from './avatar.module.scss';

/* eslint-disable-next-line */

export enum AvatarSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
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
      <img src={image} alt="user" className={`${styles[sizeAvatar]} ${outlineClass}`}/>
    </div>
  );
}

export default Avatar;
