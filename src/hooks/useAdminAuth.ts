
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAuthAPI } from '@/utils/apiService';

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
    console.log('Admin auth initializing...');
    // Check for stored admin session on load
    const storedAuth = localStorage.getItem('admin_authenticated');
    if (storedAuth === 'true') {
      setAuthState(prev => ({ ...prev, isAuthenticated: true, isLoading: false }));
    }
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('Checking admin auth status...');
      
      const response = await adminAuthAPI.checkAuth();
      const isAuthenticated = response.authenticated;
      
      console.log('Admin auth check result:', { isAuthenticated });

      setAuthState({
        isAuthenticated,
        isLoading: false,
        error: null
      });

      // Store authentication state persistently
      if (isAuthenticated) {
        localStorage.setItem('admin_authenticated', 'true');
      } else {
        localStorage.removeItem('admin_authenticated');
      }

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

      const response = await adminAuthAPI.login(username, password);
      
      if (response.success) {
        console.log('Admin login successful');
        
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null
        });

        // Store authentication state persistently
        localStorage.setItem('admin_authenticated', 'true');

        // Navigate to dashboard
        console.log('Navigating to admin dashboard...');
        window.location.replace('/admin/dashboard');
        return { success: true };
      } else {
        throw new Error('Login failed');
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

  const logout = async () => {
    try {
      console.log('Admin logout initiated');
      
      await adminAuthAPI.logout();

      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null
      });

      // Clear stored authentication
      localStorage.removeItem('admin_authenticated');

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
