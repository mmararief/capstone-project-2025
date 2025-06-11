import { useState, useEffect } from 'react';
import { getUserFromToken } from '@/lib/utils';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = getUserFromToken();
      
      setUser(userData);
      setIsLoggedIn(!!token && !!userData);
      setIsLoading(false);
    };

    // Check auth on mount
    checkAuth();

    // Listen for storage changes (e.g., login/logout in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'authToken') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsLoggedIn(false);
  };

  return {
    user,
    isLoggedIn,
    isLoading,
    logout,
    // Helper properties for easy access
    userId: user?.id || 1,
    userEmail: user?.email,
    userPreferences: user?.preferences || [],
    userAge: user?.age
  };
} 