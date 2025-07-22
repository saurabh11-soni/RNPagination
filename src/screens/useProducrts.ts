import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductProps } from './productsProps';

const LIMIT = 10;

const useProducrts = () => {
  const [productList, setProductList] = useState<ProductProps[]>([]);
  const [filterProductList, setFilterProductList] = useState<ProductProps[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  async function fetchProducts() {
    if (loading || isEnd) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${page}`,
      );
      const newProducts = response.data.products;

      setProductList(prev => [...prev, ...newProducts]);
      setFilterProductList(prev => [...prev, ...newProducts]);

      if (newProducts.length < LIMIT) {
        setIsEnd(true); // No more products
      } else {
        setPage(prev => prev + LIMIT);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function searchProduct(searchQuery: string) {
    let search = searchQuery?.toLowerCase();
    setSearchQuery(search);
    const filteredItem = filterProductList?.filter(item => {
      return item?.title?.toLowerCase().includes(search);
    });

    setProductList(filteredItem);
  }

  return {
    productList,
    loading,
    error,
    loadMore: fetchProducts,
    isEnd,
    searchQuery,
    searchProduct,
  };
};

export default useProducrts;
