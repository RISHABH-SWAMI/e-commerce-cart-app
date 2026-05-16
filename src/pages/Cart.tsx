import React from 'react';
import styles from './Cart.module.css';
// import { useCart } from '../store/CartContext.tsx';
import CartDetails from '../components/CartDetails.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-store/index.ts';

const Cart = () => {
  // const { cart, totalItems, totalPrice } = useCart();
  const {cart,  totalItems, totalPrice} = useSelector((state:RootState) => state.cart);
  // console.log(state, "checkState")



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Cart</h1>

      <div className={styles.summary}>
        <p>
          Total Items <span>{totalItems}</span>
        </p>
        <p>
          Total Price = <span>${totalPrice.toFixed(2)}</span>
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
