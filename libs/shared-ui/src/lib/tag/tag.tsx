import Icon from '../icon/icon';
import styles from './tag.module.scss';

/* eslint-disable-next-line */
export enum ColorsTag {
  green = 'green',
  gray = 'gray',
  orange = 'orange',
  blue = 'blue',
  red = 'red',
  white = 'white',
}

export interface TagProps {
  text: string;
  color?: ColorsTag;
  icon?: string;
  className?: string;
}

export function Tag(props: TagProps) {
  const { text, color, icon, className } = props;

  const colorsTags = {
    green: `${styles['tag-green']}`,
    gray: `${styles['tag-gray']}`,
    orange: `${styles['tag-orange']}`,
    blue: `${styles['tag-blue']}`,
    red: `${styles['tag-red']}`,
    white: `${styles['tag-white']}`,
  };
  const selectedColor = colorsTags[color || ColorsTag.gray];

  return (
    <div className={`${className} ${styles['container']}`}>
      <div className={`${selectedColor} ${styles['tag']}`}>
        {icon && <Icon icon={icon} size={15}></Icon>}
        <h5>{text}</h5>
      </div>
    </div>
  );
}

export default Tag;
