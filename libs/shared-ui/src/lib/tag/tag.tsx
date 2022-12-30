import styles from './tag.module.scss';

/* eslint-disable-next-line */
export enum ColorsTag {
  green = 'green',
  gray = 'gray',
}

export interface TagProps {
  text: string;
  color?: ColorsTag;
}

export function Tag(props: TagProps) {
  const { text, color } = props;

  const colorsTags = {
    green: `${styles['tag-green']}`,
    gray: `${styles['tag-gray']}`,
  };
  const selectedColor = colorsTags[color || ColorsTag.gray];

  return (
    <div className={styles['container']}>
      <div className={`${selectedColor} ${styles['tag']}`}>
        <h4>{text}</h4>
      </div>
    </div>
  );
}

export default Tag;
