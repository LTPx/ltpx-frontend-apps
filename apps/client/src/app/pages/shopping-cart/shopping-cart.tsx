import { buildCourses } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, CourseCartItem } from '@ltpx-frontend-apps/shared-ui';
import styles from './shopping-cart.module.scss';

/* eslint-disable-next-line */
export interface ShoppingCartProps {}

export function ShoppingCart(props: ShoppingCartProps) {

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
      <h1>Shopping Cart</h1>
      <div className={styles['content']}>
        <div className={styles['products']}>
          { products.map((product, index) => (
            <CourseCartItem
              key={index}
              image={product.image}
              category={product.category}
              title={product.title}
              price={product.price}
              duration={product.duration}
              lessons={product.lessons}
              stars={product.stars}
            />
          ))}
        </div>
        <div className={styles['checkout']}>
          <h3>Subtotal</h3>
          <h2>${subtotal()}</h2>
          <Button color={ColorsButton.primary} title='Checkout' full={true}/>
        </div>
      </div>

    </div>
  );
}

export default ShoppingCart;
