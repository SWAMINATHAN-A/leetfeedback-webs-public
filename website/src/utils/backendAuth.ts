// Backend authentication utilities
const API_BASE_URL = 'https://leetfeedback-backend.onrender.com/api';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  github_username: string;
  github_repo: string;
  github_branch: string;
}

export interface LoginRequest {
  username: string;
  email: string;
  password: string;
}

export interface BackendUser {
  id: string;
  username: string;
  email: string;
  role?: string;
  github?: {
    username: string | null;
    repo: string | null;
    branch: string | null;
    linked: boolean;
  };
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: BackendUser;
  message?: string;
  token?: string;
}

// Cookie management utilities
export const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Backend authentication functions
export const registerUser = async (userData: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies in requests
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (response.ok && data.user) {
      // Store auth token if provided
      if (data.token) {
        setCookie('auth_token', data.token, 3650);
      }
      
      // Store user data in localStorage for persistence
      localStorage.setItem('backend_user', JSON.stringify(data.user));
      localStorage.setItem('auth_type', 'backend');
      
      return {
        success: true,
        user: data.user,
        token: data.token,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Registration failed',
      };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
};

export const loginUser = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies in requests
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (response.ok && data.user) {
      // Store auth token if provided
      if (data.token) {
        setCookie('auth_token', data.token, 3650);
      }
      
      // Store user data in localStorage for persistence
      localStorage.setItem('backend_user', JSON.stringify(data.user));
      localStorage.setItem('auth_type', 'backend');
      
      return {
        success: true,
        user: data.user,
        token: data.token,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Login failed',
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
};

export const logoutBackendUser = async (): Promise<void> => {
  try {
    // Clear stored data
    localStorage.removeItem('backend_user');
    localStorage.removeItem('auth_type');
    deleteCookie('auth_token');
    
    // Optional: Call backend logout endpoint if it exists
    const token = getCookie('auth_token');
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
      } catch (error) {
        console.log('Backend logout call failed, but local cleanup completed');
      }
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Check if user is authenticated with backend
export const getBackendUser = (): BackendUser | null => {
  try {
    const authType = localStorage.getItem('auth_type');
    if (authType !== 'backend') return null;
    
    const userData = localStorage.getItem('backend_user');
    if (!userData) return null;
    
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error getting backend user:', error);
    return null;
  }
};

// Validate token and refresh user data if needed
export const validateBackendAuth = async (): Promise<BackendUser | null> => {
  const cachedUser = getBackendUser();
  const token = getCookie('auth_token');

  if (!cachedUser) {
    return null;
  }

  if (!token) {
    await logoutBackendUser();
    return null;
  }

  return cachedUser;
};
