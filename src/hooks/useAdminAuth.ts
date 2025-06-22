
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Simple admin credentials check without external dependencies
const ADMIN_USERNAME = "backoffice";
const ADMIN_PASSWORD = "G89x!h5qgj";

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
      // Use a more reliable authentication check
      const sessionKey = 'admin_session_active';
      const sessionExpiry = 'admin_session_expiry';
      
      const isActive = sessionStorage.getItem(sessionKey);
      const expiry = sessionStorage.getItem(sessionExpiry);
      
      let isAuthenticated = false;
      
      if (isActive === 'true' && expiry) {
        const expiryTime = parseInt(expiry);
        const currentTime = Date.now();
        
        if (currentTime < expiryTime) {
          isAuthenticated = true;
        } else {
          // Session expired, clean up
          sessionStorage.removeItem(sessionKey);
          sessionStorage.removeItem(sessionExpiry);
        }
      }

      console.log('Admin auth check:', {
        sessionActive: isActive,
        sessionExpiry: expiry,
        currentTime: Date.now(),
        isAuthenticated
      });

      setAuthState({
        isAuthenticated,
        isLoading: false,
        error: null
      });

      // Redirect if not authenticated and on dashboard
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
      await new Promise(resolve => setTimeout(resolve, 300));

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set session with 24-hour expiry
        const expiryTime = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        
        // Use sessionStorage for better mobile compatibility
        sessionStorage.setItem('admin_session_active', 'true');
        sessionStorage.setItem('admin_session_expiry', expiryTime.toString());
        
        // Also set in localStorage as backup
        try {
          localStorage.setItem('admin_session_backup', 'true');
          localStorage.setItem('admin_session_backup_expiry', expiryTime.toString());
        } catch (e) {
          console.warn('localStorage not available:', e);
        }

        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null
        });

        // Use replace instead of href to avoid potential security issues
        window.location.replace('/admin/dashboard');
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
      // Clear all authentication data
      sessionStorage.removeItem('admin_session_active');
      sessionStorage.removeItem('admin_session_expiry');
      
      try {
        localStorage.removeItem('admin_session_backup');
        localStorage.removeItem('admin_session_backup_expiry');
      } catch (e) {
        console.warn('localStorage cleanup failed:', e);
      }

      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null
      });

      // Use replace to avoid back button issues
      window.location.replace('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation anyway
      window.location.replace('/admin');
    }
  };

  return {
    ...authState,
    login,
    logout,
    checkAuthStatus
  };
};
