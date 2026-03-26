import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addItemsToCart: (product: CartItem) => void;
  removeItemsFromCart: (id: number) => void;
  totalItems: number;
  totalPrice: number;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | null>(null);

// export const useCart = () => useContext(CartContext);
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    return null;
  }
  return context;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Adding items to cart
  const addItemsToCart = (product: CartItem) => {
    setCart((prev: CartItem[]) => {
      const existingItemFound = prev.find((item) => item.id === product.id);

      if (existingItemFound) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  //Removing items from cart
  // const removeItemsFromCart = (id:number) => {
  //   setCart((prev: CartItem[]) => prev.filter((item) => item.id !== id));
  // };

  const removeItemsFromCart = (id: number) => {
    setCart((prev: CartItem[]) =>
      prev
        .map((item) => {
          if (item.id === id) {
            return item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null;
          }
          return item;
        })
        .filter((item) => item !== null),
    );
  };

  // calculate total items in cart
  let totalItems = 0;
  for (const item of cart) {
    totalItems = totalItems + item.quantity;
  }

  // calculate total price for cart
  let totalPrice = 0;
  for (const item of cart) {
    totalPrice = totalPrice + item.price * item.quantity;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemsToCart,
        removeItemsFromCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
