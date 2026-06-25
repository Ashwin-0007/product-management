import env from '../config/env';
import { tokenStorage } from '../utils/tokenStorage';

class ApiClientError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.errors = errors;
  }
}

const buildUrl = endpoint => `${env.apiBaseUrl}${endpoint}`;

const parseResponse = async response => {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiClientError(payload.message || 'Request failed', {
      status: response.status,
      errors: payload.errors,
    });
  }

  return payload;
};

const refreshAccessToken = async () => {
  const refreshToken = tokenStorage.getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  const response = await fetch(buildUrl('/auth/refresh-token'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const payload = await parseResponse(response);
  tokenStorage.setTokens({
    accessToken: payload.data.accessToken,
    refreshToken,
  });

  return payload.data.accessToken;
};

export const request = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    body,
    headers = {},
    auth = true,
    retryOnUnauthorized = true,
  } = options;

  const accessToken = tokenStorage.getAccessToken();
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (auth && accessToken) {
    requestHeaders.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(buildUrl(endpoint), {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    return await parseResponse(response);
  } catch (error) {
    if (
      error instanceof ApiClientError &&
      error.status === 401 &&
      auth &&
      retryOnUnauthorized
    ) {
      const refreshedToken = await refreshAccessToken().catch(() => null);

      if (refreshedToken) {
        return request(endpoint, {
          ...options,
          retryOnUnauthorized: false,
        });
      }

      tokenStorage.clearTokens();
    }

    throw error;
  }
};

export { ApiClientError };
