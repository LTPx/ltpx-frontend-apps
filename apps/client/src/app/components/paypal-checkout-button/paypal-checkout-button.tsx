import styles from './paypal-checkout-button.module.scss';
import { PayPalButtons } from '@paypal/react-paypal-js';

/* eslint-disable-next-line */
export interface PaypalCheckoutButtonProps {
  product: {
    description: string;
    price: number;
  };
  onSuccessPayment: (order: any) => void;
  onErrorPayment: (error: any) => void;
}


export function PaypalCheckoutButton(props: PaypalCheckoutButtonProps) {
  const { product, onSuccessPayment, onErrorPayment } = props;

  return (
    <div className={styles['container']}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: product.price.toString(),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();
          if (order) {
            onSuccessPayment(order);
          } else {
            onErrorPayment({});
          }
        }}
        onError={onErrorPayment}
      />
    </div>
  );
}

export default PaypalCheckoutButton;
