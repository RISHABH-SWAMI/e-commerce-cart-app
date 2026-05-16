// const { createSlice } = require("@reduxjs/toolkit");
import { createSlice } from "@reduxjs/toolkit";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ProductsState = {
    productsData: Product[],
    loading:Boolean,
    // error: string | null,
    selectedCategory: string,
    sortOrder: "asc" | "desc" | "";
}

const initialState: ProductsState = {
    productsData: [],
    loading: false,
    // error : null,
    selectedCategory: "",
    sortOrder: "",
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setProducts(state, action) {
            state.productsData = action.payload;
        },
        // setError(state, action) {
        //     state.error = action.payload;
        // },
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload
        },
        setSortOrder(state, action) {
            state.sortOrder = action.payload;
        }
    }
})

export const productActions = productSlice.actions;
export default productSlice.reducer;