// Backend authentication utilities
const API_BASE_URL = '/api';

export interface RegisterRequest {
  username: string;
  email?: string;
  password: string;
  timezone?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface BackendUser {
  id: string;
  username: string;
  email: string | null;
  timezone?: string;
  visibility?: string;
  currentStreak?: number;
  totalXp?: number;
  createdAt?: string;
}

export interface UserStats {
  currentStreak: number;
  totalXp: number;
  totalSolves: number;
  totalSubmissions: number;
  totalStreakDays: number;
  problemsByDifficulty: {
    Easy?: number;
    Medium?: number;
    Hard?: number;
  };
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

// Fetch current user from backend API
export const fetchCurrentUser = async (): Promise<BackendUser | null> => {
  try {
    const token = getCookie('auth_token');
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      if (data.user) {
        // Update stored user data
        localStorage.setItem('backend_user', JSON.stringify(data.user));
        return data.user;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

// Fetch user stats from backend API
export const fetchUserStats = async (): Promise<UserStats | null> => {
  try {
    const token = getCookie('auth_token');
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/auth/me/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      return data.stats || null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
};

// Change password
export const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getCookie('auth_token');
    if (!token) {
      return { success: false, message: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message || 'Password changed successfully' };
    }
    return { success: false, message: data.error || 'Failed to change password' };
  } catch (error) {
    console.error('Error changing password:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

// Delete account (soft delete with 7-day grace period)
export const deleteAccount = async (password: string): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getCookie('auth_token');
    if (!token) {
      return { success: false, message: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE_URL}/auth/account`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Clear local auth data
      localStorage.removeItem('backend_user');
      localStorage.removeItem('auth_type');
      deleteCookie('auth_token');
      return { success: true, message: data.message || 'Account deleted successfully' };
    }
    return { success: false, message: data.error || 'Failed to delete account' };
  } catch (error) {
    console.error('Error deleting account:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};
