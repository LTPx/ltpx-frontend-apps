import styles from './paypal-checkout-button.module.scss';
import { PayPalButtons } from '@paypal/react-paypal-js';
import {
  Snackbar,
  SnackbarPosition,
  SnackbarType,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import { useSite } from '@ltpx-frontend-apps/store';

/* eslint-disable-next-line */
export interface PaypalCheckoutButtonProps {
  product: {
    description: string;
    price: number;
    id: number;
  };
}

type MessageCheckout = {
  text: string;
  kind: SnackbarType;
};

export function PaypalCheckoutButton(props: PaypalCheckoutButtonProps) {
  const { product } = props;
  const [message, setMessage] = useState<MessageCheckout>();
  const { _enrollUser } = useSite();

  async function handleApproved (orderId: string) {
    await _enrollUser({
      price: product.price,
      course_id: product.id
    })
    setMessage({
      text: `Gracias por tu compra id: ${orderId}`,
      kind: SnackbarType.success,
    });
  }

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
        onClick={(data, actions) => {
          console.log('clicked...: ', data);
          //validations
          const ok = true;
          if (ok) {
            actions.resolve();
            // return actions.resolve():
          } else {
            actions.reject();
            // return actions.reject():
          }
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();
          console.log('order: ', order);
          console.log('data: ', data);
          if (order) {
            handleApproved(order.id);
          } else {
            console.log('weird..');
          }
        }}
        onCancel={(error) => {
          console.log('error: ', error);
          setMessage({
            text: 'Tu orden ha sido cancelada',
            kind: SnackbarType.message,
          });
        }}
        onError={(error) => {
          console.log('error: ', error);
          setMessage({
            text: 'No hemos podido procesar tu compra',
            kind: SnackbarType.error,
          });
        }}
      />
      {message && (
        <Snackbar
          open={true}
          position={SnackbarPosition.top}
          title={message.text}
          kind={message.kind}
          onClose={()=> setMessage(undefined)}
          duration={2000}
        />
      )}
    </div>
  );
}

export default PaypalCheckoutButton;
