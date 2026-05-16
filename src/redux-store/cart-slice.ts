import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
};

type CartState = {
    cart: CartItem[];
    totalItems: number;
    totalPrice: number;
};

const initialState: CartState = {
    cart: [],
    totalItems: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const existingItemFound = state.cart.find(item => item.id === action.payload.id);
            if(existingItemFound) {
            existingItemFound.quantity = existingItemFound.quantity + 1;   
            }
            else {
               state.cart.push({...action.payload, quantity: 1});
        }

              // calculate total items 
        let totalItems = 0;
        for(let item of state.cart) {
            totalItems = totalItems + item.quantity
        }
        state.totalItems = totalItems;

        // and total price
        let totalPrice = 0;
        for(let item of state.cart) {
            totalPrice = totalPrice + item.price * item.quantity
        }
        state.totalPrice = totalPrice;
    },
    removeItemsFromCart(state, action) {
            const existingItemFound = state.cart.find(item => item.id === action.payload);
            if(existingItemFound) {
                if(existingItemFound.quantity > 1) {
                    existingItemFound.quantity = existingItemFound.quantity - 1;
                } else {
                    state.cart = state.cart.filter(item => item.id !== action.payload)
                }
            }

            // calculate total items 
        let totalItems = 0;
        for(let item of state.cart) {
            totalItems = totalItems + item.quantity
        }
        state.totalItems = totalItems;

        // and total price
        let totalPrice = 0;
        for(let item of state.cart) {
            totalPrice = totalPrice + item.price * item.quantity
        }
        state.totalPrice = totalPrice;
        }
        }        
        
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;