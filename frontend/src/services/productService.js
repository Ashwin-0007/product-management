import { request } from '../api/httpClient';

const buildQuery = ({ search, page }) => {
  const params = new URLSearchParams();

  if (search?.trim()) {
    params.set('search', search.trim());
  }

  if (page) {
    params.set('page', page);
  }

  const query = params.toString();
  return query ? `?${query}` : '';
};

export const productService = {
  async listProducts({ search = '', page = 1 } = {}) {
    const payload = await request(`/products${buildQuery({ search, page })}`);
    return {
      data: payload.data,
      meta: payload.meta,
    };
  },

  async createProduct(product) {
    const payload = await request('/products', {
      method: 'POST',
      body: product,
    });
    return payload.data;
  },

  async updateProduct(productId, product) {
    const payload = await request(`/products/${productId}`, {
      method: 'PATCH',
      body: product,
    });
    return payload.data;
  },

  async deleteProduct(productId) {
    await request(`/products/${productId}`, {
      method: 'DELETE',
    });
  },
};
