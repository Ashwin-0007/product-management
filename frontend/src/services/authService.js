import { request } from '../api/httpClient';
import { tokenStorage } from '../utils/tokenStorage';

export const authService = {
  async login(credentials) {
    const payload = await request('/auth/login', {
      method: 'POST',
      body: credentials,
      auth: false,
    });

    tokenStorage.setTokens(payload.data);
    return payload.data.admin;
  },

  async getCurrentAdmin() {
    const payload = await request('/auth/me');
    return payload.data.admin;
  },

  async logout() {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      tokenStorage.clearTokens();
    }
  },
};
