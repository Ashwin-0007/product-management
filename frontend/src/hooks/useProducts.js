import { useCallback, useEffect, useState } from 'react';
import { productService } from '../services/productService';

const DEFAULT_META = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
  count: 0,
};

export const useProducts = (search, page) => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(DEFAULT_META);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const { data, meta: responseMeta } = await productService.listProducts({ search, page });
      setProducts(data);
      setMeta(responseMeta || DEFAULT_META);
    } catch (err) {
      setError(err.message || 'Unable to fetch products');
    } finally {
      setIsLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    meta,
    isLoading,
    error,
    refetchProducts: fetchProducts,
    setProducts,
  };
};
