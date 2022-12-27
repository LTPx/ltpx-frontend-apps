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
          <div className={styles['tag']}>
            <h4>{tag.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagsCard;
