import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';
import ProductsList from '../components/ProductsList.tsx';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log('Categories are not fetched!', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        let url = 'https://fakestoreapi.com/products';
        if (selectedCategory) {
          url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
        }
        const response = await fetch(url);
        if (response.ok) {
          const data: Product[] = await response.json();
          console.log(data);
          if (sortOrder === 'asc') {
            data.sort((a, b) => a.price - b.price);
          } else if (sortOrder === 'desc') {
            data.sort((a, b) => b.price - a.price);
          }
          setProducts(data);
        }
        console.log(response, 'check');
      } catch (error) {
        console.log('Products are not fetched!', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [selectedCategory, sortOrder]);

  return (
    <div className={styles.container}>
      <h2>Products Page</h2>
      <div className={styles.filterContainer}>
        <button
          className={`${styles.filterBtn} ${selectedCategory === '' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.sortContainer}>
        <span>Sort by price </span>
        <button
          className={sortOrder === 'asc' ? styles.active : ''}
          onClick={() => setSortOrder('asc')}
        >
          Low to High
        </button>
        <button
          className={sortOrder === 'desc' ? styles.active : ''}
          onClick={() => setSortOrder('desc')}
        >
          High to Low
        </button>
        <button onClick={() => setSortOrder('')}>Clear</button>
      </div>
      {loading && <p>Loading...</p>}
      <div className={styles.grid}>
        {products.map((product) => (
          <>
            <ProductsList product={product} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Products;
