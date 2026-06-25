import { useCallback, useEffect, useState } from 'react';
import { productService } from '../services/productService';

export const useProducts = search => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await productService.listProducts({ search });
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Unable to fetch products');
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetchProducts: fetchProducts,
    setProducts,
  };
};
