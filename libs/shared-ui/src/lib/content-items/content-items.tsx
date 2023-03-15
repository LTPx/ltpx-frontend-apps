import styles from './content-items.module.scss';

/* eslint-disable-next-line */
export interface Item {
  image: string;
  title: string;
  text: string;
}

export interface ContentItemsProps {
  title?: string;
  describe?: string;
  items: Array<Item>;
}

export function ContentItems(props: ContentItemsProps) {
  const { title, describe, items } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['head']}>
        <h1 className={styles['title']}>{title}</h1>
        <h4>{describe}</h4>
      </div>
      <div className={styles['content']}>
        {items.map((item, index) => (
          <div className={styles['description']} key={index}>
            <div className={styles['image']}>
              <img src={item.image} />
            </div>
            <div className={styles['text-content']}>
              <h3>{item.title}</h3>
              <h4>{item.text}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentItems;
