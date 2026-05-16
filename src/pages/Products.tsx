  import React, { useEffect, useState } from "react";
  import styles from "./Products.module.css";
  import ProductsList from "../components/ProductsList.tsx";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchProducts } from "../redux-store/product-action.ts";
  import { productActions } from "../redux-store/product-slice.ts";
  import { AppDispatch, RootState } from "../redux-store/index";

  type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  };

  const Products:React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { productsData, loading, error, selectedCategory, sortOrder } =
      useSelector((state:RootState) => state.products);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await fetch(
            "https://fakestoreapi.com/products/categories",
          );
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.log("Categories are not fetched!", error);
        }
      };

      fetchCategories();
    }, []);

    useEffect(() => {
      dispatch(fetchProducts(selectedCategory, sortOrder));
    }, [dispatch, selectedCategory, sortOrder]);

     
    return (
      <>
        <div className={styles.container}>
          <h2>Products Page</h2>
          <div className={styles.filterContainer}>
            <button
              className={`${styles.filterBtn} ${selectedCategory === "" ? styles.active : ""}`}
              // onClick={() => setSelectedCategory("")}
              onClick={() => dispatch(productActions.setSelectedCategory(""))}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ""}`}
                // onClick={() => setSelectedCategory(cat)}
                onClick={() => dispatch(productActions.setSelectedCategory(cat))}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className={styles.sortContainer}>
            <span>Sort by price </span>
            <button
              className={sortOrder === "asc" ? styles.active : ""}
              onClick={() => dispatch(productActions.setSortOrder("asc"))}
            >
              Low to High
            </button>
            <button
              className={sortOrder === "desc" ? styles.active : ""}
              onClick={() => dispatch(productActions.setSortOrder("desc"))}
            >
              High to Low
            </button>
            <button onClick={() => dispatch(productActions.setSortOrder(""))}>Clear</button>
          </div>
          {loading && <p>Loading...</p>}
          <div className={styles.grid}>
            {productsData.map((product:Product) => {
              return <ProductsList product={product} />;
            })}
          </div>
        </div>
      </>
    );
  };

  export default Products;



    // useEffect(() => {
    //   const getProducts = async () => {
    //     setLoading(true);
    //     try {
    //       let url = "https://fakestoreapi.com/products";
    //       if (selectedCategory) {
    //         url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
    //       }
    //       const response = await fetch(url);
    //       if (response.ok) {
    //         const data: Product[] = await response.json();
    //         console.log(data, "ProductsFetched");
    //         if (sortOrder === "asc") {
    //           data.sort((a, b) => a.price - b.price);
    //         } else if (sortOrder === "desc") {
    //           data.sort((a, b) => b.price - a.price);
    //         }
    //         setProducts(data);
    //       }
    //       console.log(response, "check");
    //     } catch (error) {
    //       console.log("Products are not fetched!", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   getProducts();
    // }, [selectedCategory, sortOrder]);

