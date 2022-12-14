import Icon from '../icon/icon';
import styles from './cart.module.scss';

/* eslint-disable-next-line */
export interface CartProps {
  amount?: number;
}

export function Cart(props: CartProps) {
  const { amount } = props;

  return (
    <div className={styles['container']}>
      { amount ? (
        <div className={styles['badged']}>{amount}</div>
      ) : null}
      <Icon icon='shopping-cart' size={20}/>
    </div>
  );
}

export default Cart;
