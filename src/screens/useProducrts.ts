import axios from 'axios';
import { useEffect, useState } from 'react';

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

const LIMIT = 10;

const useProducrts = () => {
  const [productList, setProductList] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0); 
  const [isEnd, setIsEnd] = useState(false);

  async function fetchProducts() {
    if (loading || isEnd) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${page}`,
      );
      const newProducts = response.data.products;

      setProductList(prev => [...prev, ...newProducts]);

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

  return {
    productList,
    loading,
    error,
    loadMore: fetchProducts,
    isEnd,
  };
};

export default useProducrts;
