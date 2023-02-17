import {
  Loader,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
} from '@ltpx-frontend-apps/shared-ui';
import { useSite } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PaypalCheckoutButton from '../paypal-checkout-button/paypal-checkout-button';
import styles from './checkout-form.module.scss';

type MessageCheckout = {
  text: string;
  kind: SnackbarType;
};

interface CheckoutFormProps {
  product: {
    description: string;
    price: number;
    id: number;
    image?: string;
  };
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: any) => void;
}

export function CheckoutForm(props: CheckoutFormProps) {
  const { product, onClose, onSuccess, onError, open } = props;
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState<number>();
  const [message, setMessage] = useState<MessageCheckout>();
  const [error, setError] = useState(false);
  const { _createPaymentOrder, _confirmUserPayment } = useSite();

  const confirmPayment = async (payment_id: string) => {
    if (orderId) {
      await _confirmUserPayment({
        order_id: orderId,
        payment_gateway: 'paypal',
        receipt_id: payment_id,
      });
      setMessage({
        text: `Gracias por tu compra id: ${payment_id}`,
        kind: SnackbarType.success,
      });
    }
  };

  const createOrGetOrder = useCallback(async () => {
    const { success, data, error } = await _createPaymentOrder({
      course_session_id: product.id,
      description: product.description,
      amount: product.price,
    });
    if (success) {
      setOrderCreated(true);
      setOrderId(data.id);
    } else {
      setError(true);
      onError(error);
    }
  }, []);

  useEffect(() => {
    createOrGetOrder();
  }, [createOrGetOrder]);

  return (
    <Dialog
      isShown={open}
      hasFooter={false}
      title="Checkout"
      onCloseComplete={onClose}
      width={'55vw'}
    >
      <div className={styles['container']}>
        {orderCreated ? (
          <>
            <div className={styles['payment-methods']}>
              <h3>Métodos de Pago</h3>
              <PaypalCheckoutButton
                product={product}
                onSuccessPayment={(order) => {
                  confirmPayment(order.id);
                }}
                onErrorPayment={() => {}}
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
                    Al hacer esta compra aceptas nuestros términos y
                    condiciones.
                  </p>
                </NavLink>
              </div>
            </div>
          </>
        ) : (
          <div>
            {!error && <Loader></Loader>}
            {error && <h4>Ya estas inscrito a este curso</h4>}
          </div>
        )}
        {message && (
          <Snackbar
            open={true}
            position={SnackbarPosition.top}
            title={message.text}
            kind={message.kind}
            onClose={() => setMessage(undefined)}
            duration={2000}
          />
        )}
      </div>
    </Dialog>
  );
}

export default CheckoutForm;
