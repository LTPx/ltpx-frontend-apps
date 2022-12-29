import styles from './filters.module.scss';

/* eslint-disable-next-line */
export interface Filter {
  text: string;
  count?: number;
}

export interface FiltersProps {
  filters: Array<Filter>;
  title: string;
}

export function Filters(props: FiltersProps) {
  const { filters, title } = props;
  return (
    <div className={styles['container']}>
      <h3>{title}</h3>
      <div className={styles['filters-content']}>
        {filters.map((filter, index) => (
          <div className={styles['filter']} key={index}>
            <input type="checkbox" value="first_checkbox"></input>
            <h4>{filter.text}</h4>
            {filter.count && (
              <h4 className={styles['number']}>({filter.count})</h4>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
