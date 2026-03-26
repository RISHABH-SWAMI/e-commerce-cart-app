import { Link, NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useCart } from '../store/CartContext.tsx';

function MainNavigation() {
  const {totalItems} = useCart();
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products/1"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Product Details
            </NavLink>
          </li>
        </ul>
        <Link to="/cart">
          <button className={classes.cartBtn}>Cart {totalItems} </button>
        </Link>
      </nav>
    </header>
  );
}

export default MainNavigation;
