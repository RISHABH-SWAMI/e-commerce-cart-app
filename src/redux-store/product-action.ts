import { AppDispatch } from "./index.ts";
import {productActions} from "./product-slice.ts";

export const fetchProducts = (
    selectedCategory = "",
    sortOrder = ""
) => {
    return async (dispatch:AppDispatch) => {
        dispatch(productActions.setLoading(true));
        try {
             let url =
                "https://fakestoreapi.com/products";

            if (selectedCategory) {
                url =
                    `https://fakestoreapi.com/products/category/${selectedCategory}`;
            }
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error("Products are not fetched")
            }
            const data = await response.json();
             // Sorting
            if (sortOrder === "asc") {

                data.sort(
                    (a: string | number, b: string | number) => a.price - b.price
                );

            } else if (sortOrder === "desc") {

                data.sort(
                    (a: string | number, b: string | number) => b.price - a.price
                );
            }
            dispatch(productActions.setProducts(data));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(productActions.setLoading(false));
        }
    }
}