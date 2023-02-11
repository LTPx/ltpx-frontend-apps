import { Icon } from '@ltpx-frontend-apps/shared-ui';
import { useCart } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import PaypalCheckoutButton from '../../../components/paypal-checkout-button/paypal-checkout-button';
import styles from './checkout.module.scss';

export function Checkout() {
  const { getTotal, coursesInCart } = useCart();

  return (
    <div className={styles['container']}>
      <h1>Checkout</h1>
      <div className={styles['content']}>
        <div className={styles['payment-methods']}>
          <div className={styles['products']}>
            {coursesInCart.map((course, index) => (
              <div className={styles['product']} key={index}>
                <img src={course.cover_url} alt="course" />
                <div className="s">
                  <h4>{course.title}</h4>
                  <h5>${course.price}</h5>
                </div>
              </div>
            ))}
          </div>
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
          <div className={styles['tip']}>
            <Icon icon="mail" size={19}></Icon>
            <h4>
              Una vez realizado el pago enviaremos el recibo a tu correo
              electrónico
            </h4>
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default Checkout;
