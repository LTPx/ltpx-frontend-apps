import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import styles from './brand.module.scss';

/* eslint-disable-next-line */
export interface BrandProps {
  negativeSpace?: boolean;
  link?: string;
}

export function Brand(props: BrandProps) {
  const { negativeSpace, link } = props;
  const classSelected = negativeSpace ? styles['negative'] : '';

  const BrandComponent = () => (
    <div className={`${styles['container']} ${classSelected}`}>
    <Icon icon='pix' color='#00bdab' size={25}/>
    <p>Openmind</p>
  </div>
  )

  return (
    <>
      {link ? (
        <NavLink to={link}>
          <BrandComponent />
        </NavLink>
      ) : (
        <BrandComponent />
      )}
    </>
  );
}

export default Brand;
