import { buildCourses } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton } from '@ltpx-frontend-apps/shared-ui';
import styles from './checkout.module.scss';

/* eslint-disable-next-line */
export interface CheckoutProps {}

export function Checkout(props: CheckoutProps) {
  const products = buildCourses(2);

  const subtotal = () => {
    let total = 0;
    products.forEach((product)=>{
      total = total + product.price;
    })
    return total;
  }

  return (
    <div className={styles['container']}>
      <h1>Checkout</h1>
      <div className={styles['content']}>
        <div className={styles['payment-methods']}>
          <h2>Payment Methods</h2>
          <div className={styles['payments']}>
            <div className={styles['header']}>
              <div className={styles['method']}>
                <img src="https://scontent.fuio1-2.fna.fbcdn.net/v/t39.30808-6/277526037_4982971031757279_1937510785369190079_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFUxjLcfZdKzOYTJBhYzHdVniKV4J-sQqOeIpXgn6xCoxVP_EXdfUGuMt2ItSActfMmDb72xxDQAkbLxJdb2HSE&_nc_ohc=BJVCtT0XYq0AX-yw-ZS&_nc_ht=scontent.fuio1-2.fna&oh=00_AfBPtZvq_sS6YH-sd5TqfnoO4-9o9ovzMtKd7zcE6ROIQQ&oe=639E7B72" alt="" />
                <h3>PayPhone</h3>
              </div>
              <div className={styles['content']}>
                <p>
                In order to complete your transaction, we will transfer you over to PayPhone secure servers.
                </p>
              </div>
            </div>
            <div className={styles['header']}>
              <div className={styles['method']}>
                <img src="https://dachx.com/wp-content/uploads/2019/08/Visa-MasterCard-1024x393.png" alt="" />
                <h3>Credit/Debit Card</h3>
              </div>
              <div className={styles['content']}>
                <form action="">

                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['checkout']}>
          <h3>Summary</h3>
          <div className={styles['details']}>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <h4>Original Price:</h4>
              </div>
              <h4>$40</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']} >
                <h4>Discounts</h4>
              </div>
              <h4>- $0.0</h4>
            </div>
            <hr className="solid" />
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <h4>Subtotal</h4>
              </div>
              <h4>$40</h4>
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
              <h4>$40</h4>
            </div>
          </div>
          <p>By completing your purchase you agree to these Terms of Service.</p>
          <Button
            color={ColorsButton.primary}
            title='Pay'
            full={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
