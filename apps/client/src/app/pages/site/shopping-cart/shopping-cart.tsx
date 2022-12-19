import { Button, ColorsButton, CourseCartItem } from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '../../../hooks/useUser';
import styles from './shopping-cart.module.scss';

/* eslint-disable-next-line */
export interface ShoppingCartProps {}

export function ShoppingCart(props: ShoppingCartProps) {

  const { products, removeCourseFromCart } = useUser();

  const handleRemoveItem = (id: string) => {
    removeCourseFromCart(id);
  }

  const subtotal = () => {
    let total = 0;
    products.forEach((product)=>{
      total = total + product.price;
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
              image={product.image}
              category={product.category}
              title={product.title}
              price={product.price}
              duration={product.duration}
              lessons={product.lessons}
              stars={product.stars}
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
                link='/checkout'
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
