
import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cart-slice.ts';
import productReducer from './product-slice.ts';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer, 
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;