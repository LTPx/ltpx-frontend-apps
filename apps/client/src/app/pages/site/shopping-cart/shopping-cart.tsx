import { Button, ColorsButton, CourseCartItem } from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '../../../store';
import styles from './shopping-cart.module.scss';

/* eslint-disable-next-line */
export interface ShoppingCartProps {}

export function ShoppingCart(props: ShoppingCartProps) {

  const { isAuthenticated, products, removeCourseCart } = useUser();

  const handleRemoveItem = (id: number) => {
    removeCourseCart(id);
  }

  const subtotal = () => {
    let total = 0;
    products.forEach((product)=>{
      total = total + product.price_cents;
    })
    return total;
  }

  return (
    <div className={styles['container']}>
      <h1>Shopping Cart</h1>
      <div className={styles['content']}>
        <div className={styles['products']}>
          { products.map((product, index) => (
            <CourseCartItem
              key={index}
              id={product.id}
              cover={product.cover}
              category={product.category}
              title={product.title}
              price={product.price_cents}
              duration={0}
              lessons={0}
              stars={product.average_rating}
              onClickRemove={handleRemoveItem}
            />
          ))}
        </div>
        <div className={styles['checkout']}>
          { products.length ? (
            <>
              <h3>Subtotal</h3>
              <h2>${subtotal()}</h2>
              <Button
                color={ColorsButton.primary}
                title='Checkout'
                full={true}
                link={isAuthenticated ? '/checkout' : '/register' }
              />
            </>
          ) : null}
        </div>
      </div>
      { products.length === 0 && (
        <h3>Your cart is empty</h3>
      )}
    </div>
  );
}

export default ShoppingCart;
