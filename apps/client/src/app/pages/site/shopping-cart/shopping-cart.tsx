import styles from './shopping-cart.module.scss';
import { Button, ColorsButton, CourseCartItem } from '@ltpx-frontend-apps/shared-ui';
import { useCart } from '@ltpx-frontend-apps/store';
export function ShoppingCart() {
  const { getTotal, coursesInCart, _removeCourseCart } = useCart();

  const handleRemoveItem = (id: number) => {
    _removeCourseCart(id);
  }

  return (
    <div className={styles['container']}>
      <h1>Cursos en la cesta</h1>
      <div className={styles['content']}>
        <div className={styles['products']}>
          { coursesInCart.map((product, index) => (
            <CourseCartItem
              key={index}
              id={product.id}
              cover={product.cover_url}
              category={product.category}
              title={product.title}
              price={product.price || '0.0'}
              duration={0}
              lessons={0}
              stars={product.average_rating}
              onClickRemove={handleRemoveItem}
            />
          ))}
        </div>
        <div className={styles['checkout']}>
          { coursesInCart.length ? (
            <>
              <h3>Subtotal</h3>
              <h2>${getTotal()}</h2>
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
      { coursesInCart.length === 0 && (
        <h3>Tu carrito esta vació</h3>
      )}
    </div>
  );
}

export default ShoppingCart;
