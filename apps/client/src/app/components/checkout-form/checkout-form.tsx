import { useCart } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import PaypalCheckoutButton from '../paypal-checkout-button/paypal-checkout-button';
import styles from './checkout-form.module.scss';

export function CheckoutForm() {
  const { coursesInCart, getTotal } = useCart();

  return (
    <div className={styles['container']}>
      <div className={styles['payment-methods']}>
        <h3>Métodos de Pago</h3>
        { coursesInCart.length && (
          <PaypalCheckoutButton
            product={{
              description: coursesInCart[0].title,
              price: parseFloat(coursesInCart[0].price),
              id: coursesInCart[0].id,
            }}
          />
        )}
      </div>
      <div className={styles['summary-total-order']}>
        <h3>Resumen</h3>
        <div className={styles['products']}>
          {coursesInCart.map((course, index) => (
            <div className={styles['product']} key={index}>
              <img src={course.cover_url} alt="course" />
              <div className="s">
                <h4>{course.title}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className={styles['details']}>
          <div className={styles['item']}>
            <div className={styles['item-text']}>
              <h4>Precio:</h4>
            </div>
            <h4>${getTotal()}</h4>
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
            <h4>${getTotal()}</h4>
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
            <h3>${getTotal()}</h3>
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
