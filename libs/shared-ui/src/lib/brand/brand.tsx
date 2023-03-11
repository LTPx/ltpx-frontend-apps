import { Position, Tooltip } from 'evergreen-ui';
import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import Tag from '../tag/tag';
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
    <div className={`${styles['container']}`}>
      <div className={`${styles['brand']} ${classSelected}`}>
        <Icon icon="pix" color="#00bdab" size={25} />
        <p>OpenMind</p>
      </div>
      {!negativeSpace && (
        <div className={styles['tag-status']}>
          <Tooltip content="Estamos en una fase de prueba aun por lo que podrías experimentar algunos errores" position={Position.TOP}>
            <h5>Beta</h5>
          </Tooltip>
        </div>
      )}
    </div>
  );

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
