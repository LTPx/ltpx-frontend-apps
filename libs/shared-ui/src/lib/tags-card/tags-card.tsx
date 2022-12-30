import Tag from '../tag/tag';
import styles from './tags-card.module.scss';

/* eslint-disable-next-line */
export interface Tag {
  text: string;
}

export interface TagsCardProps {
  tags: Array<Tag>;
}

export function TagsCard(props: TagsCardProps) {
  const { tags } = props;
  return (
    <div className={styles['container']}>
      <h3>Tags</h3>
      <div className={styles['tags-content']}>
        {tags.map((tag, index) => (
          <div className={styles['tag']} key={index}>
            <Tag text={tag.text}></Tag>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagsCard;
