import React from 'react';
import styles from './Cart.module.css';
import { useCart } from '../store/CartContext.tsx';
import CartDetails from '../components/CartDetails.tsx';

const Cart = () => {
  const { cart, totalItems, totalPrice } = useCart();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Cart</h1>

      <div className={styles.summary}>
        <p>
          Total Items <span>{totalItems}</span>
        </p>
        <p>
          Total Price = <span>${totalPrice}</span>
        </p>
      </div>

      {cart.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        <div className={styles.cartList}>
          {cart.map((item) => (
            <>
              <CartDetails cart={item} />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
