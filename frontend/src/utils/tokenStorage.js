const ACCESS_TOKEN_KEY = 'pmd_access_token';
const REFRESH_TOKEN_KEY = 'pmd_refresh_token';

export const tokenStorage = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setTokens({ accessToken, refreshToken }) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },
  clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
