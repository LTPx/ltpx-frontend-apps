import Icon from '../icon/icon';
import styles from './tag.module.scss';

/* eslint-disable-next-line */
export enum ColorsTag {
  green = 'green',
  gray = 'gray',
}

export interface TagProps {
  text: string;
  color?: ColorsTag;
  icon?: string;
}

export function Tag(props: TagProps) {
  const { text, color, icon } = props;

  const colorsTags = {
    green: `${styles['tag-green']}`,
    gray: `${styles['tag-gray']}`,
  };
  const selectedColor = colorsTags[color || ColorsTag.gray];

  return (
    <div className={styles['container']}>
      <div className={`${selectedColor} ${styles['tag']}`}>
        {icon && <Icon icon={icon} size={15}></Icon>}
        <h5>{text}</h5>
      </div>
    </div>
  );
}

export default Tag;
