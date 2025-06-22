
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAdminAuth = () => {
  const [authState, setAuthState] = useState<AdminAuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      // Check multiple storage methods for mobile compatibility
      const localStorageAuth = localStorage.getItem('admin_logged_in');
      const sessionStorageAuth = sessionStorage.getItem('admin_logged_in');
      
      // Also check for a session cookie as fallback
      const cookieAuth = document.cookie.includes('admin_session=true');
      
      const isAuthenticated = localStorageAuth === 'true' || 
                            sessionStorageAuth === 'true' || 
                            cookieAuth;

      console.log('Admin auth check:', {
        localStorage: localStorageAuth,
        sessionStorage: sessionStorageAuth,
        cookie: cookieAuth,
        result: isAuthenticated
      });

      setAuthState({
        isAuthenticated,
        isLoading: false,
        error: null
      });

      if (!isAuthenticated && window.location.pathname.includes('/admin/dashboard')) {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error checking admin auth:', error);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: 'Authentication check failed'
      });
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (username === "backoffice" && password === "G89x!h5qgj") {
        // Set authentication in multiple places for mobile compatibility
        localStorage.setItem('admin_logged_in', 'true');
        sessionStorage.setItem('admin_logged_in', 'true');
        
        // Set a session cookie as additional fallback
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + 24);
        document.cookie = `admin_session=true; expires=${expiryTime.toUTCString()}; path=/; SameSite=Strict`;

        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null
        });

        // Force navigation with full page reload for mobile compatibility
        window.location.href = '/admin/dashboard';
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    try {
      // Clear all authentication methods
      localStorage.removeItem('admin_logged_in');
      sessionStorage.removeItem('admin_logged_in');
      document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null
      });

      // Force navigation with full page reload
      window.location.href = '/admin';
    } catch (error) {
      console.error('Logout error:', error);
      // Force reload anyway
      window.location.href = '/admin';
    }
  };

  return {
    ...authState,
    login,
    logout,
    checkAuthStatus
  };
};
