import styles from './brand.module.scss';

/* eslint-disable-next-line */
export interface BrandProps {
  negativeSpace?: boolean
}

export function Brand(props: BrandProps) {
  const { negativeSpace } = props;
  const classSelected = negativeSpace ? styles['negative'] : '';
  return (
    <div className={`${styles['container']} ${classSelected}`}>
      <p>Open</p>
      <p style={{marginLeft: '0.6rem'}}>Mind</p>
    </div>
  );
}

export default Brand;
