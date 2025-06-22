
// API service for MySQL backend
const API_BASE_URL = window.location.origin + '/api';

// Helper function to make API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for session management
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  console.log(`API Request: ${options.method || 'GET'} ${url}`);
  
  try {
    const response = await fetch(url, mergedOptions);
    const data = await response.json();
    
    console.log(`API Response: ${response.status}`, data);
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Booking API
export const bookingAPI = {
  create: async (bookingData: any) => {
    return apiRequest('/bookings.php', {
      method: 'POST',
      body: JSON.stringify({
        ...bookingData,
        device_info: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
      }),
    });
  },

  getAll: async () => {
    return apiRequest('/bookings.php', {
      method: 'GET',
    });
  },

  updateStatus: async (id: string, status: string, adminRemarks?: string) => {
    return apiRequest('/bookings.php', {
      method: 'PUT',
      body: JSON.stringify({
        id,
        status,
        admin_remarks: adminRemarks,
      }),
    });
  },

  saveRemarks: async (id: string, adminRemarks: string) => {
    return apiRequest('/bookings.php', {
      method: 'PUT',
      body: JSON.stringify({
        id,
        admin_remarks: adminRemarks,
      }),
    });
  },
};

// Contact API
export const contactAPI = {
  create: async (contactData: any) => {
    return apiRequest('/contacts.php', {
      method: 'POST',
      body: JSON.stringify({
        ...contactData,
        device_info: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
      }),
    });
  },

  getAll: async () => {
    return apiRequest('/contacts.php', {
      method: 'GET',
    });
  },

  markAsRead: async (id: string) => {
    return apiRequest('/contacts.php', {
      method: 'PUT',
      body: JSON.stringify({
        id,
        status: 'read',
      }),
    });
  },
};

// Admin authentication API
export const adminAuthAPI = {
  login: async (username: string, password: string) => {
    return apiRequest('/admin-auth.php', {
      method: 'POST',
      body: JSON.stringify({
        action: 'login',
        username,
        password,
      }),
    });
  },

  logout: async () => {
    return apiRequest('/admin-auth.php', {
      method: 'POST',
      body: JSON.stringify({
        action: 'logout',
      }),
    });
  },

  checkAuth: async () => {
    return apiRequest('/admin-auth.php', {
      method: 'POST',
      body: JSON.stringify({
        action: 'check',
      }),
    });
  },
};

// OTP API
export const otpAPI = {
  send: async (email: string, otp: string, name: string, testMode: boolean = false) => {
    return apiRequest('/send-otp.php', {
      method: 'POST',
      body: JSON.stringify({
        email,
        otp,
        name,
        testMode,
      }),
    });
  },
};
