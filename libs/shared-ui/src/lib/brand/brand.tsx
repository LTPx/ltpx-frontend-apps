import Icon from '../icon/icon';
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
      {/* <p>Open</p>
      <p style={{marginLeft: '0.6rem'}}>Mind</p> */}
      <Icon icon='pix' color='#00bdab' size={25}/>
      <p>Openmind</p>
    </div>
  );
}

export default Brand;
