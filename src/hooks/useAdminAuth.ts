
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Simple admin credentials
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
    console.log('Admin auth initializing...');
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      console.log('Checking admin auth status...');
      
      // Simple check using a memory flag and basic storage
      let isAuthenticated = false;
      
      try {
        // Try to check if user is authenticated
        const authFlag = window.sessionStorage?.getItem('admin_auth') === 'true';
        const authTime = window.sessionStorage?.getItem('admin_auth_time');
        
        if (authFlag && authTime) {
          const loginTime = parseInt(authTime);
          const currentTime = Date.now();
          const hoursSinceLogin = (currentTime - loginTime) / (1000 * 60 * 60);
          
          // Session valid for 24 hours
          if (hoursSinceLogin < 24) {
            isAuthenticated = true;
          } else {
            // Clean expired session
            try {
              window.sessionStorage?.removeItem('admin_auth');
              window.sessionStorage?.removeItem('admin_auth_time');
            } catch (e) {
              console.warn('Storage cleanup failed:', e);
            }
          }
        }
      } catch (storageError) {
        console.warn('Storage access failed, proceeding without persistence:', storageError);
        // If storage fails, just proceed without persistence
      }

      console.log('Admin auth check result:', { isAuthenticated });

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
      
      console.log('Admin login attempt:', { username });

      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 300));

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        console.log('Admin login successful');
        
        // Try to store session, but don't fail if storage is unavailable
        try {
          window.sessionStorage?.setItem('admin_auth', 'true');
          window.sessionStorage?.setItem('admin_auth_time', Date.now().toString());
        } catch (storageError) {
          console.warn('Could not persist session, continuing anyway:', storageError);
        }

        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null
        });

        // Navigate to dashboard
        console.log('Navigating to admin dashboard...');
        window.location.replace('/admin/dashboard');
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      console.error('Admin login error:', errorMessage);
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
      console.log('Admin logout initiated');
      
      // Try to clear storage, but don't fail if unavailable
      try {
        window.sessionStorage?.removeItem('admin_auth');
        window.sessionStorage?.removeItem('admin_auth_time');
      } catch (storageError) {
        console.warn('Storage cleanup failed during logout:', storageError);
      }

      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null
      });

      // Navigate to login
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
