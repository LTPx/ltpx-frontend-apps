import { Button, ColorsButton } from '@ltpx-frontend-apps/shared-ui';
import { useCart } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import PaypalCheckoutButton from '../../../components/paypal-checkout-button/paypal-checkout-button';
import styles from './checkout.module.scss';

export function Checkout() {
  const { getTotal } = useCart();

  return (
    <div className={styles['container']}>
      <h1>Checkout</h1>
      <div className={styles['content']}>
        <div className={styles['payment-methods']}>
          <h2>Métodos de Pago</h2>
          <PaypalCheckoutButton
            product={{
              description: 'Curso de programación avanzada para todos los niveles',
              price: 5.99,
            }}
          />
        </div>
        <div className={styles['checkout']}>
          <h3>Summary</h3>
          <div className={styles['details']}>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <h4>Original Price:</h4>
              </div>
              <h4>${getTotal()}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <h4>Discounts</h4>
              </div>
              <h4>- $0.0</h4>
            </div>
            <hr className="solid" />
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <h4>Subtotal</h4>
              </div>
              <h4>${getTotal()}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <h4>Tax:</h4>
              </div>
              <h4>+ $0.0</h4>
            </div>
            <hr className="solid" />
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <h4>Total</h4>
              </div>
              <h4>${getTotal()}</h4>
            </div>
          </div>
          <div className={styles['terms-conditions']}>
            <input type="checkbox" id="accept" value="second_checkbox" />
            <NavLink to="/terms-and-conditions" target={'blank'}>
              <p>
                By completing your purchase you agree to these Terms of Service.
              </p>
            </NavLink>
          </div>
          {/* <Button
            color={ColorsButton.primary}
            title="Pay"
            full={true}
            onClick={() => {
              console.log('Pagar');
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
