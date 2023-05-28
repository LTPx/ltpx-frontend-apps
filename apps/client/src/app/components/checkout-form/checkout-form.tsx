import { Button, Loader } from '@ltpx-frontend-apps/shared-ui';
import { useSite } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PaypalCheckoutButton from '../paypal-checkout-button/paypal-checkout-button';
import styles from './checkout-form.module.scss';

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
  isFree?: boolean;
}

export function CheckoutForm(props: CheckoutFormProps) {
  const { product, onClose, onSuccess, onError, open, isFree } = props;
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState<number>();
  const [error, setError] = useState(false);
  const { _createPaymentOrder, _confirmUserPayment } = useSite();
  const navigate = useNavigate();
  const confirmPayment = async (payment_id: string) => {
    if (orderId) {
      const { success, error } = await _confirmUserPayment({
        order_id: orderId,
        payment_gateway: 'paypal',
        receipt_id: payment_id,
      });
      if (success) {
        navigate('/');
        window.location.reload();
      } else {
        console.log(error);
      }
    }
  };

  const confirmFreePayment = async () => {
    if (orderId) {
      const { success, error } = await _confirmUserPayment({
        order_id: orderId,
        payment_gateway: 'none',
        receipt_id: 'free',
      });
      if (success) {
        navigate('/');
        window.location.reload();
      } else {
        console.log(error);
      }
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
  }, []);

  return (
    <>
      {error ? (
        <></>
      ) : (
        <Dialog
          isShown={open}
          hasFooter={false}
          title={isFree ? 'Inscribirme a este curso' : 'Checkout'}
          onCloseComplete={onClose}
          width={isFree ? '' : '55vw'}
        >
          <div className={styles['container']}>
            {orderCreated ? (
              <>
                {!isFree && (
                  <div className={styles['payment-methods']}>
                    <h3>Métodos de Pago</h3>
                    <PaypalCheckoutButton
                      product={product}
                      onSuccessPayment={(order) => {
                        confirmPayment(order.id);
                      }}
                      onErrorPayment={(error) => {
                        onError(error);
                      }}
                    />
                  </div>
                )}
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
                  {isFree && (
                    <Button
                      title="Quiero Inscribirme"
                      onClick={() => confirmFreePayment()}
                    />
                  )}
                </div>
              </>
            ) : (
              <div>
                {!error && <Loader></Loader>}
                {error && <h4>Ya estas inscrito a este curso</h4>}
              </div>
            )}
          </div>
        </Dialog>
      )}
    </>
  );
}

export default CheckoutForm;
