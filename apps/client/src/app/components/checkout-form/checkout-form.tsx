import { useCart } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import PaypalCheckoutButton from '../paypal-checkout-button/paypal-checkout-button';
import styles from './checkout-form.module.scss';

interface CheckoutFormProps {
  product: {
    description: string;
    price: number;
    id: number;
    image?: string;
  }
}

export function CheckoutForm(props: CheckoutFormProps) {
  const { product } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['payment-methods']}>
        <h3>Métodos de Pago</h3>
        <PaypalCheckoutButton
          product={product}
        />
      </div>
      <div className={styles['summary-total-order']}>
        <h3>Resumen</h3>
        <div className={styles['products']}>
          <div className={styles['product']}>
            <img src={product.image} alt="course" />
            <div className="s">
              <h4>{product.description}</h4>
            </div>
          </div>
        </div>
        <div className={styles['details']}>
          <div className={styles['item']}>
            <div className={styles['item-text']}>
              <h4>Precio:</h4>
            </div>
            <h4>${product.price}</h4>
          </div>
          <div className={styles['item']}>
            <div className={styles['item-text']}>
              <h4>Descuentos</h4>
            </div>
            <h4>- $0.0</h4>
          </div>
          <hr className="solid" />
          <div className={styles['item']}>
            <div className={styles['item-text']}>
              <h4>Subtotal</h4>
            </div>
            <h4>${product.price}</h4>
          </div>
          <div className={styles['item']}>
            <div className={styles['item-text']}>
              <h4>Impuestos:</h4>
            </div>
            <h4>+ $0.0</h4>
          </div>
          <hr className="solid" />
          <div className={styles['item']}>
            <div className={styles['item-text']}>
              <h3>Total</h3>
            </div>
            <h3>${product.price}</h3>
          </div>
        </div>
        <div className={styles['terms-conditions']}>
          <NavLink to="/terms-and-conditions" target={'blank'}>
            <p>
              Al hacer esta compra aceptas nuestros términos y condiciones.
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
