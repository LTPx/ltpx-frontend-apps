import Tag, { TagProps } from '../tag/tag';
import styles from './tags-card.module.scss';

/* eslint-disable-next-line */
export interface TagsCardProps {
  tags: Array<TagProps>;
}

export function TagsCard(props: TagsCardProps) {
  const { tags } = props;
  return (
    <div className={styles['container']}>
      <h3>Tags</h3>
      <div className={styles['tags-content']}>
        {tags.map((tag, index) => (
          <Tag text={tag.text} key={index}></Tag>
        ))}
      </div>
    </div>
  );
}

export default TagsCard;
