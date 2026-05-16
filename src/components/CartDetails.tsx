import React, { useState } from "react";
import styles from "./CartDetails.module.css";
import { cartActions } from "../redux-store/cart-slice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux-store/index.ts";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartDetailsProps {
  cart: CartItem;
}

const CartDetails: React.FC<CartDetailsProps> = ({ cart }) => {
  const [isPopping, setIsPopping] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (id) => {
    setIsPopping(true);
    // removeItemsFromCart(id);
    dispatch(cartActions.removeItemsFromCart(id));
    setTimeout(() => {
      setIsPopping(false);
    }, 600);
  };

  return (
    <>
      <div key={cart.id} className={styles.card}>
        <img src={cart.image} alt={cart.title} className={styles.image} />

        <div className={styles.details}>
          <h3>{cart.title}</h3>
          <p>${cart.price}</p>
          <p>Qty {cart.quantity}</p>
        </div>

        <button
          className={`${styles.removeBtn} ${isPopping ? styles.pop : ""}`}
          onClick={() => handleClick(cart.id)}
        >
          Remove
        </button>
      </div>
    </>
  );
};

export default CartDetails;
