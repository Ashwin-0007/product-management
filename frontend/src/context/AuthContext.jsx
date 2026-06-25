import { useCallback, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { tokenStorage } from '../utils/tokenStorage';
import { AuthContext } from './authContextValue';

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      if (!tokenStorage.getAccessToken()) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const currentAdmin = await authService.getCurrentAdmin();
        setAdmin(currentAdmin);
      } catch {
        tokenStorage.clearTokens();
      } finally {
        setIsBootstrapping(false);
      }
    };

    bootstrapAuth();
  }, []);

  const login = useCallback(async credentials => {
    const loggedInAdmin = await authService.login(credentials);
    setAdmin(loggedInAdmin);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setAdmin(null);
  }, []);

  const value = useMemo(
    () => ({
      admin,
      isAuthenticated: Boolean(admin),
      isBootstrapping,
      login,
      logout,
    }),
    [admin, isBootstrapping, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
